import React, { FC, useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { useWebsocket } from '@/hooks'
import { getProxyPath } from '@/hooks/use-websocket'
import UserCenter from './user-center'
import Menu from './menu'
import Notify from './notify'
import styles from './index.less'
import classNames from 'classnames'
import BreadCrumb from './bread-crumb'
import OperationManual from './operation-manual'

import cnnvdPng from '@/assets/basic-layout/CNNVD.png'

// 基础的layout，负责构建基本框架
const BasicLayout: FC<{ childList: any[]; allList: any[] }> = ({ children, childList }) => {
    const { userId } = useSelector(({ global }: any) => ({ dict: global.dict, userId: global.handleAuthority?.userInfo?.userId }))

    const [hiddenMenu, setHiddenMenu] = useState(false)
    const [count, setCount] = useState(0)
    const [addInfo, setAddInfo] = useState<any>(false)
    const [w] = useWebsocket({
        // link: !!id,
        path: getProxyPath(`notifier?userId=${userId}`),
        heart: true,
        onmessage: (e) => {
            try {
                const { type, count, ...props } = JSON.parse(e.data)
                if (type === 'notification') {
                    // 当为推送消息的时候
                    setAddInfo(props)
                    setCount(count)
                }
                if (type === 'count') {
                    // 只推送数量
                    setCount(count)
                    setAddInfo(false)
                }
            } catch (e) {
                console.error(e)
            }
        }
    })

    useEffect(() => {
        if (w !== null && w?.readyState === 1) {
            w.send('{}')
        }
    }, [w?.readyState])

    return (
        <div className={classNames(styles['basic-layout'], { [styles['hidden']]: hiddenMenu })}>
            <div className={styles['left-menu']}>
                <Menu childList={childList} hiddenMenu={hiddenMenu} changeHiddenMenu={() => setHiddenMenu(!hiddenMenu)} />
            </div>
            <div className={styles['right-content']}>
                <div className={styles['top-bar']}>
                    <div className={styles['compatible-box']}>
                        <img src={cnnvdPng} alt="cnnvd" />
                    </div>
                    <Tooltip title="操作手册下载">
                        <span>
                            <OperationManual />
                        </span>
                    </Tooltip>
                    <Notify style={{ marginRight: 16 }} count={count} addInfo={addInfo} />

                    <UserCenter childList={childList} />
                </div>
                <BreadCrumb childList={childList} />
                <div className={styles['child']} id="scroll-root">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BasicLayout
