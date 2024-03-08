import React, { Fragment, FC, useState } from 'react'

import { Form, Divider, Button } from 'antd'
import { FormProps } from 'antd/lib/form/Form'

interface FormAndButton {
    footer?: React.ReactElement // 自定义操作按钮
    okText?: string
    onOk?: () => void
    loading?: boolean
    cancelText?: string
    onCancel?: () => void
    onValuesChange?: Function
}

const FormAndButton: FC<FormAndButton & FormProps> = ({
    children,
    footer,
    okText = '保存',
    onOk,
    onCancel,
    cancelText,
    onValuesChange,
    loading,
    ...props
}) => {
    const [status, setStatus] = useState(false)
    return (
        <Fragment>
            <Form
                onValuesChange={(_: any, v: any): any => {
                    setStatus(true)
                    if (typeof onValuesChange === 'function') {
                        onValuesChange(_, v)
                    }
                }}
                {...props}
            >
                {children}
            </Form>
            {status && (
                <Fragment>
                    <Divider />
                    {footer || (
                        <div>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={(): void => {
                                    if (typeof onOk === 'function') {
                                        onOk()
                                    }
                                }}
                            >
                                {okText}
                            </Button>
                            {cancelText && (
                                <Button
                                    onClick={(): void => {
                                        if (typeof onCancel === 'function') {
                                            onCancel()
                                        }
                                    }}
                                    style={{ marginLeft: 24 }}
                                >
                                    {cancelText}
                                </Button>
                            )}
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default FormAndButton
