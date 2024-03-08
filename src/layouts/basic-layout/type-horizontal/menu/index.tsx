import React, { FC, useState, useEffect } from 'react'
import Icon from '@/components/icon'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import classNames from 'classnames'
import styles from './index.less'

type BasicMenuProps = {
    childList: any[]
}

const BasicMenu: FC<BasicMenuProps> = ({ childList }) => {
    const history = useHistory()

    const { pathname } = useLocation()
    const [selectedKey, setSelectedKey] = useState<string[]>([])

    const items = childList?.map(({ title, path, icon }) => ({
        label: title,
        key: path,
        icon: <Icon name={icon} />
    }))

    useEffect(() => {
        if (pathname !== selectedKey[0]) {
            setSelectedKey([pathname])
        }
    }, [pathname])

    // const isSelect = (path: string): boolean => new RegExp(`^${path}$`).test(selectedKey) || new RegExp(`^${path}/`).test(selectedKey)

    const menuClick = ({ key }: any): void => {
        if (pathname !== key) history.push(key)
    }

    return (
        <div className={styles['menu']}>
            <div className={styles['logo']} style={{ cursor: 'pointer' }} onClick={(): void => menuClick({ key: '/home' })}>
                <Icon name="logo-filled" size={28} color="#41A6FC" style={{ marginRight: 16 }} />
                <span>SCA工具箱</span>
            </div>
            <div className={styles['item-box']}>
                <Menu items={items} mode="horizontal" selectedKeys={selectedKey} onClick={menuClick} />
            </div>
        </div>
    )
}

export default BasicMenu
