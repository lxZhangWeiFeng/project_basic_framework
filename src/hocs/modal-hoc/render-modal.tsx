import React, { FC, Fragment, useLayoutEffect, useState } from 'react'

type RenderModalProps = {
    modalKey: string
}

const allModals: anyObject = {}

const RenderModal: FC<RenderModalProps> = ({ children, modalKey }) => {
    const [show, setShow] = useState(false)

    useLayoutEffect(() => {
        if (!allModals[modalKey]) {
            allModals[modalKey] = new Date().getTime()
            setShow(true)

            return () => {
                allModals[modalKey] = false
            }
        }
    }, [])

    return <Fragment>{show ? <span onClick={(e) => e.stopPropagation()}>{children}</span> : <Fragment />}</Fragment>
}

export default RenderModal
