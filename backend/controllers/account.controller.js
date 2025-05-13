import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const accountType = async (req, res) => {
  // ✅ renamed from "acountType"
  try {
    const data = await prisma.user.update({
      where: {
        id: "cmamrlnwv0000f9c4eekydewa",
      },
      data: {
        role: req.body.role,
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
  