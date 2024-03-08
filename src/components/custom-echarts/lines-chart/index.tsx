import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import time from '@/utils/time'
import CustomEcharts from '..'

interface ObjectProps {
    [propName: string]: number | string
}

interface DataProps {
    [propName: string]: ObjectProps[]
}

interface LinesChartProps {
    data: DataProps
    dataKey?: string // 图表数据x轴数据key
    dictKey?: string // 字典对应字段
    xAxisType?: 'time' | 'normal' // x轴字段类型 time：时间类型，统一需要转换 normal：正常类型，无需任何转换
    format?: string // xAxisType为time时候生效，时间格式化
    xAxisLabelMaxLength?: number
}

const LinesChart: FC<LinesChartProps> = ({
    data = {},
    dataKey = 'key',
    dictKey = 'projectTrendLine',
    xAxisType = 'normal',
    format = 'MM-DD'
    // xAxisLabelMaxLength = 10
}) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const legendData: string[] = [],
        chartData: any[] = [],
        color: string[] = [],
        space = 8 // x轴的坐标间隔
    let xAxisData = []

    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            const lineInfo: any = dict[dictKey]?.[key] || {}
            legendData.push(lineInfo.value)
            color.push(lineInfo.color)
            chartData.push({ key: lineInfo.value, data: value })
        })
    }

    // xAxis相关数据处理
    xAxisData = chartData[0]?.data?.map((item: any) => (xAxisType === 'time' ? time.stringify(item[dataKey], format) : item[dataKey]))

    const interval = Math.floor(xAxisData?.length / space)

    const showed = !xAxisData?.length

    const series = chartData.map(({ key, data }) => ({
        data: data.map(({ value }: any) => value),
        name: key,
        type: 'line',
        showSymbol: data?.length > space ? false : true,
        symbolSize: 4,
        symbol: 'circle'
    }))

    const option = {
        title: {
            show: showed, // 是否显示title
            text: '暂无数据',
            left: 'center',
            top: 'center',
            textStyle: {
                color: 'rgba(0, 0, 0, 0.45)',
                fontSize: 16,
                fontWeight: 400
            }
        },

        legend: {
            data: legendData,
            bottom: 0,
            itemWidth: 10,
            itemHeight: 10,
            icon: 'circle'
        },
        color,
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '30px',
            top: '20px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLabel: {
                interval,
                formatter: (p: string) => {
                    // let res = ''
                    // let i = 0
                    // while (i < p.length - 1) {
                    //     res = res + (res.length > 0 ? '\n' : '') + p.slice(i, i + xAxisLabelMaxLength)
                    //     i = i + xAxisLabelMaxLength
                    // }
                    // return res
                    const maxLength = 8
                    if (p.length > maxLength) {
                        return p.substring(0, maxLength - 1) + '...'
                    } else {
                        return p
                    }
                }
            }
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            splitLine: { lineStyle: { type: 'dashed', dashOffset: [4, 16] } }
        },
        series
    }

    return <CustomEcharts option={option} />
}

export default LinesChart
