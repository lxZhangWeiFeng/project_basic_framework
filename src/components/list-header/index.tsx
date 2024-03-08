/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Tabs, Input } from 'antd'
import classnames from 'classnames'
import React, { useState, isValidElement, FC, Fragment, useContext } from 'react'

import ObserveBlock from '@/components/observe-block'
import { Search, Card } from '@antd'
import HandleAuth from '@/hocs/handle-auth'
import Filter from './filter'
import FilterBtn from './filter-btn'
import styles from './index.less'
import { isArray, isObject } from '@/utils/judge-type'
import ThemeContext from '@/context/theme-context'
import Hidden from './hidden'

/**
 * @params search
 *
 * @placeholder
 * @value
 * @onSearch
 * @width
 */

/**
 * @params middle
 *
 * @height max高度
 * @btn 是否需要按钮，自己传按钮组件进来
 * @getChangeVisible 给外部提供changeVisible函数
 * @component middle展示的组件
 */

/**
 * @params filter
 *
 * @filterList
 * @params
 * @height
 * @filterOptions
 * @getFilter
 * @changeParams
 */

/**
 * @children list
 * @name head的name
 * @search 搜索参数
 * @filter 筛选参数
 * @leftActions head左侧自定义操作
 * @rightActions head右侧自定义操作
 * @middle head和list中间部分
 * @headType 1 正常组件 2 子组件（应用下等）
 * @headerInfo 列表基本信息展示
 * @headerInfoNoBorder 列表基本信息存在时是否隐藏下边框
 */

