const path = require('path')
const fs = require('fs')

// const stringToHump = ({ target = '-', text }) => {
//     const a = text.split(target)
//     let result = a[0]
//     for (let i = 1; i < a.length; i++) {
//         result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
//     }
//     return result
// }

const themeObj = {}
const themeData = fs.readFileSync(path.join(__dirname, '../src/theme.less'), 'utf-8')
themeData.split('\n').map((item) => {
    const matchRes = item.match(/^@(.*);/)
    if (matchRes?.[1]) {
        const [key, value] = matchRes[1].split(':')
        themeObj[key] = value
    }
})

/* 写入一个主题文件 用于js中使用 ========================

const humpKeyThemeObj = {}
Object.entries(themeObj).forEach(([key, value]) => {
    humpKeyThemeObj[stringToHump({ text: key })] = value
})

fs.writeFile(path.join(__dirname, '../src/theme.json'), JSON.stringify(humpKeyThemeObj), 'utf8', (err, data) => {
    if (err) {
        throw err
    }
    console.log('data:', data)
})

*/

module.exports = { themeObj }
