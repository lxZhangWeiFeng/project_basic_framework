import React, { FC } from 'react'

import styles from './index.less'

const HasLineTitle: FC<any> = ({ children, ...props }) => {
    return (
        <div className={styles['title-wrapper']} {...props}>
            {children}
        </div>
    )
}

export default HasLineTitle
