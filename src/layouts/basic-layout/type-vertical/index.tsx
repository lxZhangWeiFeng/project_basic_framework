import React, { FC } from 'react'

import Menu from './menu'
import styles from './index.less'
import classNames from 'classnames'

// 基础的layout，负责构建基本框架
const BasicLayout: FC<{ childList: any[]; allList?: any[] }> = ({ children, childList }) => {
    return (
        <div className={classNames(styles['basic-layout'], styles['hidden'])}>
            <div className={styles['left-menu']}>
                <Menu childList={childList} hiddenMenu={true} />
            </div>
            <div className={styles['right-content']}>
                <div className={styles['child']} id="scroll-root">
                    {children}
                    <div className={styles['footer']}>Copyright © 杭州孝道科技有限公司</div>
                </div>
            </div>
        </div>
    )
}

export default BasicLayout
