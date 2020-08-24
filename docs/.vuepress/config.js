const path = require('path')

module.exports = {
    base: '/vue-web-service/docs/',
    dest: path.join(__dirname, '..', '..', 'dist', 'docs'),
    themeConfig: {
        sidebar: [
            {
                title: '基础', // 必要的
                children: [
                    {
                        title: '代码结构',
                        path: '/basic/STRUCTURE'
                    },
                    {
                        title: '业务页面',
                        path: '/basic/PAGE'
                    },
                    {
                        title: '多语言',
                        path: '/basic/I18N'
                    },
                    {
                        title: '表单布局',
                        path: '/basic/DATA-FORM'
                    }
                ]
            }
        ]
    }
}
