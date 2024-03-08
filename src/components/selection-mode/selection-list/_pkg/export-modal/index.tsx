import React, { FC } from 'react'
import { modalOpen, modalClose } from '@/utils/modal'
import FormModal from '../form-modal'
import ModalHoc, { formModalProps } from '@/hocs/modal-hoc'

const key = 'exportSelectionMode'

export const open = modalOpen(key)

export const close = modalClose(key)

const AddModal: FC<formModalProps & { payload: anyObject }> = (props) => {
    return <FormModal close={close} type="export" {...props} />
}

export default ModalHoc<{ payload: anyObject }>({ key })(AddModal)
