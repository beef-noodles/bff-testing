import Router from "@koa/router";
import httpStatus from "http-status";

import { UidResponse, getUid } from "../services/UidService";
import logger from "../utils/loggerUtils";

const uIDRouter = new Router();

uIDRouter.get("/uid", async (ctx) => {
  logger.info("Start to generate uid");
  try {
    const uidResponse: UidResponse = await getUid();
    logger.info(
      `Successfully generate the uid_response: ${JSON.stringify(uidResponse)}`
    );
    ctx.status = httpStatus.CREATED;
    ctx.body = uidResponse;
  } catch (error) {
    logger.error(`Failed to generate the uid_error: ${JSON.stringify(error)}`);
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      errors: [httpStatus[httpStatus.INTERNAL_SERVER_ERROR]],
    };
  }
});

export default uIDRouter;
