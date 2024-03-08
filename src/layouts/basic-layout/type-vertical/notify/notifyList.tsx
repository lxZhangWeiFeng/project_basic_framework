import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Empty, Spin } from 'antd'
import dayjs from 'dayjs'
import DictWrapper from '@/components/dict-wrapper'
import { InfoCircleFilled } from '@ant-design/icons'

import styles from './notifyList.less'

const NotifyList = ({ visible, getmessage, goRouter, history, onVisibleChange }: any) => {
    const { loading } = useSelector(({ loading }: any) => ({
        loading: loading.effects['notify/getNotifierList']
    }))
    const [data, setData] = useState<any>([])
    const dispatch = useDispatch<any>()
    useEffect(() => {
        if (visible) {
            dispatch({
                type: 'notify/getNotifierList',
                payload: { onlyUnLook: true }
            }).then((res) => {
                setData(res?.list)
            })
        }
    }, [visible])

    const handleClick = (data: any) => {
        const { id } = data
        dispatch({
            type: 'notify/lookOverNotifier',
            payload: {
                id
            }
        }).then(() => {
            onVisibleChange(false)
            goRouter(data)
        })
    }
    return (
        <div className={styles['wrapper']}>
            <div className={styles['list-wrapper']}>
                <Spin spinning={loading}>
                    {data?.length ? (
                        data?.map((list: any) => {
                            const { id, notifyByName, notifyMessage, notifyTag, targetType, notifyTime } = list
                            return (
                                <DictWrapper dictName="notifierTag" dictKey={notifyTag || 'blank'} key={id}>
                                    {({ color }) => {
                                        return (
                                            <div key={id} className={styles['item']} onClick={() => handleClick(list)}>
                                                <InfoCircleFilled style={{ color, paddingTop: 6 }} />
                                                <div className={styles['description']} style={{ color }}>
                                                    {getmessage({ notifyByName, notifyMessage, targetType })}
                                                </div>
                                                <div className={styles['time']}>{dayjs(notifyTime).format('YYYY.MM.DD')}</div>
                                            </div>
                                        )
                                    }}
                                </DictWrapper>
                            )
                        })
                    ) : (
                        <Empty description="你已阅完所有通知" />
                    )}
                </Spin>
            </div>

            <Divider />
            <Button
                className={styles['footer']}
                type="primary"
                onClick={() => {
                    onVisibleChange(false)
                    history.push('/notices')
                }}
            >
                查看所有消息
            </Button>
        </div>
    )
}

export default NotifyList
