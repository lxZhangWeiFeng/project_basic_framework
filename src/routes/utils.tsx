import React, { FC, useContext, useLayoutEffect } from 'react'
import { isFunction, isObject, isString } from '@/utils/judge-type'
import Empty from '@/components/empty-component'
import BreadCrumbContext from '../context/bread-crumb-context'
import { useParams, generatePath, useLocation } from 'react-router-dom'
import ErrorCatch from './error-catch'
import ReactDocumentTitle from 'react-document-title'

// 加载 dva_model
const loadModel = (app: any, models?: string[]): any => {
    models?.forEach((road) => {
        try {
            const modelRoad = isString(road) ? road : ''
            const model = require(`@/models/${modelRoad}`).default
            const inModels = app._models.some(({ namespace }: { namespace: string }) => namespace === model.namespace)
            if (!inModels) {
                app.model(model)
            }
        } catch (e) {
            console.error(`models 路径不正确 ${road}`)
        }
    })
}

// 获取组件本体
const getComponent = (component: any): any => {
    // 配合LazyLoad
    if (component && isFunction(component)) {
        const c = component()
        return c.default || c
    } else {
        return Empty
    }
}

const joinBreadcrumbList = (list1: any[], list2: any[]) => {
    // 筛选数据，如果父路由为需要重定向的容器，并且自己为默认跳转项，则隐藏
    let trueList: any[] = list2.filter((_, i) => !(list2?.[i - 1]?.container === 'replace' && list2[i].isDefault))

    // 增加可点击，点击判断逻辑为，不为最后一位并且当前节点不为空容器（当前路由有内容，子路由部分内容（例子TASK详情））
    trueList = trueList.map((item, i) => ({
        ...item,
        click: trueList[i + 1] && trueList[i].container !== 'empty'
    }))

    return [...trueList]
}

// 子组件容器
const ComponentWrapper: FC<any> = ({ children, BreadCrumbs, isLeaf, app, models, title }) => {
    const location = useLocation()
    const { state } = location
    const { replaceTitle } = (state || {}) as any
    const { setList, list, setReplace } = useContext(BreadCrumbContext)
    const matchParams = useParams()
    useLayoutEffect(() => {
        // 加载 models
        loadModel(app, models)

        // 跳转 state 携带 replaceTitle
        if (isObject(replaceTitle)) {
            setReplace(replaceTitle)
        }

        // 叶子节点修改面包屑
        if (isLeaf) {
            setList(
                joinBreadcrumbList(
                    list,
                    BreadCrumbs.map((item: any) => ({ ...item, path: generatePath(item.path, matchParams) }))
                )
            )
        }
    }, [replaceTitle])

    return (
        <ErrorCatch>
            <ReactDocumentTitle title={title}>{children}</ReactDocumentTitle>
        </ErrorCatch>
    )
}

// 获取权限子列表
const getAuthorityRoutes = (routes: any, authList: string[]) =>
    Array.isArray(routes) ? routes.filter((item) => !item.perms || authList.includes(item.perms)) : []

// 获取不是重定向和隐藏的子列表
const getNoRedirectNoHiddenRoutes = (routes: any, authList: string[]) => {
    const authRoutes = getAuthorityRoutes(routes, authList)
    return (
        Array.isArray(authRoutes) &&
        authRoutes.filter((item) => {
            const noRedirect = !item.redirect
            const noHidden = !item.hidden
            return noRedirect && noHidden
        })
    )
}

// 判断是否有child
const haveChild = (routes: any, authList: string[]) => {
    const authRoutes = getAuthorityRoutes(routes, authList)
    return Array.isArray(authRoutes) && authRoutes.length > 0
}

// 是否是叶子节点
const isLeaf = (routes: any, exact: boolean, authList: string[]) => !(haveChild(routes, authList) || !exact)

export { loadModel, getComponent, ComponentWrapper, getAuthorityRoutes, getNoRedirectNoHiddenRoutes, haveChild, isLeaf }
