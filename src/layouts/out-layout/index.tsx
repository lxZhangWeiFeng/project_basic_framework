import React, { FC, useState } from 'react'
import ThemeContext, { themeType } from '../../context/theme-context'
import styles from './index.less'

// 最外部的layout，负责获取全局的一些数据
const OutLayout: FC = ({ children }) => {
    const [layoutType, setLayoutType] = useState<themeType>('vertical')

    return (
        <ThemeContext.Provider value={{ layoutType, setLayoutType }}>
            <div className={styles['out-layout']}>{children}</div>
        </ThemeContext.Provider>
    )
}

export default OutLayout
