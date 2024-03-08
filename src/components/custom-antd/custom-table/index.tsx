import React, { FC, Fragment } from 'react'
import { Spin, Pagination, Checkbox, Empty, Badge, Tooltip } from 'antd'
import classnames from 'classnames'
// import { Tooltip } from '@antd'
import DictWrapper from '@/components/dict-wrapper'
import { isFunction } from '@/utils/judge-type'

import styles from './index.less'

const { Group } = Checkbox

interface DataSource {
    [prop: string]: any
}

interface CustomTableProps {
    render: (rd: any) => React.ReactElement
    dataSource: DataSource[]
    loading?: boolean
    rowKey?: string
    pagination?: any
    updateParams?: Function
    [prop: string]: any
    badgeRibbonProps?: Function | anyObject | undefined
}

const CustomTable: FC<CustomTableProps> = ({
    render,
    dataSource,
    getAsyncData,
    loading,
    rowKey = 'id',
    pagination,
    updateParams,
    rowSelection = {},
    tableCheckProps = {},
    badgeRibbonProps
}) => {
    const hasRowSelection = rowSelection ? !!Object.keys(rowSelection)?.length : null
    const { noThisPageSelectedKeys } = tableCheckProps
    const { onChange, selectedRowKeys = [], getCheckboxProps } = rowSelection || {}
    // const cloneSelectedRowKeys = selectedRowKeys ? [...selectedRowKeys] : []
    // const [] = useState([])

    // console.log('props:', props)
    // console.log('rowKeys:', rowKeys)
    const newPagination = {
        total: pagination?.total || 0,
        current: pagination?.pageNum || 0,
        pageSize: pagination?.pageSize || 0
    }
    const changePagination = (page: number, pageSize: number) => {
        if (isFunction(updateParams)) {
            updateParams({
                pageSize,
                pageNum: page
            })
        }
    }

    const checkGroupChange = (v: any[]) => {
        if (onChange) onChange(noThisPageSelectedKeys.concat(v))
    }

    const table = (list: any) => {
        const { disabled, tooltip } = (isFunction(getCheckboxProps) && getCheckboxProps(list)) || {}
        return (
            <div
                key={list[rowKey]}
                className={classnames(styles['row-wrapper'], {
                    [styles['row-checked']]: selectedRowKeys.includes(list[rowKey])
                })}
            >
                {hasRowSelection && (
                    <Tooltip title={tooltip}>
                        <Checkbox disabled={disabled} value={list[rowKey]} className={styles['check-box']} />
                    </Tooltip>
                )}
                <div className={styles['table-content']}>{isFunction(render) ? render(list) : <Fragment />}</div>
            </div>
        )
    }
    return (
        <Spin spinning={loading}>
            {dataSource?.length ? (
                <div>
                    <div className={styles['reset']}>
                        <Group style={{ width: '100%' }} value={selectedRowKeys} onChange={checkGroupChange}>
                            {dataSource?.map((item) => {
                                let list = item
                                if (!!getAsyncData && isFunction(getAsyncData)) {
                                    list = getAsyncData(item)
                                }
                                if (!badgeRibbonProps) {
                                    return table(list)
                                }

                                const { dictName, listDictKey } = isFunction(badgeRibbonProps) ? badgeRibbonProps(list) : badgeRibbonProps

                                return (
                                    <DictWrapper dictName={dictName} dictKey={list[listDictKey]} key={list[rowKey]}>
                                        {({ value, color }) =>
                                            value ? (
                                                <Badge.Ribbon placement="start" text={value} color={color}>
                                                    {table(list)}
                                                </Badge.Ribbon>
                                            ) : (
                                                // <Fragment />
                                                table(list)
                                            )
                                        }
                                    </DictWrapper>
                                )
                            })}
                        </Group>
                    </div>
                    <div className={styles['pagination']}>
                        <Pagination
                            className={styles['reset-pagination']}
                            onChange={changePagination}
                            showSizeChanger
                            hideOnSinglePage
                            {...newPagination}
                            showTotal={(total: number) => {
                                return <div className={styles['show-total']}>共 {total} 条</div>
                            }}
                        />
                    </div>
                </div>
            ) : (
                <Empty description="暂无数据" style={{ marginTop: 32 }} />
            )}
        </Spin>
    )
}

export default CustomTable
