import React, { FC } from 'react'
import { Table, TableColumnGroupType, TableColumnType } from 'antd'
import { TablePaginationConfig, TableProps } from 'antd/lib/table'
import classnames from 'classnames'
import { SORT_NUMBERS } from '@/utils/const'
import { VList } from '@/components/virtuallist-antd-copy'
import { isBoolean, isFunction, isUndefined } from '@/utils/judge-type'
import { fixNull } from '@/utils/utils'
import E from '@/components/ellipsis-text'
import styles from './index.less'

export const paginationCfg = (pagination: any, pageSizeOptions?: string[], autoPagination?: boolean) => {
    const _pageSizeOptions = pageSizeOptions || ['10', '20', '40', '80']
    const _pageSize = Number(pagination?.pageSize || 20)
    const hideOnSinglePage = _pageSize === Number(_pageSizeOptions[0])

    const defaultPage = {
        hideOnSinglePage,
        showSizeChanger: true,
        current: Number(pagination?.pageNum),
        total: Number(pagination?.total),
        pageSize: _pageSize,
        pageSizeOptions: _pageSizeOptions,
        showTotal: (total: number) => {
            return <div style={{ border: '1px solid #d9d9d9', borderRadius: 2, padding: '0 10px' }}>共 {total} 条</div>
        }
    }

    const autoOption = {
        hideOnSinglePage: true,
        showSizeChanger: true,
        pageSizeOptions: _pageSizeOptions,
        // pageSize: _pageSize,
        defaultPageSize: _pageSize,
        showTotal: (total: number) => {
            return <div style={{ border: '1px solid #d9d9d9', borderRadius: 2, padding: '0 10px' }}>共 {total} 条</div>
        }
    }

    return pagination && pagination.total ? defaultPage : autoPagination ? autoOption : false
}

interface Columns extends TableColumnType<any> {
    ellipsisDom?: boolean
    align?: string | any
    show?: boolean
    renderText?: (value: any, record: any, index: number) => React.ReactNode
}

interface ListTableProps extends TableProps<any> {
    updateParams?: anyFunction // 传了走默认 onChange
    virtuallist?: boolean // 虚拟列表
    columns: (Columns | TableColumnGroupType<any>)[]
    pageSizeOptions?: string[]
    autoPagination?: boolean
    dataSource?: any
    pagination?: TablePaginationConfig
    loading?: boolean
    rowKey?: (obj: anyObject) => string | string
}
const getColumns = (columns: anyObject, dataSource: readonly any[], loading: boolean) => {
    return columns
        .map((item: any) => {
            const addProps = !dataSource?.length && !loading ? { sorter: false } : {}
            const { ellipsisDom, render, show, ellipsisText, expandable } = item || {}
            const defaultRender = isFunction(render) ? render : (n: any) => fixNull(n)
            const renderText = isFunction(ellipsisText) ? ellipsisText : (n: any) => fixNull(n)
            const newRender = ellipsisDom === true ? (...args: any) => <E text={renderText(...args)}>{defaultRender(...args)}</E> : render
            return (isBoolean(show) && show) || isUndefined(show)
                ? expandable
                    ? Table.EXPAND_COLUMN
                    : { ...item, ...addProps, render: newRender }
                : false
        })
        .filter((item: any) => item)
}

const ListTable: FC<ListTableProps> = (props) => {
    const {
        updateParams,
        rowKey,
        columns: _columns,
        dataSource = [],
        pagination,
        loading,
        rowSelection,
        locale,
        expandable,
        scroll,
        virtuallist,
        pageSizeOptions,
        autoPagination,
        className,
        ...rest
    } = props

    const columns = getColumns(_columns, dataSource, loading as boolean)

    const handleTableChange = (p: any, f: any, s: any) => {
        const { current, pageSize } = p
        let add: anyObject = {}
        let del: string[] = []

        if (!autoPagination) {
            add = {
                ...add,
                pageNum: current,
                pageSize
            }
        }

        if (s.columnKey) {
            add = {
                ...add,
                sortName: s.order ? s.columnKey : undefined,
                order: SORT_NUMBERS[s.order]
            }
        } else {
            del = ['sortName', 'order']
        }

        if (isFunction(updateParams)) updateParams([add, del])
    }

    const rowClassName = (_: any, index: number) => {
        const className = index % 2 === 0 ? styles['odd-row'] : styles['even-row']
        return className
    }

    const tableProps: TableProps<any> = {
        className: classnames(styles['table'], className),
        showSorterTooltip: false,
        rowKey: rowKey || 'id',
        columns,
        dataSource: dataSource,
        pagination: paginationCfg(pagination, pageSizeOptions, autoPagination),
        onChange: handleTableChange,
        loading: loading,
        rowSelection: rowSelection,
        locale: locale,
        expandable: expandable,
        scroll: scroll,
        rowClassName: rowClassName,
        ...rest
    }

    if (virtuallist) {
        if (!tableProps?.scroll?.y) {
            tableProps.scroll = {
                ...(tableProps?.scroll || {}),
                y: 700
            }
        }
        tableProps.components = VList({
            height: tableProps.scroll.y || '100vh' // 此值和scrollY值相同. 必传. (required).  same value for scroll y
        })
    }

    return <Table {...tableProps} />
}

export default ListTable
