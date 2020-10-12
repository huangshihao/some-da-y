const router = require('koa-router')()
const { token, getStatus, Download115 } = require('../utils/index')
const download115 = new Download115()
exports.router = router

router.get('/',async (ctx) => {
  await ctx.render('115')
})

router.get('/loginUrl', async (ctx) => {
  const data = await download115.token()
  ctx.body = data || {}
})

router.get('/status', async (ctx) => {
  const data = await download115.getStatus()
  if (data.data.status === 2) {
    await download115.login()
    ctx.body = {
      state: 1,
      data: {
        status: 2
      }
    }
  } else {
    ctx.body = data || {}
  }
})

const wait = (sec) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, sec * 1000)
  })
}

router.post('/download', async (ctx) => {
  const fileList = ctx.request.body
  let respArr = []
  for (let i=0;i<fileList.length;i++) {
    const data = await download115.download(fileList[i])
    await wait(1)
    respArr.push(data)
  }
  console.log(respArr)
  ctx.body = respArr || {}
})
