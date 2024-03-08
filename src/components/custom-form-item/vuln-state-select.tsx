import React, { FC } from 'react'
import { Select, SelectProps } from 'antd'
import { useSelector } from 'react-redux'

const VulnStateSelect: FC<SelectProps<any>> = ({ value, onChange, ...rest }) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const dictObj = dict?.['vulnState'] || {}

    return (
        <Select style={{ width: '100%' }} dropdownStyle={{ maxHeight: '50vh', overflow: 'auto' }} value={value} onChange={onChange} {...rest}>
            {Object.values(dictObj).map((({ key, value }: any) => (
                <Select.Option value={key} key={key}>
                    {value}
                </Select.Option>
            )) as any)}
        </Select>
    )
}

export default VulnStateSelect
