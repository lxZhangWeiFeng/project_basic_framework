import React, { useState, useLayoutEffect, FC, ReactElement } from 'react'
import { Menu } from 'antd'
import { Card } from '@antd'
import { useLocation, useHistory, generatePath, useParams } from 'react-router-dom'
import { RouteList } from '@/routes/render-route'
import styles from './index.less'
import * as nodePath from 'path'
import Icon from '@/components/icon'

const { Item, SubMenu } = Menu

interface MenusProps {
    menu: RouteList[]
}

export const splitPathname = (pathname: string): string[] => {
    const res: string[] = []
    const pathList = pathname.split('/')
    pathList.forEach((item) => {
        if (item) res.unshift(nodePath.join('/', res[0] || '', item))
    })
    return res
}

const Menus: FC<MenusProps> = ({ menu }) => {
    const matchParams = useParams()
    const location = useLocation()
    const history = useHistory()
    const { pathname } = location
    const [selectedKey, setSelectedKey] = useState('')
    const [openKey, setOpenKey] = useState<string[]>([])

    useLayoutEffect(() => {
        if (pathname !== selectedKey) {
            setOpenKey(splitPathname(pathname))
            setSelectedKey(pathname)
        }
    }, [pathname])

    const onClick = ({ key }: any): void => {
        if (pathname !== key) history.push(key)
    }

    const menus = (items: any): ReactElement => {
        return items?.map(({ path, title, routes, redirect, hidden, icon }: any) => {
            const titleDom = (
                <span>
                    <Icon name={icon} style={{ marginRight: 3 }} />
                    {title}
                </span>
            )

            return routes?.length ? (
                <SubMenu title={titleDom} key={generatePath(path, matchParams)}>
                    {menus(routes)}
                </SubMenu>
            ) : (
                !redirect && !hidden && <Item key={generatePath(path, matchParams)}>{titleDom}</Item>
            )
        })
    }

    return (
        <div className={styles['menu']}>
            <Card bodyStyle={{ padding: 0 }}>
                <Menu selectedKeys={[selectedKey]} onClick={onClick} mode="inline" openKeys={openKey} onOpenChange={setOpenKey as any}>
                    {menus(menu)}
                </Menu>
            </Card>
        </div>
    )
}

export default Menus
