import { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { message } from 'antd'
import { isFunction, isString } from '@/utils/judge-type'
import { proxyPath } from '@/../webpack/proxy'

const env = process.env.NODE_ENV || 'development'
export const isDev = env === 'development'

type options = { path: string; heart?: boolean; onmessage?: anyFunction; link?: boolean }

// 心跳间隔时间
const heartBeatTime = 5000
// 心跳发送后多久不回应的关闭时间
const closeBeatTime = 10000

const useWebsocket = (ops: string | options): [WebSocket | null] => {
    const heartBeatTimeout = useRef<any>()
    const closeBeatTimeout = useRef<any>()
    const options = isString(ops) ? { path: ops } : ops
    const { path, heart, onmessage: _onmessage, link = true } = options
    const [w, setW] = useState<WebSocket | null>(null)
    const [install, setInstall] = useState(false)

    // 发送心跳
    const sendHeartBeat = (theW: WebSocket) => {
        if (theW.readyState === 1) {
            clearTimeout(heartBeatTimeout.current)
            heartBeatTimeout.current = setTimeout(() => {
                theW.send('HeartBeat')

                // 心跳没有回应
                clearTimeout(closeBeatTimeout.current)
                closeBeatTimeout.current = setTimeout(() => {
                    theW.close()
                }, closeBeatTime)
            }, heartBeatTime)
        }
    }

    useLayoutEffect(() => {
        // 判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            if (link) {
                const newW = new WebSocket(path)

                const onopen = () => {
                    setW(newW)
                    if (isDev) console.log(`[websocket]: ${path} 已连接`)
                }
                const onclose = (e: any) => {
                    console.warn('websocket 断开:', e.code, e.reason, e.wasClean)
                    if (isDev) console.log(`[websocket]: ${path} 已断开`)
                }
                const onerror = () => {
                    if (isDev) console.error(`[websocket]: ${path} ERROR`)
                }

                const onmessage = (e: any) => {
                    if (isFunction(_onmessage)) _onmessage(e)
                }
                if (!heart) {
                    // 无心跳情况
                    newW.onopen = onopen
                    newW.onclose = onclose
                    newW.onerror = onerror
                    newW.onmessage = onmessage
                } else {
                    // 有心跳情况
                    newW.onopen = () => {
                        onopen()
                        if (newW.readyState === 1) sendHeartBeat(newW)
                    }
                    newW.onclose = (e: any) => {
                        onclose(e)
                        clearTimeout(heartBeatTimeout.current)
                        clearTimeout(closeBeatTimeout.current)
                    }
                    newW.onerror = () => {
                        onerror()
                        clearTimeout(heartBeatTimeout.current)
                        clearTimeout(closeBeatTimeout.current)
                    }
                    newW.onmessage = (e) => {
                        if (e.data === 'HeartBeat') {
                            sendHeartBeat(newW)
                        } else {
                            onmessage(e)
                        }
                    }
                }

                setW(newW)

                return () => {
                    newW.close()
                }
            }
        } else {
            message.error('当前浏览器不支持WebSocket')
        }
    }, [path, link])

    useEffect(() => {
        if (w !== null && w?.readyState === 1 && install) {
            const onmessage = (e: any) => {
                if (isFunction(_onmessage)) _onmessage(e)
            }

            if (!heart) {
                w.onmessage = onmessage
            } else {
                w.onmessage = (e) => {
                    if (e.data === 'HeartBeat') {
                        sendHeartBeat(w as WebSocket)
                    } else {
                        onmessage(e)
                    }
                }
            }
        }
    }, [_onmessage, w?.readyState, install])

    useEffect(() => {
        // 此处解决切换页面后websocket的readyState不能获取到1的情况
        setTimeout(() => {
            setInstall(true)
        }, 200) //

        return () => {
            setInstall(false)
        }
    }, [])
    return [w]
}

export const handleProxyPath = (path: string) => {
    return path.replace(/(https{0,1}:\/\/|:.+$)/g, '')
}

export const getProxyPath = (path: string) => {
    let newProxyPath = `wss:${handleProxyPath(proxyPath)}:10000/ws/`
    // let newProxyPath = `ws:${handleProxyPath(proxyPath)}:26300/ws/`
    if (!isDev) {
        newProxyPath = `wss:${window.location.host}/ws/`
    }
    return `${newProxyPath}${path}`
}
export const getProxyPathNoWs = (path: string) => {
    let newProxyPath = `wss:${handleProxyPath(proxyPath)}:10000/`
    // let newProxyPath = `ws:${handleProxyPath(proxyPath)}:26300/ws/`
    if (!isDev) {
        newProxyPath = `wss:${window.location.host}/`
    }
    return `${newProxyPath}${path}`
}

export default useWebsocket
