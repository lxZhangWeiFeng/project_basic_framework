import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useAbort = (url: string) => {
    const abortController: any = useRef<AbortController | null>(null)
    const dispatch = useDispatch()

    const startFetch = async (payload: any) => {
        abortController.current = new AbortController()
        const res = await dispatch({
            type: url,
            payload,
            signal: abortController.current.signal
        })
        abortController.current = null
        return res
    }

    useEffect(() => {
        return () => {
            if (abortController.current) {
                abortController.current.abort()
                abortController.current = null
            }
        }
    }, [])

    return { startFetch, abortController }
}

export default useAbort
