import React, { FC } from 'react'
import { Progress, Row, Col, Empty } from 'antd'
import { useSelector } from 'react-redux'
import _maxBy from 'lodash/maxBy'
import _chunk from 'lodash/chunk'
// import Empty from '@/components/custom-antd/'
import ProgressLine from '../progress-line'

import styles from './index.less'

interface DataProps {
    key: string | any
    value: string | any
}

interface TopVsChartProps {
    data: DataProps[]
    cutLen?: number // 数组分割成N组，每组多少数
    dictName?: string
    linkTo?: anyFunction
}

const TopVsChart: FC<TopVsChartProps> = ({ data, cutLen = 5, dictName, linkTo }) => {
    // data = data?.length ? data.sort((a, b) => b.value - a.value) : []
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const dictInfo = dictName ? dict?.[dictName] : null
    const maxValue = data?.length ? _maxBy(data, (l: any) => l.value)?.value : 100
    const newData = _chunk(data, cutLen)
    const length = newData?.length
    const steps = maxValue + Math.round(maxValue / 15)
    if (dictInfo) {
        data?.forEach((list: any) => {
            list.color = dictInfo[list['licenseRiskLevel']]?.color
        })
    }

    return (
        <div className={styles['chart-wrapper']}>
            {data?.length ? (
                <Row gutter={24}>
                    {newData?.map((list: any, i: number) => {
                        return (
                            <Col key={i} span={24 / length}>
                                {list?.map((item: any) => (
                                    <div key={item.key} className={styles['progress']}>
                                        <ProgressLine data={item} maxValue={steps} linkTo={linkTo} />
                                    </div>
                                ))}
                            </Col>
                        )
                    })}
                </Row>
            ) : (
                <Empty style={{ marginTop: 32 }} />
            )}
        </div>
    )
}

export default TopVsChart
