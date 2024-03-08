import React, { FC } from 'react'
import ReactECharts, { EChartsReactProps } from 'echarts-for-react/lib'
import * as echarts from 'echarts/core'
import { Empty } from 'antd'
import styles from './index.less'
// Import charts, all with Chart suffix
import {
    LineChart,
    BarChart,
    PieChart
    // ScatterChart,
    // RadarChart,
    // MapChart,
    // TreeChart,
    // TreemapChart,
    // GraphChart,
    // GaugeChart,
    // FunnelChart,
    // ParallelChart,
    // SankeyChart,
    // BoxplotChart,
    // CandlestickChart,
    // EffectScatterChart,
    // LinesChart,
    // HeatmapChart,
    // PictorialBarChart,
    // ThemeRiverChart,
    // SunburstChart,
    // CustomChart,
} from 'echarts/charts'
// import components, all suffixed with Component
import {
    // GridSimpleComponent,
    GridComponent,
    // PolarComponent,
    // RadarComponent,
    // GeoComponent,
    // SingleAxisComponent,
    // ParallelComponent,
    // CalendarComponent,
    // GraphicComponent,
    // ToolboxComponent,
    TooltipComponent,
    // AxisPointerComponent,
    // BrushComponent,
    TitleComponent,
    // TimelineComponent,
    // MarkPointComponent,
    // MarkLineComponent,
    // MarkAreaComponent,
    LegendComponent
    // LegendScrollComponent,
    // LegendPlainComponent
    // DataZoomComponent,
    // DataZoomInsideComponent,
    // DataZoomSliderComponent,
    // VisualMapComponent,
    // VisualMapContinuousComponent,
    // VisualMapPiecewiseComponent,
    // AriaComponent,
    // TransformComponent,
    // DatasetComponent
} from 'echarts/components'
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer
    // SVGRenderer,
} from 'echarts/renderers'
import { isObject } from '@/utils/judge-type'

echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, PieChart, BarChart, CanvasRenderer])

interface CustomEchartsProps extends EChartsReactProps {
    empty?: boolean
}

const CustomEcharts: FC<CustomEchartsProps> = ({
    option,
    notMerge = true,
    lazyUpdate = true,
    onChartReady,
    onEvents,
    opts,
    style = { height: '100%' },
    empty
}) => {
    // 统一处理tooltip
    const newOption = { ...option }
    if (option.tooltip) {
        newOption.tooltip = {
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            textStyle: {
                color: '#fff'
            },
            ...(isObject(option.tooltip) ? option.tooltip : {})
        }
    }

    if (empty) {
        return (
            <div className={styles['empty']}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        )
    }

    return (
        <ReactECharts
            echarts={echarts}
            option={newOption}
            notMerge={notMerge}
            lazyUpdate={lazyUpdate}
            // theme={'theme_name'}
            onChartReady={onChartReady}
            onEvents={onEvents}
            opts={opts}
            style={style}
        />
    )
}

export { echarts }

export default CustomEcharts
