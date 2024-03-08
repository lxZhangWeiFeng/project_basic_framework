import { useEffect, useRef } from 'react'

export default function useThrottle(fun: anyFunction, time: number) {
    const flag = useRef(true)
    const timeout: any = useRef(null)

    useEffect(() => {
        return () => {
            clearTimeout(timeout.current)
        }
    }, [])

    const resFun = (props: any) => {
        if (flag.current) {
            flag.current = false
            timeout.current = setTimeout(() => {
                flag.current = true
            }, time)
            fun(props)
        }
    }

    return resFun
}
