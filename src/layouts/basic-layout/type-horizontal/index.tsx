import React, { FC } from 'react'

import Menu from './menu'
import styles from './index.less'
import Icon from '@/components/icon'

// 基础的layout，负责构建基本框架
const BasicLayout: FC<{ childList: any[]; allList?: any[] }> = ({ children, childList }) => {
    return (
        <div className={styles['basic-layout']}>
            <div className={styles['top-wrapper']}>
                <Menu childList={childList} />
            </div>
            <div className={styles['content-wrapper']}>{children}</div>
            <div className={styles['footer']}>Copyright © 杭州孝道科技有限公司</div>
        </div>
    )
}

export default BasicLayout
