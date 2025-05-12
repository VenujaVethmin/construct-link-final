import { Router } from "express";
import { createProject, createTask, dashboard, getTasks, overview, projectMaterials, updateTask } from "../controllers/user.controller.js";


const userRoute = Router();



userRoute.get("/dashboard", dashboard);
















export default userRoute;
