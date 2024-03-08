/**
 * @description 全局 modal 使用的 model
 */

type state = {
    [key: string]: boolean
}

const model: modelType<state> = {
    namespace: 'modalState',
    state: {},
    effects: {},
    reducers: {
        setModalState(state, { payload }): state {
            return {
                ...state,
                ...payload
            }
        }
    }
}

export default model
