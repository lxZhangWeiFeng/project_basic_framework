import React, { useState, useEffect, useRef } from 'react'
import { Input, Menu, Dropdown } from 'antd'
import { isPromise, isArray, isFunction } from '@/utils/judge-type'

const { Search } = Input

const unique = (arr) => Array.from(new Set(arr))

const SearchOption = ({ value, width = 100, style = {}, onClear, onSearch, onChange, getOption, onFocus, renderOption, onBlur, ...rest }) => {
    const [val, setValue] = useState(value)
    const [options, setOptions] = useState([])
    const timeOut = useRef(null)

    useEffect(() => {
        setValue(value)
    }, [value])

    const Clear = () => {
        if (isFunction(onClear)) {
            onClear()
        } else {
            setValue('')
            onSearch('')
        }
    }

    const getOpt = (v) => {
        clearTimeout(timeOut.current)
        const keyword = v
        if (keyword) {
            timeOut.current = setTimeout(() => {
                const res = getOption(keyword)
                if (isPromise(res)) {
                    res.then((opt) => {
                        if (isArray(opt)) {
                            setOptions(unique(opt))
                        }
                    })
                }
                if (isArray(res)) {
                    setOptions(unique(res))
                }
            }, 500)
        }
    }

    const Change = (e) => {
        if (isFunction(onChange)) {
            onChange(e)
        }
        setValue(e.target.value)
        getOpt(e.target.value)
        if (!e.target.value) {
            Clear()
        }
    }

    const cleanOpt = () => {
        clearTimeout(timeOut.current)
        setTimeout(() => {
            setOptions([])
        }, 200)
    }

    const Focus = (e) => {
        if (isFunction(onFocus)) {
            onFocus(e)
        }
        getOpt()
    }

    const Blur = (e) => {
        if (isFunction(onFocus)) {
            onBlur(e)
        }
        cleanOpt()
    }

    const menuClick = ({ key }) => {
        setValue(key)
        onSearch(key)
    }

    const menu = renderOption ? (
        renderOption(options)
    ) : (
        <Menu style={{ minWidth: width, padding: 0 }} onClick={menuClick}>
            {options.map((item) => (
                <Menu.Item key={item} style={{ height: '36px', lineHeight: '24px', padding: '6px 11px' }}>
                    {item}
                </Menu.Item>
            ))}
        </Menu>
    )

    return (
        <Dropdown visible overlay={menu} placement="bottomLeft">
            <Search
                value={val}
                style={{ width, ...style }}
                onSearch={onSearch}
                onChange={Change}
                allowClear
                onFocus={Focus}
                onBlur={Blur}
                {...rest}
            />
        </Dropdown>
    )
}

export default SearchOption
