const router = require('koa-router')()

exports.router = router

router.get('/',async (ctx) => {
    console.log('run')
    await ctx.render('index')
})