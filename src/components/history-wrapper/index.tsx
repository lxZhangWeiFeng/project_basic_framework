import { isFunction } from '@/utils/judge-type'
import React, { FC, Fragment } from 'react'
import { useHistory, useRouteMatch, match, useLocation } from 'react-router-dom'
import { History, Location } from 'history'

/**
 * @description 提供给 list 的 columnsRender，避免繁琐的参数传递
 */

type HistoryWrapperProps = {
    children: ({ history, match, location }: { history: History; match: match<any>; location: Location<any> }) => any
}

const HistoryWrapper: FC<HistoryWrapperProps> = ({ children }) => {
    const location = useLocation()
    const history = useHistory()
    const match = useRouteMatch<any>()

    return isFunction(children) ? children({ history, match, location }) : <Fragment />
}

export default HistoryWrapper
