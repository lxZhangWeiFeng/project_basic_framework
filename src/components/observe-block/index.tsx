import React, { FC, useRef, useEffect } from 'react'
import ROP from 'resize-observer-polyfill'
import { isFunction } from '@/utils/judge-type'

type Props = {
    setHeight?: (height: number) => void
    setWidth?: (width: number) => void
}

const ObserveBlock: FC<Props> = ({ children, setHeight, setWidth, ...rest }) => {
    const Ref: any = useRef(null)
    const timeout = useRef<any>(null)
    const timeout2 = useRef<any>(null)

    useEffect(() => {
        let ro: any

        if (Ref.current) {
            ro = new ROP((entries: any) => {
                for (const entry of entries) {
                    const { height, width } = entry.contentRect
                    if (isFunction(setHeight)) timeout.current = setTimeout(() => setHeight(height), 0)
                    if (isFunction(setWidth)) timeout2.current = setTimeout(() => setWidth(width), 0)
                }
            })

            ro.observe(Ref.current)
        }

        return () => {
            clearTimeout(timeout.current)
            clearTimeout(timeout2.current)
            ro?.disconnect()
        }
    }, [])

    return (
        <div ref={Ref} {...rest}>
            {children}
        </div>
    )
}

export default ObserveBlock
