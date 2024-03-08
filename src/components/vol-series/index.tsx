import React, { FC, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { isString } from '@/utils/judge-type'
import Icon from '@/components/icon'
import CustomEcharts from '@/components/custom-echarts'
import ContentTitleTooltip from '@/components/content-title-tooltip'
import styles from './index.less'
import { useSelector } from 'react-redux'

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
    chartData?: any
    tipInfo?: any
    dictName?: string
}

const VolSeries: FC<VolSeriesProps> = ({ icon, size = 24, title = '', content, subInfo = {}, link, chartData, tipInfo, dictName }) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const dictData = isString(dictName) ? dict[dictName] : null
    // const dictArr = dictData ? Object.values(dictData) : null
    const history = useHistory()
    const { key, value } = subInfo
    // const isVuln = isString(title) ? ['漏洞数量'].includes(title) : false
    const data: any = []
    const color: any = []
    chartData?.forEach(({ key, value }: any) => {
        color.push(dictData?.[key]?.color)
        data.push({
            name: dictData?.[key]?.value,
            value: value
        })
    })

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
            position: ['-140px', '10%']
        },
        color,
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
                    {/* <ContentTitleTooltip text={title} content={tipInfo} dictName={dictName} /> */}
                    <ContentTitleTooltip text={title} />
                    {content ? <div className={styles['number']}>{content}</div> : <></>}
                </div>
            </div>
            <div>
                <div className={styles['chart']}>
                    <CustomEcharts option={option} />
                    {tipInfo && (
                        <div className={styles['tip-info']}>
                            <ContentTitleTooltip placement="leftBottom" content={tipInfo} dictName={dictName} />
                        </div>
                    )}
                </div>
                <div
                    className={classnames(styles['footer'], {
                        [styles['pointer']]: !!link
                    })}
                    onClick={() => {
                        value && link && history.push(link)
                    }}
                >{`${key ? `${key}: ${value || 0}` : ''}`}</div>
            </div>
        </div>
    )
}

export default VolSeries
