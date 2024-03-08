import React, { useState, useLayoutEffect, FC, useEffect, useRef } from 'react'
import { Tabs } from 'antd'
import { Card } from '@antd'
import { useLocation, useHistory, useParams, generatePath } from 'react-router-dom'
import { RouteList } from '@/routes/render-route'
import Icon from '@/components/icon'
import styles from './index.less'

interface MenusProps {
    menu: RouteList[]
    type: 'merge' | 'separate'
}

const Menus: FC<MenusProps> = ({ menu, type }) => {
    const matchParams = useParams()
    const location = useLocation()
    const history = useHistory()
    const { pathname } = location
    const [selectedKey, setSelectedKey] = useState('')
    const [animated, setAnimated] = useState(false)

    const timer: any = useRef(null)

    useEffect(() => {
        // 等待渲染完成后再进行动画
        timer.current = setTimeout(() => setAnimated(true), 500)

        return () => {
            clearTimeout(timer.current)
            timer.current = null
        }
    }, [])

    useLayoutEffect(() => {
        if (pathname !== selectedKey) {
            menu.forEach(({ path }: any) => {
                const truePath = generatePath(path, matchParams)
                if (pathname.includes(truePath)) {
                    setSelectedKey(truePath)
                }
            })
        }
    }, [pathname])

    const onClick = (key: any): void => {
        if (pathname !== key) history.push(key)
    }

    const inner = (
        <Tabs activeKey={selectedKey} onChange={onClick} className={styles[type]} animated={animated}>
            {menu?.map(({ path, title, redirect, hidden, icon }: any) => {
                return (
                    !redirect &&
                    !hidden && (
                        <Tabs.TabPane
                            key={generatePath(path, matchParams)}
                            tab={
                                <span>
                                    <Icon name={icon} style={{ marginRight: 3 }} />
                                    {title}
                                </span>
                            }
                        />
                    )
                )
            })}
        </Tabs>
    )

    return type === 'merge' ? inner : <Card bodyStyle={{ padding: 0 }}>{inner}</Card>
}

export default Menus
