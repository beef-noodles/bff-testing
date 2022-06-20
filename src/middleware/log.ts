import { DefaultContext, Next } from "koa";

const log = async (ctx: DefaultContext, next: Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx["method"]} ${ctx["url"]} - ${ms}ms`);
};

export default log;
