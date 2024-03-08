/**
 * @description 管理localStorage的一些数据 token userName 等等
 */

import { AES, SEA } from './aes'
import CryptoJS from 'crypto-js'

// 模板函数

const templateRemove = (key: string) => (): void => {
    window.localStorage.removeItem(key)
}

const templateGet = (key: string, defaultRes: any) => (): string => {
    const res = window.localStorage.getItem(key)
    return res ? SEA(res) : defaultRes
}

const templateSet = (key: string) => (innerStr: string): void => {
    window.localStorage.setItem(key, AES(innerStr))
}

// 清除全部

export const clear = (): void => window.localStorage.clear()

// 管理token

const tokenKey = CryptoJS.SHA256('token').toString()

export const getToken = templateGet(tokenKey, null)

export const setToken = templateSet(tokenKey)

export const removeToken = templateRemove(tokenKey)
