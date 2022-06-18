import Router from "@koa/router";
import axios from "axios";

import { uuidV4URL } from "../config";
const uIDRouter = new Router();

type UUIDResponse = [String];

uIDRouter.get("/uid", async (ctx, _next) => {
  const response = await axios.get(uuidV4URL);
  const result = (await response.data) as UUIDResponse;

  ctx.status = 201;
  ctx.body = { id: result[0] };
});

export default uIDRouter;
