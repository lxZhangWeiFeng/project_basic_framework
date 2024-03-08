// import SparkMD5 from 'spark-md5'

// 生成文件 hash
const hashWorker = () => {
    const path = location.origin
    //! self.importScript函数只能导入绝对路径的文件，但是看文档说是可以使用相对路径，但测试多次都不行。所以将spark.md5.js文件放在public文件夹中

    self.importScripts(`${path}/public-js/spark-md5.min.js`)
    self.onmessage = (e) => {
        const { slices } = e.data
        // 创建
        const spark = new self.SparkMD5.ArrayBuffer()
        // let progress = 0
        let count = 0
        const loadNext = (index) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(slices[index])
            reader.onload = (event) => {
                count++
                // 利用 spark-md5 对文件内容进行计算得到 hash 值
                spark.append(event.target.result)
                if (count === slices.length) {
                    postMessage({
                        // progress: 100,
                        hash: spark.end()
                    })
                    // 关闭 worker
                    self.close()
                } else {
                    // progress += 100 / slices.length
                    // 递归计算下一个切片
                    loadNext(count)
                }
            }
        }
        loadNext(0) // 开启第一个切片的 hash 计算
    }
}

export default hashWorker
