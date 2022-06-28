const forge = require('node-forge');

// 原始加密字串
const input = forge.util.createBuffer('123456', 'utf8'); // 加密原始串
const key = '0000000000000000'; // 加密密钥
const iv = '1111111111111111'; // 偏移量

// 加密过程 encrypt
const cipher = forge.cipher.createCipher('AES-CBC', key);
cipher.start({iv: iv});
cipher.update(input);
cipher.finish();

// ciphertextHex 存入DB
const cipherHex = forge.util.bytesToHex(cipher.output.getBytes());
console.log(`\n\x1b[32m----- 加密后的Hex = ${cipherHex} -----\n`);

// 从 DB 中取出加密后 Hex 字串
const ciphertext = forge.util.hexToBytes(cipherHex);

// 解密
const deinput = forge.util.createBuffer(ciphertext);
const decipher = forge.cipher.createDecipher('AES-CBC', key);
decipher.start({iv: iv});
decipher.update(deinput);
const decrypted = decipher.finish(); // 校验 decrypted 是 True | False

console.log(`\n\x1b[32m----- 解密校验结果 = ${decrypted} -----\n`);
