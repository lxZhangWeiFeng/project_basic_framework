import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
// import { SLICE_SIZE } from './const'
import calculateFileHash from './calculateFileHash'
import createFileSlices from './createFileSlices'
import { isNumber, isUndefined } from '@/utils/judge-type'

interface PublicProps {
    type: string // dispatch 路径
}

interface UploadFileProps {
    file: File
    checkChunksProps: PublicProps & {}
    uploadProps: PublicProps & {}
    mergeProps: PublicProps & {}
}

interface BigFileUploadProps {
    obtainedBy?: string | undefined // 获取size时机字段
}

const BigFileUpload = (WrapperComponent: FC<any>, { obtainedBy = '' }: BigFileUploadProps) => {
    const Component = (_props: any) => {
        const [sliceSize, setSliceSize] = useState(50) // 单位均为mb
        const [isPreparing, setIsPreparing] = useState<boolean>(false)
        const [checkPercent, setCheckPercent] = useState<any>(0)
        const abortController = useRef<AbortController | null>(null)
        // const [uploading, setUploading] = useState<boolean>(false)
        const dispatch = useDispatch<any>()

        const obtainedByInfo = isUndefined(obtainedBy) || !!_props[obtainedBy]

        const SLICE_SIZE = sliceSize * 1024 * 1024

        const cancelUpload = () => {
            abortController?.current?.abort()
        }
        let uploadChunkNumber = 0

        // 确认文件上传是否完成
        const checkFiles = ({ key, fileName, dispatch, checkChunksProps }: any) => {
            const { type } = checkChunksProps
            return dispatch({
                type,
                payload: {
                    fileName,
                    key
                }
            })
        }

        const sendPercentHandle = (total: any, chunkNumber: any) => {
            const percentLength = Math.ceil(total / 0.9) // 此处留10%左右进行merge进度条
            const uploadPercent = Math.ceil((chunkNumber / percentLength) * 100)
            setCheckPercent(uploadPercent)
        }

        // 处理上传过程
        const uploadHandle = async ({ type, file, chunk, fileMd5Value, total }: any) => {
            const sendData = {
                chunk,
                key: fileMd5Value,
                file,
                total
            }

            return dispatch({
                type,
                payload: sendData,
                signal: abortController?.current?.signal
            }).then((res) => {
                uploadChunkNumber = uploadChunkNumber + 1
                sendPercentHandle(total, uploadChunkNumber)
            })
        }

        // 进行上传分片
        const upload = async (slices: any, chunks: any = [], fileMd5Value: string, { type, total }: any) => {
            const actionList = []
            let exitNumber = 0
            abortController.current = new AbortController()

            for (let i = 0; i < total; i++) {
                const exit = chunks.includes(`${i}`)
                if (exit) {
                    exitNumber += 1
                }
                // 如果不存在，则上传
                if (!exit) {
                    actionList.push(uploadHandle({ type, file: slices[i], chunk: `${i}`, fileMd5Value, total: `${total}` }))
                }
            }
            uploadChunkNumber = uploadChunkNumber + exitNumber
            sendPercentHandle(total, uploadChunkNumber)

            return Promise.all(actionList)
        }

        // 告诉服务端可以进行合并文件了
        const merge = async (fileName: string, fileMd5Value: string, { type }: any) => {
            return dispatch({
                type,
                payload: { fileName, key: fileMd5Value }
            })
        }

        const uploadFile = async ({ file, checkChunksProps, uploadProps, mergeProps }: UploadFileProps) => {
            // setUploading(true)

            setIsPreparing(true)
            setCheckPercent(0)

            const slices = createFileSlices(file, SLICE_SIZE)
            const chunkSize = Math.ceil(file.size / SLICE_SIZE) // 分片数量

            try {
                const fileMd5Value: any = await calculateFileHash(slices)

                const data = await checkFiles({ key: fileMd5Value, fileName: file.name, dispatch, checkChunksProps })
                setIsPreparing(false)

                const { chunks, uploaded } = data || {}

                if (uploaded) {
                    // 文件是否已经存在
                    setCheckPercent(100)
                    // setUploading(false)
                    return fileMd5Value
                }

                await upload(slices, chunks, fileMd5Value, { ...uploadProps, total: chunkSize })
                await merge(file.name, fileMd5Value, { ...mergeProps })
                setCheckPercent(100)
                // setUploading(false)

                return fileMd5Value
            } catch (e: any) {
                message.error(e.errorMessage)
                abortController?.current?.abort()
                // setUploading(false)
                setIsPreparing(false)
            }
        }
        const selfProps = {
            ..._props,
            uploadInfo: {
                uploadFile,
                cancelUpload,
                // uploading, // 上传操作过程中
                checkPercent, // 上传进度
                isPreparing // 上传准备中 状态 true/false 准备中/准备完成
            }
        }

        useEffect(() => {
            if (obtainedByInfo) {
                dispatch({ type: 'global/getSectionSize' }).then((res) => {
                    if (isNumber(res)) {
                        setSliceSize(res)
                    }
                })
            }
        }, [obtainedByInfo])
        return <WrapperComponent {...selfProps} />
    }
    return Component
}

export default BigFileUpload
