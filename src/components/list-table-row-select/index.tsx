import React, { FC, useState, cloneElement, isValidElement, Fragment } from 'react'
import classnames from 'classnames'
import { Checkbox, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { isFunction } from '@/utils/judge-type'
import Icon from '@/components/icon'
import styles from './index.less'
import ListHandle, { listItem } from '@/components/list-handle'

type SelectTableProps = {
    getMapList: (...rest: any) => listItem[]
    modalName: string
    rowSelection?: anyObject
    customTop?: any // 自定义头部信息
}

const SelectTable: FC<SelectTableProps> = ({ children, getMapList, modalName, rowSelection: customRowSelection = {}, customTop }) => {
    const dispatch = useDispatch()
    const { checkId, listModel } = useSelector((allState: any) => ({
        checkId: allState.listMultiple[modalName] || [],
        listModel: allState[modalName]
    }))
    const { onChange: customOnChange, ...otherCustomRowSelection } = customRowSelection || {}

    const { pagination, params, list } = listModel
    // 总数
    const total = pagination ? pagination?.total || 0 : list?.length || 0
    // 是否选中了全部
    const [isAll, setAll] = useState(false)
    // 渲染的选中数字
    const number = isAll ? total : checkId.length
    const show = checkId.length > 0 || isAll

    // 修改选中项
    const change = (selectedRowKeys: any[]) => {
        dispatch({
            type: 'listMultiple/setCheckId',
            payload: { key: modalName, ids: selectedRowKeys }
        })
    }

    // 取消选择点击事件
    const noSelect = () => {
        change([])
        setAll(false)
    }

    // 传递给子组件的多选属性
    const rowSelection = isAll
        ? null
        : {
              selectedRowKeys: checkId,
              onChange: isFunction(customOnChange)
                  ? (selectedRowKeys: any) => {
                        customOnChange(selectedRowKeys, change)
                    }
                  : change,
              columnWidth: 55,
              preserveSelectedRowKeys: true,
              ...otherCustomRowSelection
          }

    const table = isValidElement(children) ? cloneElement(children, { rowSelection }) : null

    const mapList = getMapList ? getMapList({ isAll, params: params, checkId, noSelect, dispatch }) : []

    // 渲染table头部多选操作
    const topCheck = (
        <div className={classnames(styles['wrapper'], { [styles['show']]: show })}>
            {isFunction(customTop) ? (
                customTop({ isAll, params: params, checkId, noSelect, dispatch })
            ) : (
                <div className={styles['icon-box']}>
                    <Tooltip title="取消选择">
                        <span onClick={() => change([])} style={{ fontSize: 0 }}>
                            <Icon name="no" size={18} className={styles['notice']} />
                        </span>
                    </Tooltip>

                    <span>
                        已选择<span className={styles['number']}>{number}</span>项
                    </span>

                    <span className={styles['divider']} />

                    <Checkbox checked={isAll} onChange={(e) => setAll(e.target.checked)}>
                        全部
                    </Checkbox>

                    <span className={styles['divider']} style={{ marginLeft: 2 }} />

                    <ListHandle list={mapList} hiddenAll={false} />
                </div>
            )}
        </div>
    )

    return (
        <Fragment>
            {topCheck}
            {table}
        </Fragment>
    )
}

export default SelectTable
