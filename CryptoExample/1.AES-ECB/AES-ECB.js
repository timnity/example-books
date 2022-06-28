const forge = require('node-forge');

const input = forge.util.createBuffer('123456', 'utf8'); // 需要加密的字串
const key = '0000000000000000'; // 加密密钥

// 加密过程 encrypt
const cipher = forge.cipher.createCipher('AES-ECB', key);
cipher.start();
cipher.update(forge.util.createBuffer(input));
cipher.finish();

/**
 * 加密后得到的字串一般有两种编码 Hex 和 Text
 * 两种内容可以互转，把任何一种存数据库里都可以
 */
const cipherStr = cipher.output.getBytes();
console.log(`\n\x1b[32m----- 原始的加密串基本看不懂 = ${cipherStr} -----\n`);

const cipherStr_base64 = forge.util.encode64(cipherStr);
console.log(`\n\x1b[32m----- 用 Base64 编码加密串 = ${cipherStr_base64} -----\n`);

const cipherHex = forge.util.bytesToHex(cipherStr);
console.log(`\n\x1b[32m----- 把字串转为 Hex，存 DB 也方便 = ${cipherHex} -----\n`);

const hex2str = forge.util.hexToBytes(cipherHex);
console.log(`\n\x1b[32m----- 把 Hex 转为 Str 也很方便 = ${hex2str} -----\n`);

/**
 * 假设从数据库中取出存储的字串，用于解密
 * Hex 要再 toBytes 一次
 */
const fromDBText = forge.util.createBuffer(cipherStr);
const fromDBHex = forge.util.createBuffer(forge.util.hexToBytes(cipherHex));

const decipher = forge.cipher.createDecipher('AES-ECB', key);
decipher.start();
// decipher.update(fromDBText);
decipher.update(fromDBHex);
const decrypted = decipher.finish(); // 校验 decrypted 是 True | False

console.log(`\n\x1b[32m----- 解密校验结果 = ${decrypted} -----\n`);
