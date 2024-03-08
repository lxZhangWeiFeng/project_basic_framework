import React, { FC, Fragment } from 'react'
import { Tag } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { isArray } from '@/utils/judge-type'
import ProjectInfo from '@/components/project-info'

interface TagsProps {
    data: anyObject[]
    to: anyFunction
    showLength?: number
    style?: any
    className?: string
    listKey?: anyObject
    [pro: string]: any
}

const Tags: FC<TagsProps> = ({ data, showLength = 3, style, className, to, listKey = { id: 'id', name: 'name' } }) => {
    const { id, name } = listKey
    let showData: anyObject[] = [],
        hiddenData: anyObject[] = []

    if (isArray(data)) {
        showData = data.slice(0, showLength)
        hiddenData = data.slice(showLength)
    }
    return data?.length ? (
        <div style={style} className={classnames(className)}>
            {showData.map((list) => (
                <Tag key={list[id]} color="blue">
                    <Link to={to({ item: list })}>{list[name]}</Link>
                </Tag>
            ))}
            {hiddenData?.length ? (
                <ProjectInfo projectNames={hiddenData} rowKeys={{ id, name }} to={to}>
                    <Tag color="blue">+{hiddenData.length}</Tag>
                </ProjectInfo>
            ) : (
                <Fragment />
            )}
        </div>
    ) : (
        <Fragment />
    )
}

export default Tags
