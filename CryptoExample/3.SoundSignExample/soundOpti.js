/**
 * 优化 js 的加签逻辑写法
 */

const CryptoJS = require("crypto-js")
const superagent = require('superagent')

const data = {
  appkey: 'B8B99EFB6A2C3EAEAA0E',
  appsecret: '54A3A434C941F299C5D6E43D6E07B685CDBCC31B',
  method: 'push',
  devicesn: '1086019600001',
  message: '1000',
  push_template: '3',
  timestamp: '20200915130000',
  nonce: 'thisisatest',
}

const array = []
for (const key in data) {
  if (key !== 'sign') {
    array.push(`${key}=${data[key]}`)
  }
}

array.sort()

const noSignURL = array.join('&')

// 签名
const hash = CryptoJS.HmacSHA256(noSignURL, data.appsecret)
const signStr = CryptoJS.enc.Base64.stringify(hash)
console.log('\n\n' + signStr + 'n\n')

// 把签名加入对象
data.sign = signStr
// console.log(data)

// 发送请求
superagent
  .post('https://iotmessage.cloudentify.com/v1/audio')
  .set('Content-Type', 'application/json')
  .send(data)
  .end((err, res) => {
    console.log(`res = ${JSON.stringify(res)}\n\n`)
    console.log(`err = ${err}`)
  })
