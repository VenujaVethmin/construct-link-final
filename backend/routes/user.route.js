import { Router } from "express";
import { addExpense, createProject, createTask, dashboard, deleteExpense, expenses, getTasks, overview, projectMaterials, team, updateBudget, updateExpense, updateTask } from "../controllers/user.controller.js";


const userRoute = Router();



userRoute.get("/dashboard", dashboard);
userRoute.get("/team/:id", team);
userRoute.get("/expenses/:id", expenses);
userRoute.get("/projectMaterials/:id", projectMaterials);
userRoute.get("/overview/:id", overview);
userRoute.get("/getTasks/:id", getTasks);
userRoute.post("/createProject", createProject);
userRoute.post("/addExpense/:id", addExpense);
userRoute.put("/updateExpense/:id", updateExpense);
userRoute.put("/updateBudget/:id", updateBudget);
userRoute.delete("/deleteExpense", deleteExpense);
userRoute.post("/createTask/:id", createTask);
userRoute.put("/updateTask/:id", updateTask);
















export default userRoute;
