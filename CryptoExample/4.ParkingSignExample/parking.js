const CryptoJS = require("crypto-js")
const superagent = require('superagent')

const appSecret = '3a93d15ed87d4f7ca4957ab7efde501e'

/**
 * 五个场景：
 * 1. 场内扫码支付
 * 2. 车道扫码支付
 * 3. 无牌车进场出场 + 支付
 * 4. 访客车辆放行、延时
 * 5. 车牌优惠下发、扫码支付
 */

// 优惠券下发（需要在支付之前发）
// const data = {
//   parkKey: '5ehfsqw5',
//   carNo: '桂A39770',
//   couponsolutionNo: '7D3C6B1D57118F3',
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }



// ------------场内支付场景-------------
// 根据车牌查询金额和入场时间
// const data = {
//   parkKey: '5ehfsqw5',
//   carNo: '桂C51F85',
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }

// 临停车支付订单
// const data = {
//   parkKey: '5ehfsqw5',
//   orderNo: '20201111085622463-C51F85',
//   orderAmount: '5.00',
//   payScene: 1,
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }

// 订单支付回调
const data = {
  parkKey: '5ehfsqw5',
  payOrderNo: 'OT2020111110102931180045ehfsqw5',
  payedSN: '202011111011000001',
  payedMoney: '1.00',
  version: 'v1.0',
  appid: 'ym75ddd8b420aebcd7',
  rand: `${Math.random()}`
}

// ------------车道支付场景-------------

// 获取车道车辆信息详情
// const data = {
//   parkKey: '5ehfsqw5',
//   ctrlNo: 2,
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }

// 临停车支付订单
// const data = {
//   parkKey: '5ehfsqw5',
//   orderNo: '20201012160747227-BDV956',
//   orderAmount: '2.00',
//   payScene: 2,
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }

// 出口缴费开闸
// const data = {
//   parkKey: '5ehfsqw5',
//   ctrlNo: 2,
//   payOrderNo: 'OT202010121733162001866m6s3qnb9',
//   payedMoney: '2.00',
//   payedSN: '202010121200000002',
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }



// -------------无牌车场景--------------

// 创建无牌车入场订单
// const data = {
//   parkKey: '5ehfsqw5',
//   ctrlNo: 1,
//   carNo: 'UJC91TYN',
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }


// 根据车牌查询金额和入场时间
// const data = {
//   parkKey: '5ehfsqw5',
//   orderNo: '20201013090005166-UJC91TYN',
//   carTypeNo: '3651',
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }


// 临停车支付订单
// const data = {
//   parkKey: '5ehfsqw5',
//   orderNo: '20201013090005166-UJC91TYN',
//   orderAmount: '1.00',
//   payScene: 2,
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }


// 出口缴费开闸
// const data = {
//   parkKey: '5ehfsqw5',
//   ctrlNo: 2,
//   payOrderNo: 'OT202010130910541726031m6s3qnb9',
//   payedMoney: '1.00',
//   payedSN: '202010121200000003',
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }


// -------------远程开关闸--------------
// const data = {
//   parkKey: '5ehfsqw5',
//   vlCtrNo: 4,
//   version: 'v1.0',
//   appid: 'ym75ddd8b420aebcd7',
//   rand: `${Math.random()}`
// }


// console.log(data)


// 生成一个 key 为小写的新对象
const lowData = {}
for (const key in data) {
  const item = data[key]
  // key全转小写
  const low_key = key.toLocaleLowerCase()
  lowData[low_key] = item
}

// key 全部小写后再做排序。不转小写，排序会乱，如 O 在 e 之前
const data_sorted = {}
Object.keys(lowData).sort().forEach((key) => {
  data_sorted[key] = lowData[key]
})
// console.log(data_sorted)

// 还原数据
const data_restore = []
for (const key in data_sorted) {
  for (const ogKey in data) {
    if (key === ogKey.toLocaleLowerCase()) {
      data_restore.push(`${ogKey}=${data[ogKey]}`)
    }
  }
}
// console.log(data_restore)

const noSignURL = data_restore.join('&') + `&${appSecret}`
console.log(noSignURL)

// 签名
// const signStr = 'E4A3131663C4A46CD64E85E050D1B824'
const signStr = CryptoJS.MD5(noSignURL).toString().toLocaleUpperCase()
console.log(`\nsign=${signStr}\n`)

// 把签名加入对象
data.sign = signStr
// console.log(`\nsend_data = ${JSON.stringify(data)} \n`)

// 发送请求
superagent
  // .post('http://openapi.ymiot.net/Api/Inform/CarNoCoupon') // 优惠券下发

  // .post('http://openapi.ymiot.net/Api/Inquire/GetCarNoOrderFee') // 根据车牌查询金额和入场时间
  // .post('http://openapi.ymiot.net/Api/Inform/OrderPayCreate') // 创建临停车支付订单
  .post('http://openapi.ymiot.net/Api/Inform/PayNotify') // 订单支付回调

  // .post('http://openapi.ymiot.net/Api/Inquire/GetVehicleCarInfo') // 获取车道车辆信息详情
  // .post('http://openapi.ymiot.net/Api/Inform/OrderPayCreate') // 创建临停车支付订单
  // .post('http://openapi.ymiot.net/Api/Inform/UnVehicleOut') // 出口缴费开闸

  // .post('http://openapi.ymiot.net/Api/Inform/UnVehicleEnter') // 创建无牌车入场订单
  // .post('http://openapi.ymiot.net/Api/Inquire/GetOrderFee') // 根据无牌车号码查询金额和入场时间
  // .post('http://openapi.ymiot.net/Api/Inform/OrderPayCreate') // 创建临停车支付订单
  // .post('http://openapi.ymiot.net/Api/Inform/UnVehicleOut') // 出口缴费开闸

  // .post('http://openapi.ymiot.net/Api/Inform/OpenGate') // 远程开闸
  // .post('http://openapi.ymiot.net/Api/Inform/CloseGate') // 远程关闸

  .set('Content-Type', 'application/json')
  .send(data)
  .end((err, res) => {
    const res_text = JSON.parse(res.text)
    console.log('res text = ', res_text)
    console.log(`err = ${err}`)
  })
