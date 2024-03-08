export interface RouteList {
    path?: string
    component?: any
    routes?: any[]
    redirect?: string
    title?: string
    models?: string[]
    exact?: boolean // 是否精准匹配
    transition?: boolean // 增加动画组件
    container?: string // 承载页（分2种情况，一种可以替代默认跳转页，一种不可以）
    titleReplace?: string // 面包屑替换title
    isDefault?: boolean // 是否是默认跳转页
    hidden?: boolean // menu 隐藏
}

import { DvaContext } from '@/utils/dva'
import React, { FC, useContext, useMemo } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { getComponent, ComponentWrapper, getNoRedirectNoHiddenRoutes, haveChild, isLeaf, getAuthorityRoutes } from './utils'
import Transition from '@/components/transition'
import { useSelector } from 'react-redux'
import { isArray } from '@/utils/judge-type'

type RenderRouteProps = {
    menu: any
}

// 递归渲染路由
const RenderRoute: FC<RenderRouteProps> = ({ menu }) => {
    const authList: string[] = [] // 权限，如果有则根据业务逻辑处理

    const { app } = useContext(DvaContext)
    const renderRoute = (list: any, breadCrumbs: any[]): JSX.Element => {
        const renderRouteDom = list.map(
            ({
                path,
                component,
                routes,
                redirect,
                title = '',
                models,
                exact = true,
                transition = false,
                container,
                isDefault,
                hidden,
                titleReplace
            }: RouteList) => {
                if (redirect) {
                    // 重定向
                    if (path) {
                        return <Redirect key={`redirect+${redirect}+${path}`} path={path} exact to={redirect} push={false} />
                    } else {
                        return <Redirect key={`redirect+${redirect}`} to={redirect} push={false} />
                    }
                }

                // 叶子节点
                const _isLeaf = isLeaf(routes, exact, authList)
                // 渲染route
                const Component = getComponent(component)
                // TODO 权限子列表
                const childListHaveAuthority = getAuthorityRoutes(routes, authList)
                // 去 redirect 和 hidden 子列表
                const _noRedirectNoHiddenRoutes = getNoRedirectNoHiddenRoutes(routes, authList)

                // 是否有child
                const _haveChild = haveChild(routes, authList)

                // 面包屑
                const newBreadCrumbs = title
                    ? [...(breadCrumbs || []), { path, title, container, titleReplace, isDefault, hidden }]
                    : [...(breadCrumbs || [])]

                const wrapperProps = {
                    key: path,
                    BreadCrumbs: newBreadCrumbs,
                    isLeaf: _isLeaf,
                    app,
                    models,
                    title
                }

                const childrenDom = _haveChild && renderRoute(childListHaveAuthority, newBreadCrumbs)

                const element = (
                    <ComponentWrapper {...wrapperProps}>
                        <Component childList={_noRedirectNoHiddenRoutes} allList={childListHaveAuthority} {...wrapperProps}>
                            {transition ? <Transition>{childrenDom}</Transition> : childrenDom}
                        </Component>
                    </ComponentWrapper>
                )
                return <Route key={path} path={path} exact={_isLeaf} render={() => element} />
            }
        )

        return <Switch>{renderRouteDom}</Switch>
    }

    return useMemo(() => renderRoute(menu, []), [menu])
}

export default RenderRoute
