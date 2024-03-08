/* eslint-disable no-unused-vars */
declare module '*.less'
declare module '*.json'
declare module 'dva-core'
declare module 'dva-loading'
declare module 'lodash/*'
declare module '*.svg'
declare module 'react-color'
declare module '*.png'
declare module '*.pdf'
declare module '*.mdx'
declare module 'react-window'

// declare module 'react-router'

// 全局 type 数据类型
type anyObject = Record<string, any>

type anyFunction = (...rest: any) => any

type Dispatch = (A: any) => Promise<any>

type modelType<S> = {
    namespace: string
    state: S
    effects?: {
        [key: string]: ({ action, payload }: any, { call, put, select }: any) => Generator<any>
    }
    reducers?: {
        [key: string]: (state: S, { action, payload }: any) => S
    }
    subscriptions?: {
        [key: string]: ({ dispatch, history }: any) => void
    }
}

type ProNameProps = {
    [proName: string]: string
}
