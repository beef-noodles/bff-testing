import InternalServerErrorException from "@/exceptions/InternalServerErrorException";
import httpStatus from "http-status";
import { Context, Next } from "koa";
import ErrorMessage from "./ErrorMessage";

const exceptionMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    let status: number = httpStatus.OK;
    const errorMessages: ErrorMessage[] = [];
    if (error instanceof InternalServerErrorException) {
      status = httpStatus.INTERNAL_SERVER_ERROR;
      const errorMessage: ErrorMessage = {
        info: httpStatus.INTERNAL_SERVER_ERROR.toString(),
        message: error.message,
      };
      errorMessages.push(errorMessage);
    }
    ctx.status = status;
    if (ctx.status > 400) {
      ctx.body = {
        status: "success",
        errors: errorMessages,
      };
    }
  }
};

export default exceptionMiddleware;
