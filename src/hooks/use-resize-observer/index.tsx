/* eslint-disable no-unused-vars */
import ResizeObserver from 'resize-observer-polyfill'
import { CSSProperties, useEffect, useState } from 'react'

type fun = (target: HTMLElement | null, depend?: any[]) => [CSSProperties]

const useResizeObserver: fun = (target, depend = []) => {
    const [style, setStyle] = useState<CSSProperties>({})

    // 监测元素高宽
    useEffect(() => {
        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                setStyle({
                    height: entry.contentRect.height,
                    width: entry.contentRect.width
                })
            })
        }

        const observer = new ResizeObserver(callback)

        if (target && target !== null) {
            observer.observe(target)
        }

        return () => {
            observer.disconnect()
        }
    }, [...depend, target])

    return [style]
}

export default useResizeObserver
