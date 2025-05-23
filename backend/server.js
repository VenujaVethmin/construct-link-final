import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";




import bcrypt from "bcrypt";
import passport from "passport";
import { ensureJWTAuth } from "./middleware/jwtAuth.js";
import userRoute from "./routes/user.route.js";

import jwt from "jsonwebtoken";

import "./services/passport.js";
import { PrismaClient } from "@prisma/client";
import supplierRoute from "./routes/supplier.route.js";
import marketPlaceRoute from "./routes/marketplace.route.js";
import talentsRoute from "./routes/talents.route.js";
import accountRoute from "./routes/account.route.js";
import cloudinaryRoute from './routes/cloudinary.route.js';

const prisma = new PrismaClient();


dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
  })
);




app.use(passport.initialize());


const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ error: "name, email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error) return res.status(500).json({ error: error.message });
    if (!user) return res.status(401).json({ error: info?.message });

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  })(req, res, next);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = generateToken(req.user);
   
      res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/token?token=${token}`);
  }
);



app.get("/api/me", ensureJWTAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      firstTimeLogin: user.firstTimeLogin
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.use("/api/user", ensureJWTAuth  ,userRoute);

app.use("/api/supplier",ensureJWTAuth, supplierRoute);

app.use("/api/marketplace",ensureJWTAuth, marketPlaceRoute);

app.use("/api/talents",ensureJWTAuth, talentsRoute);


app.use("/api/cloudinary", cloudinaryRoute);

app.use("/api/account", ensureJWTAuth, accountRoute);






app.listen(3001, () => {
  console.log("Server started on port 3001");
});
