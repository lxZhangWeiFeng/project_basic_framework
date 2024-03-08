import React, { CSSProperties, FC, useState, useEffect } from 'react'
import { Badge, Popover, notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { InfoCircleFilled } from '@ant-design/icons'

import { goRouter as handleLink, getmessage } from './utils'

import Icon from '@/components/icon'
import NotifyList from './notifyList'

import styles from './index.less'

interface NotifyProps {
    style?: CSSProperties
    count: number
    addInfo?: anyObject
}

const Notify: FC<NotifyProps> = ({ style, count, addInfo }) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const dictData = dict['notifierTag']
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch<any>()
    notification.config({
        maxCount: 3
    })

    const history = useHistory()

    const onVisibleChange = (v: boolean) => {
        setVisible(v)
    }

    const goRouter = (data: any) => {
        handleLink(data, dispatch, history)
    }

    useEffect(() => {
        if (addInfo) {
            const { notifyByName, notifyMessage, notifyTag, targetType, id } = addInfo
            const color = dictData[notifyTag]?.color
            const message = getmessage({ notifyByName, notifyMessage, targetType })
            notification.open({
                message: '消息提醒',
                top: 48,
                onClick: () => {
                    dispatch({
                        type: 'notify/lookOverNotifier',
                        payload: {
                            id
                        }
                    }).then(() => {
                        goRouter(addInfo)
                    })
                },
                description: message,
                icon: <InfoCircleFilled style={{ color }} />,
                className: styles['notification'],
                style: {
                    background: `linear-gradient(268deg, ${color} 0%, #F5F0F0 100%)`
                }
            })
        }
    }, [JSON.stringify(addInfo)])

    return (
        <Popover
            placement="bottomRight"
            trigger="click"
            // className={styles['reset-popover']}
            overlayClassName={styles['reset-popover']}
            content={<NotifyList visible={visible} getmessage={getmessage} goRouter={goRouter} history={history} onVisibleChange={onVisibleChange} />}
            onVisibleChange={onVisibleChange}
            visible={visible}
        >
            <div style={style} className={styles['wrapper']}>
                {count ? (
                    <Badge count={count} size="small">
                        <Icon name="news" size={28} color="rgba(0, 0, 0, 0.9)" />
                    </Badge>
                ) : (
                    <Icon name="news" size={28} color="rgba(0, 0, 0, 0.9)" />
                )}
            </div>
        </Popover>
    )
}

export default Notify
