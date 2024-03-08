/**
 * @description 携带 modal 的 Button 组件，modal和button高度绑定
 */

import React, { FC } from 'react'
import { Button, ButtonProps, Tooltip } from 'antd'
import { isFunction, isString } from '@/utils/judge-type'
import Icon from '@/components/icon'

type ButtonWithModalProps = ButtonProps & {
    modal?: JSX.Element
    tooltip?: string
}

const ButtonWithModal: FC<ButtonWithModalProps> = ({ modal, children, onClick, icon, style, tooltip, ...props }) => {
    // const newStyle = !children ? { padding: '4px 8px' } : {}
    const newOnClick: React.MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation()
        if (isFunction(onClick)) onClick(e)
    }

    const newIcon = icon ? (
        <span style={children ? { marginRight: 5, marginLeft: -5 } : {}}>{isString(icon) ? <Icon name={icon} /> : icon}</span>
    ) : null

    const ButtonDom = (
        <Button onClick={newOnClick} style={{ ...style }} {...props} icon={newIcon}>
            {children}
        </Button>
    )

    return (
        <span>
            {tooltip ? <Tooltip title={tooltip}>{ButtonDom}</Tooltip> : ButtonDom}
            {!!modal && <span onClick={(e) => e.stopPropagation()}>{modal}</span>}
        </span>
    )
}

export default ButtonWithModal
