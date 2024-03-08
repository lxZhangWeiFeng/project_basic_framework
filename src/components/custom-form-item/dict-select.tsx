import React, { FC } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import { useSelector } from 'react-redux'
import { isArray, isFunction, isString } from '@/utils/judge-type'

const DictSelect: FC<SelectProps<any> & any> = ({
    value,
    onChange,
    dictType,
    reverse,
    addOptions = [],
    prefix,
    allowClear = true,
    exclude,
    include,
    addType = 'unshift',
    hiddenOthersOptionsKey = '',
    customRender,
    ...rest
}) => {
    const isMultiple = ['tags', 'multiple'].includes(rest.mode)
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const Obj = dict[dictType] || {}

    let options = Object.values(Obj)
    if (reverse) options.reverse()
    if (addOptions?.length) {
        addType === 'unshift' && options.unshift(...addOptions)
        addType === 'push' && options.push(...addOptions)
    }

    // 比如选择全部的时候，只留全部
    if ((isMultiple && value?.includes(hiddenOthersOptionsKey)) || (!isMultiple && value === hiddenOthersOptionsKey)) {
        options = options.filter((list: any) => list.key === hiddenOthersOptionsKey)
    }

    if (exclude) {
        // 排除 类型
        if (isString(exclude)) options = options.filter((list: any) => list.key !== exclude)

        if (isArray(exclude)) options = options.filter((list: any) => !exclude.includes(list.key))
    }
    if (include) {
        // 保留/包含 类型
        if (isString(include)) options = options.filter((list: any) => list.key === include)

        if (isArray(include)) options = options.filter((list: any) => include.includes(list.key))
    }

    const onChangeHandle = (v: any) => {
        if (isMultiple && v?.includes(hiddenOthersOptionsKey)) {
            onChange([hiddenOthersOptionsKey])
        } else {
            onChange(v)
        }
    }
    return (
        <Select
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: '50vh', overflow: 'auto' }}
            value={value}
            onChange={onChangeHandle}
            allowClear={allowClear}
            optionFilterProp="title"
            optionLabelProp="title"
            getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
            {...rest}
        >
            {options.map((list: any) => {
                const { key, value } = list
                return (
                    <Select.Option value={key} key={key} title={value}>
                        {isFunction(customRender) ? customRender(list) : `${prefix || ''}${value}`}
                    </Select.Option>
                )
            })}
        </Select>
    )
}

export default DictSelect
