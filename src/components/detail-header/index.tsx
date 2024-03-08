import React, { FC, useEffect, useCallback, Fragment } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames'
import urlString from '@/utils/url-string'
import Icon from '@/components/icon'
import ModeSwitch from '@/components/selection-mode/mode-switch'
import { Card } from '@antd'

import { getValue, setValue } from './util'
import styles from './index.less'
import { Skeleton } from 'antd'

type DetailHeaderProps = {
    title: string | React.ReactElement
    lineTwo?: JSX.Element
    rightBlock?: JSX.Element | string
    titleRight?: string | JSX.Element
    titleLeft?: string | JSX.Element
    noCard?: boolean
    name: string
    hiddenSelectionMode?: boolean
    hiddenBack?: boolean | undefined
    secondFloorDom?: JSX.Element | undefined
    loading?: boolean | undefined
}

const DetailHeader: FC<DetailHeaderProps> = ({
    title,
    titleLeft,
    titleRight,
    lineTwo,
    rightBlock,
    noCard,
    name,
    hiddenSelectionMode,
    hiddenBack,
    secondFloorDom,
    loading
}) => {
    const history = useHistory()

    const { params } = useParams<any>()
    const { belongTo } = params ? (urlString.parse(params) as anyObject) : ({} as any)
    const location = useLocation<any>()
    const { state } = location
    const { backUrl, backState } = state || {}
    const { notClear } = backState || {}
    const isKnowledge = /knowledge/.test(belongTo)

    useEffect(() => {
        setValue(name, backUrl)
    }, [])

    //! 当进入详情页 且redirect生效时，会刷新state，导致无法触发notClear判断
    const goBack = useCallback(() => {
        const back = getValue(name)
        if (back) {
            history.push(back, { notClear })
        } else {
            history.go(-1)
        }
    }, [])

    const inner = (className?: string) => (
        <Fragment>
            {isKnowledge && !hiddenSelectionMode && (
                <div className={styles['handle-wrapper']}>
                    <ModeSwitch />
                </div>
            )}
            <div className={classNames(styles['wrapper'], className)}>
                <Skeleton loading={loading} active>
                    {!hiddenBack && (
                        <div className={styles['back']} onClick={goBack}>
                            <Icon name="back" />
                        </div>
                    )}

                    <div className={styles['left-block']}>
                        <div className={styles['line-one']}>
                            {titleLeft && <div className={styles['title-left']}>{titleLeft}</div>}
                            <div className={styles['title']}>{title || '-'}</div>
                            {titleRight && <div className={styles['title-right']}>{titleRight}</div>}
                        </div>
                        {lineTwo && <div className={styles['line-two']}>{lineTwo}</div>}
                    </div>
                    {rightBlock && <div className={styles['right-block']}>{rightBlock}</div>}
                </Skeleton>
            </div>
            {secondFloorDom || <Fragment />}
        </Fragment>
    )

    if (noCard) {
        return inner(styles['no-card'])
    } else {
        return (
            <Card bodyStyle={{ padding: 0 }} className={styles['no-overflow-hidden']}>
                {inner()}
            </Card>
        )
    }
}

export default DetailHeader
