import React, { FC, Fragment, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import CollapseMenuItem from '../collapse-menu-item'
import { useResizeObserver } from '@/hooks'
import { getHaveItem, getKey } from '../index'
import styles from './index.less'

type MenuItemProps = {
    collapseShow: boolean
    routes: any[]
    index?: number
}

const CollapseMenu: FC<MenuItemProps> = ({ collapseShow, routes, index = 0 }) => {
    const [state, setState] = useState('')
    const menuRef = useRef<any>()
    const [style] = useResizeObserver(menuRef.current)
    const { height = 0 } = style || {}
    const [inKey, setInKey] = useState(false)

    useEffect(() => {
        setInKey(collapseShow)
    }, [collapseShow])

    const getStyle = () => {
        switch (state) {
            case 'onEnter':
                return {
                    maxHeight: 0,
                    overflow: 'hidden',
                    display: 'block'
                }
            case 'onEntering':
                return {
                    maxHeight: height,
                    overflow: 'hidden',
                    display: 'block',
                    transition: 'all 0.3s ease-in'
                }
            case 'onEntered':
                return {
                    maxHeight: 'initial',
                    overflow: 'visible',
                    display: 'block'
                }
            case 'onExit':
                return {
                    maxHeight: height,
                    overflow: 'hidden',
                    display: 'block'
                }
            case 'onExiting':
                return {
                    maxHeight: 0,
                    overflow: 'hidden',
                    display: 'block',
                    transition: 'all 0.3s ease-in'
                }
            case 'onExited':
                return {
                    maxHeight: 0,
                    overflow: 'hidden',
                    display: 'none'
                }
            default:
                return {}
        }
    }

    return (
        <CSSTransition
            in={inKey}
            timeout={300}
            onEnter={() => setState('onEnter')}
            onEntering={() => setState('onEntering')}
            onEntered={() => setState('onEntered')}
            onExit={() => setState('onExit')}
            onExiting={() => setState('onExiting')}
            onExited={() => setState('onExited')}
        >
            <div className={classNames(styles['collapse-menu'])} style={getStyle()}>
                <div ref={menuRef}>
                    <div className={classNames(styles['collapse-inner'])}>
                        {routes.map((item: any) => {
                            const { title, path, icon, routes } = item
                            const haveItem = getHaveItem(item)
                            const key = getKey(item)
                            const innerProps = {
                                title,
                                path,
                                icon,
                                routes,
                                collapseOver: !['onEnter', 'onEntering'].includes(state),
                                index: index + 1
                            }
                            return <Fragment key={key}>{haveItem && <CollapseMenuItem {...innerProps} />}</Fragment>
                        })}
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default CollapseMenu
