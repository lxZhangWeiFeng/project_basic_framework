/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { Button, DatePicker } from 'antd'
import dayjs from 'dayjs'
import styles from './index.less'

const FilterRange = (props) => {
    const ref = useRef(null)
    const { name, paramsKey, params, changeParams, placeholder, paramsFormat = 'YYYY/MM/DD', showFormat = 'YYYY-MM-DD', showTime, index } = props
    const [open, setOpen] = useState(false)
    const id = `rang-${Math.random()}` // 存在多个，使用随机数

    const startKey = Array.isArray(paramsKey) ? paramsKey[0] : 'start'
    const endKey = Array.isArray(paramsKey) ? paramsKey[1] : 'end'
    const getMomentFromString = (v) => (typeof v === 'string' ? dayjs(v, paramsFormat) : null)
    const value = [getMomentFromString(params[startKey]), getMomentFromString(params[endKey])]
    const getStringFromMoment = (v) => (v && dayjs(v).isValid() ? v.format(paramsFormat) : '')
    const onChange = (v) => {
        const [start, end] = v || []
        if (typeof changeParams === 'function') changeParams({ [`${startKey}`]: getStringFromMoment(start), [`${endKey}`]: getStringFromMoment(end) })
    }

    const labelClick = () => {
        document.getElementById(id)?.lastChild?.click()
    }

    const changeAndClose = (v) => {
        onChange(v)
        setOpen(false)
    }

    const panelRender = (panelNode) => {
        return (
            <div className={styles['panel-render']}>
                <div className={styles['btn-box']}>
                    <Button type="primary" size="small" onClick={() => changeAndClose([dayjs().hour(dayjs().get('hour') - 1), dayjs()])}>
                        1小时
                    </Button>
                    <Button type="primary" size="small" onClick={() => changeAndClose([dayjs().hour(dayjs().get('hour') - 6), dayjs()])}>
                        6小时
                    </Button>
                    <Button type="primary" size="small" onClick={() => changeAndClose([dayjs().day(dayjs().get('day') - 1), dayjs()])}>
                        1天
                    </Button>
                    <Button type="primary" size="small" onClick={() => changeAndClose([dayjs().day(dayjs().get('day') - 7), dayjs()])}>
                        7天
                    </Button>
                </div>
                <div className={styles['panel-node']}>{panelNode}</div>
            </div>
        )
    }

    useEffect(() => {
        if (!open) {
            ref.current.blur()
        }
    }, [open])

    return (
        <div
            id={id}
            className={classnames(styles['filter'], { [styles['focus']]: open })}
            style={{ width: typeof index === 'number' ? `calc(100% / ${index / 1.5} - 16px)` : 300 }}
        >
            <span className={styles['filter-label']} onClick={labelClick}>
                {name}:
            </span>
            <DatePicker.RangePicker
                format={showFormat}
                ref={ref}
                allowClear
                placeholder={placeholder}
                open={open}
                onOpenChange={setOpen}
                value={value}
                onChange={onChange}
                bordered={false}
                className={styles['filter-select']}
                panelRender={panelRender}
                showTime={showTime}
                inputReadOnly
                // dropdownAlign={{ points: ['tr', 'br'], offset: [0, -3] }}
                // getPopupContainer={() => document.getElementById('root')}
            />
        </div>
    )
}

export default FilterRange
