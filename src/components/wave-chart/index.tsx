import React, { FC } from 'react'

import styles from './index.less'

interface WaveChartProps {
    color: string
    value: string | number
}

const WaveChart: FC<WaveChartProps> = ({ color = '#1890ff', value = '' }) => {
    return (
        <div className={styles['wave-wrapper']} style={{ backgroundColor: color }}>
            <div className={styles['text']}>{value || ''}</div>
        </div>
    )
}

export default WaveChart
