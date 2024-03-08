import React from 'react'
import styles from './index.less'

interface StringWarpProps {
    string: string
    replaceStr?: string
    target?: string
}

const StringWarp: React.FC<StringWarpProps> = ({ string, target = ' ', replaceStr = '\n' }) => {
    const newString = string.replace(target, replaceStr)
    return <div className={styles['white-space']}>{newString}</div>
}

export default StringWarp
