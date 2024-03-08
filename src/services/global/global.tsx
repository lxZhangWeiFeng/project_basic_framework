/**
 * @description 登录后的 全局使用的接口
 */

import request from '@/utils/request'
import { commonApiPrefix, adminApiPrefix, apiPrefix } from '@/services/utils'

/**
 * @description 获取路由
 *
 */

export const getRoutes = (): Promise<any> => {
    return request.get(`${commonApiPrefix}/common/routes`, {}) as Promise<any>
}

/**
 * @description 获取操作权限
 */

export const getHandleAuthority = (): Promise<any> => {
    return request.get(`${commonApiPrefix}/common/info`, {}) as Promise<any>
}

/**
 * @description 获取字典
 */

export const getDict = (body: any): Promise<any> => {
    return request.get(`${adminApiPrefix}/dict`, { body }) as Promise<any>
}

/**
 * @description 下载操作手册
 */

export const downloadOperationManual = (body: any): Promise<any> => {
    return request.get(`${apiPrefix}/download/filePath`, { body }) as Promise<any>
}
