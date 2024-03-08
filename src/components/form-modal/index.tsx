import React, { FC, Fragment } from 'react'
import { Drawer, Button, DrawerProps, Spin, Progress } from 'antd'

import styles from './index.less'
import { LoadingOutlined } from '@ant-design/icons'
import { isBoolean } from '@/utils/judge-type'

interface ProgressInfoProps {
    uploading: boolean | undefined
    isPreparing?: undefined | boolean
    checkPercent: number
}
type FormModalProps = DrawerProps & {
    onOk?: anyFunction // 提交
    onCancel: anyFunction // 取消
    okLoading?: boolean // 提交的loading
    cancelLoading?: boolean // 取消的loading
    okLoadingText?: string
    onOkText?: string
    visible: boolean
    noCancle?: any
    okDisabled?: boolean
    // footerExtra?: React.ReactElement | undefined
    progressInfo?: ProgressInfoProps
    bodyStyle?: any
}

const FormModal: FC<FormModalProps> = (props) => {
    const {
        children,
        okLoading = false,
        cancelLoading = false,
        onCancel,
        onOk,
        onOkText,
        okLoadingText,
        visible,
        noCancle,
        okDisabled,
        // footerExtra,
        progressInfo,
        footer,
        bodyStyle = {},
        ...modalRest
    } = props
    const { uploading, isPreparing, checkPercent } = progressInfo || {}
    const defaultOkText = onOkText || '确认'

    const footerDom = (
        <div className={styles['footer-wrapper']}>
            {footer || (
                <div className={styles['footer-btn']}>
                    {!noCancle && (
                        <Button style={{ marginRight: 24 }} onClick={onCancel} loading={cancelLoading}>
                            取消
                        </Button>
                    )}
                    <Button type="primary" onClick={onOk} loading={okLoading} disabled={okDisabled}>
                        {okLoading ? okLoadingText || defaultOkText : defaultOkText}
                    </Button>
                </div>
            )}

            {uploading ? (
                <div className={styles['footer-extra']}>
                    <Spin spinning={isPreparing} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="文件上传准备中...">
                        <div className={styles['progress-wrapper']}>
                            <Progress
                                showInfo={false}
                                strokeColor={{
                                    from: '#87B5F2',
                                    to: '#0972FE'
                                }}
                                percent={checkPercent}
                                status="active"
                            />
                            <div className={styles['progress-info']}>{isPreparing ? '' : `文件上传中：${checkPercent}%`}</div>
                        </div>
                    </Spin>
                </div>
            ) : (
                <Fragment />
            )}
        </div>
    )

    return (
        <Drawer
            bodyStyle={{ padding: '24px 16px', ...bodyStyle }}
            maskClosable={false}
            onClose={onCancel}
            footer={isBoolean(footer) && !footer ? footer : footerDom}
            visible={visible}
            {...modalRest}
            destroyOnClose={true}
        >
            <Fragment>{children}</Fragment>
        </Drawer>
    )
}

export default FormModal
