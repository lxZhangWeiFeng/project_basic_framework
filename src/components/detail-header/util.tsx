const key = 'history'

const getHistory = () => {
    const value = localStorage.getItem(key)
    if (value && value !== 'undefined') {
        return JSON.parse(value)
    } else {
        return {}
    }
}

export const getValue = (name: string) => {
    return getHistory()[name]
}

export const setValue = (name: string, value: any) => {
    if (value) localStorage.setItem(key, JSON.stringify({ ...getHistory(), [name]: value }))
}
