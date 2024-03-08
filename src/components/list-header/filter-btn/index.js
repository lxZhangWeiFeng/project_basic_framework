import { Badge, Tooltip } from 'antd'
import React, { Fragment } from 'react'
// import Icon from '@/components/icon'
import { getFilterCount } from './util'
import styles from './index.less'
import classNames from 'classnames'
import { Button } from '@antd'

const FilterBtn = ({ filterList, params = {}, changeParams, visible, setVisible, refresh, headType }) => {
    const { getList } = refresh || {}
    // === filter changeParams
    const hasFilter = !!filterList?.length
    const filterCount = getFilterCount(filterList, params)
    const haveFilterValue = filterCount > 0
    const filterBtnClass = classNames(styles['arrow-right'], {
        [styles['arrow-top']]: visible && [2, 3, 4].includes(headType),
        [styles['arrow-bottom']]: visible && [1].includes(headType)
    })
    let filterBtn = (
        // <Button type={haveFilterValue ? 'primary' : 'default'} className={styles['filter-btn']} onClick={() => setVisible(!visible)} icon="filter">
        //     筛选
        //     <Icon name="right" className={filterBtnClass} />
        // </Button>
        <Tooltip title="筛选">
            <Button
                type={haveFilterValue ? 'primary' : 'default'}
                // className={styles['filter-btn']}
                onClick={() => setVisible(!visible)}
                icon="filter"
            />
        </Tooltip>
    )

    if (haveFilterValue && filterBtn) {
        filterBtn = <Badge count={filterCount}>{filterBtn}</Badge>
    }

    const clear = () => {
        const keyList = filterList?.map(({ paramsKey }) => paramsKey)
        if (typeof changeParams === 'function') changeParams(keyList)
    }

    const clearBtn = (
        <div className={classNames(styles['clear-btn'], { [styles['show']]: haveFilterValue })}>
            {/* <Button type="primary" danger onClick={clear} icon="clear">
                清除筛选
            </Button> */}
            <Tooltip title="清除筛选">
                <Button type="primary" danger onClick={clear} icon="clear" />
            </Tooltip>
        </div>
    )

    const refreshFun = () => {
        // 如果 page不存在 pageSize不存在 或者 pageSize=10 page=1, 不需要changeParams
        if (typeof params?.page === 'number' || typeof params?.pageSize === 'number') {
            if (typeof changeParams === 'function') {
                changeParams(['page', 'pageSize'])
            }
        } else {
            if (typeof getList === 'function') {
                getList()
            }
        }
    }

    const refreshBtn = refresh && (
        // <Button className={styles['refresh-icon']} icon="refresh" onClick={refreshFun} style={{ marginLeft: 16 }}>
        //     刷新
        // </Button>
        <Tooltip title="刷新">
            <Button className={styles['refresh-icon']} icon="refresh" onClick={refreshFun} style={hasFilter && { marginLeft: 16 }} />
        </Tooltip>
    )

    return (
        <div className={classNames(styles['btn'])}>
            {hasFilter && filterBtn}
            {clearBtn}
            {refreshBtn}
        </div>
    )
}

export default FilterBtn
