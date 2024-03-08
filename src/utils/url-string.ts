/**
 * @description 格式化 url
 */

import qs from 'qs'
import { isString } from './judge-type'

const urlString = {
    stringify: (str: Record<string, string> | string): string => (isString(str) ? btoa(str) : btoa(qs.stringify(str))),
    parse: (str: string): Record<string, string> | string => {
        const bStr = atob(str)
        if (bStr.includes('=')) {
            return qs.parse(bStr) as Record<string, string> | string
        }
        return bStr
    }
}

export default urlString
