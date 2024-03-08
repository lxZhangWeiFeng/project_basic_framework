import React from 'react'
import { Tooltip } from 'antd'

/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * @description 一些工具函数
 */

import downloadjs from 'downloadjs'
import { isFunction, isNumber, isString, isObject } from '@/utils/judge-type'
import { proxyPath } from '@/../webpack/proxy'

/**
 * @description 无需表单，实现文件下载
 * @param {Blob} content
 * @param {String} filename
 */
export const fileDownload = (content: Blob, filename: string): void => {
    downloadjs(content, filename)
}

export const downloadWithAtag = (path: string, filename: string) => {
    // dom中创建a标签
    const aTag = document.createElement('a')

    // blob是js内置对象，用来处理二进制文件流
    // const blob = new Blob([content])

    aTag.download = filename

    // 给创建的a标签添加href属性并赋值
    aTag.href = path

    aTag.target = '_blank'

    document.body.appendChild(aTag)
    // 自动点击创建的标签
    aTag.click()

    document.body.removeChild(aTag)
}

/**
 * @changeTreeData tree数据转换成自己的所需要的key-value
 */

interface ChangeTreeDataProp {
    list: any[] // 需要转换的数据
    keyProp: string // 需要转换的key键
    valueProp: string // 需要转换的value键
    changeKey: string // 原先的key键
    changeValue: string // 原先的value键
    filter?: anyFunction // 筛选
}

export const changeTreeData = ({ list, keyProp, valueProp, changeKey, changeValue, filter }: ChangeTreeDataProp): any[] => {
    const newList: any[] = []
    if (Array.isArray(list)) {
        list.forEach((item) => {
            const data: any = { [keyProp]: item[changeKey], [valueProp]: item[changeValue] }
            if (Array.isArray(item.children) && item.children?.length) {
                data.children = changeTreeData({ list: item.children, keyProp, valueProp, changeKey, changeValue, filter })
            }
            if (isFunction(filter)) {
                if (filter(item)) newList.push(data)
            } else {
                newList.push(data)
            }
        })
    }
    return newList
}

// table展开的icon，自定义显示
// 防抖 配合useCallback使用

export const debounce = <F extends anyFunction>(func: F, time?: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        if (isNumber(timeoutId)) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            if (isFunction(func)) func.apply(this, args)
        }, time || 0)
    }
}

// 节流 配合useCallback使用
export const throttle = <F extends anyFunction>(func: F, time = 0) => {
    let throttleKey: any = false

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        if (throttleKey) {
            throttleKey = false
            if (isFunction(func)) func.apply(this, args)
            setTimeout(() => {
                throttleKey = true
            }, time)
        }
    }
}

// 格式化 List
export const formatDictList = (
    l: { key: string | number; value: any }[],
    d: { [key: string]: { color: string; key: string; value: string } },
    onClick?: any
) => {
    const list = Array.isArray(l) ? l : []
    const dict = isObject(d) ? d : {}
    return list.map((item) => {
        const { key, value } = item
        return {
            color: dict[key]?.color || '#000',
            tooltip: dict[key]?.value || '暂无',
            // value: dict[key]?.value || '暂无',
            count: value,
            onClick: onClick ? () => onClick(item) : undefined
        }
    })
}

// 字符串转驼峰
export const stringToHump = ({ target = '-', text }: any) => {
    const a = text.split(target)
    let result = a[0]
    for (let i = 1; i < a.length; i++) {
        result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
    }
    return result
}

// 处理列表空数据情况
export const fixNull = (str: string | number): string => `${isNumber(str) || (isString(str) && str !== '') ? str : '-'}`

// 去除不要的数组对象
export const hiddenArrayChildren = ({ arr, hiddenKeys = [], useKey }: any) => {
    let returnData = []
    if (Array.isArray(arr)) {
        returnData = arr.filter((list) => !hiddenKeys.includes(list[useKey]))
    }
    return returnData
}

/**
 * @description 确认传入值是否在数组区间
 * @param arr {[a, b]} 需=> a < b 暂时只考虑两个数
 * @param value 需要确认的值
 */
export const sectionJudge = (arr: any[], value: number) => {
    const min = arr[0]
    const max = arr[1]
    return value > min && value < max
}

/**
 * @function endsWith
 * @description 判断字符串末尾是否为某个字符
 * @param sting 需要校验的字符串
 * @param searchString 需要进行匹配的字符串
 * @param position 位置数
 */
export const endsWith = (string: string, searchString: string, position?: any) => {
    const subjectString = string
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length
    }
    position -= searchString.length
    const lastIndex = subjectString.indexOf(searchString, position)
    return lastIndex !== -1 && lastIndex === position
}

export const getServerUrlWithSlash = (serverUrl: string, rule = '/'): string =>
    serverUrl && endsWith(serverUrl, rule) ? serverUrl : `${serverUrl}${rule}`

export const getStars = (number: number | string) => {
    const initialNumber = (isNumber(number) ? (number < 0 ? 0 : number) : Number(number || 0)) / 20

    return Math.floor(initialNumber * 10) / 10
}

interface GetColumnsRenderDomProp {
    key: string
    rd: { [prop: string]: any }
    columnsRender: Function
}

export const getColumnsRenderDom = ({ key, rd, columnsRender }: GetColumnsRenderDomProp) => columnsRender(key)(rd[key], rd)

interface GetSubStrProp {
    str: string
    len?: number
    lastLen?: number
    maxLength?: number
}

//截取字符串中间用省略号显示
export const getSubStr = ({ str = '', len = 15, lastLen = 15, maxLength = 30 }: GetSubStrProp) => {
    if (str.length <= maxLength) {
        return str
    }
    const subStr1 = str.substr(0, len)
    const subStr2 = lastLen >= str.length ? str : str.substr(str.length - lastLen, lastLen)
    const subStr = subStr1 + '……' + subStr2
    return (
        <Tooltip title={str} getPopupContainer={(triggerNode: any) => triggerNode.parentElement}>
            {subStr}
        </Tooltip>
    )
}

export const objectToArray = (arr: any) => {
    return Object.values(arr)?.map(({ key, value }: any) => ({
        id: key,
        name: value
    }))
}

/**
 * @description 获取URL仓库地址最后的仓库名称
 * @param url 需要操作的url
 */

export const getFilename = (url: string) => {
    return url?.substring(url?.lastIndexOf('/') + 1)
}

export const getOrigin = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDev = env === 'development'
    const origin = isDev ? proxyPath : `${window.location.origin}`
    return origin
}

/**
 * @description 获取URL仓库地址最后的仓库名称,并去除.git等系列
 * @param url 需要操作的url
 */

export const getUrlFilenameNoGit = (url: string) => {
    const regex = /\/([^\\/]+)\.git$/
    const match: any = regex.exec(url)
    const fileName = match[1]
    return fileName
}

/**
 * @description 获取URL仓库地址最后的仓库名称,并去除.git等系列
 * @param url 需要操作的url
 */

export const resultToSelectOptions = (result = []) => {
    const newData = result?.map((list: any) => ({
        label: list.name,
        value: list.id
    }))
    return newData
}

// 转换成 MB
export const getSizetoMb = (size: number) => {
    return Math.round((size / 1024 / 1024) * 100) / 100
}

// 转换成 GB
export const getSizetoGb = (size: number) => {
    return size / 1024 / 1024 / 1024
}
