const formatDict = (dictList: any[], isNumber: boolean) => {
    const res: anyObject = {}
    dictList.forEach(({ key, value, color }) => {
        res[key] = { key: isNumber ? Number(key) : key, value, color }
    })
    return res
}

export const formatDictType = (dictObj: any[], dictMap: anyObject) => {
    const res: anyObject = {}
    dictObj.forEach(({ type, dictList, keyType }) => {
        const key = dictMap[type] || type
        res[key] = formatDict(dictList, keyType === 0)
    })
    return res
}
