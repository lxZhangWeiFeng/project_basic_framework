import hashJs from './hash'
import WorkerBuilder from './worker-build'
// 计算文件hash值
const calculateFileHash: (slices: Blob[]) => Promise<string> = (slices) => {
    return new Promise((resolve, reject) => {
        // 添加 worker
        try {
            const worker = new WorkerBuilder(hashJs)
            worker.postMessage({ slices })
            worker.onmessage = (e) => {
                const { hash } = e.data
                if (hash) {
                    resolve(hash)
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

export default calculateFileHash
