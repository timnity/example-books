# CryptoExample
公钥、私钥生成及加解密样例

make RSA keypair ： 用于生成rsa公私钥

rsaCrypto with keypair ：直接代码中生成公私钥，并且加解密

rsaCrypto no keypair：使用外部公私钥进行加解密，如第一步make出来的公私钥

desCrypto：用DES来对字符串进行加解密的样例

md5Encrypt：md5是摘要，不可逆的，因此这里主要就是摘要一段字符串