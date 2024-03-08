import React, { FC } from 'react'
import { RadioProps, Checkbox } from 'antd'
import { useSelector } from 'react-redux'
import { isArray, isString } from '@/utils/judge-type'

const DictCheckBox: FC<RadioProps & any> = ({ value, onChange, dictType, reverse, addOptions = [], exclude, ...rest }) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const Obj = dict[dictType] || {}

    let options = Object.values(Obj)
    if (reverse) options.reverse()
    if (addOptions?.length) options.unshift(...addOptions)
    // 排除 类型
    if (exclude) {
        if (isString(exclude)) options = options.filter((list: any) => list.key !== exclude)

        if (isArray(exclude)) options = options.filter((list: any) => !exclude.includes(list.key))
    }
    return (
        <Checkbox.Group onChange={onChange} value={value}>
            {options.map(({ key, value }: any) => (
                <Checkbox value={key} key={key}>
                    {value}
                </Checkbox>
            ))}
        </Checkbox.Group>
    )
}

export default DictCheckBox
