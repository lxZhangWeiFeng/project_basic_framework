import getReducers from './getReducers'
import getEffects from './getEffects'

/**
 * @options
 *
 * @param {function} getList // 获取列表
 * @param {function} addItem // 新增
 * @param {function} updateItem // 更新
 * @param {function} deleteItem // 删除
 * @param {function} getFilter // 获取筛选options
 * @param {function} downloadItem // 下载/导出 文件
 * @param {function} setTag // 设置标签
 * @param {function} deleteTag // 删除标签
 *
 * @param {[key]:value} defaultParams // 默认的参数，如果是需要根据getFilter取值进行设置的话，需要在listHook设置
 * @param {[key]:value} defaultFilterOptions // 默认的 filterOptions，不需要通过getFilter获取的option
 */

/**
 * @description 常用的table model生成
 * @param {Object} options
 */

type FuncItem = anyFunction | { [key: string]: anyFunction }

type optionsType = {
    getList?: FuncItem
    addItem?: FuncItem
    updateItem?: FuncItem
    deleteItem?: FuncItem
    getFilter?: FuncItem
    downloadItem?: FuncItem
    setTag?: FuncItem
    deleteTag?: FuncItem

    defaultParams?: anyObject
    defaultFilterOptions?: anyObject
}

export const formatTableModel = (model: modelType<any>, options: optionsType): modelType<any> => {
    const { namespace } = model
    const { defaultParams, defaultFilterOptions } = options
    if (!namespace) throw new Error('namespace is required.')

    const addState = {
        pagination: {},
        list: [],
        params: defaultParams || {},
        filterOptions: defaultFilterOptions || {},
        belongTo: 'default'
    }

    const addReducers = getReducers({ options })
    const addEffects = getEffects({ options, namespace })

    return {
        namespace,
        state: {
            ...(model.state || {}),
            ...addState
        },
        effects: {
            ...(model.effects || {}),
            ...addEffects
        },
        reducers: {
            ...(model.reducers || {}),
            ...addReducers
        }
    }
}
