import React, { FC, CSSProperties, Fragment } from 'react'
import { fixNull } from '@/utils/utils'
import styles from './index.less'

type listItem = {
    color: string
    count: number
    value: string
    onClick?: anyFunction
}

type ColorLineProps = {
    list: listItem[]
    width?: number
}

const ColorLegend: FC<ColorLineProps> = ({ list = [], width }) => {
    const len = list.length
    return len === 0 ? (
        <Fragment>{fixNull('')}</Fragment>
    ) : (
        <div style={{ width }} className={styles['wrapper']}>
            {list.map(({ color, count, onClick, value }, i) => {
                const getInner = (style: CSSProperties = {}, onClick?: anyFunction): JSX.Element => (
                    <div key={color + count + i} style={{ ...style }} className={styles['item']} onClick={onClick}>
                        <div style={{ background: color }} className={styles['legend']} />
                        <div className={styles['value']}>
                            {value && <div>{value}</div>}
                            {count && <div>{count}</div>}
                        </div>
                    </div>
                )
                let inner = getInner()

                if (typeof onClick === 'function') inner = getInner({ cursor: 'pointer' }, onClick)

                return inner
            })}
        </div>
    )
}

export default ColorLegend
