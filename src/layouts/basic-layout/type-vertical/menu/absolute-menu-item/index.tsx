import React, { FC, useRef, useState, useContext } from 'react'
import Icon from '@/components/icon'
import classNames from 'classnames'
import styles from './index.less'
import { isArray } from '@/utils/judge-type'
import AbsoluteMenu from '../absolute-menu'
import MenuContext from '../menu-context'
import { SameProps } from '../menu-item'
import { splitPathname } from '@/components/menu-vertical/side-bar'

type MenuItemProps = {
    closeAllAbsoluteShow: anyFunction
} & SameProps

const MenuItem: FC<MenuItemProps> = (props) => {
    const ref = useRef<any>(null)
    const { isSelect, menuClick, setOpenKeys, openKeys } = useContext(MenuContext)
    const { title, path, routes, closeAllAbsoluteShow } = props
    const haveRoutes = isArray(routes) && routes.filter(({ redirect, hidden }) => !redirect && !hidden).length > 0
    // 绝对定位的 visible
    const [absoluteShow, setAbsoluteShow] = useState(false)

    const getSplitPath = () => {
        const res: Record<string, boolean> = {}
        const list = splitPathname(path)
        list.forEach((item) => {
            res[item] = true
        })
        return res
    }

    const onClick = () => {
        if (!haveRoutes) {
            closeAllAbsoluteShow()
            menuClick(path)
            setOpenKeys({
                ...openKeys,
                ...getSplitPath()
            })
        }
    }

    return (
        <div
            ref={ref}
            className={classNames(styles['item'])}
            onMouseEnter={() => haveRoutes && setAbsoluteShow(true)}
            onMouseLeave={() => haveRoutes && setAbsoluteShow(false)}
            onClick={onClick}
        >
            <div
                className={classNames(styles['text'], {
                    [styles['selected']]: !haveRoutes && isSelect(path)
                })}
            >
                {<span className={styles['title']}>{title}</span>}
                {haveRoutes && <Icon className={classNames(styles['arrow'])} name="right" />}
            </div>

            {haveRoutes && (
                <AbsoluteMenu
                    itemRef={ref.current}
                    absoluteShow={absoluteShow}
                    closeAllAbsoluteShow={() => {
                        closeAllAbsoluteShow()
                        setAbsoluteShow(false)
                    }}
                    routes={routes}
                />
            )}
        </div>
    )
}

export default MenuItem
