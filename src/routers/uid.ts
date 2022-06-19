import Router from "@koa/router";
import httpStatus from "http-status";

import { UidResponse, getUid } from "../services/UidService";
const uIDRouter = new Router();

uIDRouter.get("/uid", async (ctx) => {
  try {
    const uidResponse: UidResponse = await getUid();
    ctx.status = httpStatus.CREATED;
    ctx.body = uidResponse;
  } catch (error) {
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      errors: [httpStatus[httpStatus.INTERNAL_SERVER_ERROR]],
    };
  }
});

export default uIDRouter;
