import React, { FC, CSSProperties, Fragment } from 'react'
import { Tooltip } from '@antd'
import { fixNull } from '@/utils/utils'
import styles from './index.less'
import classNames from 'classnames'

type listItem = {
    color: string
    count: number
    tooltip?: string
    onClick?: anyFunction
}

type ColorLineProps = {
    list: listItem[]
    width?: number
    progress?: boolean
    formatNumber?: boolean
    className?: string
    justifyContentType?: 'left' | 'center' | 'right'
    // type?: 'line' | 'block'
}

// 格式化number
const formatNumber = function (v = 0) {
    let res = ''
    for (let i = 0; i < String(v).length; i++) {
        switch (Math.floor(i / 3)) {
            case 1:
                res = `${Math.floor(v / Math.pow(10, 3))}k`
                break
            case 2:
                res = `${Math.floor(v / Math.pow(10, 6))}M`
                break
            case 3:
                res = `${Math.floor(v / Math.pow(10, 9))}B`
                break
            case 4:
                res = `${Math.floor(v / Math.pow(10, 12))}T`
                break
            default:
                res = String(v)
                break
        }
    }
    return res
}

const ColorLine: FC<ColorLineProps> = ({
    list = [],
    width,
    progress = true,
    formatNumber: _FN = false,
    justifyContentType = 'left',
    className = ''
}) => {
    const len = list.length
    const total = list.reduce((a, b) => a + b.count, 0)
    const progressTooltip = (
        <div>
            {list?.map(({ tooltip, count, color }) => (
                <div key={tooltip} className={styles['top-wrapper']}>
                    <span className={styles['dot']} style={{ background: color || '#C5C5C5' }} /> {`${tooltip}：${count}`}
                </div>
            ))}
        </div>
    )

    const component = (
        <div
            style={{ width }}
            className={classNames(styles['wrapper'], {
                [styles[`justify-content-${justifyContentType}`]]: true,
                [styles['progress']]: progress,
                [className]: !!className
            })}
        >
            {list.map(({ color, count, tooltip, onClick }, i) => {
                const getInner = (style: CSSProperties = {}, onClick?: anyFunction): JSX.Element => (
                    <div
                        key={color + count + i}
                        style={{ background: color, ...style, ...(progress ? { width: `${(count * 100) / total}%` } : { minWidth: 32 }) }}
                        className={classNames(styles['item'], { [styles['block']]: !progress, [styles['progress-block']]: progress })}
                        onClick={onClick}
                    >
                        {!progress ? (_FN ? formatNumber(count || 0) : count || 0) : ''}
                    </div>
                )

                let inner = getInner()

                if (typeof onClick === 'function') inner = getInner({ cursor: 'pointer' }, onClick)

                return tooltip && !progress ? (
                    <Tooltip key={color + count + i} title={tooltip}>
                        {inner}
                    </Tooltip>
                ) : (
                    inner
                )
            })}
        </div>
    )

    return len === 0 ? <Fragment>{fixNull('')}</Fragment> : progress ? <Tooltip title={progressTooltip}>{component}</Tooltip> : component
}

export default ColorLine
