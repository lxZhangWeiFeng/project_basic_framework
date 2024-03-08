import { History } from 'history'

type Push = (path: History.Path, state?: History.LocationState) => void

const key = 'historys'

const customHistory = (h: History): History => {
    // push 转发 state 的 backUrl
    const push: Push = (...args) => {
        const historys = JSON.parse(sessionStorage.getItem(key) || '[]')
        let newHistorys = [{ props: args }, ...historys]
        if (newHistorys.length > 20) {
            newHistorys = newHistorys.slice(0, 20)
        }
        sessionStorage.setItem(key, JSON.stringify(newHistorys))
        h.push(...args)
    }

    const _h = { ...h, push }

    return _h
}

export const getHistorys = () => {
    const historys = JSON.parse(sessionStorage.getItem(key) || '[]')
    const before = historys[1]
    if (before) {
        sessionStorage.setItem(key, JSON.stringify(historys.slice(1)))
    }
    return before
}

export default customHistory
