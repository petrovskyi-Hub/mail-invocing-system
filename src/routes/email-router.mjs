import { Router } from "express";
import * as emailController from "../controllers/email.controller.mjs";

const emailRouter = Router();

emailRouter.get("/", emailController.getEmails);
emailRouter.get("/unseen", emailController.getUnseenEmails);
emailRouter.get("/email/:id", emailController.getEmailById);
emailRouter.get("/mailboxesTree", emailController.getMailboxesTree);
emailRouter.post("/", emailController.sendEmail);

export default emailRouter;
