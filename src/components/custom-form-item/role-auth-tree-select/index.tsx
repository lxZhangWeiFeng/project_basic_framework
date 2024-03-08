import React, { FC } from 'react'
import { Tree } from 'antd'

import styles from './index.less'

const TreeDom: FC<any> = (props) => {
    return (
        <div className={styles.warp}>
            <Tree treeData={props?.treeData} defaultCheckedKeys={props?.value} checkable onCheck={props?.onChange} />
        </div>
    )
}

export default TreeDom
