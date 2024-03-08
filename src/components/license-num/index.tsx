import React, { FC, CSSProperties } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface LicenseNum {
    className?: string
    text: string | React.ReactElement
    style?: CSSProperties
}

const LicenseNum: FC<LicenseNum> = ({ text, className, style }) => {
    return (
        <div className={classnames(className, styles['license-num'])} style={style}>
            {text}
        </div>
    )
}

export default LicenseNum
