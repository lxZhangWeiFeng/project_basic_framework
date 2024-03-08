import React, { FC } from 'react'
import { Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import FormModal from '@/components/form-modal'
import FormWarp from '../form'

interface FormModalWarp {
    type: 'add' | 'edit'
    close: (dispatch: Dispatch, someInfo?: any) => void
    visible: boolean
    info: anyObject
    loading: anyObject
}

const SelectionModal: FC<FormModalWarp> = ({ visible, info, close }) => {
    const { isSelectionMode, precision } = useSelector(({ selectionMode, knowledge }: any) => ({
        isSelectionMode: selectionMode?.isSelectionMode,
        precision: knowledge?.precision
    }))
    const [form] = Form.useForm()

    const dispatch = useDispatch()

    const sendStatePayload = precision // 精准筛选
        ? { packageType: 'Maven' }
        : {
              packageTypes: ['Maven']
          }
    // const sendFormDataStoragePayload = precision // 精准筛选
    //     ? { packageType: 'Maven' }
    //     : {
    //           packageTypesAndCategories: ['Maven']
    //       }

    const onSubmit = () => {
        form.validateFields().then(async (res: any) => {
            await dispatch({
                type: 'selectionMode/saveSelectionModeInfo',
                payload: res
            })

            close(dispatch)

            dispatch({
                type: 'knowledge/setState', // 列表参数设置
                payload: {
                    component: { ...sendStatePayload, precision }
                }
            })
            dispatch({
                // 进入搜索模式
                type: 'knowledge/setSearchedStatus',
                payload: true
            })

            if (!isSelectionMode) {
                dispatch({
                    type: 'selectionMode/changeSelectMode',
                    payload: {
                        isSelectionMode: true
                    }
                })
            }
        })
    }

    return (
        <FormModal visible={visible} onOk={onSubmit} onCancel={(): void => close(dispatch)} width={600}>
            <FormWarp form={form} editData={{ ...info }} />
        </FormModal>
    )
}

export default SelectionModal
