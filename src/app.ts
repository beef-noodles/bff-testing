import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa();

const router = new Router({
    prefix: '/v1'
})
app
  .use(router.routes())
  .use(router.allowedMethods())
  // .listen(3000)

router.get('/health', (cxt, _next) => {
    cxt.body = true
})





export default app