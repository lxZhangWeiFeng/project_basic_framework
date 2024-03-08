import { isString, isArray } from '@/utils/judge-type'

// 删除空字符串
const formatParams = (params) => {
    const newParams = { ...params }

    Object.keys(params).forEach((key) => {
        const value = newParams[key]
        if (isString(value) && value === '') {
            delete newParams[key]
        }
        if (isArray(value) && value.length === 0) {
            delete newParams[key]
        }
    })

    return newParams
}

const getReducers = ({ options }) => {
    const { defaultParams = {} } = options
    const addReducers = {}
    // === reducers

    // 更新params
    addReducers.updateParams = (state, { payload = [] }) => {
        let resParams = { ...state.params }

        const handleObj = (newParams) => {
            resParams = {
                ...resParams,
                ...newParams
            }
        }

        const handleStr = (str) => {
            // 如果是all
            if (str === 'all') {
                resParams = { ...defaultParams }
            } else {
                delete resParams[str]
            }
        }

        const handlePayload = (p) => {
            const payloadType = Object.prototype.toString.call(p)

            switch (payloadType) {
                case '[object Object]':
                    handleObj(p)
                    break
                case '[object String]':
                    handleStr(p)
                    break
                case '[object Array]':
                    p.forEach(handlePayload)
                    break
                default:
                    break
            }
        }

        handlePayload(payload)

        return { ...state, params: formatParams({ ...resParams }) }
    }

    // 部分列表存在复用，根据belongTo判别所在页面
    addReducers.setBelongTo = (state, { payload }) => {
        return { ...state, belongTo: payload }
    }

    // 设置列表和分页
    addReducers.setList = (state, { payload }) => {
        if (Array.isArray(payload)) {
            return {
                ...state,
                list: payload
            }
        }
        const { list = [], ...rest } = payload
        return {
            ...state,
            list,
            pagination: rest
        }
    }

    // 设置筛选列表
    addReducers.setFilter = (state, { payload }) => {
        return {
            ...state,
            filterOptions: {
                ...state.filterOptions,
                ...payload
            }
        }
    }

    // 清空list
    addReducers.clearList = (state) => {
        return {
            ...state,
            list: [],
            pagination: {}
        }
    }

    return addReducers
}

export default getReducers
