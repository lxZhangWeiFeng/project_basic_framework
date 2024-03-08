/**
 * @description 全局管理modal的状态
 */

import { isString } from '@/utils/judge-type'

type handleFun = (key: string) => (dispatch: Dispatch, someInfo?: any, callback?: anyFunction) => void

export const modalOpen: handleFun = (key) => (dispatch, someInfo = {}, callback = () => {}) => {
    dispatch({
        type: 'modalState/setModalState',
        payload: {
            [`${key}`]: {
                callback,
                info: someInfo,
                visible: true
            }
        }
    })
}

export const modalClose: handleFun = (key: string) => (dispatch, someInfo = {}, callback = () => {}) => {
    dispatch({
        type: 'modalState/setModalState',
        payload: {
            [`${key}`]: {
                callback,
                info: someInfo,
                visible: false
            }
        }
    })
}

type arrType = (string | { inner: string; outer: string })[]

export const modalFormatData = (arr: arrType) => (allData: anyObject) => {
    const data: anyObject = {}
    arr.forEach((item) => {
        if (isString(item)) {
            if (allData[item] !== undefined && allData[item] !== null) {
                data[item] = allData[item]
            }
        } else {
            const { inner, outer } = item
            if (allData[inner] !== undefined && allData[inner] !== null) {
                data[outer] = allData[inner]
            }
        }
    })
    return data
}
