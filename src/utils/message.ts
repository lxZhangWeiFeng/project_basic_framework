import { message } from 'antd'

// 制品仓库填写提示
export const productsMessageInfo: any = {
    'Nexus2.x': {
        placeholder: 'http://{ip}:{port}/nexus/content/repositories/仓库名称/',
        helpInfo: { top: ['登录Nexus2.x - 在仓库页面，选择需要分析的制品库仓库 - 复制Repository Path'] }
    },
    'Nexus3.x': {
        placeholder: 'http://{ip}:{port}/repository/仓库名称/',
        helpInfo: { top: ['登录Nexus3.x - 在仓库页面，选择需要分析的制品库仓库 - 复制URL'] }
    },

    'Harbor1.4.x-1.10.x': {
        placeholder: '请填写仓库地址, 例：https://192.168.2.150'
    },
    'Harbor2.0.x-latest': {
        placeholder: '请填写仓库地址, 例：https://192.168.2.150'
    }
}

export const messageFun = ({ value, successText, failText }: any): any => {
    if (value) {
        if (successText) {
            message.success(successText)
        }
    } else {
        if (failText) {
            message.error(failText)
        }
    }
}
