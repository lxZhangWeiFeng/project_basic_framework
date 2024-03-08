import React, { useEffect, useState } from 'react'
import { Input } from 'antd'

const SearchComponent = ({ value = '', width = 200, style = {}, onSearch, ...rest }) => {
    const [val, setValue] = useState()

    useEffect(() => {
        setValue(value)
    }, [value])

    const Change = (e) => {
        setValue(e.target.value)
    }

    return <Input.Search value={val} style={{ width, ...style }} onSearch={onSearch} onChange={Change} allowClear {...rest} />
}

export default SearchComponent
