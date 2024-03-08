import { useRef, useCallback, useEffect } from 'react'
function useDebounceFn(func: any, wait: any, immediate: any) {
    const timeout: any = useRef()
    /* 函数组件的this其实没啥多大的意义，这里我们就把this指向func好了 */
    const fnRef = useRef(func)

    /*  useDebounceFn 重新触发 func 可能会改变，这里做下更新 */
    useEffect(() => {
        fnRef.current = func
    }, [func])

    /* 
        timeout.current做了缓存，永远是最新的值
        cancel 虽然看着没有依赖项了
        其实它的隐形依赖项是timeout.current
    */
    const cancel = useCallback(function () {
        timeout.current && clearTimeout(timeout.current)
    }, [])

    /* 相关函数 func 可能会返回值，这里也要缓存 */
    const resultRef = useRef()
    function resDebounced(...args) {
        //args就是事件对象event

        // 一直触发一直清除上一个打开的延时器
        cancel()

        if (immediate) {
            // 第一次触发，timeout===undefined恰好可以利用timeout的值
            const callNow = !timeout.current
            timeout.current = setTimeout(function () {
                timeout.current = null
            }, wait)
            /* this指向func好了 */
            if (callNow) resultRef.current = fnRef.current.apply(fnRef.current, args)
        } else {
            // 停止触发，只有最后一个延时器被保留
            timeout.current = setTimeout(function () {
                timeout.current = null
                // func绑定this和事件对象event，还差一个函数返回值
                resultRef.current = fnRef.current.apply(fnRef.current, args)
            }, wait)
        }
        return resultRef.current
    }
    resDebounced.cancal = function () {
        cancel()
        timeout.current = null
    }

    /* resDebounced 被 useCallback 缓存 */

    return useCallback(resDebounced, [wait, cancel, immediate])
}
export default useDebounceFn
