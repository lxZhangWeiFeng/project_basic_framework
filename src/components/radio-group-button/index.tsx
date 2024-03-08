import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Radio } from 'antd'
import { RadioButtonProps } from 'antd/lib/radio/radioButton'
// import _unionWith from 'lodash/unionWith'
// import _isEqualWith from 'lodash/isEqualWith'

import { isFunction } from '@/utils/judge-type'
import styles from './index.less'

interface CustomNamesProps {
    id: string
    name: string
    count: string
}

interface RadioGroupButtonProps extends RadioButtonProps {
    tabs: any
    customNames?: CustomNamesProps
    customRender?: anyFunction
    dictName?: string | undefined
    isReverse?: boolean
}

const RadioGroupButton: FC<RadioGroupButtonProps> = ({
    onChange,
    value,
    tabs,
    customNames = {
        id: 'id',
        name: 'name',
        count: 'count'
    },
    customRender,
    dictName,
    isReverse,
    ...props
}) => {
    const { dict } = useSelector(({ global }: any) => ({ dict: global.dict }))

    const { id, name, count } = customNames

    let newTabs = [...tabs]

    if (dictName) {
        const dictArr = { ...JSON.parse(JSON.stringify(dict[dictName])) }

        tabs.map((list: any) => {
            if (dictArr[list[id]]) {
                dictArr[list[id]].count = list[count] || 0
            }
        })
        const dictArrValues = Object.values(dictArr)
        if (isReverse) {
            dictArrValues.reverse()
        }

        const newData = dictArrValues?.map((list: any) => ({
            [id]: list.key,
            [name]: list.value || '',
            [count]: list.count || 0
        }))

        newData.unshift(tabs[0] || [])

        newTabs = [...newData]
    }

    return (
        <Radio.Group buttonStyle="solid" value={`${value}`} onChange={onChange} {...props}>
            {newTabs?.map((list: any) => (
                <Radio.Button value={`${list[id]}`} key={`${list[id]}`} className={styles['header-radio-info']}>
                    {isFunction(customRender) ? customRender(list) : `${name}`}
                </Radio.Button>
            ))}
        </Radio.Group>
    )
}

export default RadioGroupButton
