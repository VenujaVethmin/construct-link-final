import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dashboard = async (req, res) => {
  try {
    const data = await prisma.project.findMany({
      where: {
        ownerId: req.user.id,
        status: {
          not: "Completed",
        },
      },

      include: {
        owner: {
          include: {
            recentActivities: {
              include: {
                project: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const projectCount = await prisma.project.count({
      where: {
        ownerId: req.user.id,
        status: {
          not: "Completed",
        },
      },
    });
    const activeTasks = await prisma.task.count({
      where: {
        status: {
          not: "COMPLETED",
        },
        project: {
          ownerId: req.user.id,
          status: {
            not: "Completed",
          },
        },
      },
    });

    const members = await prisma.projectMember.count({
      where: {
        project: {
          ownerId: req.user.id,
          status: {
            not: "Completed",
          },
        },
      },
    });
    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      data,
      projectCount,
      activeTasks,
      members
    });

    
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: error.message });
  }
};

export const team = async (req, res) => {
  try {
    const data = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        owner: {
          select: {
            name: true,
            image: true,
          },
        },
        projectMembers: {
          select: {
            user: {
              select: {
                name: true,
                image: true,
                talentProfile: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching team data:", error);
    res.status(500).json({ error: error.message });
  }
};


export const expenses = async (req, res) => {
  try {
    const data = await prisma.project.findUnique({
      where:{
        id: req.params.id,
      },
     select:{
      budget:true,
      expenses:{
        select:{
          id:true,
          amount:true,
          description:true,
          category:true,
          date:true,

        }
      }
     }

    })

    return res.status(200).json(data);
  } catch (error) { 
    console.error("Error fetching expenses data:", error);
    res.status(500).json({ error: error.message });
    
  }
}

export const addExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;

    const data = await prisma.expense.create({
      data: {
      amount: parseFloat(amount),
      description: description,
      category: category,
      projectId: id,
      },
    });

    return res.status(200).json({
      message: "Expense added successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: error.message });
  }
}

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category , eid} = req.body;
  try {
    const data = await prisma.expense.update({
      where: { id: eid },
      data: {
        amount: parseFloat(amount),
        description: description,
        category: category,
        projectId: id,
      },

    })
    return res.status(200).json({
      message: "Expense updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: error.message });
    
  }
}


export const deleteExpense = async (req, res) => {
  try {
    const data = await prisma.expense.delete({
      where: {
        id: req.body.eid,
      },
    })

    return res.status(200).json(
      {
        message: "Expense deleted successfully",
        data: data,
      }
    );
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: error.message });
    
  }
}


export const updateBudget = async (req, res) => {
  try {
    const data = await prisma.project.update({
      where: {
        id: req.params.id,
      },
      data: {
        budget: parseFloat(req.body.budget),
      },
    })
    return res.status(200).json({
      message: "Budget updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ error: error.message });
    
  }
}

export const overview = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.project.findUnique({
      where: { id: id },
      include: {
        _count: {
          select: {
            tasks: {
              where: {
                status: {
                  not: "COMPLETED",
                },
              },
            },
            projectMembers: true,
          },
        },

        tasks: {
          where: {
            status: {
              not: "COMPLETED",
            },
          },
          include: {
            assignedTo: {
              select: {
                user: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching project overview:", error);
    res.status(500).json({ error: error.message });
  }
};

export const projectMaterials = async (req, res) => {
  try {
    const data = await prisma.order.findMany({
      where: {
        projectId: req.params.id,
      },
      include: {
        product: {
          include: {
            supplier: {
              select: {
                name: true,
              },
            },
          },
        },

        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching project materials:", error);
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, description, startDate, location, projectType, budget } =
      req.body;

    const data = await prisma.project.create({
      data: {
        name: name,
        description: description,
        ownerId: userId,
        startDate: new Date(startDate),
        location: location,
        projectType: projectType,
        budget: parseFloat(budget),
      },
    });

    res.status(200).json({
      message: "Project created successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: error.message });
  }
};

export const addProjectMember = async (req, res) => {
  try {
    const data = await prisma.projectMember.create({
      data: {
        projectId: req.params.id,
        userId: req.body.userId,
      },
    });
    res.status(200).json({
      message: "Project member added successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error adding project member:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.task.findMany({
      where: {
        projectId: id,
      },
      include:{
        project:{
          include:{
            projectMembers :{
              select:{
                user:{
                  select:{
                    name:true,
                    id :true


                  }
                }
              }
            }
          }
        }
      }
    });
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      labels,
      assignedToId,
    } = req.body;

    const memberId =
      assignedToId && assignedToId.trim() !== "" ? assignedToId : null;

    const data = await prisma.task.create({
      data: {
        title: title,
        description: description,
        status: status,
        priority: priority,
        labels: labels,
        projectId: id,
        assignedToId: memberId,
        dueDate: new Date(dueDate),
      },
    });
    res.status(200).json({
      message: "Task created successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await prisma.task.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
    res.status(200).json({
      message: "Task updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
   
    const data = await prisma.task.delete({
      where: { id: id },
      
    });
    res.status(200).json({
      message: "Task deleted successfully",
     
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

