import { isString } from '@/utils/judge-type'

const getFilterCount = (filterList = [], params = {}) => {
    let filterCount = 0

    filterList?.forEach(({ paramsKey = '', type = 'select' }) => {
        switch (type) {
            case 'range': {
                if (Array.isArray(paramsKey) ? params[paramsKey[0]] && params[paramsKey[1]] : false) {
                    filterCount++
                }
                break
            }
            case 'range-box': {
                if (Array.isArray(paramsKey) ? params[paramsKey[0]] && params[paramsKey[1]] : false) {
                    filterCount++
                }
                break
            }
            case 'select': {
                if (Array.isArray(params[paramsKey]) ? params[paramsKey].length > 0 : isString(params[paramsKey]) || false) {
                    filterCount++
                }
                break
            }
            case 'text': {
                if (params[paramsKey]) {
                    filterCount++
                }
                break
            }
            default:
                break
        }
    })

    return filterCount
}

export { getFilterCount }
