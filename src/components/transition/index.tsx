import React, { cloneElement, FC, Fragment } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { useLocation, Switch, useParams } from 'react-router-dom'
import { getAllKeys, getKey } from './util'
import styles from './transform/index.less'

/**
 * @description 传入的 children 需要是Switch组件，这样才能控制 location
 */

const Transition: FC = ({ children }) => {
    const child: any = children
    const location = useLocation()
    const matchParams = useParams()
    const isSwitch = child && child?.type === Switch

    if (isSwitch) {
        const { pathname } = location
        const allKeys = getAllKeys(children, matchParams)
        const key = getKey(allKeys, pathname)

        return (
            <SwitchTransition>
                <CSSTransition
                    key={key}
                    timeout={{
                        enter: 500,
                        exit: 500
                    }}
                    classNames={{
                        enter: styles['enter'],
                        enterActive: styles['enter-active'],
                        enterDone: styles['enter-done'],
                        exit: styles['exit'],
                        exitActive: styles['exit-active'],
                        exitDone: styles['exit-done']
                    }}
                >
                    <div>{cloneElement(child, { location })}</div>
                </CSSTransition>
            </SwitchTransition>
        )
    }

    return <Fragment>{child}</Fragment>
}

export default Transition
