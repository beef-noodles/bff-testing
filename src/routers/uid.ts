import Router from "@koa/router";
import axios from "axios";
import httpStatus from "http-status";

import { uuidV4URL } from "../config";
const uIDRouter = new Router();

type UUIDResponse = [string];

uIDRouter.get("/uid", async (ctx) => {
  try {
    const response = await axios.get(uuidV4URL);
    const result = (await response.data) as UUIDResponse;

    ctx.status = httpStatus.CREATED;
    ctx.body = { id: result[0] };
  } catch (error) {
    console.error(`Failed to request uuid, error: ${error}`);
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      errors: [httpStatus[httpStatus.INTERNAL_SERVER_ERROR]],
    };
  }
});

export default uIDRouter;
