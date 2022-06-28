const ursa = require('ursa')

// 用RSA对字符串进行加密, 该示例的钥匙对(KeyPair)是在代码中直接生成的
const keyText = '道德良心做食品'

const keySizeBits = 1024

const keyPair = ursa.generatePrivateKey(keySizeBits, 65537)

const encrypted = encrypt(keyText, keySizeBits/8)
console.log(`\n----- 加密后的数据： = ${encrypted} -----\n`)

const decrypted = decrypt(encrypted, keySizeBits/8)
console.log(`\n----- 解密后的数据： = ${decrypted} -----\n`)


// RSA加密方法
function encrypt(text, keySizeBytes) {
  const buffer = new Buffer(text)
  const maxBufferSize = keySizeBytes - 42
  let bytesDecrypted = 0
  let encryptedBuffersList = []

  while (bytesDecrypted < buffer.length) {
    const amountToCopy = Math.min(maxBufferSize, buffer.length - bytesDecrypted)
    const tempBuffer = new Buffer(amountToCopy)

    buffer.copy(tempBuffer, 0, bytesDecrypted, bytesDecrypted + amountToCopy)

    const encryptedBuffer = keyPair.encrypt(tempBuffer)
    encryptedBuffersList.push(encryptedBuffer)

    bytesDecrypted += amountToCopy
  }
  return Buffer.concat(encryptedBuffersList).toString('base64')
}


// RSA解密方法
function decrypt(encryptedString, keySizeBytes) {
  const encryptedBuffer = new Buffer(encryptedString, 'base64')
  let decryptedBuffers = []
  const totalBuffers = encryptedBuffer.length / keySizeBytes

  for (let i = 0; i < totalBuffers; i++) {
    const tempBuffer = new Buffer(keySizeBytes)
    encryptedBuffer.copy(tempBuffer, 0, i * keySizeBytes, (i + 1) * keySizeBytes)
    const decryptedBuffer = keyPair.decrypt(tempBuffer)
    decryptedBuffers.push(decryptedBuffer)
  }
  return Buffer.concat(decryptedBuffers).toString()
}
