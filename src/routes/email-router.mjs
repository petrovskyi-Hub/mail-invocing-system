import { Router } from "express";
import * as emailController from "../controllers/email.controller.mjs";

const emailRouter = Router();

emailRouter.get("/getEmails", emailController.getEmails);
emailRouter.get("/getUnseenEmails", emailController.getUnseenEmails);
emailRouter.get("/getEmailById/:id", emailController.getEmailById);
emailRouter.post("/sendEmail", emailController.sendEmail);

export default emailRouter;
