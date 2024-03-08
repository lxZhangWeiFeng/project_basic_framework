/* eslint-disable no-extra-boolean-cast */
import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './index.less'

const Hidden: FC<{ show: boolean }> = ({ children, show = true }) => {
    const [visible, setVisible] = useState(!!show)

    const onTransitionEnd = () => {
        setVisible(!!show)
    }

    useEffect(() => {
        if (!!show) setVisible(true)
    }, [show])

    return (
        <div className={classNames(styles['need-hidden'], { [styles['hidden']]: !show })} onTransitionEnd={onTransitionEnd}>
            {visible ? children : null}
        </div>
    )
}

export default Hidden
