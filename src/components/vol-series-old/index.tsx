import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { isString } from '@/utils/judge-type'
import Icon from '@/components/icon'
import CustomEcharts from '@/components/custom-echarts'
import styles from './index.less'

interface SubInfoProps {
    [proname: string]: string | number
}

interface VolSeriesProps {
    icon: any
    size?: number
    title: JSX.Element | string
    content?: JSX.Element | string
    subInfo: SubInfoProps
    link?: string
}

const VolSeries: FC<VolSeriesProps> = ({ icon, size = 24, title = '', content, subInfo = {}, link }) => {
    const history = useHistory()
    const { key, value } = subInfo
    const isVuln = isString(title) ? ['漏洞数量'].includes(title) : false
    const data = [
        { value: value || 0, name: key || '有风险数' },
        { value: Number(content) - Number(value || 0) || 0, name: isVuln ? '正常数量' : title }
    ]

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
            position: ['-140px', '10%']
        },
        color: ['#DD6040', '#1578D4'],
        legend: false,
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data
            }
        ]
    }

    return (
        <div className={styles['warp']}>
            <div className={styles['left']}>
                <div className={styles['icon']}>
                    <Icon name={icon} size={size} />
                </div>
                <div className={styles['content']}>
                    {title ? <div className={styles['title']}>{title}</div> : <></>}
                    {content ? <div className={styles['number']}>{content}</div> : <></>}
                </div>
            </div>
            {!isVuln && (
                <div>
                    <div className={styles['chart']}>
                        <CustomEcharts option={option} />
                    </div>
                    <div
                        className={styles['footer']}
                        onClick={() => {
                            value && link && history.push(link)
                        }}
                    >{`${key ? `${key}: ${value || 0}` : ''}`}</div>
                </div>
            )}
        </div>
    )
}

export default VolSeries
