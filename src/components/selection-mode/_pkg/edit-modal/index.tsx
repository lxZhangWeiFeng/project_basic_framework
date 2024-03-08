import React, { FC } from 'react'
import { modalOpen, modalClose } from '@/utils/modal'
import FormModal from '../form-modal'
import ModalHoc, { formModalProps } from '@/hocs/modal-hoc'

const key = 'editSelectionMode'

export const open = modalOpen(key)

export const close = modalClose(key)

const EditModal: FC<formModalProps & { payload: anyObject }> = (props) => {
    return <FormModal close={close} type="edit" {...props} />
}

export default ModalHoc<{ payload: anyObject }>({ key })(EditModal)
