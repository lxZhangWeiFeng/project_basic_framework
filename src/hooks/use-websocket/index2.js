/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-console */
import isDev from '@/utils/isDev'
import React, { useEffect, useRef, useState } from 'react'
import { getToken } from '@/utils/authority'
import { proxy } from '@webpack/proxy'

// 发送心跳时间
const HeartBeatTime = 20000
// 发送心跳完接收对方心跳时间
const HeartBeatCallBackTime = 5000
// 判断连接出问题，重连时间
const reConnectTime = 2000
// 最大重连次数
const maxReContentTimes = 5

export default ({ url }) => (WrappedComponent) => {
    const SetWebsocket = (props) => {
        const { params = {} } = props
        const [data, setData] = useState({})
        // 重连次数
        const [connectTimes, setConnectTimes] = useState(0)
        const [websocket, setwebsocket] = useState(null)
        const heartbeatTimeout = useRef(null)
        const closewsTimeout = useRef(null)
        const reConnectTimeout = useRef(null)
        const host = isDev ? proxy.replace('https://', '') : `${window.location.host}`
        // 创建websocket
        const newWebSocket = () => {
            // 判断当前浏览器是否支持WebSocket
            if ('WebSocket' in window) {
                setwebsocket(new WebSocket(`wss://${host}${url}?token=${getToken()}`))
            } else {
                console.warn('当前浏览器不支持WebSocket')
            }
        }

        // 清除心跳
        const clearHeart = () => {
            clearTimeout(heartbeatTimeout.current)
            clearTimeout(closewsTimeout.current)
        }

        // 初始化websocket
        const iniWebSocket = () => {
            if (websocket) {
                // 发送心跳
                const sendHeart = () => {
                    heartbeatTimeout.current = setTimeout(() => {
                        // 判断websocket处于open状态
                        if (websocket.readyState === 1) {
                            websocket?.send('HeartBeat')
                        }
                        // 心跳没有回应
                        closewsTimeout.current = setTimeout(() => {
                            websocket?.close(4999)
                        }, HeartBeatCallBackTime)
                    }, HeartBeatTime)
                }

                // 连接成功建立的回调方法
                websocket.onopen = () => {
                    // 判断websocket处于open状态
                    if (websocket.readyState === 1) {
                        websocket?.send(JSON.stringify({ ...params }))
                    }
                    sendHeart()
                }

                // 接收到消息的回调方法
                websocket.onmessage = (event) => {
                    if (event.data !== 'HeartBeat') {
                        setData(JSON.parse(event.data))
                    }

                    clearHeart()
                    sendHeart()
                }

                // 连接关闭的回调方法
                websocket.onclose = (e) => {
                    if (e.code === 1003 || e.code === 4999) {
                        // 1003表示token过期
                        // 4999表示主动断开
                        clearHeart()
                    } else if (connectTimes < maxReContentTimes) {
                        clearTimeout(reConnectTimeout.current)
                        reConnectTimeout.current = setTimeout(() => {
                            setConnectTimes(connectTimes + 1)
                            newWebSocket()
                        }, reConnectTime)
                    }
                }

                // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = () => {
                    websocket?.close(4999)
                }
            }
        }

        useEffect(() => {
            // 创建
            newWebSocket()
        }, [])

        useEffect(() => {
            if (websocket !== null) {
                iniWebSocket()
            }

            return () => {
                clearTimeout(reConnectTimeout.current)
                websocket?.close(4999)
            }
        }, [websocket])

        // 手动推送参数 websocket存在的时候说明链接建立完成
        const sendParams = (sendData) => {
            if (websocket) {
                let strParams

                if (typeof sendData === 'string') {
                    strParams = sendData
                } else {
                    strParams = JSON.stringify(sendData)
                }

                // 判断websocket处于open状态
                if (websocket.readyState === 1) {
                    websocket.send(strParams)
                }
            } else {
                console.warn('websocket暂未链接成功，参数暂时无法send')
            }
        }

        return <WrappedComponent {...props} sendParams={sendParams} data={data} />
    }

    return SetWebsocket
}
