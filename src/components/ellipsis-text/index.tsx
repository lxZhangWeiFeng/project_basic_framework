/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useRef, useState, useMemo, useCallback, FC } from 'react'
import { Tooltip } from '@antd'

const EllipsisText: FC<any> = ({ text, title, children, style = {}, length, needT = true, tooltipProps = {}, ...otherProps }) => {
    const ellipsisText = text || children

    const ellipsisStyle = useCallback(
        () => ({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
            ...style
        }),
        [style]
    )

    const textRef = useRef(null)
    const [need, setNeed] = useState(false)

    useEffect(() => {
        if (textRef.current) {
            const dom = textRef.current
            const cW = (dom as any).clientWidth
            const sW = (dom as any).scrollWidth
            if (sW > cW) {
                setNeed(true)
            } else {
                setNeed(false)
            }
        }
    }, [ellipsisText])

    const returned = useMemo(() => {
        const widthCommon = (
            <div {...otherProps} ref={textRef} style={ellipsisStyle()}>
                {ellipsisText}
            </div>
        )

        const lengthCommon = <span>{length && ellipsisText.length > length ? `${ellipsisText.slice(0, length - 1)}...` : ellipsisText}</span>

        const common = length ? lengthCommon : widthCommon
        const needTooltip = !!length ? ellipsisText.length > length && needT : need && needT

        return needTooltip ? (
            <Tooltip title={title || ellipsisText} placement="topLeft" {...tooltipProps}>
                {common}
            </Tooltip>
        ) : (
            common
        )
    }, [otherProps, ellipsisStyle, ellipsisText, length, needT, need, tooltipProps])

    return returned
}

export default EllipsisText
