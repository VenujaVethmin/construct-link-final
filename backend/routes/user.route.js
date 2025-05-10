import { Router } from "express";
import { createProject, createTask, dashboard, getTasks, overview, projectMaterials, updateTask } from "../controllers/user.controller.js";


const userRoute = Router();



userRoute.get("/dashboard", dashboard);
userRoute.get("/projectMaterials/:id", projectMaterials);
userRoute.get("/overview/:id", overview);
userRoute.get("/getTasks/:id", getTasks);
userRoute.post("/createProject", createProject);
userRoute.post("/createTask/:id", createTask);
userRoute.put("/updateTask/:id", updateTask);















export default userRoute;
