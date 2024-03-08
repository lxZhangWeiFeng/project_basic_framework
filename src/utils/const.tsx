/**
 * @description 一些常量
 */
import React from 'react'
import { Tag } from 'antd'

export const SORT_ORDER_TYPE: any = {
    ASC: 'ascend',
    DESC: 'descend'
}

export const SORT_NUMBERS: anyObject = {
    ascend: 'ASC',
    descend: 'DESC'
}

const iconList: anyObject = {
    ['example-example1-example2']: 'example',
    ['设置']: 'config',
    ['状态']: 'process',
    ['忽略']: 'forbid',
    ['取消忽略']: 'remove',
    ['创建问题']: 'create',
    ['删除']: 'delete',
    ['批量删除']: 'delete',
    ['移除']: 'delete',
    ['删除任务']: 'delete',
    ['新增']: 'add-circle',
    ['修改']: 'edit',
    ['更多']: 'more',
    ['重置密码']: 'reset-password',
    ['分配角色']: 'assigning-roles',
    ['退出项目']: 'exit',
    ['项目转移']: 'transfer',
    ['重新扫描']: 'scan',
    ['立即扫描']: 'scan',
    ['WORD']: 'word',
    ['PDF']: 'pdf',
    ['CSV']: 'csv',
    ['SBOM']: 'sbom',
    ['XLSX']: 'xlsx',
    ['复制']: 'copy',
    ['默认']: 'default',
    ['设为默认']: 'set-default',
    ['关闭']: 'forbid',
    ['开启']: 'power',
    ['查看日志']: 'log',
    ['启用']: 'enable',
    ['禁用']: 'disable',
    ['下载报告']: 'download',
    ['批量下载报告']: 'download'
    // ['创建问题']: 'handle'
}

export const getIcon = (key: string): string => {
    if (iconList[key]) return iconList[key]
    let res = 'noIconName'
    Object.entries(iconList).forEach(([k, v]) => {
        const keyList = k.split('-')
        if (keyList.includes(key)) {
            res = v
        }
    })
    return res
}

// 普通状态
export const statusList = [
    {
        key: 'USED',
        value: '正常',
        color: '#87d068'
    },
    {
        key: 'DISABLED',
        value: '禁用',
        color: '#f50f50'
    }
]
export const getStatusKey = (t: string): string => statusList.find(({ value }) => value === t)?.key || '-'
export const getStatusText = (k: string): string => statusList.find(({ key }) => key === k)?.value || '-'
export const getStatusColor = (k: string): string => statusList.find(({ key }) => key === k)?.color || '#000'
export const renderStatus = (k: string): JSX.Element => <Tag color={getStatusColor(k)}>{getStatusText(k)}</Tag>

// 操作日志状态
export const handleLogStatusList = [
    {
        key: 'SUCCESS',
        value: '成功',
        color: '#87d068'
    },
    {
        key: 'ERROR',
        value: '失败',
        color: '#f50f50'
    }
]
export const getLogStatusKey = (t: string): string => handleLogStatusList.find(({ value }) => value === t)?.key || '-'
export const getLogStatusText = (k: string): string => handleLogStatusList.find(({ key }) => key === k)?.value || '-'
export const getLogStatusColor = (k: string): string => handleLogStatusList.find(({ key }) => key === k)?.color || '#000'
export const renderLogStatus = (k: string): JSX.Element => <Tag color={getLogStatusColor(k)}>{getLogStatusText(k)}</Tag>

// 显示和隐藏
export const visibilityList = [
    {
        key: 'SHOW',
        value: '显示',
        color: '#87d068'
    },
    {
        key: 'HIDDEN',
        value: '隐藏',
        color: '#f50f50'
    }
]
export const getVisibilityKey = (t: string): string => visibilityList.find(({ value }) => value === t)?.key || '-'
export const getVisibilityText = (k: string): string => visibilityList.find(({ key }) => key === k)?.value || '-'
export const getVisibilityColor = (k: string): string => visibilityList.find(({ key }) => key === k)?.color || '#000'
export const renderVisibility = (k: string): JSX.Element => <Tag color={getVisibilityColor(k)}>{getVisibilityText(k)}</Tag>

// menu类型
export const menuTypeList = [
    {
        key: 'M1',
        value: '目录'
    },
    // {
    //     key: 'M2',
    //     value: '子目录'
    // },
    {
        key: 'C1',
        value: '菜单'
    },
    {
        key: 'C2',
        value: '个人中心菜单'
    },
    {
        key: 'F',
        value: '按钮'
    }
]

export const cycleList = ['每日', '每周', '每月']
export const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export const weekOption = [
    { key: 1, value: '周日' },
    { key: 2, value: '周一' },
    { key: 3, value: '周二' },
    { key: 4, value: '周三' },
    { key: 5, value: '周四' },
    { key: 6, value: '周五' },
    { key: 7, value: '周六' }
]

export const typeOption = [
    { key: 3, value: '每月' },
    { key: 2, value: '每周' },
    { key: 1, value: '每日' }
]

export const rankEn = ['serious', 'high', 'middle', 'low', 'alarm']
export const rank = ['严重', '高危', '中危', '低危', '提醒']

export const levelAbridge = ['C', 'H', 'M', 'L', 'I', 'U']

// FireCenter api
export const GET_VERSIONS = 'get-versions'
export const GET_PROJECT_INFO = 'get-project-info'
export const GET_PROJECT_OVERVIEW = 'get-project-overview'
export const GET_RISK_TREND_INFO = 'get-risk-trend-info' // 获取项目详情的风险趋势
export const GET_APP_GROUP_DETAILS_INFO = 'get-app-group-details-info'
export const GET_APP_LIST_OVERVIEW = 'get-app-list-overview'

// end================

// 策略符号

export const SYMBOL_OPTIONS = ['>=', '<=', '=']

// export const SYMBOL_OBJECT_OPTIONS = [
//     {
//         id: '>=',
//         name: '晚于(包括该版本)'
//     },
//     {
//         id: '=',
//         name: '等于'
//     },
//     {
//         id: '<=',
//         name: '早于(包括该版本)'
//     }
// ]

// 黑白名单
export const BLACK_LIST_HANDLE = ['加入黑名单', '取消黑名单', '加入黑名单']
export const WHITE_LIST_HANDLE = ['取消白名单', '加入白名单', '加入白名单']

// 组件状态标记mapping
export const SIGN_HANDLE_MAPPING: any = {
    2: {
        label: '标记为自研组件',
        key: 2
    },
    1: {
        label: '标记为未收录组件',
        key: 1
    }
}

// 组件状态标记的Icon mapping
export const SIGN_ICON_NAME_MAPPING: any = {
    1: 'unknown-comp', // 未知
    2: 'self-research', // 自研
    3: 'not-included', // 未收录
    4: 'tampering' // 篡改
}

// Nexus仓库类型
export const nexusPlatForm = ['Nexus2.x', 'Nexus3.x']
// Harbor仓库类型
export const harborPlatForm = ['Harbor1.4.x-1.10.x', 'Harbor2.0.x-latest']

// 制品仓库 平台类型
export const productLibraryPlatform = [
    ...nexusPlatForm,
    ...harborPlatForm
    // 'Artifactory6.x',
    // 'Artifactory7.x'
]

// 黑白名单枚举
export const IS_BLACk_OPTIONS = [
    {
        id: 0,
        name: '白名单'
    },
    {
        id: 1,
        name: '黑名单'
    },
    {
        id: 2,
        name: '未标记'
    }
]
