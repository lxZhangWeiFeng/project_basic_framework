import ReactDom, { createPortal } from 'react-dom'
import React, { FC, Fragment, useContext, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import MenuContext from '../menu-context'
import AbsoluteMenuItem from '../absolute-menu-item'
import { getHaveItem, getKey } from '../index'
import styles from './index.less'
import { isArray } from '@/utils/judge-type'

type MenuItemProps = {
    itemRef: any
    absoluteShow: boolean
    closeAllAbsoluteShow: anyFunction
    routes: any[]
}

const App: FC<any> = ({ values, absoluteShow, filterList, position, closeAllAbsoluteShow }) => {
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {
        setDidMount(true)
    }, [])

    return (
        <MenuContext.Provider value={values}>
            <div className={styles['container']}>
                <CSSTransition
                    in={didMount ? absoluteShow : false}
                    timeout={300}
                    classNames={{
                        enter: styles['enter'],
                        enterActive: styles['enter-active'],
                        enterDone: styles['enter-done'],
                        exit: styles['exit'],
                        exitActive: styles['exit-active'],
                        exitDone: styles['exit-done']
                    }}
                >
                    <div className={styles['absolute-menu']} style={position}>
                        <div className={styles['absolute-inner']}>
                            {filterList.map((item: any) => {
                                const { title, path, icon, routes } = item

                                const key = getKey(item)
                                const innerProps = {
                                    title,
                                    path,
                                    icon,
                                    routes,
                                    closeAllAbsoluteShow
                                }
                                return (
                                    <Fragment key={key}>
                                        <AbsoluteMenuItem {...innerProps} />
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </MenuContext.Provider>
    )
}

const AbsoluteMenu: FC<MenuItemProps> = ({ absoluteShow, closeAllAbsoluteShow, routes, itemRef }) => {
    const ref = useRef<any>()
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const values = useContext(MenuContext)
    const list = isArray(routes) ? routes : []
    const filterList = list.filter((item) => getHaveItem(item))
    const menuHeight = filterList.length * (38 + 5) + 5

    useEffect(() => {
        if (absoluteShow && !ref.current) {
            const container = document.createElement('div')
            document.body.append(container)
            ref.current = container
        }
    }, [absoluteShow])

    useEffect(() => {
        return () => {
            if (ref.current) {
                ReactDom.unmountComponentAtNode(ref.current)
                document.body.removeChild(ref.current)
                ref.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (itemRef && ref.current && absoluteShow) {
            const style = itemRef.getBoundingClientRect() // 触发元素
            const style2 = ref.current.getBoundingClientRect() // 容器元素
            const style3 = document.body.getBoundingClientRect() // body
            const { right, top } = style
            const { left } = style2
            const { height: viewHeight } = style3
            let newTop = top
            if (menuHeight + newTop > viewHeight) {
                newTop = viewHeight - menuHeight
                if (newTop < 0) newTop = 0
            }
            setPosition({ top: newTop, left: right - left })
        } else {
            setPosition({ ...position })
        }
    }, [absoluteShow])

    return ref.current ? createPortal(<App {...{ values, absoluteShow, filterList, position, closeAllAbsoluteShow }} />, ref.current) : <Fragment />
}

export default AbsoluteMenu
