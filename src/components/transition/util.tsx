const getPath = (path: string, params: Record<string, any>, defaultId = '.*'): string => {
    let newPath = path
    const reg = /:.+?((?=\/)|$)/g
    const mathList = path?.match(reg)
    if (mathList && Array.isArray(mathList)) {
        mathList.forEach((id) => {
            newPath = newPath.replace(id, params[id.slice(1)] || defaultId)
        })
    }
    return newPath
}

// 获取Switch下所有Route的key，排除掉redirect （Route的key使用的是path字段）
export const getAllKeys = (children: any, params: Record<string, any>): string[] => {
    try {
        const theHandlePath =
            (children as any)?.props?.children
                ?.map((item: any) => (item.key.includes('redirect') ? false : getPath(item.key, params)))
                .filter((item: any) => item) || []
        return theHandlePath
    } catch (e) {
        return []
    }
}

// 获取key，默认取keys的第一位（如果有redirect，默认是跳第一位）
// 获取匹配度最高的key
export const getKey = (allKeys: string[], pathname: string): string => {
    const defaultRes = allKeys[0] || ''
    const arr: string[] = []

    allKeys.forEach((p) => {
        if (new RegExp(`^${p}`).test(pathname)) arr.push(p)
    })

    return arr.length === 0 ? defaultRes : arr.reduce((a, b) => (a.length > b.length ? a : b), '')
}
