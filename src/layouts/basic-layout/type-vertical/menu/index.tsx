import React, { Fragment, FC, useState, useEffect } from 'react'
import Icon from '@/components/icon'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import MenuContext from './menu-context'
import MenuItem from './menu-item'
import styles from './index.less'

export const getHaveItem = ({ redirect, hidden }: any) => !redirect && !hidden

export const getKey = ({ path, redirect, title }: any) => `${path}${redirect}${title}`

type BasicMenuProps = {
    childList: any[]
    hiddenMenu: boolean
    // changeHiddenMenu: anyFunction
}

const BasicMenu: FC<BasicMenuProps> = ({
    childList,
    hiddenMenu
    // changeHiddenMenu
}) => {
    const history = useHistory()
    // const { state } = useLocation()
    // const { backUrl } = (state || {}) as any
    const { pathname } = useLocation()
    const [selectedKey, setSelectedKey] = useState<string>('')
    const [openKeys, setOpenKeys] = useState({})

    useEffect(() => {
        if (pathname !== selectedKey) {
            setSelectedKey(pathname)
        }
    }, [pathname])

    const isSelect = (path: string): boolean => new RegExp(`^${path}$`).test(selectedKey) || new RegExp(`^${path}/`).test(selectedKey)

    const menuClick = (key: string): void => {
        if (pathname !== key) history.push(key)
    }

    return (
        <div className={classNames(styles['menu'])}>
            <div className={classNames(styles['logo'])} style={{ cursor: 'pointer' }} onClick={(): void => menuClick('/home')}>
                <Icon className={classNames(styles['icon'])} name="logo" />
                {!hiddenMenu && <span className={styles['title']}>明道</span>}
            </div>
            <div className={styles['item-box']}>
                <MenuContext.Provider value={{ openKeys, setOpenKeys, hiddenMenu, isSelect, menuClick }}>
                    {childList.map((item) => {
                        const { title, path, icon, routes, noCollapse } = item
                        const haveItem = getHaveItem(item)
                        const key = getKey(item)
                        const innerProps = { title, path, icon, routes, noCollapse }
                        return <Fragment key={key}>{haveItem && <MenuItem {...innerProps} />}</Fragment>
                    })}
                </MenuContext.Provider>
            </div>
            {/* <div className={styles['put-away-item']}>
                <span className={styles['put-away-icon']} onClick={changeHiddenMenu}>
                    <Icon
                        name="put-away"
                        className={classNames(styles['default-class'], {
                            [styles['put-away-icon']]: hiddenMenu
                        })}
                    />
                </span>
            </div> */}
        </div>
    )
}

export default BasicMenu
