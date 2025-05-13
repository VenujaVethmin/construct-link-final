import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const dashboard = async (req, res) => {
  try {
    const data = await prisma.project.findMany({
      where: {
        projectMembers: {
          some: {
            userId: "cmal6gqcs0002f9y85f1iaw4u",
          },
        },
        status: {
          not: "Completed",
        },
      },

      include: {
        _count: {
          select: {
            tasks: true,
            projectMembers: true,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: error.message });
  }
};
 
 

export const talents = async (req, res) => {
   try {
      const data = await prisma.user.findMany(
         {
            take : 4 ,
            where : {
               role : "PROFFESIONAL"
            },
            include:{
               talentProfile : true
            }
         }
      )

      return res.status(200).json(data);
   } catch (error) {
      console.error("Error in talents function:", error);
      res.status(500).json({ error: error.message });
      
   }
}


export const talentProfile = async (req , res ) =>{
   try {
      const { id } = req.params;
      const data = await prisma.user.findUnique(
         {
            where : {
               id : id
            },
            include :{
               talentProfile : true
            }
         }
      )
      return res.status(200).json(data);
   } catch (error) {
      console.error("Error in talentProfile function:", error);
      res.status(500).json({ error: error.message });
      
   }
}


export const invitations = async (req , res) => {
try {
   const data = await prisma.invite.findMany({
     where: {
       receiverId: "cmal6gqcs0002f9y85f1iaw4u",
       status: "PENDING"
     },
     include:{
      sender:{
         select:{
           
            name : true,
            
         }
      },
      project:{
         select:{
            name : true,
           id : true,
         projectType : true,
         }
      }
     }
    
   });

   return res.status(200).json(data);
   
} catch (error) {
   console.error("Error in invitations function:", error);
   res.status(500).json({ error: error.message });
   
}

}

export const acceptInvite = async (req, res) => {
  try {
    const { id } = req.params; // invite ID
    const { status } = req.body;
    const userId = "cmal6gqcs0002f9y85f1iaw4u"; // Ideally, use auth context

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
 
 

export const inviteData = async (req , res) => {

   const { id } = req.params;
 try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: "cmal6canz0000f9y8akqn56u3",
      },
    });

     const talent = await prisma.user.findUnique(
      {
         where : {
            id : id,
            role : "PROFFESIONAL"
         },

         select:{
            name : true,
            image : true,
            talentProfile:{
               select:{
                  title : true,
                hourlyRate : true,
                

               }
            }

         }
      }
    )

    return res.status(200).json({projects , talent})
 } catch (error) {
    console.error("Error in invite function:", error);
    res.status(500).json({ error: error.message });
  }
    
 }


 export const sendInvite = async (req , res) => {

   try {

      const userId = "cmal6canz0000f9y8akqn56u3";

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
      
   }



   export const getInvites = async (req , res) => {
      const userId = "cmal6canz0000f9y8akqn56u3";

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
   }



 
