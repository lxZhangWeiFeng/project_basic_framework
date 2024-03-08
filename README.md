<h1 align="center">SCA-CONSOLE</h1>

```
├── copy-to-dist            // 拷贝到 dist 文件夹
├── public                  // 静态资源 提供给 webpack
├── src                     // 主目录
│ ├── _types                // ts 的全局数据类型
│ ├── assets                // 静态资源（图片资源）
│ ├── components            // 提取组件目录
│ ├── context               // react context 目录
│ ├── hocs                  // 高阶组件目录
│ ├── hooks                 // 自定义 hook 目录
│ ├── layouts               // layout 目录
│ ├── models                // dva 的模块目录（redux + redux-saga）
│ ├── pages                 // 页面目录
│ ├── routes                // 路由目录
│ ├── services              // api 目录
│ ├── utils                 // 工具目录
│ └── theme.less            // 主题
├── webpack                 // webpack 配置
├── postcss.config.js       // postcss 配置文件，rem 和 autoprefixer
├── tsconfig.json           // ts 配置文件
├── README.md               // 自述文件
├── package.json
└── yarn.lock               // 依赖 lock 文件
```
