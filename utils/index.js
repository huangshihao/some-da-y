const request = require('request')
const cookies = require('request-cookies')
const { distinctId } = require('./utils')
const UM_distinctid = distinctId()
class Download115 {
  static tokenHeaders = {
    'Cookie': `UM_distinctid=${UM_distinctid}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
  }
  static loginHeader = {
    'Cookie': `UM_distinctid=${UM_distinctid}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
  }
  constructor () {
    this.statueHeaders = {}
    this.downloadHeaders ={}
    this.tokenRespData = {}
    this.uid = ''
  }
  token () {
    return new Promise((resolve, reject) => {
      request({ url: 'https://qrcodeapi.115.com/api/1.0/web/1.0/token?', headers: this.tokenHeaders }, (err, resp, body) => {
        const respObj = JSON.parse(body)
        const cookiesStr = resp.headers['set-cookie']
        const acwTc = new cookies.Cookie(cookiesStr[0]).toJSON()
        this.statueHeaders = {
          'Cookie': `UM_distinctid=${UM_distinctid}; ${acwTc.key}=${acwTc.value}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
        }
        this.tokenRespData = respObj.data
        if (!err) {
          resolve(respObj)
        } else {
          reject(err)
        }
      })
    })
  }
  getStatus () {
    return new Promise((resolve, reject) => {
      request({ url: `https://qrcodeapi.115.com/get/status/?uid=${this.tokenRespData.uid}&time=${this.tokenRespData.time}&sign=${this.tokenRespData.sign}&_=${this.tokenRespData.time}`, headers: this.statueHeaders}, (err, resp, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  }
  login () {
    return new Promise(((resolve, reject) => {
      request({ url: 'https://passportapi.115.com/app/1.0/web/1.0/login/qrcode', headers: this.loginHeader, method: 'POST', form: { account: this.tokenRespData.uid, app: 'web' } }, (err, resp, respBody) => {
        if (err) {
          reject(err)
        } else {
          const cookies1 = resp.headers['set-cookie']
          const loginBody = JSON.parse(respBody)
          let cookies1Str = cookies1.join('; ')
          this.downloadHeaders = {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cookie': `CNZZDATA1279056547=1777869689-1602470237-%7C1602470237; UM_distinctid=${UM_distinctid}; ${cookies1Str}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
            Referer: 'https://115.com/?cid=0&offset=0&mode=wangpan',
            'Origin': 'https://115.com',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
          }
          this.uid = loginBody.data.cookie.UID.split('_')[0]
          resolve(loginBody)
        }
      })
    }))
  }
  download (url) {
    return new Promise((resolve, reject) => {
      request({ url: 'https://115.com/web/lixian/?ct=lixian&ac=add_task_url', headers: this.downloadHeaders, method: 'POST', form: {
          url,
          savepath: '',
          wp_path_id: '',
          uid: this.uid
        }}, (err, resp, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      })
    })
  }
}

exports.Download115 = Download115