const TableHeader: FC<any> = ({ children, title, headType: _headType = 1, options = {}, headerInfo, style, headerInfoNoBorder }) => {
    const { layoutType } = useContext(ThemeContext)
    const headType = layoutType === 'vertical' && _headType === 1 ? 2 : _headType
    const { filter, middle, search = {} } = options
    const [showObj, setShowObj] = useState<Record<string, boolean>>({})
    const { addonBefore, ...otherSearch } = search || {}
    // === filter
    const { filterList, params, changeParams, refresh, defaultVisible = false } = filter || {}
    const [height, setHeight] = useState(1000)
    const [width, setWidth] = useState(0)
    const [filterVisible, setFilterVisible] = useState(defaultVisible)

    const haveFilter = !!filter
    // btn
    const filterBtn = haveFilter && (
        <FilterBtn
            refresh={refresh}
            filterList={filterList}
            changeParams={changeParams}
            params={params}
            visible={filterVisible}
            setVisible={setFilterVisible}
            headType={headType}
        />
    )

    const filterBlock = () => {
        if (haveFilter) {
            if ([3, 4].includes(headType)) {
                return (
                    <div
                        className={classnames(styles['filter-wrapper'], { [styles['show']]: filterVisible })}
                        style={{ maxHeight: filterVisible ? height : 0 }}
                    >
                        <ObserveBlock setHeight={setHeight} setWidth={setWidth}>
                            <div style={{ margin: -8 }}>
                                <Filter filter={filter} width={width} />
                            </div>
                        </ObserveBlock>
                    </div>
                )
            }

            if ([1, 2].includes(headType)) {
                return (
                    <Card
                        bodyStyle={{ padding: 0 }}
                        className={classnames(styles['filter-wrapper'], { [styles['show']]: filterVisible })}
                        style={{ maxHeight: filterVisible ? height : 0 }}
                    >
                        <ObserveBlock setHeight={setHeight} setWidth={setWidth}>
                            <div style={{ padding: 16 }}>
                                <Filter filter={filter} width={width} />
                            </div>
                        </ObserveBlock>
                    </Card>
                )
            }

            return null
        }

        return null
    }

    // === mid
    const { btn = {}, component: MidComponent, payload = {} } = middle || {}
    const [midVisible, setMidVisible] = useState(false)
    const [midHeight, setMidHeight] = useState(1000)
    const haveMid = !!middle
    const midBtn = haveMid && <Button onClick={() => setMidVisible(!midVisible)} type="primary" {...(isObject(btn) ? btn : {})} />
    const midBlock = haveMid && MidComponent && (
        <div className={classnames(styles['middle'], { [styles['show']]: midVisible })} style={{ maxHeight: midVisible ? midHeight || 500 : 0 }}>
            <ObserveBlock setHeight={setMidHeight}>
                <MidComponent payload={payload} />
            </ObserveBlock>
        </div>
    )

    // search
    const searchs =
        otherSearch && addonBefore ? (
            <HandleAuth auth={otherSearch.auth}>
                <Input.Group compact>
                    {addonBefore}
                    <Search {...otherSearch} />
                </Input.Group>
            </HandleAuth>
        ) : (
            <HandleAuth auth={otherSearch.auth}>
                <Search {...otherSearch} />
            </HandleAuth>
        )

    // === head
    const [titleKey, setTitleKey] = useState(isArray(title) ? title?.[0]?.title || '' : '')

    const tabOnChange = (k: any) => {
        const ops = title?.find((item: any) => item.title === k) || {}
        const { title: _, component: __, ...rest } = ops || {}
        const { filter = true, middle = true } = rest
        setShowObj({
            ...(rest || {})
        })
        if (!filter) setFilterVisible(false)
        if (!middle) setMidVisible(false)

        setTitleKey(k)
    }

    const action = (
        <div className={styles['action']}>
            {Object.entries(options).map(([key, value]) => {
                let inner = null
                switch (key) {
                    case 'filter':
                        inner = filterBtn
                        break
                    case 'middle':
                        inner = midBtn
                        break
                    case 'search':
                        inner = searchs
                        break
                    default:
                        inner = value
                        break
                }

                return (
                    <Hidden show={showObj[key]} key={key}>
                        {inner}
                    </Hidden>
                )
            })}
        </div>
    )

    const titleDom = isArray(title) ? (
        <Tabs activeKey={titleKey} onChange={tabOnChange} className={styles['tab-title']}>
            {title.map(({ title }) => (
                <Tabs.TabPane key={title} tab={title} />
            ))}
        </Tabs>
    ) : title ? (
        <div className={styles['title']}>
            <span>{title}</span>
        </div>
    ) : (
        <Fragment />
    )

    const headerStyle: any = {}

    if (headerInfoNoBorder) {
        headerStyle.border = 'none'
    }

    if (!title) {
        headerStyle.marginBottom = 0
        headerStyle.paddingBottom = 0
    }
    const head = headerInfo ? (
        <div className={styles['header-info-wrapper']}>
            <div className={styles['header']} style={headerStyle}>
                <div className={styles['header-info']}>{headerInfo}</div>
                {action}
            </div>
            {titleDom}
        </div>
    ) : (
        <div className={classnames(styles['head'])}>
            {titleDom}
            {action}
        </div>
    )

    // body
    const body = isArray(title) ? (
        <Tabs activeKey={titleKey} destroyInactiveTabPane animated renderTabBar={() => <Fragment />}>
            {title.map(({ title, component }) => (
                <Tabs.TabPane key={title} tab={title}>
                    {component}
                </Tabs.TabPane>
            ))}
        </Tabs>
    ) : isValidElement(children) ? (
        children
    ) : null

    // type 1
    const headType1 = (
        <div className={classnames(styles['type1-wrapper'], styles['default-wrapper'])} style={style}>
            {head}
            {midBlock}
            {filterBlock()}
            <Card className={styles['content']}>{body}</Card>
        </div>
    )

    // type 2
    const headType2 = (
        <div className={classnames(styles['type2-wrapper'], styles['default-wrapper'])} style={style}>
            {midBlock}
            {filterBlock()}
            <Card className={styles['content']} bodyStyle={{ paddingTop: 0 }}>
                {head}
                {body}
            </Card>
        </div>
    )

    // type 4
    const headType4 = (
        <div className={classnames(styles['type4-wrapper'], styles['default-wrapper'])} style={style}>
            {midBlock}
            {filterBlock()}
            {head}
            {body}
        </div>
    )

    switch (headType) {
        case 1:
            return headType1
        case 2:
            return headType2
        case 3:
        case 4:
            return headType4
        default:
            return null
    }
}

export default TableHeader
