import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import Table from '@/components/list-table'
import columnsRenderFun from './columnsRender'

const List: FC<any> = ({ data = {}, getlist, modeIsOpen }) => {
    const dispatch = useDispatch()

    const { compVersVos: list } = data

    const options = { getlist, dispatch }
    const columnsRender = columnsRenderFun(options)

    const columns = [
        {
            title: '组件',
            dataIndex: 'compName',
            key: 'compName',
            ellipsis: true,
            render: columnsRender('compName')
        },
        {
            title: '版本名',
            dataIndex: 'compVersion',
            key: 'compVersion',
            // show: !!modeIsOpen,
            render: columnsRender('compVersion')
        },
        {
            title: '许可',
            dataIndex: 'licenseTypes',
            key: 'licenseTypes',
            show: !!modeIsOpen,
            // width: 400,
            render: columnsRender('licenseTypes')
        },

        {
            title: modeIsOpen ? '操作' : '',
            dataIndex: 'handle',
            key: 'handle',
            width: 48,
            render: columnsRender('handle')
        }
    ]

    return (
        <Table
            rowKey={({ id, purl }: any) => [id, purl].join('-')}
            columns={columns}
            dataSource={list}
            // pagination={pagination}
            // loading={loading}
            // updateParams={updateParams}
        />
    )
}

export default List
