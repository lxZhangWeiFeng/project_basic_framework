import React, { FC, useContext } from 'react'
import ThemeContext from '@/context/theme-context'
import styles from './index.less'
import classNames from 'classnames'

type LayoutContextWrapperProps = {
    className?: string
}

const LayoutContextWrapper: FC<LayoutContextWrapperProps> = ({ children, className }) => {
    const { layoutType } = useContext(ThemeContext)

    return <div className={classNames(styles[layoutType], className)}>{children}</div>
}

export default LayoutContextWrapper
