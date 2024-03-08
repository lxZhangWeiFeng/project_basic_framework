import React, { FC, Fragment } from 'react'
import { Card, Divider, CardProps, Skeleton } from 'antd'
import styles from './index.less'
import classNames from 'classnames'

interface CustomCardProps extends CardProps {
    style?: any
    className?: string
    hiddenLine?: boolean
    loading?: boolean
    nativeTitle?: any
    title?: any
    bordered?: boolean
    noCard?: boolean
}

const CustomCard: FC<CustomCardProps> = (props) => {
    const { children, bordered = false, hiddenLine = false, loading = false, title, className, nativeTitle, noCard = false, ...cardProps } = props

    const titleDom = (
        <Fragment>
            {!nativeTitle && title && (
                <Fragment>
                    <div className={styles['title']}>{title}</div>
                    {!hiddenLine && <Divider />}
                </Fragment>
            )}
        </Fragment>
    )

    const Inner = (
        <Fragment>
            {titleDom}
            <Skeleton loading={loading} active>
                {children}
            </Skeleton>
        </Fragment>
    )

    return noCard ? (
        Inner
    ) : (
        <Card className={classNames(styles['wrapper'], className)} bordered={bordered} title={nativeTitle} {...cardProps}>
            {Inner}
        </Card>
    )
}

export default CustomCard
