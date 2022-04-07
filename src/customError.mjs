import HttpStatus from "http-status-codes";

export default class ApiError extends Error {
  status;

  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError(HttpStatus.UNAUTHORIZED, "User not authorized.");
  }

  static noAccessError() {
    return new ApiError(
      HttpStatus.FORBIDDEN,
      "User doesn`t have access to this route."
    );
  }

  static BadRequest(message) {
    return new ApiError(HttpStatus.BAD_REQUEST, message);
  }
}
