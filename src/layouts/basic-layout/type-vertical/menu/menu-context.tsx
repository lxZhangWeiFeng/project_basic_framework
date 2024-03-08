import { createContext } from 'react'

export type MenuContextProps = {
    openKeys: Record<string, boolean>
    setOpenKeys: anyFunction
    hiddenMenu: boolean
    isSelect: anyFunction
    menuClick: anyFunction
}

const MenuContext = createContext<MenuContextProps>({
    openKeys: {},
    setOpenKeys: () => {},
    hiddenMenu: false,
    isSelect: () => {},
    menuClick: () => {}
})

export default MenuContext
