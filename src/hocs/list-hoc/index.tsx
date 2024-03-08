import React, { FC, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SORT_ORDER_TYPE } from '@/utils/const'

export type listHookProps = {
    list: any[]
    pagination: Record<string, any>
    dispatch: Dispatch
    loading: boolean
    belongTo: string
    sortProps: anyFunction
    updateParams: anyFunction
    getList: anyFunction
}

type Props = { modalName?: string; clearList?: boolean }
const ListHook = <T extends {}>(props?: Props) => (WrapperComponent: FC<listHookProps & T>) => {
    const { modalName: _modalName, clearList = true } = (props || {}) as Props
    const InnerComponent: FC<T> = (_props: any) => {
        const props = _props || {}
        const { modalName: __modalName, isInit = true, belongTo: propsBelongTo } = props
        const modalName = __modalName || _modalName
        if (!modalName) throw new Error('no modalName')
        const dispatch = useDispatch()
        const { thisModal, loading } = useSelector((store: any) => ({ thisModal: store[modalName], loading: store['loading'] }))

        const { params, list, pagination, belongTo: modalBelongTo } = thisModal
        const belongTo = propsBelongTo || modalBelongTo
        // 根据key返回排序的参数
        const sortProps = (type: string) => ({
            sorter: true,
            sortOrder: params.sortName === type && (SORT_ORDER_TYPE[params.order] || false),
            sortDirections: ['descend', 'ascend'] // 先降序， 后升序
        })

        // 获取列表
        const getList = () => {
            if (dispatch) {
                dispatch({ type: `${modalName}/getList` })
            }
        }

        // 修改参数
        const updateParams = (payload: string) => dispatch({ type: `${modalName}/updateParams`, payload })

        const wrapperProps = {
            ...props,
            [modalName]: thisModal,
            list,
            pagination,
            dispatch,
            loading: loading.effects[`${modalName}/getList`],
            belongTo,
            sortProps,
            updateParams,
            getList
        }

        // 根据参数重新获取列表
        useLayoutEffect(() => {
            if (isInit) {
                getList()
            }
        }, [JSON.stringify(params), isInit])

        // 退出页面，清空list
        useEffect(() => {
            return () => {
                if (clearList) {
                    dispatch({
                        type: `${modalName}/clearList`
                    })
                }
            }
        }, [])

        return <WrapperComponent {...wrapperProps} />
    }

    return InnerComponent
}

export default ListHook
