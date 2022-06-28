const ursa = require('ursa')
const fs = require('fs')

// 用RSA对字符串进行加密, 该示例的钥匙对(KeyPair)是外部已经生成好的

const keyText = '道德良心做食品'
// const keyTextFromFile = rs.readFileSync(__dirname + '/cipher.txt')

const privateKey = ursa.createPrivateKey(fs.readFileSync(__dirname + '/private.pem'))
const publicKey = ursa.createPublicKey(fs.readFileSync(__dirname + '/public.pub'))

// 用公钥加密数据
const encrypted = publicKey.encrypt(keyText, 'utf8', 'base64')

console.log(`\n----- 加密后的数据： = ${encrypted} -----\n`)


// 用私钥解密数据
const decrypted = privateKey.decrypt(encrypted, 'base64', 'utf8')

console.log(`\n----- 解密后的数据： = ${decrypted} -----\n`)
