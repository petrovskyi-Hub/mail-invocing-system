import { Router } from "express";
import * as emailController from "../controllers/email.controller.mjs";

const emailRouter = Router();

emailRouter.get("/", emailController.getEmails);
emailRouter.get("/unseen", emailController.getUnseenEmails);
emailRouter.get("/:id", emailController.getEmailById);
emailRouter.post("/", emailController.sendEmail);

export default emailRouter;
