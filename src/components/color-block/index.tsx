import { isNumber } from '@/utils/judge-type'
import React, { FC } from 'react'
import styles from './index.less'

type ColorBlockProps = {
    color: string
    height?: number
    bordered?: boolean | number
    radius?: boolean
    type?: 'circle' | 'tag' | 'tag-circle'
    minWidth?: number
    ghost?: boolean
}

const ColorBlock: FC<ColorBlockProps> = ({
    color = '#4CB21A',
    height = 52,
    children,
    bordered = true,
    radius = true,
    type = 'circle',
    minWidth = 80,
    ghost = false
}) => {
    const typeStyle = {
        circle: {
            height,
            minWidth: height,
            backgroundColor: color,
            borderRadius: radius ? height / 2 : 0,
            border: bordered ? `${isNumber(bordered) ? bordered : 8}px solid rgba(255, 255, 255, 0.5)` : ''
        },
        tag: {
            minWidth,
            padding: '4px 8px',
            backgroundColor: color,
            borderRadius: '2px',
            fontWeight: 500
        },
        'tag-circle': {
            height,
            width: height,
            borderRadius: '4px',
            backgroundColor: color,
            fontWeight: 500
        }
    }

    const ghostStyle = ghost
        ? {
              color,
              padding: 4,
              border: `1px solid ${color}`,
              backgroundColor: 'transparent'
          }
        : {}

    return (
        <div style={{ ...typeStyle[type], ...ghostStyle }} className={styles['wrapper']}>
            {children}
        </div>
    )
}

export default ColorBlock
