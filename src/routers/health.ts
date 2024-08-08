import Router from "@koa/router";
import dayjs from "dayjs";

const healthRouter = new Router();

healthRouter.get("/health", (cxt) => {
  cxt.body = dayjs().format();
});

export default healthRouter;
