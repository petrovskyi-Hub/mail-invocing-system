import { ImapFlow } from "imapflow";
import mailparser from "mailparser";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import ApiError from "../customError.mjs";
config();

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD;

const smtpConfig = {
  host: "smtp.gmail.com",
  port: 993,
  secure: true,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  logger: false,
};

export const getEmails = async ({ limit = 3, offset = 0 }) => {
  const client = new ImapFlow(smtpConfig);
  await client.connect();
  const lock = await client.getMailboxLock("INBOX");
  let messages = [];
  const rangeFrom = client.mailbox.exists - limit - offset + 1;
  const rangeTo = offset == 0 ? "*" : (client.mailbox.exists - offset).toString();
  const searchObj = {
    seq: `${rangeFrom}:` + rangeTo,
  };

  try {
    for await (let message of client.fetch(searchObj, {
      envelope: true,
      flags: true,
    })) {
      messages.unshift({
        id: message.id,
        envelope: message.envelope,
        flags: [...message.flags].map((flag) => flag.replace("\\", "")),
      });
    }
  } finally {
    lock.release();
  }
  await client.logout();

  return messages;
};

export const getUnseenEmails = async ({ limit = 3, offset = 0 }) => {
  const client = new ImapFlow(smtpConfig);
  await client.connect();
  const lock = await client.getMailboxLock("INBOX");
  let messages = [];
  const rangeFrom = client.mailbox.exists - limit - offset + 1;
  const rangeTo = offset == 0 ? "*" : (client.mailbox.exists - offset).toString();
  const searchObj = {
    seq: `${rangeFrom}:` + rangeTo,
    seen: false,
  };
  try {
    for await (let message of client.fetch(searchObj, {
      envelope: true,
    })) {
      messages.unshift({
        id: message.id,
        envelope: message.envelope,
      });
    }
  } finally {
    lock.release();
  }
  await client.logout();

  return messages;
};

export const getEmailById = async (id) => {
  const client = new ImapFlow(smtpConfig);
  await client.connect();
  const lock = await client.getMailboxLock("INBOX");
  let parsedMessage;

  const searchObj = {
    emailId: id,
  };
  try {
    for await (let message of client.fetch(searchObj, {
      source: true,
    })) {
      parsedMessage = await mailparser.simpleParser(message.source);
    }
  } finally {
    lock.release();
  }
  await client.logout();

  return parsedMessage;
};

export const sendEmail = async (message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const info = await transporter.sendMail(message);
  return info;
};
