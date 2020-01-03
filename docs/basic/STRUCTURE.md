## 结构说明

以下为项目代码结构说明：

```
├── babel.config.js                 // babel配置文件
├── CHANGELOG.md                    // 自动生成的commit日志
├── commitlint.config.js            // commitlint配置文件
├── docs                            // 项目文档目录
├── extends                         // 编译支持扩展
│ ├── alias.extend.js               // 路径别名扩展
│ ├── i18n.extend.js                // i18n多语言扩展
│ ├── markdown.extend.js            // markdown支持扩展
│ ├── route.extend.js               // 自动路由支持扩展
│ └── svg.extend.js                 // svg文件支持扩展
├── package.json
├── public                          // 静态资源目录
│ ├── favicon.ico
│ └── index.html
├── README.md
├── src                             // 代码目录
│ ├── app.vue                       // 项目页面容器  配置全局config
│ ├── assets                        // 资源目录
│ ├── bootstrap                     // 项目基础功能目录
│ ├── components                    // 业务组件目录
│ ├── config                        // 相关配置目录
│ ├── core                          // 核心框架目录
│ ├── layouts                       // 布局文件目录
│ ├── main.ts                       // 项目入口文件
│ ├── mock                          // mock服务目录
│ ├── pages                         // 业务页面目录
│ ├── router                        // 路由扩展配置目录
│ ├── services                      // 请求服务目录
│ ├── shared                        // 公共模块目录
│ └── store                         // 全局数据存储目录
├── tsconfig.json                   // typescript配置
├── typings                         // d.ts目录
│ ├── markdown.d.ts
│ ├── shims-tsx.d.ts
│ ├── shims-vue.d.ts
│ └── vue.d.ts
└──vue.config.js                    // webpack扩展支持
```
