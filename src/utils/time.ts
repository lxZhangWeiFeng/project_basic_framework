/**
 * @description 格式化时间的方法
 */

import dayjs from 'dayjs'

// 时间字符串标准格式
export const timeFormat = 'YYYY-MM-DD HH:mm:ss'
// 无秒格式化时间
export const timeFormatNoSecond = 'YYYY-MM-DD HH:mm'
// 无时分秒格式化时间
export const timeFormatNotime = 'YYYY-MM-DD'

const time = {
    // 10位时间戳转字符串
    stringify: (t: string | number, format = timeFormat): string => {
        if (t === null || t === undefined || t === '') return '-'
        const T = Number(t)
        if (typeof T === 'number' && !isNaN(T)) {
            if (String(T).length === 10) {
                return dayjs.unix(T).format(format)
            }
            if (String(T).length === 13) {
                return dayjs(T).format(format)
            }
            return '-'
        }
        return '-'
    },
    // 字符串转10位时间戳
    parse: (s: string, format = timeFormat): number => {
        return s ? dayjs(s, format).unix() : 0
    }
}

export default time
