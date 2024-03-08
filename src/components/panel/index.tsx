import React, { FC, useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import Icon from '@/components/icon'
import ObserveBlock from '@/components/observe-block'
import styles from './index.less'

interface PanelProps {
    header: React.ReactElement
    style?: any
    className?: string
    isActive?: boolean
    horizontalLine: boolean // 关系线
    verticalLine: boolean // 关联线
    parentHeight?: boolean // 父元素高度，用与监听作用
    lineColor?: string // 线条颜色
    animation?: boolean // 是否需要动画, 建议 4级以内可开启动画，以上的话可能会动画卡顿，持续计算每一块的高度耗能,
    headerActionOption?: any // 头部点击额外操作
}

const Panel: FC<PanelProps> = ({
    children,
    header,
    style,
    className = '',
    isActive = false,
    horizontalLine,
    verticalLine,
    animation = true,
    lineColor = '#e1e1e1',
    headerActionOption
}) => {
    const [active, setActive] = useState(isActive)
    // const [show, setShow] = useState(isActive) //* 控制动画先行，后取消 dom，仅作用于收缩的时候
    const [height, setHeight] = useState<any>(0)
    const [lineHeight, setLineHeight] = useState(0)
    const refs: any = useRef(null)
    const panelHeaderHeight = 32 // 头部高度， 关系线top相关值
    const panelContentPadding = 24
    const heightOffet = 18 // verticalLine 差值， panelHeaderHeight 增减多少，它就朝反方向变多少值
    // const duration = 100

    useEffect(() => {
        setActive(isActive)
        // setShow(isActive)
    }, [isActive])

    useEffect(() => {
        // 直接用offsetTop作为verticalLine高度
        setLineHeight(refs?.current?.offsetTop || 0)
    }, [refs?.current?.offsetTop]) // parentHeight或者refs?.current?.offsetTop都可

    const hasChildren = !!children

    const contentStyle = active
        ? {
              height: animation ? height : 'auto',
              opacity: 1
          }
        : {
              height: 0,
              opacity: 0
          }
    // 将父高度给指定的子元素，props变动
    const newChildren = React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { ...child.props, parentHeight: height }) : null
    )
    // const newChildren = React.Children.toArray(children)?.map((child) =>
    //     React.isValidElement(child) ? React.cloneElement(child, { ...child.props, parentHeight: height }) : null
    // )

    const changeActive = async () => {
        if (!hasChildren) {
            return
        }
        if (headerActionOption?.onClick) {
            headerActionOption?.onClick()
        }
        setTimeout(() => {
            setActive(!active)
        }, 0)
    }
    return (
        <>
            {verticalLine && (
                <div
                    className={styles['vertical-line']}
                    style={{
                        // height: `calc(100% - ${subtractNumber}px)`,
                        height: lineHeight - heightOffet,
                        top: panelHeaderHeight,
                        left: panelContentPadding / 2,
                        background: lineColor
                    }}
                />
            )}
            <div
                className={classnames(styles['panel-warp'], {
                    [className]: !!className
                })}
                ref={refs}
                style={style}
            >
                {horizontalLine && (
                    <div
                        className={styles['horizontal-line']}
                        style={{ width: panelContentPadding / 2, left: -panelContentPadding / 2, background: lineColor }}
                    />
                )}
                <div
                    className={classnames(styles['panel-header'], {
                        [styles['cur-pointer']]: hasChildren,
                        [styles['is-select']]: active
                    })}
                    style={{ height: panelHeaderHeight }}
                    onClick={changeActive}
                >
                    {header ? header : '-'}
                    {/* 箭头 */}
                    {hasChildren && (
                        <div
                            className={classnames(styles['arrow'], {
                                [styles['down']]: active
                            })}
                        >
                            <Icon name="right" size={14} />
                        </div>
                        // <div
                        //     className={classnames(styles['plus'], {
                        //         [styles['reduce']]: active
                        //     })}
                        // />
                    )}
                </div>
                <div className={styles['panel-content']} style={{ paddingLeft: panelContentPadding, ...contentStyle }}>
                    <ObserveBlock setHeight={setHeight}>{active ? newChildren : <React.Fragment />}</ObserveBlock>
                </div>
            </div>
        </>
    )
}

export default Panel
