import React, { FC, useState, useRef } from 'react'
import { SketchPicker } from 'react-color'
import { FormItemProps } from 'antd/lib/form/FormItem'

import styles from './index.less'

interface Props {
    type?: 'hex' | 'rgb'
    value?: any
    onChange?: Function
    placeholder?: string
}

const SelectColor: FC<Props & FormItemProps> = ({ value, onChange, placeholder = '请进行颜色选择', type = 'hex' }) => {
    const [color, setColor] = useState(value)
    const [visible, setVisible] = useState(false)
    const Ref: any = useRef(null)

    // 如果需要选择透明度，需要将颜色变成rgba => c.hex 变成 c.rgb
    const changeColor = (c: any) => {
        const color = c[type]
        if (onChange) {
            onChange(color)
        }
        setColor(color)
    }

    return (
        <div ref={Ref}>
            <div
                className={styles['color-input']}
                style={{ background: color }}
                onClick={() => {
                    setVisible(true)
                }}
            >
                {!color ? placeholder : ''}
            </div>
            {visible && (
                <div className={styles['popover']}>
                    <div
                        className={styles['cover']}
                        onClick={() => {
                            setVisible(false)
                        }}
                    />
                    <SketchPicker color={color || ''} onChange={changeColor} className={styles['color-reset']} />
                </div>
            )}
        </div>
    )
}

export default SelectColor
