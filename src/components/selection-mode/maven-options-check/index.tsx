import React, { useState } from 'react'
import { Checkbox, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
// import isEqual from 'lodash/isEqual'

import styles from './index.less'

const { Group } = Checkbox
const { Search } = Input

const MavenOptionsCheck = () => {
    const {
        // isSelectionMode,

        searchParams = {},
        // packageTypes = [],
        mavenOptions = []
    } = useSelector(({ selectionMode, knowledge, knowledgeComponent }: any) => ({
        isSelectionMode: selectionMode?.isSelectionMode,
        searchParams: knowledge.searchParams,
        // packageTypes: knowledge.packageTypes,
        mavenOptions: knowledgeComponent.mavenOptions
    }))
    const sortOptions = mavenOptions
    const categories = searchParams?.component?.categories || []
    const [options, setOptions] = useState(sortOptions)
    const dispatch = useDispatch()
    // const allData = mavenOptions?.map(({ categories }: any) => categories)
    const newCategorys = [...categories]
    // const isAll = !isSelectionMode && packageTypes?.length && packageTypes?.length === 1 && packageTypes.includes('Maven') && !categories?.length

    // if (isAll) {
    //     newCategorys = allData
    // }

    const onChange = (values: any) => {
        dispatch({
            type: 'knowledge/setState',
            payload: {
                component: {
                    categories: values,
                    packageTypes: ['Maven']
                }
            }
        })
        // if (isEqual(sortBy(allData), sortBy(values))) {
        //     dispatch({
        //         type: 'knowledge/setState',
        //         payload: {
        //             categories: []
        //         }
        //     })
        // } else {
        //     dispatch({
        //         type: 'knowledge/setState',
        //         payload: {
        //             categories: values
        //         }
        //     })
        // }
    }

    // useEffect(() => {
    //     if (!packageTypes?.length) {
    //         dispatch({
    //             type: 'knowledge/setState',
    //             payload: {
    //                 packageTypes: ['Maven'],
    //             }
    //         })
    //     }
    // }, [JSON.stringify(packageTypes)])

    const onSearch = (v) => {
        const newData = sortOptions.filter((list: any) => list.categoriesZh?.toUpperCase()?.includes(v?.toUpperCase()))
        setOptions(newData)
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['search']}>
                <Search placeholder="搜索Maven类别" onSearch={onSearch} allowClear />
            </div>
            <div className={styles['check-group']}>
                <Group onChange={onChange} value={newCategorys}>
                    {options?.map(({ categories, categoriesZh }: any) => (
                        <Checkbox value={categories} key={categories} className={styles['check-list']}>
                            {categoriesZh}
                        </Checkbox>
                    ))}
                </Group>
            </div>
        </div>
    )
}

export default MavenOptionsCheck
