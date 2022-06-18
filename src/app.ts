import Koa from "koa";
import Router from "@koa/router";

import healthRouter from "./routers/health";

const app = new Koa();

const rootRouter = new Router({
  prefix: "/v1",
});

rootRouter.use(healthRouter.routes(), healthRouter.allowedMethods());

app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

export default app;
