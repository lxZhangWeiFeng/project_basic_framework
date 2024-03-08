import React, { FC } from 'react'
import { RouteList } from '@/routes/render-route'
import Sidebar from './side-bar'
import styles from './index.less'

type SystemProps = {
    childList: RouteList[]
    title?: string
}

const MenuVertical: FC<SystemProps> = ({ children, childList, title }) => {
    const Inner = (
        <div className={styles['warp']}>
            <Sidebar menu={childList} />
            <div className={styles['child-warp']}>{children}</div>
        </div>
    )

    return (
        <>
            {title ? (
                <>
                    <div className={styles['title']}>{title}</div>
                    <div className={styles['title-bottom']}>{Inner}</div>
                </>
            ) : (
                Inner
            )}
        </>
    )
}

// hoc
const MenuVerticalHoc = (title?: string): FC<any> => {
    const Inner: FC<any> = (props) => {
        return <MenuVertical {...props} title={title} />
    }

    return Inner
}

export { MenuVerticalHoc }
export default MenuVertical
