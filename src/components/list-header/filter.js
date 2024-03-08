/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import FilterSelect from './filter-select'
import FilterRange from './filter-range'
import FilterRangeBox from './filter-range-box'
import FilterText from './filter-text'
import styles from './index.less'

/**
 * @filterList格式 filterList （type 为 select）
 *
 * @name label的值
 * @filterKey 从filterOptions里获取options的key
 * @paramsKey 从params里获取value的key
 * @handleRes 处理getFilter获得的结果
 * @placeholder 默认显示的值
 * @joinString 是否要转化成字符串
 * @type 判断筛选的类型
 */

/**
 * @filterList格式 filterList （type 为 rang）
 *
 * @name label的值
 * @paramsKey 从params里获取value的key（此处为数组）
 * @placeholder 默认显示的值
 * @type 判断筛选的类型
 * @paramsFormat
 * @showFormat
 * @showTime
 */

/**
 * @filterList格式 filterList （type 为 rang-box）
 *
 * @name label的值
 * @paramsKey 从params里获取value的key（此处为数组）
 * @placeholder 默认显示的值
 * @type 判断筛选的类型
 * @paramsFormat
 * @showFormatTime
 * @showFormatDate
 */

/**
 * @filterList格式 filterList （type 为 text）
 *
 * @name label的值
 * @value 展示的值
 * @paramsKey 从params里获取value的key
 * @dependentShowKey 依赖展示的key，当对应的key有值时展示
 */

/**
 * @filterList 渲染列表
 * @filterOptions 获取select options的对象
 * @getFilter 获取options的函数
 * @params 获取value的对象
 * @changeParams onChange方法触发的函数
 * @loading 加载中
 */
const Filter = ({ filter, width }) => {
    const { filterList = [], filterOptions = {}, getFilter, params = {}, changeParams } = filter || {}

    const typeRangeBox = ({ key, name, placeholder, paramsKey, paramsFormat, showFormatTime, showFormatDate, showTime, index, ...rest }) => (
        <FilterRangeBox
            key={key}
            name={name}
            placeholder={placeholder}
            paramsKey={paramsKey}
            params={params}
            changeParams={changeParams}
            paramsFormat={paramsFormat}
            showFormatTime={showFormatTime}
            showFormatDate={showFormatDate}
            showTime={showTime}
            index={index}
            {...rest}
        />
    )

    const typeRange = ({ key, name, placeholder, paramsKey, paramsFormat, showFormat, showTime, index, ...rest }) => (
        <FilterRange
            key={key}
            name={name}
            placeholder={placeholder}
            paramsKey={paramsKey}
            params={params}
            changeParams={changeParams}
            paramsFormat={paramsFormat}
            showFormat={showFormat}
            showTime={showTime}
            index={index}
            {...rest}
        />
    )

    const typeSelect = ({ key, name, filterKey, paramsKey, handleRes, placeholder, index, notGetFilter, mode, ...rest }) => (
        <FilterSelect
            filterKey={filterKey}
            paramsKey={paramsKey}
            handleRes={handleRes}
            placeholder={placeholder}
            key={key}
            name={name}
            filterOptions={filterOptions}
            getFilter={getFilter}
            params={params}
            changeParams={changeParams}
            index={index}
            notGetFilter={notGetFilter}
            mode={mode}
            {...rest}
        />
    )

    const typeText = ({ key, name, value, paramsKey, index }) => (
        <FilterText paramsKey={paramsKey} value={value} key={key} name={name} params={params} changeParams={changeParams} index={index} />
    )

    const getIndex = () => {
        if (width !== 0) {
            const list = []
            for (let i = 1; i < 15; i++) {
                list.push({ index: i, number: Math.abs(width / i - 350) })
            }
            const index = list.sort(({ number: ANumber }, { number: BNumber }) => ANumber - BNumber)[0].index
            return index
        }
    }

    const index = getIndex()

    return (
        <div className={styles['filter-margin-handle']}>
            {filterList.map(({ type = 'select', ...rest }, i) => {
                const { dependentShowKey } = rest
                if (!dependentShowKey || params[dependentShowKey]) {
                    switch (type) {
                        case 'range':
                            return typeRange({ ...rest, index, key: i })
                        case 'range-box':
                            return typeRangeBox({ ...rest, index, key: i })
                        case 'select':
                            return typeSelect({ ...rest, index, key: rest.paramsKey || i })
                        case 'text':
                            return typeText({ ...rest, index, key: rest.paramsKey || i })
                        default:
                            return null
                    }
                }
            })}
        </div>
    )
}

export default Filter
