import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '@/components/icon'
import styles from './index.less'
import { useHistory } from 'react-router-dom'

interface SeriesProps {
    icon?: string
    title?: JSX.Element | string
    content?: JSX.Element | string
    footer?: JSX.Element | string
    footLink?: anyObject | string
    hasBg?: boolean
}

const Series: FC<SeriesProps> = ({ icon, title, content, footer, footLink, hasBg }) => {
    const history = useHistory()

    return (
        <div
            className={classnames(styles.item, {
                [styles['series-item']]: !!hasBg
            })}
        >
            <div className={styles.icon}>{icon && <Icon name={icon} size={12} color="#fff" />}</div>
            <div className={styles.info}>
                {title && <div className={styles['info-title']}>{title}</div>}
                {content || typeof content === 'number' ? <div className={styles['info-content']}>{content}</div> : <React.Fragment />}
                {/* {footer && ( */}
                <div
                    onClick={() => footLink && footer && history.push(footLink)}
                    style={{ cursor: footLink && footer && 'pointer' }}
                    className={styles['info-footer']}
                >
                    {footer}
                </div>
                {/* )} */}
            </div>
        </div>
    )
}

export default Series
