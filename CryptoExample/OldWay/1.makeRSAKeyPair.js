const fs = require('fs')
const ursa = require('ursa')

const keySizeBits = 1024
const key = ursa.generatePrivateKey(keySizeBits, 65537)

const privatePem = ursa.createPrivateKey(key.toPrivatePem())
const privateKey = privatePem.toPrivatePem('utf8')

fs.writeFile('private.pem', privateKey, 'utf8', function(error) {
  if(error) {throw error}
  console.log('\n----- 私钥已经保存 -----\n')
  console.log(`\n----- privateKey = ${privateKey} -----\n`)
})


const publicPem = ursa.createPublicKey(key.toPublicPem())
const publicKey = publicPem.toPublicPem('utf8')
fs.writeFile('public.pub', publicKey, 'utf8', function(error) {
  if(error) {throw error}
  console.log('\n----- 公钥已经保存 -----\n')
  console.log(`\n----- publicKey = ${publicKey} -----\n`)
})
