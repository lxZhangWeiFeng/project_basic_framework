/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { Tooltip, Spin } from 'antd'
import { Select } from '@antd'
import { useThrottle } from '@/hooks'
import ObserveBlock from '@/components/observe-block'
import EllipsisText from '@/components/ellipsis-text'
import { isArray, isString } from '@/utils/judge-type'
import styles from './index.less'

const FilterSelect = (props) => {
    const {
        name,
        paramsKey,
        filterKey,
        handleRes,
        params,
        filterOptions,
        changeParams,
        getFilter,
        placeholder,
        index,
        notGetFilter = false,
        emptyClearKeys,
        mode = 'multiple',
        showSearch = true,
        noFetch,
        defaultOptions = []
    } = props

    const [width, setWidth] = useState(300)
    const theOptions = filterOptions[filterKey]
    const options = Array.isArray(theOptions) ? theOptions : defaultOptions
    const [requestEnd, setRequestEnd] = useState(true)
    const [open, setOpen] = useState(false)
    // const trueOpen = open && requestEnd // 避免open卡顿
    const setOpenThrottle = useThrottle(setOpen, 200) // label的onClick和Select的内部click冲突导致触发2次setOpen，节流取消一次

    const value = mode === 'multiple' ? (Array.isArray(params[paramsKey]) ? params[paramsKey] : []) : params[paramsKey]
    const onChange = (value) => {
        if (typeof changeParams === 'function') {
            const payload = { [`${paramsKey}`]: value }
            // 当自身选项的值为空，清空emptyClearKey相关的值，并根据dependentShowKey进行隐藏
            if (!value?.length && emptyClearKeys) {
                if (isString(emptyClearKeys)) payload[emptyClearKeys] = undefined
                if (isArray(emptyClearKeys)) emptyClearKeys.forEach((list) => (payload[list] = undefined))
            }
            changeParams(payload)
        }
    }

    const renderOptions = (options) => {
        return options.map(({ name, id, count, title, options }) => {
            if (title && options && options.length > 0) {
                return (
                    <Select.OptGroup title={title} key={title}>
                        {renderOptions(options)}
                    </Select.OptGroup>
                )
            }

            // 存在 id 为 true 和 false 的情况
            if ((id || typeof id === 'boolean' || typeof id === 'number') && name) {
                const haveCountText = `${name}${typeof count === 'number' ? `（${count}）` : ''}`

                const haveCount = (
                    <div className={styles['select-flex-option']} title={haveCountText}>
                        <EllipsisText needT={false}>{name}</EllipsisText>
                        <span style={{ whiteSpace: 'nowrap' }}>（{count}）</span>
                    </div>
                )

                const text = typeof count === 'number' ? haveCount : name

                return (
                    <Select.Option key={id} value={isArray(id) ? id.toString() : id} label={name}>
                        {text}
                    </Select.Option>
                )
            }
        })
    }

    const getFilterFun = async () => {
        if (typeof getFilter === 'function' && !notGetFilter) {
            return getFilter({ filterKey, paramsKey, handleRes })
        }
    }

    const setOpenAndGetFilter = async (o) => {
        await setOpenThrottle(o)
        if (!noFetch && o) {
            await setRequestEnd(false)
            await getFilterFun()
            await setTimeout(() => setRequestEnd(true), 200) // 添加延迟，避免请求太快闪烁
        }
    }

    const wrapperClick = () => {
        setOpenAndGetFilter(!open)
    }

    const maxTagPlaceholder = (omittedValues) => {
        const texts = omittedValues.map((item) => item.label)
        const title = (
            <div className={styles['max-count-tooltip']}>
                {texts.map((item) => (
                    <div key={item} className={styles['max-count-item']}>
                        {item}
                    </div>
                ))}
            </div>
        )
        return <Tooltip title={title}>{`+${omittedValues.length}...`}</Tooltip>
    }

    // 渲染时，如果存在value，并且没有options的时候，需要获取options
    useEffect(() => {
        if (Array.isArray(value) && value.length > 0 && options.length === 0) {
            getFilterFun()
        }
    }, [JSON.stringify(value)])

    // 添加loading
    const dropdownRender = (menu) => {
        return requestEnd ? (
            menu
        ) : (
            <div className={styles['loading']}>
                <Spin tip="正在获取数据" />
            </div>
        )
    }

    return (
        <ObserveBlock
            className={classnames(styles['filter'], { [styles['focus']]: open })}
            onClick={wrapperClick}
            style={{ width: typeof index === 'number' ? `calc(100% / ${index} - 16px)` : 300 }}
            setWidth={setWidth}
        >
            <span className={styles['filter-label']}>{name}:</span>
            <Select
                allowClear
                showArrow
                showSearch={showSearch}
                mode={mode}
                bordered={false}
                className={styles['filter-select']}
                value={value}
                onChange={onChange}
                open={open}
                onDropdownVisibleChange={setOpenAndGetFilter}
                optionFilterProp="label"
                maxTagCount="responsive"
                maxTagPlaceholder={maxTagPlaceholder}
                dropdownMatchSelectWidth={width}
                dropdownAlign={{ points: ['tr', 'br'] }} // select未提供placement，rc-trigger修改placement为bottomRight
                placeholder={placeholder || '全部'}
                onClick={(e) => e.stopPropagation()}
                optionLabelProp="label"
                dropdownRender={dropdownRender}
            >
                {renderOptions(options)}
            </Select>
        </ObserveBlock>
    )
}

export default FilterSelect
