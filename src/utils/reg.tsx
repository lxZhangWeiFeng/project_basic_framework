const urlReg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/

const pathReg = /^[a-zA-Z]:(([\\|/])([0-9a-zA-Z_!~*'(){}.;?:@&=+$,%#-]+))+$|^(\/[0-9a-zA-Z_!~*'(){}.;?:@&=+$,%#-]+)+$/

const tagReg = /^[A-Za-z0-9\u4e00-\u9fa5()（）_-]{2,100}$/

const pathnameReg = /^(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?$/

const likeIpReg = /^(?:[1-9]|1\d|1\d\d|2[0-4]\d|25[0-5]|\*)\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]|\*)\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]|\*)\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]|\*)$/

const nameReg = /^[A-Za-z0-9\u4e00-\u9fa5]{2,18}$/
const warehouseNameReg = /^[A-Za-z0-9\u4e00-\u9fa5]{2,40}$/

const ipReg = /^(?:[1-9]|1\d|1\d\d|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/

const ipSegmentReg = /^(?:[1-9]|1\d|1\d\d|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?:\/(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))?$/

const usernameReg = /^[a-zA-Z0-9_]{3,20}$/

const emailReg = /^[A-Za-z\d]([-_.A-Za-z\d]+)@([A-Za-z\d]+)\.([A-Za-z\d]+)$/

const mobilePhoneReg = /^1\d{10}/

const domainReg = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/

const infoReg = /^[\u4e00-\u9fa5a-zA-Z0-9_()（）-]{2,40}$/

const keyPatten = /((^\*[A-Za-z_$][A-Za-z0-9_$]*)|(^[A-Za-z_$][A-Za-z0-9_$]*)|(^[A-Za-z_$][A-Za-z0-9_$]*\*$)|(^\*[A-Za-z_$][A-Za-z0-9_$]*\*$))$/

const gitUrlReg = /\.git$/

export {
    urlReg,
    pathReg,
    tagReg,
    pathnameReg,
    likeIpReg,
    nameReg,
    ipReg,
    ipSegmentReg,
    usernameReg,
    emailReg,
    mobilePhoneReg,
    domainReg,
    infoReg,
    keyPatten,
    gitUrlReg
}

export const validator = {
    name: {
        pattern: nameReg,
        message: '名称由中文、英文或数字组成，不含符号，长度2～18字符'
    },
    warehouseName: {
        pattern: warehouseNameReg,
        message: '名称由中文、英文或数字组成，不含符号，长度2～40字符'
    },
    ip: {
        pattern: ipReg
    },
    ipSegment: {
        pattern: ipSegmentReg
    },
    username: {
        pattern: usernameReg,
        message: '用户名可由字母、数字、下划线组成，长度3～20字符'
    },
    email: {
        pattern: emailReg
    },
    mobilePhone: {
        pattern: mobilePhoneReg
    },
    domain: {
        pattern: domainReg
    },
    likeIp: {
        pattern: likeIpReg
    },
    pathname: {
        pattern: pathnameReg
    },
    path: {
        pattern: pathReg
    },
    url: {
        pattern: urlReg
    },
    tag: {
        pattern: tagReg
    }
}
