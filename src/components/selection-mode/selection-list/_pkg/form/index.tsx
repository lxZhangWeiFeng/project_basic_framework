import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, message, Button } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
import copy from 'copy-to-clipboard'
import { fileDownload } from '@/utils/utils'
import DictSelect from '@/components/custom-form-item/dict-select'

import styles from './index.less'

interface FormWarpProp {
    form: FormInstance
    editData: any
}

const { Item } = Form
const { TextArea } = Input

const FormWarp: FC<FormWarpProp> = ({ form }) => {
    const dispatch = useDispatch<any>()
    const initialValues = {
        form: 'depManage', // depManage 依赖管理	，config 配置文件
        type: 'Gradle' // Gradle ，Maven
    }

    const [formData, setFormData] = useState(initialValues)
    const [manageText, setManageText] = useState('')

    // const [formData, setFormData] = useState<any>(initialValues)

    // const onValuesChange = (changeV: any, allV: any): void => {
    //     setFormData({ ...allV })
    // }

    const onValuesChange = (v: any, allV: any) => {
        setFormData(allV)
    }

    const downConfig = () => {
        dispatch({
            type: 'selectionMode/exportConfigurationFile',
            payload: {
                type: formData['type']
            }
        }).then((res: any) => {
            const { content, filename } = res
            const file = content
            fileDownload(file, filename)
        })
    }

    useEffect(() => {
        if (formData['form'] === 'depManage') {
            dispatch({
                type: 'selectionMode/getBuildTool',
                payload: {
                    type: formData['type']
                }
            }).then((res: any) => {
                const text = res?.join('\n')
                setManageText(text)
            })
        }
    }, [formData['form'], formData['type']])

    return (
        <Form form={form} layout="vertical" initialValues={initialValues} onValuesChange={onValuesChange}>
            <Form.Item name="form" label="导出形式">
                <DictSelect dictType="selectionExportForm" />
            </Form.Item>
            <Form.Item name="type" label="应用平台">
                <DictSelect dictType="selectionExportPlatform" />
            </Form.Item>

            {formData['form'] === 'depManage' && (
                <Form.Item>
                    <div
                        className={styles['copy-wrapper']}
                        onClick={() => {
                            copy(manageText)
                            message.success('已复制到剪切板！')
                        }}
                    >
                        <Button className={styles['copy-btn']} type="primary">
                            复制
                        </Button>
                        <TextArea value={manageText} readOnly autoSize={{ minRows: 6 }} />
                    </div>
                </Form.Item>
            )}
            {formData['form'] === 'config' && (
                <Form.Item>
                    <Button type="primary" onClick={downConfig}>
                        下载配置文件
                    </Button>
                </Form.Item>
            )}
        </Form>
    )
}

export default FormWarp
