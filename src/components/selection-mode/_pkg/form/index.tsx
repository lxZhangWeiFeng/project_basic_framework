import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
import DictSelect from '@/components/custom-form-item/dict-select'
import ContentTitleTooltip from '@/components/content-title-tooltip'

import { versionProperties } from '@/utils/tip-info'

import styles from './index.less'

interface FormWarpProp {
    form: FormInstance
    editData: any
}

const { Item } = Form

const FormWarp: FC<FormWarpProp> = ({ form, editData }) => {
    const initialValues = {
        language: editData?.language || 'Java',
        projectProperty: editData?.projectProperty || 'external',
        projectGroupId: editData?.projectGroupId || '',
        projectArtifactId: editData?.projectArtifactId || '',
        projectVersion: editData?.projectVersion || ''
    }

    // const [formData, setFormData] = useState<any>(initialValues)

    // const onValuesChange = (changeV: any, allV: any): void => {
    //     setFormData({ ...allV })
    // }

    return (
        <Form form={form} layout="vertical" initialValues={initialValues} className={styles['reset-form']}>
            <Form.Item name="language" label="应用语言" rules={[{ required: true, message: '应用语言必选' }]}>
                <DictSelect dictType="selectionModeLanguage" />
            </Form.Item>
            <Form.Item
                name="projectProperty"
                label={
                    <ContentTitleTooltip
                        text="应用属性"
                        content={versionProperties}
                        labelStyle={{ fontSize: 14, fontWeight: 'none', color: 'rgba(0, 0, 0, 0.85)' }}
                        noTextIndent
                    />
                }
                rules={[{ required: true, message: '应用属性必选' }]}
            >
                <DictSelect dictType="projectProperty" />
            </Form.Item>
            <Form.Item label="组ID" extra="工作组的名称，通常是公司域名">
                <Form.Item name="projectGroupId" noStyle>
                    <Input />
                </Form.Item>
            </Form.Item>
            <Form.Item label="工件ID" extra="组内工件的名称，通常是应用名称">
                <Form.Item name="projectArtifactId" noStyle>
                    <Input />
                </Form.Item>
            </Form.Item>
            <Form.Item name="projectVersion" label="版本">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default FormWarp
