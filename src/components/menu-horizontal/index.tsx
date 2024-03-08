import React, { FC, Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { RouteList } from '@/routes/render-route'
import { Card } from '@antd'
import TabBar from './tab-bar'
import styles from './index.less'

type MenuHorizontalProps = {
    childList: RouteList[]
    excludeRouter?: string[] | undefined // 其中的路由不包含菜单
    type?: 'merge' | 'separate'
    noCard?: boolean // type === 'merge' 时生效
}

const MenuHorizontal: FC<MenuHorizontalProps> = ({ childList, children, type = 'separate', noCard, excludeRouter }) => {
    const location = useLocation()
    const { pathname } = location

    const [noTabBar, setNoTabBar] = useState<boolean | undefined>(false)
    useEffect(() => {
        const noTabBarStatus = excludeRouter?.some((list) => pathname.includes(list))
        setNoTabBar(noTabBarStatus)
    }, [pathname])

    if (type === 'merge') {
        return noCard ? (
            <Fragment>
                {!noTabBar && <TabBar menu={childList} type={type} />}
                <div>{children}</div>
            </Fragment>
        ) : noTabBar ? (
            <div>{children}</div>
        ) : (
            <Card bodyStyle={{ paddingTop: 6 }} style={{ minHeight: 500 }}>
                <TabBar menu={childList} type={type} />

                <div>{children}</div>
            </Card>
        )
    }

    return (
        <Fragment>
            {!noTabBar && <TabBar menu={childList} type={type} />}

            <div className={styles['children-wrapper']}>{children}</div>
        </Fragment>
    )
}

export default MenuHorizontal
