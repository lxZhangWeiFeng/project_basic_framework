import React, { FC, useState, useMemo, useEffect } from 'react'
import { Select, SelectProps } from 'antd'
import { useDispatch } from 'react-redux'
import { isFunction } from '@/utils/judge-type'

type UserSelectProps = {
    userActionType?: string
    mode?: 'multiple' | undefined
} & SelectProps<any>

const UserSelect: FC<UserSelectProps> = ({ value, onChange, userActionType, mode }) => {
    const dispatch: Dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const searchHandle = useMemo(() => {
        const getOptions = (v: any) => {
            setSearchValue(v)
        }

        return getOptions
    }, [options])

    useEffect(() => {
        dispatch({
            type: userActionType || 'user/getSysUser',
            payload: {
                keyword: searchValue
            }
        }).then(setOptions)
    }, [searchValue])

    return (
        <Select
            filterOption={false}
            showSearch
            onSearch={searchHandle}
            mode={mode}
            value={value}
            onChange={(a, b) => {
                setSearchValue('')
                if (isFunction(onChange)) onChange(a, b)
            }}
        >
            {options?.map(({ id, name }: any) => (
                <Select.Option key={id} value={id}>
                    {name}
                </Select.Option>
            ))}
        </Select>
    )
}

export default UserSelect
