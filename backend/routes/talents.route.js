import { Router } from "express";
import {
  acceptInvite,
  dashboard,
  invitations,
  inviteData,
  sendInvite,
  talentProfile,
  talents,
} from "../controllers/talents.controller.js";

const talentsRoute = Router();

talentsRoute.get("/dashboard", dashboard);
talentsRoute.get("/talents", talents);
talentsRoute.get("/talentProfile/:id", talentProfile);

talentsRoute.get("/invitations", invitations);

talentsRoute.get("/inviteData/:id", inviteData);

talentsRoute.post("/sendInvite", sendInvite);

talentsRoute.post("/acceptInvite/:id", acceptInvite);

export default talentsRoute;
