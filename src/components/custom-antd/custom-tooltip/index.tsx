/**
 * @description 自定义样式，对展示区域做出一些限制
 */

import React, { FC } from 'react'
import { Tooltip as AntdTooltip, TooltipProps } from 'antd'
import styles from './index.less'

const Tooltip: FC<TooltipProps> = (props) => {
    return <AntdTooltip overlayClassName={styles['tooltip']} getPopupContainer={(triggerNode: any) => triggerNode.parentElement} {...props} />
}

export default Tooltip
