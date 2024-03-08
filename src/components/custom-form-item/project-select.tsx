import React, { FC, useEffect, useState } from 'react'
import { Select, SelectProps } from 'antd'
import { useDispatch } from 'react-redux'

type treeItem = {
    id: number
    name: string
}

const ProjectSelect: FC<SelectProps<any>> = ({ value, onChange, ...rest }) => {
    const dispatch: Dispatch = useDispatch()
    const [data, setData] = useState<treeItem[]>([])

    useEffect(() => {
        dispatch({
            type: 'project/getProjectList'
        }).then((res) => {
            setData(Array.isArray(res) ? res : [])
        })
    }, [])

    return (
        <Select
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: '50vh', overflow: 'auto' }}
            value={value}
            onChange={onChange}
            allowClear
            showSearch
            optionFilterProp="children"
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

export default ProjectSelect
