import { Divider } from 'antd'
import { detectionModeMapping } from '@/pages/project/list/appList/const'
import React, { Fragment, FC } from 'react'
import { Tooltip } from '../custom-antd'
import Icon from '../icon'

import styles from './index.less'

const DetectionMode: FC<any> = ({ data, noTitle }) => {
    const icons: any = []
    const tips: any = []
    data?.forEach(({ type, status }: any) => {
        const showData = detectionModeMapping[type] || {}
        const { icon, name } = showData
        if (status !== 'closed') {
            icons.push([icon, status === 'true' ? '#CF4A43' : '#B9B9B9'])
        }

        tips.push(`${name}: ${showData[status]}`)
    })
    return (
        <div>
            {!noTitle && <div>检测模式：</div>}
            <Tooltip
                title={
                    <div>
                        <div style={{ fontWeight: 'bold' }}>本次扫描任务检测模式：</div>
                        {tips.map((list: string) => (
                            <div key={list}>{list}</div>
                        ))}
                    </div>
                }
                overlayInnerStyle={{ minWidth: 280 }}
            >
                <div className={styles['content']} style={{ marginTop: noTitle ? 'none' : 10 }}>
                    {icons.length
                        ? icons.map((icon: string, i: number) => (
                              <Fragment key={icon[0]}>
                                  <Icon name={icon[0]} color={icon[1]} size={20} />
                                  {icons.length !== i + 1 && <Divider type="vertical" />}
                              </Fragment>
                          ))
                        : '-'}
                </div>
            </Tooltip>
        </div>
    )
}

export default DetectionMode
