import React, { FC, Fragment } from 'react'
import TypeVertical from './type-vertical'

// 基础的layout，负责构建基本框架
const BasicLayout: FC<{ childList: any[] }> = (props) => {
    return (
        <Fragment>
            <TypeVertical {...props} />
        </Fragment>
    )
}

export default BasicLayout
