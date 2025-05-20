import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const notificationTalents = async (req, res) => {
  try {

   const userId = ""
   
   
  } catch (error) {
      console.error("Error in notificationTalents function:", error);
      res.status(500).json({ error: error.message });
   
  }

}