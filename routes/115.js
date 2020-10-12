const router = require('koa-router')()

exports.router = router

router.get('/',async (ctx) => {
  await ctx.render('115')
})

router.get('loginUrl', async (ctx) => {

})
