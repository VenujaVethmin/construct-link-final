import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promises for async file handling
import multer from "multer";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup with enhanced configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Unique temp filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: JPG, PNG, PDF, DOC, DOCX"));
    }
  },
});

// Helper to clean up temporary files
const cleanupFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error("Failed to delete temporary file:", err);
  }
};

// Upload Image Endpoint
export const uploadImage = [
  upload.single("imageFormData"),
  async (req, res) => {
    try {
      const { file } = req;

      if (!file) {
        return res.status(400).json({ error: "No image provided" });
      }

      if (!file.mimetype.startsWith("image/")) {
        await cleanupFile(file.path);
        return res
          .status(400)
          .json({ error: "File must be an image (JPG, PNG)" });
      }

      const result = await cloudinary.uploader.upload(file.path, {
        folder: "uploads",
        resource_type: "image", // Explicitly for images
      });

      await cleanupFile(file.path);

      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      if (req.file) await cleanupFile(req.file.path);
      console.error("Image upload error:", error);
      return res.status(500).json({ error: error.message });
    }
  },
];
