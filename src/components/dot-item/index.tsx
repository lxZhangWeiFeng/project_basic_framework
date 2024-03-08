import React, { FC } from 'react'
import classnames from 'classnames'

import styles from './index.less'

interface DotItem {
    className?: string
    dotColor?: string
}

const DotItem: FC<DotItem> = ({ children, className, dotColor = '#a4a4a4' }) => {
    return (
        <div className={classnames(styles['item-wrapper'], className)}>
            <span className={styles['item-dot']} style={{ background: dotColor }} />
            <div>{children}</div>
        </div>
    )
}

export default DotItem
