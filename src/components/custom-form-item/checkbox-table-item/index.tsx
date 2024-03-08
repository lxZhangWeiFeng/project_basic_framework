import React, { FC } from 'react'

import { Table } from 'antd'

import { isFunction } from '@/utils/judge-type'

import styles from './index.less'

const WarehouseCheckbox: FC<any> = ({ value, onChange, columns, dataSource, rowKey = 'id' }: any) => {
    const onSelectChange = (selectedRowKeys: any[]) => {
        if (isFunction(onChange)) {
            onChange(selectedRowKeys)
        }
    }

    const rowSelection = {
        selectedRowKeys: value,
        onChange: onSelectChange
    }

    return (
        <Table
            rowKey={(rd) => (isFunction(rowKey) ? rowKey(rd) : rd[rowKey])}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
            rowSelection={rowSelection}
            dataSource={dataSource}
            scroll={{ y: 500 }}
            className={styles['reset-form-table']}
        />
    )
}

export default WarehouseCheckbox
