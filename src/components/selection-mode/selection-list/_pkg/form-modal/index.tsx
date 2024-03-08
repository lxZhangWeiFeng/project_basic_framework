import React, { FC } from 'react'
import { Form } from 'antd'
import { useDispatch } from 'react-redux'
import FormModal from '@/components/form-modal'
import FormWarp from '../form'

interface FormModalWarp {
    // type: 'export'
    close: (dispatch: Dispatch, someInfo?: any) => void
    visible: boolean
    info: anyObject
}

const SelectionModal: FC<FormModalWarp> = ({ visible, info, close }) => {
    const [form] = Form.useForm()

    const dispatch = useDispatch()

    return (
        <FormModal visible={visible} onOk={(): void => close(dispatch)} onCancel={(): void => close(dispatch)} width={600} noCancle onOkText="关闭">
            <FormWarp form={form} editData={{ ...info }} />
        </FormModal>
    )
}

export default SelectionModal
