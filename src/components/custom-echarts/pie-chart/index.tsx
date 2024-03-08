import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import _keyBy from 'lodash/keyBy'
import CustomEcharts from '@/components/custom-echarts'
import { isArray } from '@/utils/judge-type'

const PieChart: FC<any> = ({ data: _data, dictName = 'projectLevel', seriesProp = {}, legendProp = {}, onClick }) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))
    const dictType = dict?.[dictName] || {}
    const getDataAndColor = () => {
        const dataList: any[] = []
        const colorList: any[] = []
        const list = isArray(_data) ? [..._data] : []
        const isEmpty = list.length === 0
        const total = list.length === 0 || list.reduce((a, b) => a + b.value, 0)

        list.forEach(({ key, value: count }) => {
            const { color, value } = dictType[key] || {}
            dataList.push({ value: count, name: value, key })
            colorList.push(color)
        })

        return { data: dataList, color: colorList, total, isEmpty }
    }

    const { data, color, isEmpty } = getDataAndColor()
    const legendData = _keyBy(data, 'name')

    const onEvents = useMemo(() => {
        return {
            click: onClick
        }
    }, [])

    const option = {
        title: {},
        tooltip: {
            trigger: 'item'
        },
        color: color,
        legend: {
            orient: 'vertical',
            top: 'middle',
            right: '25%',
            itemWidth: 10,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: 'rgba(0, 0, 0, 0.45)',
                fontSize: 12
            },
            formatter: function (name: string) {
                return `${name}  ${legendData[name].value}`
            },
            ...legendProp
        },
        series: [
            {
                type: 'pie',
                radius: [50, 64],
                center: ['30%', '50%'],
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 4
                },
                // hoverAnimation: false,
                label: {
                    show: false
                },
                data,
                ...seriesProp
            }
        ]
    }

    return <CustomEcharts option={option} empty={isEmpty} onEvents={onEvents} />
}

export default PieChart
