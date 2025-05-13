import { Router } from "express";
import { talents } from "../controllers/talents.controller.js";


const notificationRoute = Router();


notificationRoute.get("/talents", talents);






export default notificationRoute;
