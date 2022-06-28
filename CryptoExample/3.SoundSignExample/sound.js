const CryptoJS = require("crypto-js")
const superagent = require('superagent')

const appkey = 'B8B99EFB6A2C3EAEAA0E'
const appsecret = '54A3A434C941F299C5D6E43D6E07B685CDBCC31B'
const method = 'push'
const devicesn = '1086019600001'
const message = '1000'
const push_template = '3'
const timestamp = '20200915130000'
const nonce = 'thisisatest'


// 待传送 JSON 数据,注意这个数据不用排序
const noSignJSON = `"appkey":"${appkey}","method":"${method}","devicesn":"${devicesn}","message":"${message}","push_template":"${push_template}","timestamp":"${timestamp}","nonce":"${nonce}"`


// 待签名 String
let map = new Map()
map.set('appkey', appkey);
map.set('method', method);
map.set('devicesn', devicesn);
map.set('message', message);
map.set('push_template', push_template);
map.set('timestamp', timestamp);
map.set('nonce', nonce);
// console.log(map)

// 重新排序,并且拼装为类似url的字符串
const noSignMap = new Map([...map.entries()].sort())
// console.log(noSignMap)

let noSignTmp = ''
noSignMap.forEach(function(value, key) {
  // console.log(`${key}=${value}`)
  if (key !== 'sign') {
    noSignTmp = `${noSignTmp}${key}=${value}&`
  }
})
// console.log(noSignTmp)

// 把最后一个 & 截断
const noSignURL = noSignTmp.substring(0, noSignTmp.length-1)

// 签名
const hash = CryptoJS.HmacSHA256(noSignURL, appsecret)
const signStr = CryptoJS.enc.Base64.stringify(hash)
console.log(signStr)

// 完整 JSON = noSignJSON+signStr
const requestStr = `{${noSignJSON},"sign":"${signStr}"}`
// console.log(requestStr)

// 发送请求
superagent
  .post('https://iotmessage.cloudentify.com/v1/audio')
  .set('Content-Type', 'application/json')
  .send(requestStr)
  .end((err, res) => {
    console.log(`res = ${JSON.stringify(res)}\n\n`)
    console.log(`err = ${err}`)
  })
