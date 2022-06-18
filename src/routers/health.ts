import Router from '@koa/router'

const healthRouter = new Router()

healthRouter.get('/health', (cxt, _next) => {
    cxt.body = true
})

export default healthRouter

