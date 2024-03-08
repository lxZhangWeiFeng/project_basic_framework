import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface OptionsProps {
    pass: boolean // 是否通过可执行请求
}

/**
 * @description dispatch请求
 * @param path {string} dispatch路径
 * @param payload {any} 请求参数参数
 * @param options {OptionsProps} 其他设置
 */
const useRequest = (path: string, payload?: any, options?: OptionsProps) => {
    const { pass = true } = options as OptionsProps
    const dispatch = useDispatch()
    const { loading } = useSelector(({ loading }: any) => ({ loading: loading.effects[path] }))
    const [data, setData] = useState<any>(null)
    const handleRequest = useCallback(async () => {
        const res = await dispatch<any>({
            type: path,
            payload
        })
        if (res) {
            setData(res)
        }
    }, [path, JSON.stringify(payload)])

    useEffect(() => {
        if (path && !!dispatch && pass) {
            handleRequest()
        }
    }, [path, JSON.stringify(payload), pass])
    return { data, loading, run: handleRequest }
}

export default useRequest
