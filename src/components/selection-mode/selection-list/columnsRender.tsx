/* eslint-disable no-duplicate-case */
import React, { Fragment } from 'react'
import { Popconfirm, Tooltip } from 'antd'
import Icon from '@/components/icon'
import { fixNull } from '@/utils/utils'
import DictWrapper from '@/components/dict-wrapper'
// import LicenseBlock from '@/components/license-block'
// import StringWarp from '@/components/string-warp'
import EllipsisText from '@/components/ellipsis-text'

import styles from './index.less'

// const { Paragraph } = Typography

//* 只有知识库点组件名才进入组件详情，其他进入版本详情
// const detailsPath: ProNameProps = {
//     knowledge: '/knowledge-library/component/' // 组件详情
// }

const columnsRender = ({ getlist, dispatch }: any) => (key: string): any => {
    switch (key) {
        case 'compName':
            return (t: any) => <EllipsisText>{t || '-'}</EllipsisText>
        case 'compVersion':
            return (t: string) => {
                return t
            }
        case 'licenseTypes':
            return (t: any) => {
                return t?.map(({ key, value: listValue }: any) => (
                    <DictWrapper dictName="licenseRiskLevel" dictKey={listValue} key={key}>
                        {({ value, color }) => (
                            <Tooltip title={value}>
                                <span style={{ background: color }} className={styles['license-block']}>
                                    {key}
                                </span>
                            </Tooltip>
                        )}
                    </DictWrapper>
                ))
            }
        case 'handle':
            return (_: any, { purl }: any) => {
                const deleteList = () => {
                    dispatch({
                        type: 'selectionMode/deleteSelection',
                        payload: {
                            purl
                        }
                    }).then(() => {
                        getlist()
                    })
                }
                return (
                    <Popconfirm title="确认删除该组件吗？" onConfirm={deleteList}>
                        <span className={styles['handle']}>
                            <Icon name="no-filled" color="#E34D59" />
                        </span>
                    </Popconfirm>
                )
            }
        default:
            return fixNull
    }
}

export default columnsRender
