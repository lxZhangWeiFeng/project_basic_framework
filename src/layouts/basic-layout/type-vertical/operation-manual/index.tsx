import React from 'react'

import operationManualPng from '@/assets/basic-layout/operation-manual.png'
import { proxyPath } from '@/../webpack/proxy'

// import scaPdf from '@/assets/basic-layout/sca.pdf'
import { useDispatch } from 'react-redux'

const OperationManual = () => {
    const dispatch = useDispatch<any>()
    const env = process.env.NODE_ENV || 'development'
    const isDev = env === 'development'
    const downloadFileNamePath = '/download'
    const dowloadFilePath = isDev ? `${proxyPath}${downloadFileNamePath}` : `${downloadFileNamePath}`
    const onClick = () => {
        dispatch({
            type: 'global/downloadOperationManual',
            payload: {
                type: 'SCADocument'
            }
        }).then((res: any) => {
            const path = res[0]?.url || ''
            if (path) {
                const downPath = `${dowloadFilePath}${path}`
                window.open(downPath)
            }
        })
    }

    return (
        <a onClick={onClick} download="SCA明道操作手册 v1.1.0.pdf" style={{ marginRight: 16 }}>
            <img src={operationManualPng} alt="操作手册下载" style={{ width: 32 }} />
        </a>
    )
}

export default OperationManual
