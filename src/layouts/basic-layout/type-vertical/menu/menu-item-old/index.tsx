import React, { FC, Fragment, useRef, useState, useContext } from 'react'
import Icon from '@/components/icon'
import classNames from 'classnames'
import styles from './index.less'
import { isArray } from '@/utils/judge-type'
import { Tooltip } from 'antd'
import AbsoluteMenu from '../absolute-menu'
import CollapseMenu from '../collapse-menu'
import MenuContext from '../menu-context'

export type SameProps = {
    title: string
    path: string
    icon: string
    routes: any[]
    noCollapse?: boolean // * menu-control中配置， 用于主菜单下直接展示tab使用
}

type MenuItemProps = SameProps

const MenuItem: FC<MenuItemProps> = (props) => {
    const ref = useRef<any>(null)
    const { openKeys, setOpenKeys, isSelect, hiddenMenu, menuClick } = useContext(MenuContext)
    const { title, path, icon, routes, noCollapse } = props
    const haveRoutes = !noCollapse && isArray(routes) && routes.filter(({ redirect, hidden }) => !redirect && !hidden).length > 0
    // 绝对定位的 visible
    const [absoluteShow, setAbsoluteShow] = useState(false)
    // 百叶窗的 visible
    const collapseShow = openKeys[path] || false
    const setCollapseShow = (x: boolean) => setOpenKeys({ ...openKeys, [path]: x })

    const haveCollapse = haveRoutes && !hiddenMenu
    const haveAbsolute = haveRoutes && hiddenMenu

    return (
        <Fragment>
            <div
                ref={ref}
                className={classNames(styles['item'])}
                onClick={(): any => (!haveRoutes ? menuClick(path) : haveCollapse && setCollapseShow(!collapseShow))}
                onMouseEnter={() => haveAbsolute && setAbsoluteShow(true)}
                onMouseLeave={() => haveAbsolute && setAbsoluteShow(false)}
            >
                <Tooltip placement="right" title={!haveRoutes && hiddenMenu ? title : ''}>
                    <div
                        className={classNames(styles['text'], {
                            [styles['selected']]: !haveRoutes && isSelect(path)
                        })}
                    >
                        <span className={styles['icon']}>
                            <Icon name={icon} />
                        </span>
                        {!hiddenMenu && <span className={styles['title']}>{title}</span>}
                        {!hiddenMenu && haveRoutes && (
                            <Icon className={classNames(styles['arrow'], { [styles['open']]: haveCollapse && collapseShow })} name="right" />
                        )}
                    </div>
                </Tooltip>

                {haveAbsolute && (
                    <AbsoluteMenu
                        itemRef={ref.current}
                        absoluteShow={absoluteShow}
                        closeAllAbsoluteShow={() => setAbsoluteShow(false)}
                        routes={routes}
                    />
                )}
            </div>

            {haveCollapse && <CollapseMenu collapseShow={collapseShow} routes={routes} />}
        </Fragment>
    )
}

export default MenuItem
