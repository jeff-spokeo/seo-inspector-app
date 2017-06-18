'use strict'

exports.HandleError = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
}

exports.AddResponseTime = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    ctx.set('X-Response-Time', `${ms}ms`)
}

exports.AddVersion = async (ctx, next) => {
    await next()
    ctx.set('X-Version', `${require('../../package.json').version}`)
}

exports.LogRequest = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - (${ms} ms)`)
}
