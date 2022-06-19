import Router from "@koa/router";

const healthRouter = new Router();

healthRouter.get("/health", (cxt) => {
  cxt.body = true;
});

export default healthRouter;
