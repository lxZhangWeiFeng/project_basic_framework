import React, { FC, Fragment } from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { isFunction } from '@/utils/judge-type'

import { getSubStr } from '@/utils/utils'

type Props = {
    notice?: string | React.ReactElement
    accept?: string
    onDrop?: (fileName: string | undefined, size: string | undefined) => void
    disabled?: boolean
    des?: any
}
type formItem = { value: any; onChange: any }

const UploadItem: FC<Props> = (props) => {
    const { notice, accept, onDrop, disabled, des, ...rest } = props
    const { value, onChange } = rest as formItem
    const { name } = value || {}

    function beforeUpload(file: any) {
        onChange(file)
        return false
    }

    const text = name ? `当前文件：${getSubStr({ str: name })}` : '将文件拖至此区域，或点击上传文件'

    return (
        <Upload.Dragger
            disabled={disabled}
            beforeUpload={beforeUpload}
            accept={accept}
            fileList={[]}
            onDrop={(e) => {
                const items: any = e.dataTransfer.items
                if (!items.length) return
                if (items[0].kind === 'file' && items[0].webkitGetAsEntry().isFile) {
                    isFunction(onDrop) && onDrop(items[0].getAsFile()?.name, items[0].getAsFile()?.size)
                }
            }}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>

            <p className="ant-upload-text">{text}</p>
            <div style={{ color: 'rgba(0,0,0,0.5)' }}>{notice}</div>
            {des ? <div style={{ color: 'rgba(0,0,0,0.5)' }}>{des}</div> : <Fragment />}
        </Upload.Dragger>
    )
}

export default UploadItem
