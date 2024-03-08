import { isFunction } from '@/utils/judge-type'
import React, { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'

type dict = {
    type: string
    key: string | number
    color: string
    value: string
    dict: {
        [key: string]: { color: string; key: string; value: string }
    }
}

type DictWrapperProps = {
    children: (p: dict) => any
    dictName: string
    dictKey?: string | number
}

const DictWrapper: FC<DictWrapperProps> = ({ children, dictName, dictKey = '-' }) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))

    const dictType = dict?.[dictName] || {}

    const dictObj = dictType?.[dictKey] || {}
    const { color, value } = dictObj

    const innerProps = {
        type: dictName,
        key: dictKey,
        color,
        value,
        dict: dictType
    }

    return isFunction(children) ? children(innerProps) : <Fragment />
}

export default DictWrapper
