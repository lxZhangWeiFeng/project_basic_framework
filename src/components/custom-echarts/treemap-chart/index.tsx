import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import CustomEcharts from '@/components/custom-echarts'

interface ListKeyProps {
    id?: string
    name: string
    value: string
    level: string
}

interface TreemapChartProps {
    data: anyObject[]
    dictName?: string | undefined
    listKey?: ListKeyProps
    chartName?: string
}

const TreemapChart: FC<TreemapChartProps> = ({ data, chartName = '', dictName = '', listKey = {} }) => {
    const defaultKey = { id: 'id', name: 'name', value: 'count', level: 'severity' }
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const dictType = dict?.[dictName] || {}
    const newListKey = { ...defaultKey, ...listKey }
    const { name, value, level } = newListKey

    const chartData = data.map((list) => ({
        ...list,
        name: list[name],
        value: list[value],

        itemStyle: {
            color: dictType[list[level]]?.color || ''
        }
    }))

    const option = {
        tooltip: {
            formatter: '{b}：{c}'
        },
        series: [
            {
                type: 'treemap',
                name: chartName,
                top: 0,
                right: 0,
                left: 0,
                bottom: 32,
                roam: false,

                itemStyle: {
                    gapWidth: 1
                },
                data: chartData
            }
        ]
    }

    return <CustomEcharts option={option} />
}

export default TreemapChart
