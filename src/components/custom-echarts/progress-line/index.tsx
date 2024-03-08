import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import EllipsisText from '@/components/ellipsis-text'

import styles from './index.less'
import { isFunction } from '@/utils/judge-type'

interface DataProps {
    key: any
    value: any
}

interface ProgressLineProps {
    data: DataProps
    maxValue?: number
    trailColor?: string // 未完成分段颜色
    linkTo?: anyFunction
}

const ProgressLine: FC<ProgressLineProps> = ({ data = {}, maxValue = 100, trailColor = '#ECECEC', linkTo }) => {
    const { key, value, color } = data

    const percentage = Math.round((value / maxValue) * 100)

    const progressLineStyle: any = {
        width: `${percentage}%`
    }
    if (percentage === 0) {
        progressLineStyle.border = 'none'
    }
    if (color) {
        // progressLineStyle.background = `linear-gradient(270deg, ${color} 0%, #fefefe 100%)`
        progressLineStyle.background = color
    }
    return (
        <div>
            <div className={styles['info']}>
                <div className={styles['text']}>
                    {linkTo ? (
                        <Link to={isFunction(linkTo) ? linkTo(data) : linkTo}>
                            <EllipsisText>{key}</EllipsisText>
                        </Link>
                    ) : (
                        <EllipsisText>{key}</EllipsisText>
                    )}
                </div>
                <div className={styles['number']}>{value}</div>
            </div>
            <div className={styles['progress']} style={{ background: trailColor }}>
                <div className={styles['progress-line']} style={progressLineStyle} />
            </div>
        </div>
    )
}

export default ProgressLine
