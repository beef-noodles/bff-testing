import Koa from "koa";
import Router from "@koa/router";

import healthRouter from "./routers/health";
import uIDRouter from "./routers/uid";

const app = new Koa();

const rootRouter = new Router({
  prefix: "/v1",
});

rootRouter.use(healthRouter.routes(), healthRouter.allowedMethods());
rootRouter.use(uIDRouter.routes(), uIDRouter.allowedMethods());

app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

export default app;
