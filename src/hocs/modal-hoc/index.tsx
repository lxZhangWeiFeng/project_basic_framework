/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderModal from '@/hocs/modal-hoc/render-modal'
import { modalClose } from '@/utils/modal'
import { Form, FormInstance } from 'antd'

type loading = { effects: Record<string, boolean> }

export type formModalProps = {
    callback: anyFunction
    info: Record<string, any>
    visible: boolean
    loading: loading
    form: FormInstance
    [pro: string]: any
}

type Fun<T> = (Outer: FC<formModalProps & T>) => FC<T>

type ModalHocProps = { key: string }

const ModalHoc = <T extends {}>({ key }: ModalHocProps): Fun<T> => (Outer) => {
    const Inner0: FC<T & { visible: boolean; loading: loading; theModal: any }> = (_props) => {
        const { visible, loading, theModal, ...props } = _props
        const { info = {}, callback = () => {} } = theModal
        const [form] = Form.useForm()

        const insertProps = {
            callback,
            info,
            loading,
            form,
            visible
        }

        return (
            <Fragment>
                <Outer {...(props as T)} {...insertProps} />
            </Fragment>
        )
    }

    const Inner1: FC<T> = (props) => {
        const dispatch = useDispatch()
        const { modalState, loading } = useSelector(({ modalState, loading }: any) => ({ modalState, loading }))

        const _theModal = modalState[key] || {}

        const { visible: _visible = false } = _theModal
        const [theModal, setTheModal] = useState(_theModal)
        const [timeKey, setTimeKey] = useState(new Date().valueOf())
        const [visible, setVisible] = useState(false)

        useEffect(() => {
            if (_visible) setTimeKey(new Date().valueOf())
            setTheModal(_theModal)
        }, [_visible])

        useEffect(() => {
            setVisible(_visible)
        }, [theModal])

        useEffect(() => {
            return (): void => {
                modalClose(key)(dispatch)
            }
        }, [])

        return (
            <Fragment>
                <Inner0 key={timeKey} {...props} visible={visible} loading={loading} theModal={theModal} />
            </Fragment>
        )
    }

    const Inner2: FC<T> = (props) => {
        return (
            <RenderModal modalKey={key}>
                <Inner1 {...props} />
            </RenderModal>
        )
    }

    return Inner2
}

export default ModalHoc
