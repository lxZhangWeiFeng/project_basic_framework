import React, { FC, Fragment } from 'react'
import { Switch, Tooltip } from 'antd'
import { SwitchProps } from 'antd/es/switch'
import { useDispatch, useSelector } from 'react-redux'
import AddModal, { open } from '../_pkg/add-modal'
import EditModal from '../_pkg/edit-modal'
// import { open as editOpen } from '../_pkg/edit-modal'
import styles from './index.less'

const SelectionMode: FC<SwitchProps> = ({ disabled, ...props }) => {
    const { isSelectionMode } = useSelector(({ selectionMode }: any) => ({ isSelectionMode: selectionMode?.isSelectionMode }))
    const dispatch = useDispatch()
    const changeSwitch = (v: boolean) => {
        if (v) {
            open(dispatch)
        } else {
            dispatch({
                type: 'selectionMode/changeModeOpenStatus',
                payload: {
                    modeIsOpen: false
                }
            })
            dispatch({
                type: 'selectionMode/changeSelectMode',
                payload: {
                    isSelectionMode: !!v
                }
            })
        }
    }

    return (
        <Fragment>
            <div className={styles['switch-box']}>
                <Tooltip title={disabled ? '仅支持Maven' : ''}>
                    <span className={styles['switch-text']}>(仅支持Java语言)组件选型模式</span>
                    <Switch disabled={disabled} {...props} onChange={changeSwitch} checked={!!isSelectionMode} />
                </Tooltip>
            </div>
            <AddModal payload={{}} />
            <EditModal payload={{}} />
        </Fragment>
    )
}

export default SelectionMode
