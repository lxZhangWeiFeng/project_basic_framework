// 占位符转换
export const changePlaceholder = (string: string, text: string) => {
    return string.replace(/{levelName}/, text)
}

// levelName 占位符，等级用来替换levelName
export const componentLevelLegendExplain: any = {
    2: '{levelName}组件更易受漏洞攻击，强烈建议尽快修复',
    3: '{levelName}组件，可能受漏洞攻击，建议修复',
    4: '{levelName}组件，受漏洞攻击可能性较小，影响较小，在团队资源有限的情况下，可考虑延后处理和修复',
    100: '组件无安全风险'
}

// levelName 占位符，等级用来替换levelName
export const projectLevelLegendExplain: any = {
    2: '{levelName}项目建议重点关注',
    3: '{levelName}项目建议关注',
    4: '{levelName}项目存在较低风险',
    100: '项目安全'
}
