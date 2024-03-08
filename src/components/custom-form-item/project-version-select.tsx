import React, { FC, useEffect, useState } from 'react'
import { Select, SelectProps } from 'antd'
import { useDispatch } from 'react-redux'
import { isNumber, isString } from '@/utils/judge-type'

type treeItem = {
    id: number
    version: string
}

const ProjectSelect: FC<SelectProps<any> & { projectId: number }> = ({ value, onChange, projectId, ...rest }) => {
    const dispatch: Dispatch = useDispatch()
    const [data, setData] = useState<treeItem[]>([])

    useEffect(() => {
        if (isNumber(projectId) || isString(projectId)) {
            dispatch({
                type: 'project/getProjectAllVersion',
                payload: { projectId }
            }).then((res) => {
                setData(Array.isArray(res) ? res : [])
            })
        }
    }, [projectId])

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
            {data.map(({ id, version }) => (
                <Select.Option value={id} key={id}>
                    {version}
                </Select.Option>
            ))}
        </Select>
    )
}

export default ProjectSelect
