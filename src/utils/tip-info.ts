import { componentLevelLegendExplain, projectLevelLegendExplain } from './levelsTipMap'

export const projectTipInfo = {
    title: '应用风险等级判定说明：',
    top: [
        '应用风险等级代表系统内应用的安全风险情况概览。若应用已绑定策略，则应用等级由应用中违反的最严重策略等级决定。若应用未绑定策略，则应用等级由最严重漏洞等级决定。'
    ],
    legendExplain: projectLevelLegendExplain
    // bottom: [
    //     '若该应用存在多个组件，则取组件的最严重危害等级。例如：一个应用版本中，组件A安全等级为严重，组件B安全等级为低危，则该应用版本安全等级判定为严重。',
    //     '组件危害等级由该组件中包含的漏洞等级计算。如一个组件存在多个漏洞，则取漏洞的最严重危害等级计算。例如：一个组件中，既存在严重漏洞，有存在低危漏洞，则该组件危害等级为严重。'
    // ]
}

export const appGroupTipInfo = {
    title: '应用组风险等级判定说明：',
    top: ['应用组等级取决于组内最严重的应用等级。']
}
export const appGroupRiskTipInfo = {
    title: '组件风险分布：',
    top: ['应用占比越大，应用包含对应风险等级组件的数量越多。']
}
export const appGroupVulnRiskTipInfo = {
    title: '漏洞风险分布：',
    top: ['应用占比越大，应用包含对应等级的漏洞数量越多。']
}

export const componentTipInfo = {
    title: '组件风险等级判定说明：',
    top: [
        [
            '组件风险等级代表系统内组件的安全风险情况以及漏洞修复优先级推荐。组件风险等级的评定由系统管理员在',
            {
                name: '风险规则等级',
                link: '/system/config/risk-rule-config'
            },
            '设置中设定评定方式。'
        ],
        '组件风险等级共有四个等级：'
    ],
    // bottom: ['如一个组件存在多个漏洞，则取漏洞的最严重危害等级计算。例如：一个组件中，既存在严重漏洞，有存在低危漏洞，则判定该组件危害等级为严重。'],

    // levelName 占位符，组件等级用来替换levelName
    legendExplain: componentLevelLegendExplain
}

export const licenseTipInfo = {
    title: '许可风险等级判定说明：',
    top: [
        '该饼图展示的是所有应用版本中最新扫描任务的开源许可总数及其对应风险等级分布图（数据经过去重）。',
        '因开源许可自身的特性与权限，在不同的应用属性中可能存在不同等级的风险，例如：GPL-2.0 only因其是普通传染性许可的特性，强制要求使用其许可的软件程序开源，对于商业用途的企业或软件程序来说是不友好的，但对于本身就是开源属性的应用来说，并不构成许可风险。此外开源许可风险还受组件用途的影响，因此这里将许可风险等级按照应用属性、组件用途和许可特性三个维度计算，并将许可风险分为四个等级：'
    ]
    // bottom: ['每种许可在任务扫描中出现一次，即计算一次对应风险等级。若在应用、组件或任务中多次出现，则按照出现次数计算，数据不去重。']
}
export const licenseRiskTop5 = {
    title: '图例解释：',
    top: [' “风险许可TOP5”中，纵坐标数值指应用中存在风险的许可名称，横坐标指在应用的组件中，风险许可存在的数量。'],
    bottom: ['图例优先展示应用组件中高风险许可的数量；其次是中风险许可数，最后低风险许可数。']
}

export const notScannedForThreeMonths = {
    title: '超过三个月未扫描的应用：',
    top: [
        ' 1、应用研发阶段为已弃用的应用不计入',
        ' 2、若超过三个月未扫描的应用数量多于三个，则上限展示三个最长时间未扫描的应用，其余应用可通过鼠标悬停展示。'
    ]
}

export const utilizationDifficulty = {
    top: [
        '漏洞利用难度指标反映了利用漏洞的难易程度，利用难度越低，则漏洞越容易被利用，组件更易受攻击。因此利用难度极低的漏洞推荐修复优先级别更高。利用难度即可利用性的反面，可利用性越高则利用难度越低，因此可得利用难度如下：'
    ]
}

export const versionProperties = {
    title: '注意：应用属性会直接影响应用的许可风险',
    describe: '同一许可，在不同的应用属性中表现的许可风险不同。请根据实际应用情况选择对应的应用属性',
    top: [
        '1、外部销售应用：向外部客户销售以供使用的应用程序或产品。',
        '2、SaaS(软件即服务)：作为SaaS服务交付的应用程序或产品。',
        '3、内部使用：不对外销售，且仅供于公司内部使用的应用产品。',
        '4、开源应用：应用程序产品完全开源，在Github等上共享，公开完整的源代码。'
    ]
}

export const complianceCoverTip = {
    top: [
        '策略覆盖范围是针对应用策略类型，根据应用属性或根据应用名称，筛选该策略的覆盖范围。被覆的应用，可在应用设置-策略配置的选项中选择该策略（未被覆盖，则在策略配置中无法配置该策略）。'
    ]
}

// 策略配置
export const complianceMappingTip: anyObject = {
    Project:
        '应用策略是针对应用任务扫描时设置的管控策略。当触发策略违规时，将对应用予以策略违规标记、可查看触发违反的规则内容。应用等级由应用内触发的最严重策略等级决定，若应用不触发任何策略，将视为“安全”等级。',
    Blocking: '私库阻断策略是针对私库扫描时设置的管控策略。当触发阻断策略违规时，可在“私服阻断次数”中查看受策略阻断的组件。',
    CICD: '基线策略是将策略加入CI/CD流水线环境中，达到实时管控的效果。',
    IaC: 'IaC策略用于定义和管理项目的基础设施环境，确保基础设施可靠性和安全性。'
}

export const publicProjectInfo: anyObject = {
    top: ['支持导入基于Git平台的应用，例如：Gitee、Github等']
}
export const publicWarehouseInfo: anyObject = {
    // top: ['支持导入基于Nexus、Artifactory平台的应用']
    top: ['支持导入基于Nexus平台的应用']
}
