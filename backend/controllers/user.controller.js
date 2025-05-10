import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dashboard = async (req, res) => {

  try {

    const data = await prisma.project.findMany({
      where:{
        ownerId: req.user.id,
        status : {
          not : "Completed"
        }
      },

      include: {
        _count: {
          select: {
            tasks: true,
            projectMembers: true,
          },
        },
      },
    })
    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      data,
    });
    
  } catch (error) {
    
    console.error("Error fetching dashboard data:", error);
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
              where:{
                status:{
                  not : "COMPLETED"
                }
              }
            },
            projectMembers: true,
          },
        },

        tasks:{
          where:{
            status:{
              not : "COMPLETED"
            }
          },
          include:{
            assignedTo:{
              select:{
                user:{
                  select:{
                    name: true,
                    image: true,
                  }
                }
              }
            }
          }
         
        
        
        }
      },
    });
    res.status(200).json(data
    );
  } catch (error) {
    console.error("Error fetching project overview:", error);
    res.status(500).json({ error: error.message });
  }
}


export const projectMaterials = async (req, res) => {

  try {

    const data = await prisma.order.findMany({
      where:{
        projectId: req.params.id
      },
      include:{
        product : {
          include:{
            supplier : {
              select:{
                name: true,
                
              }
              
            }
            
          }
        },

        user:{
          select:{
            name : true,
          }
        }
      }
    }); 

    return res.status(200).json(data)
    
  } catch (error) {
    console.error("Error fetching project materials:", error);
    res.status(500).json({ error: error.message });
    
  }

}



export const createProject = async (req, res) => {
  try {
    const userId = req.user.id;
    

    const { name, description, startDate, location , projectType, budget } = req.body;
   

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

}

export const getTasks = async (req, res) => {
  try {
    const {id} = req.params
    const data = await prisma.task.findMany({
      where:{
        projectId: id,
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

   const memberId = assignedToId && assignedToId.trim() !== "" ? assignedToId : null;


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


}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status} = req.body;
    const data = await prisma.task.update({
      where: { id: id },
      data: {
       
        status: status
        
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

