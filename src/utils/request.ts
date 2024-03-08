/**
 * @description 请求方法
 */

import qs from 'qs'
import { message } from 'antd'
import { isArray, isFunction, isNumber, isObject, isString, isBoolean, isFormData } from './judge-type'
import { getToken } from '@/utils/local-info'
// import { debounce as D, throttle as T } from '@/utils/utils'
import H from 'history'

interface Options extends RequestInit {
    token?: boolean // 是否需要token
    body?: any // 重写body格式
    file?: boolean // 文件
    debounce?: number // 防抖
    throttle?: number // 节流
    formData?: boolean // 是否是 formData
    noAppend?: boolean // formData模式下生效，是否需要new formData
}

const timeout: anyObject = {}

type successParams = string | (() => string)

// 格式化 get 请求的body
const formatGetBody = (body: anyObject): anyObject => {
    const newBody: anyObject = {}

    Object.entries(body).forEach(([k, v]) => {
        if (isArray(v)) {
            newBody[k] = v.join(',')
        } else if (isObject(v)) {
            newBody[k] = formatGetBody(v)
        } else if ((v && isString(v)) || isNumber(v) || isBoolean(v)) {
            newBody[k] = v
        }
    })
    return newBody
}

const formDataBody = (body: anyObject, noAppend?: boolean) => {
    if (noAppend) {
        return body
    }
    const FD = new FormData()
    isObject(body) &&
        Object.entries(body).forEach(([k, v]) => {
            if (isNumber(v) || isBoolean(v) || v) {
                // 排除 undefined|null|NAN|''
                FD.append(k, v)
            }
        })
    return FD
}

const request = (method: RequestInit['method']) => {
    return (url: RequestInfo, options?: Options, successText?: successParams): Promise<any> => {
        const { body, file, debounce, throttle, token = true, formData, noAppend, signal, ...otherOptions } = options || {}

        return new Promise((resolve, reject) => {
            let requestTimeout: any
            let routeControl: any

            const rejectError = (e: Error): void => {
                reject({ errorMessage: e.name === 'Error' ? e.message : '', routeControl })
            }

            const throwError = (e: string): void => {
                throw new Error(e)
            }

            // 验证http的status
            const checkResponseStatus = (response: Response): Response => {
                const { status } = response
                if (status === 504) {
                    message.error('Gateway TimeOut')
                    return response
                }
                const statusNumber = Math.floor(status / 100)
                switch (statusNumber) {
                    case 5: {
                        routeControl = (h: H.History): void => h.replace(`/error/${status}`)
                        break
                    }
                    case 4: {
                        routeControl = (h: H.History): void => h.replace(`/error/${status}`)
                        break
                    }
                    case 3: {
                        break
                    }
                    case 2: {
                        return response
                    }
                    case 1: {
                        break
                    }
                    default: {
                        throwError('未知错误')
                        break
                    }
                }
                return response
            }

            // 返回结果
            const handleResult = async (response: Response) => {
                if (file) {
                    // 必须确保response headers下content-disposition字段的filename格式正确（filename="文件名.扩展名"），否则导出文件会有问题
                    const match = /filename="(.*)"/gi.exec(response.headers.get('content-disposition') || '')
                    // 有匹配文件名时
                    if (match !== null) {
                        return { status: 200, data: { content: await response.blob(), filename: match !== null ? decodeURI(match[1]) : null } }
                    }

                    return response.json()
                } else {
                    return response.json()
                }
            }

            // 验证返回值status
            const checkDataStatus = (result: any): void => {
                const res = isObject(result) ? result : {}
                const { status, data, error } = res

                switch (status) {
                    case 200: {
                        const res = isBoolean(data) ? data : data || {}
                        // 成功的使用前端定义，错误走后端定义
                        if (successText) {
                            if (isFunction(successText)) {
                                message.success((successText as Function)(res))
                            } else {
                                message.success(successText)
                            }
                        }
                        resolve(res)
                        break
                    }
                    case 401:
                    case 1012: {
                        routeControl = (h: H.History): void => h.replace('/login')
                        throwError(error || '未授权')
                        break
                    }
                    case 403: {
                        throwError(error || '访问被禁止')
                        break
                    }
                    case 500: {
                        throwError(error || '系统内部错误')
                        break
                    }
                    case 1000: {
                        throwError(error || '验证码错误')
                        break
                    }
                    case 1001: {
                        throwError(error || '账号或密码错误')
                        break
                    }
                    case 1002: {
                        throwError(error || '资源已存在')
                        break
                    }
                    case 1003: {
                        throwError(error || '缺少必要资源')
                        break
                    }
                    case 1004: {
                        throwError(error || '无法操作被保护的资源')
                        break
                    }
                    default: {
                        throwError(error || '未知错误')
                        break
                    }
                }
            }

            // 发送http请求
            const sendHttpRequest = (): void => {
                // format get 请求的 url
                const trueUrl =
                    method === 'GET' && isObject(body) && Object.keys(body).length > 0 ? `${url}?${qs.stringify(formatGetBody(body))}` : url
                // format body
                const trueBody =
                    method !== 'GET' && ((isObject(body) && Object.keys(body).length > 0) || isArray(body) || (isFormData(body) && noAppend))
                        ? formData
                            ? formDataBody(body, noAppend)
                            : JSON.stringify(body)
                        : null

                // 超时设定50s
                // requestTimeout = setTimeout(() => {
                //     rejectError(new Error('请求超时'))
                // }, 50000)

                // const clearRequestTimeout = (res: Response) => {
                //     clearTimeout(requestTimeout)
                //     return res
                // }
                fetch(trueUrl, {
                    method,
                    body: trueBody,
                    credentials: 'include',
                    headers: {
                        'Cache-Control': 'no-store',
                        Pragma: 'no-cache',
                        Accept: 'application/json',
                        ...(formData ? {} : { 'Content-Type': 'application/json; charset=utf-8' }),
                        ...(otherOptions?.headers || {}),
                        ...(token && getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
                    },
                    signal: signal,
                    ...otherOptions
                })
                    // .then(clearRequestTimeout)
                    .then(checkResponseStatus)
                    .then(handleResult)
                    .then(checkDataStatus)
                    .catch(rejectError)
            }

            if (isNumber(debounce)) {
                // 防抖
                const key = `${url}+${method}`
                clearTimeout(timeout[key])
                timeout[key] = setTimeout(() => {
                    sendHttpRequest()
                }, debounce)
            } else if (isNumber(throttle)) {
                // 节流
                const key = `${url}+${method}`
                if (!isBoolean(timeout[key]) || timeout[key] === true) {
                    timeout[key] = false
                    sendHttpRequest()
                    setTimeout(() => {
                        timeout[key] = true
                    }, throttle)
                }
            } else {
                sendHttpRequest()
            }
        })
    }
}

request.get = request('GET')
request.post = request('POST')
request.delete = request('DELETE')
request.put = request('PUT')

export default request
