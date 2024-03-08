import { fileDownload } from '@/utils/utils'
import { isObject, isFunction } from '@/utils/judge-type'

const getFuncFromBelongTo = (funcs, belongTo) => {
    const emptyFunc = () => {}
    if (isObject(funcs)) {
        let res = funcs['default'] || emptyFunc
        Object.keys(funcs).some((key) => {
            const reg = new RegExp(key)
            const judge = reg.test(belongTo)
            if (judge) res = funcs[key]
            return judge
        })
        return res
    }
    if (isFunction(funcs)) {
        return funcs
    }
    return emptyFunc
}

const getEffects = ({ options, namespace }) => {
    const { getList, addItem, updateItem, deleteItem, setTag, deleteTag, getFilter, downloadItem, defaultParams = {} } = options

    const addEffects = {}

    // === effects
    // 获取列表
    if (isFunction(getList) || isObject(getList)) {
        addEffects.getList = function* get({ payload, needParams = true, ...other }, { call, put, select }) {
            const { params, belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(getList, belongTo)
            const body = needParams ? { ...params, ...payload } : payload
            const res = yield call(Func, body, other)
            yield put({ type: 'setList', payload: res })
            return res
        }
    }
    // 创建item
    if (isFunction(addItem) || isObject(addItem)) {
        addEffects.addItem = function* create({ payload, getList = false, ...other }, { call, put, select }) {
            const { belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(addItem, belongTo)
            const res = yield call(Func, payload, other)
            if (getList) yield put({ type: 'getList', payload: isObject(getList) ? getList : {} })
            return res
        }
    }
    // 更新item
    if (isFunction(updateItem) || isObject(updateItem)) {
        addEffects.updateItem = function* update({ payload, getList = false, ...other }, { call, put, select }) {
            const { belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(updateItem, belongTo)
            const res = yield call(Func, payload, other)
            if (getList) yield put({ type: 'getList', payload: isObject(getList) ? getList : {} })
            return res
        }
    }
    // 删除item
    if (isFunction(deleteItem) || isObject(deleteItem)) {
        addEffects.deleteItem = function* del({ payload, getList = false, ...other }, { call, put, select }) {
            const { belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(deleteItem, belongTo)
            const res = yield call(Func, payload, other)
            if (getList) yield put({ type: 'getList', payload: isObject(getList) ? getList : {} })
            return res
        }
    }
    // 设置标签
    if (isFunction(setTag) || isObject(setTag)) {
        addEffects.setTag = function* tag({ payload, getList = false, ...other }, { call, put, select }) {
            const { belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(setTag, belongTo)
            const res = yield call(Func, payload, other)
            if (getList) yield put({ type: 'getList', payload: isObject(getList) ? getList : {} })
            return res
        }
    }
    // 删除标签
    if (isFunction(deleteTag) || isObject(deleteTag)) {
        addEffects.deleteTag = function* tag({ payload, getList = false, ...other }, { call, put, select }) {
            const { belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(deleteTag, belongTo)
            const res = yield call(Func, payload, other)
            if (getList) yield put({ type: 'getList', payload: isObject(getList) ? getList : {} })
            return res
        }
    }
    // 获取筛选列表
    /**
     * @filterKey 存在filterOptions里的list的key (存值时需要使用)
     * @paramsKey 存在params里的选择list的key (在携带的参数里需要剔除)
     * @handleRes 处理返回值的函数（后端返回的值可能不规范，需要格式化一次）
     * @needParams 是否需要携带params参数
     */
    if (isFunction(getFilter) || isObject(getFilter)) {
        addEffects.getFilter = function* filter(
            { payload = {}, filterKey, paramsKey, handleRes, needParams = true, save = true, ...other },
            { call, put, select }
        ) {
            const { params, belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(getFilter, belongTo)
            const cloneParams = { ...params }
            if (paramsKey) delete cloneParams[paramsKey]
            const body = needParams ? { ...cloneParams, ...payload } : payload
            const filterRes = yield call(Func, body, filterKey, other)
            const filterList = isFunction(handleRes) ? handleRes(filterRes) : filterRes
            if (save) yield put({ type: 'setFilter', payload: { [`${filterKey}`]: filterList } })
            return filterList
        }
    }

    // 下载导出
    if (isFunction(downloadItem) || isObject(downloadItem)) {
        addEffects.downloadItem = function* download({ payload, ...other }, { call, select }) {
            const { belongTo } = yield select((state) => state[namespace])
            const Func = getFuncFromBelongTo(downloadItem, belongTo)
            const downloadRes = yield call(Func, payload, other)
            const { content, filename } = downloadRes
            const file = yield content
            yield fileDownload(file, filename)
            return downloadRes
        }
    }

    // 判别belongTo，如果不一样则修改belongTo，并重置params
    addEffects.judgeBelongTo = function* belongTo({ payload }, { put, select }) {
        const belongTo = yield select((state) => state[namespace].belongTo)
        if (belongTo !== payload) {
            yield put({ type: 'setBelongTo', payload })
            yield put({ type: 'updateParams', payload: ['all', { ...defaultParams }] })
        }
        return 0
    }

    return addEffects
}

export default getEffects
