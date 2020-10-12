const router = require('koa-router')()

exports.router = router

function useRoute(name){
    const rt = require(`./${name}`).router
    router.use(`/${name}`, rt.routes(), rt.allowedMethods())
}
;['rainyday', '115'].forEach(useRoute)


router.get('/',async (ctx) => {
    await ctx.render('index')
})
