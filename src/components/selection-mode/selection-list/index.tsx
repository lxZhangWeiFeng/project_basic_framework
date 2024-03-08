import React, { useEffect, Fragment, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Tooltip, Popconfirm } from 'antd'
import classnames from 'classnames'
import Icon from '@/components/icon'
import DictWrapper from '@/components/dict-wrapper'
import ExportModal, { open as openExportModal } from './_pkg/export-modal'
import List from './list'
import { open as editModal } from '../_pkg/edit-modal'
import styles from './index.less'

const SelectionList = () => {
    const { selectionMode } = useSelector(({ selectionMode }: any) => ({
        selectionMode
    }))

    const { modeInfo = {}, selectionInfo, modeIsOpen } = selectionMode
    const { licenseConflictCount, licenseConflictTypes = [] } = selectionInfo || {}
    const dispatch = useDispatch<any>()

    const { language, projectProperty, projectGroupId, projectArtifactId, projectVersion } = modeInfo

    const editNature = () => {
        editModal(dispatch, { ...modeInfo })
    }

    const getlist = () => {
        dispatch({
            type: 'selectionMode/getList'
        })
    }

    const openModal = () => {
        openExportModal(dispatch)
    }

    const changeStatus = () => {
        dispatch({
            type: 'selectionMode/changeModeOpenStatus',
            payload: {
                modeIsOpen: !modeIsOpen
            }
        })
    }

    const clearHandle = () => {
        dispatch({
            type: 'selectionMode/deleteSelection',
            payload: {
                removeAll: true
            },
            message: '清空成功'
        }).then(() => {
            getlist()
        })
    }

    useEffect(() => {
        if (modeInfo) {
            getlist()
        }
    }, [JSON.stringify(modeInfo)])

    const tootipDom = useMemo(
        () =>
            licenseConflictTypes?.length ? (
                <div>
                    {licenseConflictTypes?.map(({ key, value }: any) => (
                        <div key={key + value}>{`${key}与${value}存在冲突`}</div>
                    ))}
                </div>
            ) : (
                ''
            ),
        [JSON.stringify(licenseConflictTypes)]
    )

    return (
        <div className={styles['wrapper']}>
            <div className={styles['top']}>
                {/* <div className={styles['form']}>
                    <ProjectProForm />
                </div> */}
                <div className={styles['list']}>
                    <div className={styles['header']}>
                        <div className={styles['content-info']}>
                            <div>
                                <div>
                                    应用语言：
                                    <DictWrapper dictName="selectionModeLanguage" dictKey={language}>
                                        {({ value }) => value || ''}
                                    </DictWrapper>
                                </div>
                                <div>
                                    应用属性：
                                    <DictWrapper dictName="projectProperty" dictKey={projectProperty}>
                                        {({ value }) => value || ''}
                                    </DictWrapper>
                                </div>
                            </div>
                            <div
                                className={classnames(styles['mode-open-hidden'], {
                                    [styles['mode-open-show']]: !!modeIsOpen
                                })}
                            >
                                <div className={styles['mode-open-item']}>
                                    <span>组ID：{projectGroupId}</span>
                                    <span>工件ID：{projectArtifactId}</span>
                                </div>
                                <div className={styles['mode-open-item']}>
                                    <span>版本：{projectVersion}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles['edit']} onClick={editNature}>
                            <Icon name="edit" style={{ marginRight: 8 }} />
                            编辑
                        </div>
                    </div>
                    <div className={styles['content']}>
                        <div style={{ marginBottom: 12 }} className={styles['tip-wrapper']}>
                            <span className={styles['tip-info']}>已选组件</span>
                            {licenseConflictCount ? (
                                <Tooltip title={tootipDom}>
                                    <span className={styles['prompt']}>
                                        <Icon name="jinggao" color="#E03C3B" style={{ marginRight: 4 }} />
                                        {/* {`存在${licenseConflictCount}个许可冲突`} */}
                                        {`存在许可冲突`}
                                    </span>
                                </Tooltip>
                            ) : (
                                <Fragment />
                            )}
                            <Popconfirm title="确认清空组件吗？" onConfirm={clearHandle}>
                                <span className={styles['delete-handle']}>
                                    <Icon name="delete" />
                                    清空
                                </span>
                            </Popconfirm>
                        </div>
                        <div className={styles['list-wrapper']}>
                            <List payload={modeInfo} data={selectionInfo} getlist={getlist} modeIsOpen={modeIsOpen} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['export']}>
                <Button ghost type="primary" onClick={changeStatus}>
                    <Icon
                        name="put-away"
                        className={classnames(styles['expand-btn'], {
                            [styles['close-btn']]: !!modeIsOpen
                        })}
                    />{' '}
                    {modeIsOpen ? '收起' : '展开'}
                </Button>
                <Button type="primary" onClick={openModal}>
                    导出
                </Button>
            </div>
            <ExportModal payload={{}} />
        </div>
    )
}

export default SelectionList
