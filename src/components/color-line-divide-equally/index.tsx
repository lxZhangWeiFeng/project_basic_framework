import React, { FC, CSSProperties, Fragment } from 'react'
import { Tooltip } from '@antd'
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
    formatNumber?: boolean
    className?: string
    splitLen?: number
    title?: string
    tooltip?: any
    // type?: 'line' | 'block'
}

const ColorLine: FC<ColorLineProps> = ({ list = [], width, splitLen = 5, className = '', title = '', tooltip }) => {
    const len = list.length
    const progressTooltip = len ? (
        <div>
            {list?.map(({ tooltip, count, color }) => (
                <div key={tooltip} className={styles['top-wrapper']}>
                    <span className={styles['dot']} style={{ background: color || '#C5C5C5' }} /> {`${tooltip}：${count}`}
                </div>
            ))}
        </div>
    ) : null

    const component = (
        <div>
            <div className={styles['title']}>
                {title || ''} {tooltip ? tooltip : <Fragment />}
            </div>
            <div className={styles['flex-wrapper']}>
                <Tooltip title={progressTooltip}>
                    <div
                        style={{ width }}
                        className={classNames(styles['wrapper'], {
                            [className]: !!className
                        })}
                    >
                        {list.map(({ color, count, onClick }, i) => {
                            const getInner = (style: CSSProperties = {}, onClick?: anyFunction): JSX.Element => (
                                <div
                                    key={color + count + i}
                                    style={{ background: color, width: `${100 / splitLen}%`, ...style }}
                                    className={classNames(styles['item'])}
                                    onClick={onClick}
                                >
                                    {count}
                                </div>
                            )

                            let inner = getInner()

                            if (typeof onClick === 'function') inner = getInner({ cursor: 'pointer' }, onClick)

                            return inner
                            // return tooltip ? (
                            //     <Tooltip key={color + count + i} title={tooltip}>
                            //         {inner}
                            //     </Tooltip>
                            // ) : (
                            //     inner
                            // )
                        })}
                    </div>
                </Tooltip>
            </div>
        </div>
    )

    return component
}

export default ColorLine
