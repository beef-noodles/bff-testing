import Koa from "koa";
import Router from "@koa/router";

import healthRouter from "./routers/health";
import uIDRouter from "./routers/uid";
import log from "./middleware/log";

const app = new Koa();

const rootRouter = new Router({
  prefix: "/v1",
});
rootRouter.use(log);
// rootRouter.use(async(ctx, next) {
//   await next();
// })

rootRouter.use(healthRouter.routes(), healthRouter.allowedMethods());
rootRouter.use(uIDRouter.routes(), uIDRouter.allowedMethods());

app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

export default app;
