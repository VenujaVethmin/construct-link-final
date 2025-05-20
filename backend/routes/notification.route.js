import { Router } from "express";
import { notificationTalents } from './../controllers/notification.controller';


const notificationRoute = Router();


notificationRoute.get("/talents", notificationTalents);






export default notificationRoute;
