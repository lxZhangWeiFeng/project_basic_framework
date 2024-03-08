import React, { useState } from 'react'
import { Input } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import styles from './index.less'

const FilterText = ({ name, value, params, paramsKey, changeParams, index }) => {
    const [hover, setHover] = useState(false)

    const onClear = () => {
        changeParams(paramsKey)
    }

    const suffix = hover ? <CloseCircleFilled onClick={onClear} className={styles['clear']} /> : null

    const paramsValue = params[paramsKey]

    return paramsValue ? (
        <div
            className={styles['filter']}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ width: typeof index === 'number' ? `calc(100% / ${index} - 16px)` : 300 }}
        >
            <span className={styles['filter-label']}>{name}:</span>
            <Input className={styles['filter-input']} readOnly value={value} bordered={false} allowClear suffix={suffix} />
        </div>
    ) : null
}

export default FilterText
