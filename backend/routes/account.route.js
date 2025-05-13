import { Router } from "express";
import { accountType } from "../controllers/account.controller.js";

const accountRoute = Router();

accountRoute.put("/accountType", accountType);

export default accountRoute;
