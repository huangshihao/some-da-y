const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mount = require('koa-mount')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const router = require('./routes').router

//middlewares
app.use(logger())
app.use(bodyParser())
app.use(async (ctx,next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms `)
})

app.use(mount('/static',require('koa-static')(__dirname + '/public')))

app.use(views(__dirname + '/views',{
    extension:'html'
}))

app.use(router.routes(),router.allowedMethods())

app.on('err',(err,ctx) => {
    console.log(err)
    logger.error('server error',err,ctx)
})

app.listen(8088)
console.log('server run 8088 port')
