import React, { FC, ReactElement } from 'react'
import { Skeleton, Divider } from 'antd'
import styles from './index.less'
import classnames from 'classnames'

type homeCardProps = {
    title?: string | ReactElement
    titleDivider?: boolean
    titleExtra?: any
    loading?: boolean
    borderRadius?: number
    className?: string
    contentClassName?: string
    needTitleLine?: boolean | undefined
    style?: any
}

const HomeCard: FC<homeCardProps> = ({
    children,
    title,
    titleDivider,
    titleExtra,
    loading,
    borderRadius = 5,
    className,
    contentClassName,
    needTitleLine,
    style
}) => {
    return (
        <div className={classnames(className, styles['custom-card'])} style={{ borderRadius, ...style }}>
            {loading ? (
                <Skeleton active />
            ) : (
                <>
                    {title && (
                        <div className={styles['title']}>
                            {needTitleLine ? <span className={styles['title-line']}>{title}</span> : <span>{title}</span>}

                            {titleExtra && <span>{titleExtra}</span>}
                        </div>
                    )}
                    {titleDivider && <Divider style={{ margin: '16px auto' }} />}
                    <div
                        className={classnames(styles['content'], contentClassName, {
                            [styles['no-title']]: !title,
                            [styles['has-title-divider']]: titleDivider && !!title
                        })}
                    >
                        {children}
                    </div>
                </>
            )}
        </div>
    )
}

export default HomeCard
