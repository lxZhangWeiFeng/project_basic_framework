import React, { CSSProperties, FC, Fragment } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface ItemSpaceProps {
    title?: string | React.ReactElement
    className?: string
    style?: CSSProperties
}

const ItemSpace: FC<ItemSpaceProps> = ({ title, children, className, style }) => {
    return (
        <div className={classnames(className)} style={style}>
            {title ? <div className={styles['title']}>{title}</div> : <Fragment />}
            <div className={styles['content']}>{children}</div>
        </div>
    )
}

export default ItemSpace
