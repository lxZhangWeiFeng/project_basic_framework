import React, { FC, useEffect, useState } from 'react'
import { Select, SelectProps } from 'antd'
import { useDispatch } from 'react-redux'
import { isArray } from '@/utils/judge-type'

type treeItem = {
    id: number
    name: string
}

const RoleSelect: FC<SelectProps<any>> = ({ value, onChange, ...rest }) => {
    const dispatch: Dispatch = useDispatch()
    const [data, setData] = useState<treeItem[]>([])
    const haveData = isArray(data) && data.length > 0

    useEffect(() => {
        dispatch({
            type: 'role/getRoleSelect'
        }).then((res) => {
            setData(Array.isArray(res) ? res : [])
        })
    }, [])

    return (
        <Select
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: '50vh', overflow: 'auto' }}
            value={haveData ? value : undefined}
            onChange={onChange}
            optionFilterProp="children"
            allowClear
            {...rest}
        >
            {data.map(({ id, name }) => (
                <Select.Option value={id} key={id}>
                    {name}
                </Select.Option>
            ))}
        </Select>
    )
}

export default RoleSelect
