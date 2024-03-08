import { Divider, Tooltip } from 'antd'
import React, { FC, Fragment } from 'react'

import styles from './index.less'

type listItem = {
    color: string
    count: number
    tooltip?: string
    onClick?: anyFunction
}
interface ColorDotNumberItemProps {
    list: listItem[]
    title?: React.ReactElement | string
}

const ColorDotNumberItem: FC<ColorDotNumberItemProps> = ({ list, title }) => {
    return (
        <div className={styles['wrapper']}>
            {title && <div>{title}</div>}
            <div className={styles['wrapper-dot']}>
                {list.map(({ color, count, tooltip, onClick }, i) => (
                    <Fragment key={color + count}>
                        <Tooltip title={tooltip}>
                            <div className={styles['content']} style={{ color }} onClick={onClick}>
                                {/* <span className={styles['dot']} style={{ background: color }} /> */}
                                <span className={styles['count']}>{count}</span>
                            </div>
                        </Tooltip>

                        {i !== list.length - 1 && <Divider type="vertical" style={{ margin: '0 4px', borderColor: 'rgba(0,0,0,0.2)' }} />}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default ColorDotNumberItem
