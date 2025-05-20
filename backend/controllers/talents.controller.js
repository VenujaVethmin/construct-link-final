import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dashboard = async (req, res) => {
  try {
   

      const data = await prisma.project.findMany({
        where: {
          projectMembers: {
            some: {
              userId: req.user.id,
            },
          },
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
          projectMembers: {
            some: {
              userId: req.user.id,
            },
          },
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
            projectMembers: {
              some: {
                userId: req.user.id,
              },
            },
            status: {
              not: "Completed",
            },
          },
        },
      });
  
      const members = await prisma.projectMember.count({
        where: {
          project: {
            projectMembers: {
              some: {
                userId: req.user.id,
              },
            },
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
        members,
      });
  



  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: error.message });
  }
};

export const talents = async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      take: 4,
      where: {
        role: "PROFFESIONAL",
      },
      include: {
        talentProfile: true,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in talents function:", error);
    res.status(500).json({ error: error.message });
  }
};

export const searchTalents = async (req, res) => {
  try {
    const searchTerm = req.query.search || ""; // default to empty string if not provided

    const data = await prisma.user.findMany({
      where: {
        role: "PROFFESIONAL",
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { talentProfile : {title : {contains : searchTerm , mode :"insensitive"}} },
        ],
      },
      include: {
        talentProfile: true,
      },
     
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error searching market:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const talentProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        talentProfile: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in talentProfile function:", error);
    res.status(500).json({ error: error.message });
  }
};

export const invitations = async (req, res) => {
  try {
    const data = await prisma.invite.findMany({
      where: {
        receiverId: req.user.id,
        status: "PENDING",
      },
      include: {
        sender: {
          select: {
            name: true,
          },
        },
        project: {
          select: {
            name: true,
            id: true,
            projectType: true,
          },
        },
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in invitations function:", error);
    res.status(500).json({ error: error.message });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const { id } = req.params; // invite ID
    const { status } = req.body;
    const userId = req.user.id; // Ideally, use auth context

    const invitation = await prisma.invite.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            projectMembers: {
              select: { userId: true },
            },
          },
        },
      },
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    const projectId = invitation.project.id;

    // Check if user is already a member
    const alreadyMember = invitation.project.projectMembers.some(
      (member) => member.userId === userId
    );

    if (alreadyMember) {
      return res
        .status(400)
        .json({ message: "Already a member of this project" });
    }

    if (status === false) {
      const updateInvite = await prisma.invite.update({
        where: { id },
        data: { status: "REJECTED" },
      });

      return res.status(200).json({
        message: "Invite rejected successfully",
        updateInvite,
      });
    }

    // Accept invite
    const addToProject = await prisma.projectMember.create({
      data: {
        projectId,
        userId,
      },
    });

    // Update invite status
    const updateInvite = await prisma.invite.update({
      where: { id },
      data: { status: "ACCEPTED" },
    });

    return res.status(200).json({
      message: "Invite accepted successfully",
      addToProject,
      updateInvite,
    });
  } catch (error) {
    console.error("Error in acceptInvite function:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const inviteData = async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: req.user.id,
      },
    });

    const talent = await prisma.user.findUnique({
      where: {
        id: id,
        role: "PROFFESIONAL",
      },

      select: {
        name: true,
        image: true,
        talentProfile: {
          select: {
            title: true,
            hourlyRate: true,
          },
        },
      },
    });

    return res.status(200).json({ projects, talent });
  } catch (error) {
    console.error("Error in invite function:", error);
    res.status(500).json({ error: error.message });
  }
};

export const sendInvite = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await prisma.invite.create({
      data: {
        projectId: req.body.projectId,
        senderId: userId,
        receiverId: req.body.receiverId,
        message: req.body.message,
      },
    });

    return res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    console.error("Error in sendInvite function:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getInvites = async (req, res) => {
  const userId = req.user.id;

  try {
    const data = await prisma.invite.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        project: true,
        sender: true,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in getInvites function:", error);
    res.status(500).json({ error: error.message });
  }
};
export const profileUpdate = async (req, res) => {
  try {
    const {
      title,
      specialization,
      location,
      hourlyRate,
      about,
      yearsExperience,
      skills,
      education,
      experience,
      certifications,
      profileImage,  // you might want to save this in coverImage field?
    } = req.body;

    const userId = req.user.id; // replace with dynamic user id, e.g. from req.user

    const data = await prisma.talentProfile.upsert({
      where: { userId },
      create: {
        title,
        specialization,
        location,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        about,
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : 0,
        skills,
        education,
        experience,
        certifications,
     
        userId,
      },
      update: {
        title,
        specialization,
        location,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        about,
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : 0,
        skills,
        education,
        experience,
        certifications,
        
      },
    });

    // Await the update so it's completed before responding
    if (data.createdAt.getTime() === data.updatedAt.getTime()) {
      await prisma.user.update({
        where: { id: userId },
        data: { firstTimeLogin: false },
      });
    }


    if(profileImage){
      await prisma.user.update({
        where: { id: userId },
        data: { image: profileImage },
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in profileUpdate:", error);
    res.status(500).json({ error: error.message });
  }
};
