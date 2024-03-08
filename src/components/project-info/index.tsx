import React, { Fragment } from 'react'
import { Button, Popover, PopoverProps } from 'antd'
import { Link } from 'react-router-dom'
import { isFunction, isNumber } from '@/utils/judge-type'
import HistoryWrapper from '@/components/history-wrapper'

import styles from './index.less'

interface RowKeysProps {
    id?: string
    name?: string
}
interface Props extends PopoverProps {
    projectNames: any[]
    chunkLength?: number
    children: React.ReactChild
    showValue?: (obj: any) => string
    rowKeys?: RowKeysProps
    onClick?: Function
    to?: Function
    target?: '_self' | '_blank'
    isLink?: Function
    ellipse?: number // 超过多少省略
}

const ProjectInfo = ({
    children,
    projectNames: sendProjectNames,
    // chunkLength = 3,
    showValue,
    onClick,
    rowKeys = { id: 'id', name: 'name' },
    to,
    target = '_self',
    placement,
    isLink,
    ellipse
}: Props) => {
    const needClick = isFunction(onClick)
    const needEllipse = !needClick && !!isNumber(ellipse) && sendProjectNames?.length > ellipse

    const projectNames = needEllipse ? sendProjectNames.slice(0, ellipse) : sendProjectNames

    const content = (
        <div className={styles['content-warp']} style={projectNames?.length > 1 ? {} : { textAlign: 'center' }}>
            {projectNames?.map((item: any, k) => {
                const isLinked = (isFunction(isLink) && isLink(item)) || !isFunction(isLink)
                return needClick ? (
                    <HistoryWrapper key={item[rowKeys.id || 'id']}>
                        {({ location }) => (
                            <Link
                                onClick={() => {
                                    needClick && onClick({ item })
                                }}
                                target={target}
                                to={
                                    isLinked
                                        ? to
                                            ? isFunction(to)
                                                ? to({ location, item })
                                                : to
                                            : {
                                                  pathname: `/project/detail/${item[rowKeys.id || 'id']}/overview`,
                                                  state: {
                                                      backUrl: location.pathname,
                                                      replaceTitle: { projectName: item[rowKeys.name || 'name'] }
                                                  }
                                              }
                                        : false
                                }
                            >
                                <Button
                                    style={{ marginBottom: 8, marginRight: projectNames?.length === k + 1 ? 0 : 8 }}
                                    type={isLinked ? 'primary' : 'default'}
                                    ghost={isLinked}
                                    disabled={!isLinked}
                                    className={styles['tip-btn']}
                                    // onClick={() => {
                                    //     if (onClick) {
                                    //         onClick({ history, location, item })
                                    //     } else {
                                    //         history.push(`/project/detail/${item[rowKeys.id || 'id']}/overview`, {
                                    //             backUrl: location.pathname,
                                    //             replaceTitle: { projectName: item[rowKeys.name || 'name'] }
                                    //         })
                                    //     }
                                    // }}
                                >
                                    {showValue ? showValue(item) : item[rowKeys.name || 'name']}
                                </Button>
                            </Link>
                        )}
                    </HistoryWrapper>
                ) : (
                    <Button
                        className={styles['tip-btn']}
                        type="default"
                        style={{ marginBottom: 8, marginRight: projectNames?.length === k + 1 && !needEllipse ? 0 : 8, cursor: 'default' }}
                    >
                        {showValue ? showValue(item) : item[rowKeys.name || 'name']}
                    </Button>
                )
            })}
            {needEllipse ? (
                <Button className={styles['tip-btn']} type="default" style={{ cursor: 'default' }}>
                    ......
                </Button>
            ) : (
                <Fragment />
            )}
        </div>
    )
    // const content = (
    //     <div className={styles['content-warp']} style={projectNames?.length > 1 ? {} : { textAlign: 'center' }}>
    //         {chunk(projectNames, chunkLength)?.map((list: { name: string; id: number }[], i: number) => (
    //             <div key={i}>
    //                 {list?.map((item: any, k) => {
    //                     const isLinked = (isFunction(isLink) && isLink(item)) || !isFunction(isLink)
    //                     return needClick ? (
    //                         <HistoryWrapper key={item[rowKeys.id || 'id']}>
    //                             {({ location }) => (
    //                                 <Link
    //                                     onClick={() => {
    //                                         needClick && onClick({ item })
    //                                     }}
    //                                     target={target}
    //                                     to={
    //                                         isLinked
    //                                             ? to
    //                                                 ? isFunction(to)
    //                                                     ? to({ location, item })
    //                                                     : to
    //                                                 : {
    //                                                       pathname: `/project/detail/${item[rowKeys.id || 'id']}/overview`,
    //                                                       state: {
    //                                                           backUrl: location.pathname,
    //                                                           replaceTitle: { projectName: item[rowKeys.name || 'name'] }
    //                                                       }
    //                                                   }
    //                                             : false
    //                                     }
    //                                 >
    //                                     <Button
    //                                         style={{ marginBottom: 8, marginRight: projectNames?.length === k + 1 ? 0 : 8 }}
    //                                         type={isLinked ? 'primary' : 'default'}
    //                                         ghost={isLinked}
    //                                         disabled={!isLinked}
    //                                         className={styles['tip-btn']}
    //                                         // onClick={() => {
    //                                         //     if (onClick) {
    //                                         //         onClick({ history, location, item })
    //                                         //     } else {
    //                                         //         history.push(`/project/detail/${item[rowKeys.id || 'id']}/overview`, {
    //                                         //             backUrl: location.pathname,
    //                                         //             replaceTitle: { projectName: item[rowKeys.name || 'name'] }
    //                                         //         })
    //                                         //     }
    //                                         // }}
    //                                     >
    //                                         {showValue ? showValue(item) : item[rowKeys.name || 'name']}
    //                                     </Button>
    //                                 </Link>
    //                             )}
    //                         </HistoryWrapper>
    //                     ) : (
    //                         <Button
    //                             className={styles['tip-btn']}
    //                             type="default"
    //                             style={{ marginBottom: 8, marginRight: projectNames?.length === k + 1 ? 0 : 8, cursor: 'default' }}
    //                         >
    //                             {showValue ? showValue(item) : item[rowKeys.name || 'name']}
    //                         </Button>
    //                     )
    //                 })}
    //             </div>
    //         ))}
    //     </div>
    // )

    return (
        <Popover
            content={!!projectNames?.length && content}
            trigger="hover"
            placement={placement}
            getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
            // visible
            // overlayInnerStyle={{ minWidth: 200 }}
            overlayStyle={{ minWidth: 216 }}
        >
            <span className={styles['pointer']}>{children}</span>
        </Popover>
    )
}

export default ProjectInfo
