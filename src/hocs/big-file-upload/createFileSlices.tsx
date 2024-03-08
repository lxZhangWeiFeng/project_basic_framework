// import { SLICE_SIZE } from './const'

// 文件切片
const createFileSlices: (file: File, SLICE_SIZE: number) => Blob[] = (file, SLICE_SIZE) => {
    if (!file) return []

    const slices = []
    let start = 0
    while (start < file.size) {
        const slice = file.slice(start, start + SLICE_SIZE)
        slices.push(slice)
        start += SLICE_SIZE
    }

    return slices
}

export default createFileSlices
