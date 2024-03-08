/**
 * @description 加密方法
 */

import CryptoJS from 'crypto-js'

const defaultKey = '1947ABCD1947ABCD'
export const loginKey = '1926MNVB1947POTU'

// maven 加密key
export const MAVEN_PASSWORD_KEY = '2022LKJH2202LKJH'

// 第三方集成key
export const Git_PASSWORD_KEY = '2022GITS2202GITS'

//加密方法aes
export const AES = (word: string, key = defaultKey): string => {
    const sKey = CryptoJS.enc.Utf8.parse(key)
    const sContent = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(sContent, sKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
}

//解密方法aes
export const SEA = (word: string, key = defaultKey): string => {
    const sKey = CryptoJS.enc.Utf8.parse(key)
    const decrypt = CryptoJS.AES.decrypt(word, sKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
