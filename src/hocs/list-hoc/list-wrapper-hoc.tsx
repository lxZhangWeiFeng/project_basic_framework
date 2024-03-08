import { isFunction, isBoolean, isNumber } from '@/utils/judge-type'
import React, { FC, Fragment, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import { useEffectAfterFirst } from '@/hooks'

type ListWrapperHocProps = {
    modalName?: string
    otherModalName?: string[] // TODO 赋予 getPayload 除 thisModel外的其他modal
    getPayload?: ({ matchParams, store }: { matchParams: any; store: any }) => any // TODO 暂时不传store
}

export type listWrapperHocProps = {
    dispatch: Dispatch
    getFilter: anyFunction
    getSearch: anyFunction
}

const ListWrapperHoc = <T extends {}>(props?: ListWrapperHocProps) => (WrapperComponent: FC<listWrapperHocProps & T>) => {
    const { modalName: _modalName, getPayload } = (props || {}) as ListWrapperHocProps
    const InnerComponent: FC<T> = (_props: any) => {
        const props = _props || {}
        const { payload: _payload, belongTo = 'default', modalName: __modalName } = props
        const modalName = __modalName || _modalName
        if (!modalName) throw new Error('no modalName')
        const dispatch = useDispatch()
        const { state } = useLocation<any>()
        const matchParams = useParams()
        const { thisModal } = useSelector((store: any) => ({ thisModal: store[modalName] }))
        const [done, setDone] = useState(false)
        const { params, filterOptions, belongTo: modalBelongTo = 'default' } = thisModal || {}
        const getThePayload = () => _payload || (isFunction(getPayload) ? (getPayload as anyFunction)({ matchParams, store: {} }) : undefined)
        const [payload, setPayload] = useState(getThePayload())
        // 获取列表
        const getList = () => {
            dispatch({ type: `${modalName}/getList` })
        }

        // 修改参数
        const updateParams = (payload: any) => {
            dispatch({ type: `${modalName}/updateParams`, payload: payload })
        }

        // 修改belongTo
        const changeBelongTo = () => dispatch({ type: `${modalName}/judgeBelongTo`, payload: belongTo })

        // === search
        const onSearch = (keyword: string) => {
            if (params.keyword !== keyword) {
                updateParams({ keyword, pageNum: 1 })
            }
        }

        const search = ({
            placeholder,
            width = 300,
            auth,
            addonBefore
        }: {
            placeholder: string
            width?: number
            auth?: string
            addonBefore?: React.ReactDOM
        }) => ({
            placeholder,
            value: params.keyword,
            onSearch,
            width,
            auth,
            addonBefore
        })

        // === filter
        const getFilter = ({ filterKey, paramsKey, handleRes }: any): any => {
            if (!filterKey && !isNumber(filterKey)) {
                return new Promise((resolve: any) => resolve())
            }
            return dispatch({
                type: `${modalName}/getFilter`,
                filterKey,
                paramsKey,
                handleRes
            })
        }

        const filter = (filterList: any, defaultVisible?: boolean) => {
            filterList = filterList?.filter(({ show }: any) => !isBoolean(show) || show)
            return {
                filterList,
                filterOptions,
                getFilter,
                params,
                defaultVisible,
                changeParams: updateParams,
                refresh: { getList }
            }
        }

        // 不传递payload
        const wrapperProps = {
            ...props,
            modalName,
            dispatch,
            updateParams,
            getFilter: filter,
            getSearch: search,
            params
        }

        const paramsChange = async () => {
            if (modalBelongTo !== belongTo) await changeBelongTo()
            if (payload) await updateParams(payload)
            if (state?.payload) await updateParams(state?.payload)
            if (!done) await setDone(true)
        }

        // 执行 修改 参数
        useLayoutEffect(() => {
            paramsChange()
        }, [JSON.stringify(payload)])

        // 执行更新 payload 操作
        useEffectAfterFirst(() => {
            const newPayload = getThePayload()
            if (JSON.stringify(newPayload) !== JSON.stringify(payload)) setPayload(newPayload)
        }, [_payload, getPayload, matchParams])

        return done ? <WrapperComponent {...wrapperProps} /> : <Fragment />
    }

    return InnerComponent
}

export default ListWrapperHoc
