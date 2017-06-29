'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const cors = require('koa-cors')
const qs = require('qs')
const axios = require('axios')
const middleware = require('./src/api/koa/middleware')

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
app.use(cors())

/***********************************************************
  register routes
 ***********************************************************/

const fetchUrl = async ({ url }) => {
  console.log(`fetching url ${url}...`)
  let response = await axios.get(url)
  return response.data
}

const router = new Router()
router.get('/api/fetch', async (ctx, next) => {
  let params = qs.parse(ctx.req._parsedUrl.query)
  ctx.body = await fetchUrl(params)
  await next
})

app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve(__dirname + '/build'))

/***********************************************************
  start server
 ***********************************************************/

const port = process.env.PORT || 5301

app.listen(port)

console.log(`SEO Insepctor App running on port ${port}`)
