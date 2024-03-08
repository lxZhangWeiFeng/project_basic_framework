/**
 * @description 全局 列表多选 使用的 model
 */

type state = {
    [key: string]: any
}

const model: modelType<state> = {
    namespace: 'listMultiple',
    state: {},
    effects: {},
    reducers: {
        setCheckId(state, { payload }) {
            const { key, ids = [] } = payload
            if (key) {
                return { ...state, [`${key}`]: ids }
            } else {
                return { ...state }
            }
        }
    }
}

export default model
