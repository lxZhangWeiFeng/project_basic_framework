import React, { FC } from 'react'
import { Form, Select } from 'antd'
import { FormProps } from 'antd/lib/form'
import { useSelector } from 'react-redux'
import { hiddenArrayChildren } from '@/utils/utils'
import UserSelect from '@/components/custom-form-item/user-select'

const MemberSelect: FC<FormProps> = ({ ...formProps }) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))

    const auth = hiddenArrayChildren({
        arr: Object.values(dict.projectUserAuth),
        hiddenKeys: [1],
        useKey: 'key'
    })

    return (
        <Form layout="vertical" {...formProps} initialValues={{ auth: 3 }}>
            <Form.Item label="应用成员" name="userIds" rules={[{ required: true, message: '应用成员必选' }]}>
                <UserSelect mode="multiple" />
            </Form.Item>
            <Form.Item label="应用权限" name="auth">
                <Select>
                    {auth?.map((list: any) => (
                        <Select.Option key={list.key} value={list.key}>
                            {list.value}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default MemberSelect
