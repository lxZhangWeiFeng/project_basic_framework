import request from '@/utils/request'
import { adminApiPrefix } from '@/services/utils'

/**
 * @description 获取自己的信息
 *
 */

export const getMySelfInfo = (): Promise<any> => {
    return request.get(`${adminApiPrefix}/user/self`) as Promise<any>
}

/**
 * @description 修改自己的信息
 *
 */

export const updateMySelfInfo = (body: any): Promise<any> => {
    return request.put(`${adminApiPrefix}/user/self`, { body }, '修改成功') as Promise<any>
}

/**
 * @description 修改自己的密码
 *
 */

export const updateMySelfPassword = (body: any): Promise<any> => {
    return request.put(`${adminApiPrefix}/user/changeSelfPwd`, { body }, '修改成功，请重新登录') as Promise<any>
}
