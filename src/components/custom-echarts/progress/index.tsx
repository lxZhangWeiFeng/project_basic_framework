import React, { FC, SVGProps } from 'react'
import styles from './index.less'

type ProgressProps = {
    percent?: number
    barWidth?: number
    dotWidth?: number
    width?: number // 方块宽度
    circlePercent?: number
    backgroundColor?: string
    color?: string
    dotColor?: string
    center?: any
}

const Progress: FC<ProgressProps> = (props) => {
    const {
        percent = 0,
        barWidth = 8,
        dotWidth,
        width = 200, // 方块宽度
        circlePercent = 70,
        backgroundColor = '#f5f5f5',
        color = '#1890ff',
        dotColor = '#fff',
        center
    } = props

    const lineP = Number(circlePercent)
    const trueCirclePercent = lineP > 100 ? 100 : lineP < 10 ? 10 : lineP // 背景环百分比
    const p = Number(percent)
    const truePercent = p > 100 ? 100 : p < 0 ? 0 : p // 占比环百分比

    const r = (width - barWidth) / 2 // 半径
    const roundLine = 2 * Math.PI * r // 圆环周长
    const circleLine = (roundLine * trueCirclePercent) / 100 // 背景环长度
    const percentLine = (circleLine / 100) * truePercent // 占比环的长度

    // 环，占比，点 相同样式（点 strokeWidth 不同）
    const sameCircleStyle: SVGProps<SVGCircleElement> = {
        cx: width / 2,
        cy: width / 2,
        r,
        fill: 'none',
        strokeWidth: barWidth,
        strokeLinecap: 'round'
    }

    // 初始点是右侧中心点
    const backDash1 = (circleLine - roundLine / 2) / 2 // 背景环第一段
    const backDash2 = roundLine - circleLine // 背景环空心区域
    const strokeDashoffset = 0 - backDash1 - backDash2 // Dash向左靠距离

    // 背景环样式
    const backgroundCircleProps = {
        strokeDasharray: `${circleLine} ${roundLine - circleLine}`,
        strokeDashoffset
    }

    // 占比环样式
    const circleProps = {
        strokeDasharray: `${percentLine} ${roundLine - percentLine}`,
        strokeDashoffset,
        opacity: truePercent === 0 ? 0 : 1
    }

    // 点宽
    const dotStrokeWidth = dotWidth || (barWidth - 4 > 0 ? barWidth - 4 : 1)

    // 点样式
    const dotCircleProps = {
        strokeDashoffset: `${strokeDashoffset - percentLine}`,
        strokeDasharray: `0 ${roundLine}`,
        opacity: truePercent === 0 ? 0 : 1,
        strokeWidth: dotStrokeWidth
    }

    // 空的扇型的一半角度
    const angle = ((360 * (100 - trueCirclePercent)) / 200) * (Math.PI / 180)
    // 多余的高度
    const theMoreHeight = r - r * Math.cos(angle)

    return (
        <div className={styles['progress-circle']} style={{ width: width, height: width - theMoreHeight }}>
            <svg width={width} height={width - theMoreHeight}>
                <circle {...sameCircleStyle} stroke={backgroundColor} {...backgroundCircleProps} />
                <circle {...sameCircleStyle} stroke={color} {...circleProps} />
                <circle {...sameCircleStyle} stroke={dotColor} {...dotCircleProps} />
            </svg>
            {center && <div className={styles['center']}>{center}</div>}
        </div>
    )
}

export default Progress
