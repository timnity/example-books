const crypto = require('crypto')

const algorithm = 'des'
// const algorithm = 'des3'
const text = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDC6Uiqg63UsUByt2QU+vz5DyHf0aLA9+aKtULcchlgtWQuI5dmlJdSIqTDHSTnV9+Hk/of/NirFPZkaLlxe+9XiT6P/OQK2mItREGcEvadIN9ZeqLUF0DhfOVbULTek1S6AlNBwq31MSTFymSq7DCGMSvUy9cc+1YyKmgZTOmLiwIDAQAB-----END PUBLIC KEY-----'
const key = ''

// 加上电子合约编号和日期
const resultText = text + '9021200101' + '20171012'
// console.log(`\n----- crypto.getCiphers() = ${crypto.getCiphers()} -----\n`)

// DES 加密
function encrypt (text, key) {
  const cipher = crypto.createCipher(algorithm, key)
  let crypted = cipher.update(text, 'uft8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

// DES 解密
function decrypt (text, key) {
  const decipher = crypto.createDecipher(algorithm, key)
  let decrypted = decipher.update(text, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

const encryptText = encrypt(resultText, key)
console.log(`\n----- 加密后的数据： = ${encryptText} -----\n`)

const decryptText = decrypt(encryptText, key)
console.log(`\n----- 解密后的数据： = ${decryptText} -----\n`)
