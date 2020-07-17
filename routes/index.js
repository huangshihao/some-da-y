const router = require('koa-router')()

exports.router = router

function useRoute(name){
    const rt = require(`./${name}`).router
    console.log(rt)
    router.use(`/${name}`, rt.routes(), rt.allowedMethods())
}
;['rainyday'].forEach(useRoute)


router.get('/',async (ctx) => {
    await ctx.render('index')
})