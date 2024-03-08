import { createContext } from 'react'

type listItem = { path: string; title: string; hidden: boolean; container: string; isDefault: boolean; titleReplace?: string }

type BreadCrumbContextProps = {
    replace: anyObject
    setReplace: (r: anyObject) => void
    list: listItem[]
    setList: (l: listItem[]) => void
}

const BreadCrumbContext = createContext<BreadCrumbContextProps>({ list: [], setList: () => {}, replace: {}, setReplace: () => {} })

export default BreadCrumbContext
