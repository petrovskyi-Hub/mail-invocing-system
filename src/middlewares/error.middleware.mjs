// import { ValidationError } from "express-validation";
import HttpStatus from "http-status-codes";
import ApiError from "../customError.mjs";

export const errorMiddleware = (err, req, res, next) => {
  console.log("Error =>", err);

  //   if (err instanceof ValidationError) {
  //     const response =
  //       process.env.NODE_ENV === "development"
  //         ? { message: "Validation error.", validationDetails: err.details }
  //         : { message: "Validation error." };

  //     return res.status(HttpStatus.BAD_REQUEST).json(response);
  //   }

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message || "Unhandled error." });
  }

  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: "Unhandled error." });
};
