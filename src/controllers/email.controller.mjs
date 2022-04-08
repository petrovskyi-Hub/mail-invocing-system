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
    const mail = await emailService.getEmailById(id);

    return res.status(HttpStatus.OK).json({ mail });
  } catch (error) {
    next(error);
  }
};

export const deleteEmailById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await emailService.deleteEmailById(id, req.query);

    return res.status(HttpStatus.OK).json({ deleted: result });
  } catch (error) {
    next(error);
  }
};

export const getMailboxesTree = async (req, res, next) => {
  try {
    const response = await emailService.getMailboxesTree();

    return res.status(HttpStatus.OK).json({ ...response });
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
