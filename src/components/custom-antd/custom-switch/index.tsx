/**
 * @description 自定义内部状态，拦截onClick的Promise请求失败的情况
 */

import React, { FC } from 'react'
import { Switch as AntdSwitch, SwitchProps } from 'antd'
import { useStateFromValue } from '@/hooks'
import { isFunction } from '@/utils/judge-type'

type CustomSwitchProps = SwitchProps & {
    onClick?: (c?: boolean, e?: MouseEvent) => Promise<any>
}

const Switch: FC<CustomSwitchProps> = ({ onClick, checked, ...props }) => {
    const [customChecked, setCustomChecked] = useStateFromValue(checked)
    const newOnClick: any = async (c: boolean, e: MouseEvent): Promise<any> => {
        try {
            if (isFunction(onClick)) {
                await onClick(c, e)
            }
            await setCustomChecked(c)
        } catch (err) {
            console.log(err)
        }
    }

    return <AntdSwitch checked={customChecked} onClick={newOnClick} {...props} />
}

export default Switch
