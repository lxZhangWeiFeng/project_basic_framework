import React, { FC, useEffect, useState } from 'react'
import { TreeSelect, TreeSelectProps } from 'antd'
import { useDispatch } from 'react-redux'
import { isArray } from '@/utils/judge-type'
import isObject from '../virtuallist-antd-copy/tool/isObject'

type treeItem = {
    id: number
    pId: number
    value: number
    title: string
    isLeaf: boolean
}

const formatItem = ({ deptId, deptName, parentId, hasChildren }: any): treeItem => ({
    id: deptId,
    pId: parentId,
    value: deptId,
    title: deptName,
    isLeaf: !hasChildren
})

const formatData = (list: any[]) => {
    const obj: Record<string, treeItem> = {}
    isArray(list) &&
        list.forEach((item) => {
            if (item?.deptId) {
                obj[item.deptId] = formatItem(item)
            }
        })
    return obj
}

type DepartmentTreeSelectProps = TreeSelectProps<any> & { deptIds?: number[] }

const DepartmentTreeSelect: FC<DepartmentTreeSelectProps> = ({ value, onChange, deptIds, ...rest }) => {
    const dispatch: Dispatch = useDispatch()
    const [data, setData] = useState<Record<string, treeItem>>({
        0: {
            id: 0,
            isLeaf: false,
            pId: -999,
            title: '/',
            value: 0
        }
    })
    const haveData = isObject(data) && Object.keys(data).length > 0
    const onLoadData = ({ id }: any): Promise<any> => {
        return dispatch({
            type: 'department/getFormParentList',
            payload: { parentId: id }
        }).then((res) => {
            setData({ ...data, ...formatData(res) })
        })
    }

    useEffect(() => {
        // 如果有 deptIds
        if (isArray(deptIds)) {
            dispatch({
                type: 'department/getDepartmentDependencies',
                payload: { deptIds }
            }).then((res) => {
                setData({ ...data, ...formatData(res) })
            })
        } else {
            dispatch({
                type: 'department/getFormParentList'
            }).then((res) => {
                setData({ ...data, ...formatData(res) })
            })
        }
    }, [])

    return (
        <TreeSelect
            treeDataSimpleMode
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: '50vh', overflow: 'auto' }}
            loadData={onLoadData}
            value={haveData ? value : undefined}
            onChange={onChange}
            treeData={Object.values(data)}
            treeNodeFilterProp="title"
            allowClear
            {...rest}
        />
    )
}

export default DepartmentTreeSelect
