import React, { FC } from 'react'
import { Select, Radio, RadioProps, Tag } from 'antd'
import { useSelector } from 'react-redux'
import { isArray, isString } from '@/utils/judge-type'
import ColorBlock from '../color-block'

const DictRadio: FC<RadioProps & any> = ({ value, onChange, dictType, reverse, addOptions = [], exclude, ...rest }) => {
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
        // <Select
        //     style={{ width: '100%' }}
        //     dropdownStyle={{ maxHeight: '50vh', overflow: 'auto' }}
        //     value={value}
        //     onChange={onChange}
        //     allowClear={allowClear}
        //     {...rest}
        // >
        //     {options.map(({ key, value }: any) => (
        //         <Select.Option value={key} key={key}>
        //             {`${prefix || ''}${value}`}
        //         </Select.Option>
        //     ))}
        // </Select>

        <Radio.Group onChange={onChange} value={value} {...rest}>
            {options.map(({ key, value, color }: any) => (
                <Radio value={key} key={key}>
                    {color ? <Tag color={color}>{value}</Tag> : value}
                </Radio>
            ))}
        </Radio.Group>
    )
}

export default DictRadio
