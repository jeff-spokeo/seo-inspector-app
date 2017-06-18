'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const qs = require('qs')
const middleware = require('./src/koa/middleware')

const app = new Koa()

/***********************************************************
  register centralized error handling
 ***********************************************************/

app.on('error', (err, ctx) => {
    console.error('ERROR >>', ctx.status, err, err.stack)
})

/***********************************************************
  register middleware
 ***********************************************************/

app.use(middleware.HandleError)
app.use(middleware.AddResponseTime)
app.use(middleware.AddVersion)
app.use(middleware.LogRequest)

/***********************************************************
  register routes
 ***********************************************************/

const fetchUrl = async (ctx, next) => {
    let params = qs.parse(ctx.req._parsedUrl.query)
    ctx.response.body = params
    await next
}

const router = new Router()
router.get('/api/fetch', fetchUrl)

app.use(router.routes())
app.use(router.allowedMethods())

/***********************************************************
  start server
 ***********************************************************/

const port = process.env.PORT || 5301 

app.listen(port)

console.log(`SEO Insepctor App running on port ${port}`)
