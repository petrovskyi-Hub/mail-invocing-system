import HttpStatus from "http-status-codes";
import * as emailService from "../services/email.service.mjs";

export const getEmails = async (req, res, next) => {
  try {
    const mails = await emailService.getEmails(req.query);

    return res.status(HttpStatus.OK).json({ mails });
  } catch (error) {
    next(error);
  }
};

export const getUnseenEmails = async (req, res, next) => {
  try {
    const mails = await emailService.getUnseenEmails(req.query);

    return res.status(HttpStatus.OK).json({ mails });
  } catch (error) {
    next(error);
  }
};

export const getEmailById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mails = await emailService.getEmailById(id);

    return res.status(HttpStatus.OK).json({ mails });
  } catch (error) {
    next(error);
  }
};

export const sendEmail = async (req, res, next) => {
  try {
    const { message } = req.body;
    const mails = await emailService.sendEmail(message);

    return res.status(HttpStatus.OK).json({ mails });
  } catch (error) {
    next(error);
  }
};
