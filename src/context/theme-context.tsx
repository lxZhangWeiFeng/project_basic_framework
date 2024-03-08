import { createContext } from 'react'

export type themeType = 'horizontal' | 'vertical'

export const layoutTypeList = [
    {
        key: 'horizontal',
        value: '横向布局'
    },
    {
        key: 'vertical',
        value: '纵向布局'
    }
]

type ThemeContextValue = {
    layoutType: themeType
    setLayoutType: (a: themeType) => void
}

const ThemeContext = createContext<ThemeContextValue>({ layoutType: 'vertical', setLayoutType: () => {} })

export default ThemeContext
