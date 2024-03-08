import React, { FC, Fragment, useContext } from 'react'
import Icon from '@/components/icon'
import classNames from 'classnames'
import styles from './index.less'
import { isArray } from '@/utils/judge-type'
import CollapseMenu from '../collapse-menu'
import MenuContext from '../menu-context'
import { SameProps } from '../menu-item'

type MenuItemProps = {
    collapseOver?: boolean
    index: number
} & SameProps

const MenuItem: FC<MenuItemProps> = (props) => {
    const { openKeys, setOpenKeys, isSelect, menuClick } = useContext(MenuContext)
    const { title, path, routes, collapseOver = true, index } = props
    const haveRoutes = isArray(routes) && routes.filter(({ redirect, hidden }) => !redirect && !hidden).length > 0

    // 百叶窗的 visible
    const collapseShow = openKeys[path] || false
    const setCollapseShow = (x: boolean) => setOpenKeys({ ...openKeys, [path]: x })

    return (
        <Fragment>
            <div className={styles['item']} onClick={(): any => (!haveRoutes ? menuClick(path) : setCollapseShow(!collapseShow))}>
                <div
                    className={classNames(styles['text'], {
                        [styles['selected']]: !haveRoutes && isSelect(path)
                    })}
                    style={{ paddingLeft: 61 + index * 12 }}
                >
                    <span className={classNames(styles['title'])}>{title}</span>
                    {haveRoutes && <Icon className={classNames(styles['arrow'], { [styles['open']]: collapseShow })} name="right" />}
                </div>
            </div>

            {haveRoutes && collapseOver && <CollapseMenu collapseShow={collapseShow} routes={routes} index={index} />}
        </Fragment>
    )
}

export default MenuItem
