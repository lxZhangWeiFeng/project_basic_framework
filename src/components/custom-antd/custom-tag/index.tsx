import React, { FC } from 'react'

import { Tag } from 'antd'
import { TagProps } from 'antd/es/tag'

interface CustomTagProps {
    gost?: boolean
}

const CustomTag: FC<TagProps & CustomTagProps> = ({ children, gost, color, style, ...props }) => {
    const gostStyle = gost
        ? {
              color,
              backgroundColor: 'transparent',
              border: `1px solid ${color}`,
              ...style
          }
        : {}
    return (
        <Tag style={gostStyle} color={color} {...props}>
            {children}
        </Tag>
    )
}

export default CustomTag
