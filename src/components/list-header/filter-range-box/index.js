/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react'
import classnames from 'classnames'
import { Input, Dropdown, DatePicker, TimePicker, Button } from 'antd'
import dayjs from 'dayjs'
import { CalendarOutlined, CloseCircleFilled } from '@ant-design/icons'
import { useStateFromValue } from '@/hooks'
import styles from './index.less'

const FilterRangeBox = (props) => {
    const {
        name,
        paramsKey,
        params,
        changeParams,
        placeholder,
        paramsFormat = 'YYYY/MM/DD HH:mm',
        showFormatDate = 'YYYY-MM-DD',
        showFormatTime = 'HH:mm',
        index
    } = props

    const innerEmpty = (n) => Array(n).fill(' ').join('')

    const getMomentFromString = (v) => (typeof v === 'string' ? dayjs(v, paramsFormat) : null)
    const getStringFromMoment = (v) => (v && dayjs(v).isValid() ? v.format(paramsFormat) : '')
    const [visible, setVisible] = useState(false)
    const [hover, setHover] = useState(false)

    const startKey = Array.isArray(paramsKey) ? paramsKey[0] : 'start'
    const endKey = Array.isArray(paramsKey) ? paramsKey[1] : 'end'
    const paramsStartValue = getMomentFromString(params[startKey])
    const paramsEndValue = getMomentFromString(params[endKey])
    const haveValue = paramsStartValue && paramsEndValue
    const inputValue = haveValue
        ? `${getStringFromMoment(paramsStartValue)}${innerEmpty(5)}-${innerEmpty(5)}${getStringFromMoment(paramsEndValue)}`
        : ''

    const [startValue, setStartValue] = useStateFromValue(paramsStartValue)
    const [endValue, setEndValue] = useStateFromValue(paramsEndValue)

    const changeValue = (newStart, newEnd) => {
        setStartValue(newStart)
        setEndValue(newEnd)
    }

    const onChange = (v) => {
        const [start, end] = v || []
        if (typeof changeParams === 'function') changeParams({ [`${startKey}`]: getStringFromMoment(start), [`${endKey}`]: getStringFromMoment(end) })
    }

    const close = () => {
        setVisible(false)
    }

    const submit = () => {
        if (startValue & endValue) {
            onChange([startValue, endValue])
        } else {
            changeValue(null, null)
        }

        close()
    }

    const Date = (value, setValue) => (
        <DatePicker allowClear={false} value={value} onChange={setValue} format={showFormatDate} style={{ width: 150, flexGrow: 1 }} inputReadOnly />
    )
    const Time = (value, setValue) => (
        <TimePicker allowClear={false} value={value} onChange={setValue} format={showFormatTime} style={{ width: 100 }} inputReadOnly />
    )

    const overlay = (
        <div className={styles['overlay']}>
            <div className={styles['line']}>
                <span>开始时间:</span>
                {Date(startValue, setStartValue)}
                {Time(startValue, setStartValue)}
            </div>
            <div className={styles['line']}>
                <span>结束时间:</span>
                {Date(endValue, setEndValue)}
                {Time(endValue, setEndValue)}
            </div>
            <div className={styles['line']}>
                <span>快速选择:</span>
                <Button size="small" onClick={() => changeValue(dayjs().hour(dayjs().get('hour') - 1), dayjs())}>
                    1小时
                </Button>
                <Button size="small" onClick={() => changeValue(dayjs().hour(dayjs().get('hour') - 6), dayjs())}>
                    6小时
                </Button>
                <Button size="small" onClick={() => changeValue(dayjs().day(dayjs().get('day') - 1), dayjs())}>
                    1天
                </Button>
                <Button size="small" onClick={() => changeValue(dayjs().day(dayjs().get('day') - 7), dayjs())}>
                    7天
                </Button>
            </div>
            <div className={styles['btn-box']}>
                <Button onClick={close}>取消</Button>
                <Button type="primary" onClick={submit}>
                    确认
                </Button>
            </div>
        </div>
    )

    const onClear = (e) => {
        e.stopPropagation()
        onChange([])
        close()
    }

    const suffix =
        hover && haveValue ? <CloseCircleFilled onClick={onClear} className={styles['clear']} /> : <CalendarOutlined className={styles['date']} />

    const defaultPlaceholder = `开始时间${innerEmpty(12)}-${innerEmpty(12)}结束时间`

    return (
        <Dropdown overlay={overlay} visible={visible} onVisibleChange={setVisible} trigger="click">
            <div
                className={classnames(styles['filter'], { [styles['focus']]: visible })}
                style={{ width: typeof index === 'number' ? `calc(100% / ${index / 1.5} - 16px)` : 300 }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <span className={styles['filter-label']}>{name}:</span>
                <Input readOnly value={inputValue} placeholder={placeholder || defaultPlaceholder} bordered={false} suffix={suffix} />
            </div>
        </Dropdown>
    )
}

export default FilterRangeBox
