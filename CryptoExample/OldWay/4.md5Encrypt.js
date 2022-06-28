const crypto = require('crypto')

// 生成MD5
const md5 = crypto.createHash('md5')

const md5Result = md5.update('iganxu.cn', 'utf8').digest('hex')

console.log(`\n----- md5Result = ${md5Result} -----\n`)
