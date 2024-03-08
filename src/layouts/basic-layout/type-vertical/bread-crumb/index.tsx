import React, { createElement, FC, useContext, useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import styles from './index.less'
import BreadCrumbContext from '@/context/bread-crumb-context'
import { useHistory, useLocation } from 'react-router-dom'

const BreadCrumb: FC<{ childList: any[] }> = ({ childList }) => {
    const [home, setHome] = useState<any>({})
    const { pathname } = useLocation()
    const history = useHistory()
    const { list, replace } = useContext(BreadCrumbContext)

    useEffect(() => {
        childList.some((item: any) => {
            const { path, title } = item || {}
            if (path === '/home') {
                setHome({ path, title, click: true })
                return true
            }
        })
    }, [childList])

    const allList = list.some(({ path }) => path === '/home') ? list : [home, ...list]
    return (
        <div className={styles['wrapper']}>
            <Breadcrumb>
                {allList.map(({ path, title, titleReplace, click }, i) => {
                    return (
                        <Breadcrumb.Item key={i}>
                            {createElement(click ? 'a' : 'span', {
                                style: { cursor: click ? 'pointer' : 'default' },
                                onClick: () => click && path !== pathname && history.replace({ pathname: path }),
                                children: replace[titleReplace] || title
                            })}
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumb
