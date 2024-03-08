import request from '@/utils/request'
import { adminApiPrefix, authApiPrefix } from '@/services/utils'

type loginBody = {
    code: string
    password: string
    username: string
    uuid: string
}
type loginRes = {
    token: string
}
export const login = (body: loginBody): Promise<loginRes> => {
    return request.post(`${authApiPrefix}/user/login`, { body, token: false }, '登录成功') as Promise<loginRes>
}

/**
 * @description 退出登录接口
 *
 */

export const logout = (message = true): Promise<any> => {
    return request.post(`${authApiPrefix}/user/logout`, {}, message ? '退出登录成功' : '') as Promise<loginRes>
}

/**
 * @description 获取验证码
 *
 */

export const getCaptcha = (body: any): Promise<any> => {
    return request.post(`${adminApiPrefix}/user/captcha`, { body, token: false }) as Promise<any>
}
