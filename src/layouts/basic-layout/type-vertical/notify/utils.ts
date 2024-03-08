import urlString from '@/utils/url-string'

export const goRouter = (data: any, dispatch: any, history: any) => {
    const { targetType, projectId, taskId, versionId, targetId, notifyDetail, canLink, taskSourceType } = data
    if (!canLink) {
        return false
    }
    let link = ''
    switch (targetType) {
        case 'over-time': // 超过时间未扫描
        case 'project-create': // 新增项目
        case 'project-update': // 项目更新
        case 'over-time-ignore-vuln': // 超过三个月未处理漏洞
            link = `/project/detail/${projectId}/overview`
            dispatch({
                type: 'projectDetail/setSelectVersionId',
                payload: versionId
            })
            break
        case 'scan-task': // 扫描任务
            link = [11, 12].includes(taskSourceType)
                ? `/project/detail/${projectId}/task-image/${taskId}/image`
                : `/project/detail/${projectId}/task/${taskId}/component`

            break
        case 'project-delete': // 项目删除
            link = `/project`
            break
        case 'strategy-update': // 策略更新
            link = `/system/config/compliance/detail/${targetId}`
            break
        case 'scan-repo': // 扫描私服仓库推送通知
            link = `/private-server/list/detail/${targetId}`
            break
        case 'vuln-mgt': // 漏洞缺陷管理平台同步状态
            link = `/asset-manage/vuln/detail/${urlString.stringify({ id: targetId })}`
            break
        case 'new-batch-vuln': // 新批次的漏洞
            link = `/knowledge-library/vuln-detail/${urlString.stringify({ id: targetId, number: notifyDetail })}`
            break
        case 'comp-safety-level-changed': // 风险规则配置
            link = `/system/config/risk-rule-config`
            break
        case 'upgrade-complete': // 数据升级完成后（升级管理）
            link = `/knowledge-library`
            break
        default:
            break
    }

    history.push(link)
}

export const getmessage = ({ targetType, notifyByName, notifyMessage }: any) => {
    let message = ''
    switch (targetType) {
        case 'scan-task':
        case 'over-time':
        case 'upgrade-complete':
        case 'strategy-update':
        case 'scan-repo':
            message = notifyMessage
            break
        default:
            message = `${notifyByName}${notifyMessage}`
            break
    }
    return message
}
