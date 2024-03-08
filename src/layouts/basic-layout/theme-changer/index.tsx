import React, { FC, useContext } from 'react'
import { Dropdown, Menu, Button } from 'antd'
import Icon from '@/components/icon'
import ThemeContext, { layoutTypeList } from '@/context/theme-context'
import styles from './index.less'

const ThemeChanger: FC = () => {
    const { layoutType, setLayoutType } = useContext(ThemeContext)

    const menu = (
        <Menu selectedKeys={[layoutType]} onClick={({ key }: any) => setLayoutType(key)}>
            {layoutTypeList.map(({ key, value }) => (
                <Menu.Item key={key}>{value}</Menu.Item>
            ))}
        </Menu>
    )

    return (
        <Dropdown overlay={menu} placement="topCenter" arrow>
            <Button className={styles['theme-changer']} shape="circle" size="large">
                <Icon name="theme" />
            </Button>
        </Dropdown>
    )
}

export default ThemeChanger
