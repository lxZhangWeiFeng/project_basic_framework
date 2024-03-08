import React, { FC } from 'react'
import classnames from 'classnames'
import EllipsisText from '@/components/ellipsis-text'

import styles from './index.less'

interface LicenseBlockProps {
    data: any
    color?: string
    valueKey?: string
    size?: 'large' | 'small'
}

const LicenseBlock: FC<LicenseBlockProps> = ({ data, color = '#000', valueKey = 'licenseName', size = 'large' }) => {
    const title = (data?.map((list: any) => list[valueKey]) || []).join(',')
    const isMore = data?.length > 1
    return (
        <div
            style={{ background: color }}
            className={classnames(styles['ellipsis'], {
                [styles['size-small']]: size === 'small'
            })}
        >
            <EllipsisText title={title}>{`${data?.[0]?.[valueKey]}${isMore ? `和其他${data.length - 1}个许可` : ''}`}</EllipsisText>
        </div>
    )
}

export default LicenseBlock
