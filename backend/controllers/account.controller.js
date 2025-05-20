import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const accountType = async (req, res) => {

  try {
    const { role } = req.body;

    
    const data = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        role: role,
      },
    });

    return res.status(200).json({
      message: "Account type updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error in accountType:", error);
    res.status(500).json({ error: error.message });
  }
};



  