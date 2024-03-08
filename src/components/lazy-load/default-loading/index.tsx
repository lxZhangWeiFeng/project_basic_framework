import React, { FC } from 'react'
import { Card } from '@antd'
import { Skeleton } from 'antd'

const Loading: FC = () => {
    return (
        <Card>
            <Skeleton />
        </Card>
    )
}

export default Loading
