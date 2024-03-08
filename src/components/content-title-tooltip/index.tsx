import React, { Fragment, useMemo, FC } from 'react'
import { Tooltip, Divider } from 'antd'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { QuestionCircleFilled } from '@ant-design/icons'
import styles from './index.less'
import { isArray } from '@/utils/judge-type'

import { changePlaceholder } from '@/utils/levelsTipMap'
import isObject from '../virtuallist-antd-copy/tool/isObject'

interface ContentProps {
    title?: string
    describe?: string
    top?: string[]
    bottom?: string[]
    legendExplain?: anyObject
}

interface ContentTitleTooltipProps {
    text?: string | React.ReactElement
    content?: ContentProps
    labelStyle?: any
    frontText?: string // 前置信息
    dictName?: string
    labelDictName?: string // key必须与dictName相同
    className?: string
    noTextIndent?: boolean
    placement?: string
    marginLeft?: number
    iconColor?: string
}

const ContentTitleTooltip: FC<ContentTitleTooltipProps> = ({
    text,
    content,
    dictName,
    labelDictName,
    className,
    noTextIndent,
    labelStyle,
    iconColor = '#C8C8C8',
    frontText,
    marginLeft = 8,
    placement = 'bottomLeft'
}) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const dictData = dictName ? dict[dictName] : null
    const labelDictData = labelDictName ? dict[labelDictName] : null
    const dictArr = dictData && Object.values(dictData)
    if (dictName === 'licenseRiskLevel' && dictArr?.length) {
        dictArr.reverse()
    }

    const getDom = (list: any) => {
        let dom = list
        if (isArray(list)) {
            dom = list?.map((item, i) =>
                isObject(item) ? (
                    <Link key={i} to={item.link} style={{ margin: '0 2px' }}>
                        {item.name}
                    </Link>
                ) : (
                    item
                )
            )
        }
        return dom
    }

    const tipDom = useMemo(() => {
        const { title = '', top = [], bottom = [], describe = '', legendExplain } = content || {}
        return (
            <div className={styles['tooltip-wrapper']}>
                {title && <div className={styles['tooltip-wrapper-title']}>{title}</div>}
                {describe && (
                    <>
                        <div className={styles['describe']}>{describe}</div>
                        <Divider style={{ margin: '8px 0' }} />
                    </>
                )}

                {top?.map((list: string) => (
                    <div
                        key={list}
                        className={classnames(styles['tooltip-wrapper-content'], {
                            [styles['no-text-indent']]: !!noTextIndent
                        })}
                    >
                        {getDom(list)}
                    </div>
                ))}
                {dictArr?.length ? (
                    <div className={styles['color-wrapper']}>
                        {dictArr?.map(({ key, value, color }: any) => (
                            <div key={key} className={styles['color-block']}>
                                {labelDictData && <span className={styles['color-name']}>{labelDictData[key]?.value}:</span>}

                                <span style={{ background: color }} className={styles['color']}>
                                    {`${frontText ? `${frontText}：` : ''}`}
                                    {value}
                                </span>

                                {legendExplain?.[key] ? (
                                    <span className={styles['legend-text']}>{changePlaceholder(legendExplain[key], value)}</span>
                                ) : (
                                    <Fragment />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Fragment />
                )}
                {bottom?.map((list: string) => (
                    <div
                        key={list}
                        className={classnames(styles['tooltip-wrapper-content'], {
                            [styles['no-text-indent']]: !!noTextIndent
                        })}
                    >
                        {getDom(list)}
                    </div>
                ))}
            </div>
        )
    }, [content])

    return (
        <div className={classnames(styles['title'], className)} style={labelStyle}>
            {text || ''}
            {content ? (
                <Tooltip
                    title={tipDom}
                    placement={placement}
                    className={styles['reset-tooltip']}
                    arrowPointAtCenter={true}
                    color="#fff"
                    overlayInnerStyle={{ width: 310 }}
                    getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
                >
                    <QuestionCircleFilled style={{ marginLeft, color: iconColor }} />
                </Tooltip>
            ) : (
                <Fragment />
            )}
        </div>
    )
}

export default ContentTitleTooltip
