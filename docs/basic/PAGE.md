## 代码位置

业务页面全部应在`src/pages`目录下，自动路由会在该目录下进行遍历生成路由。

## 页面标识

业务页面的头部需要添加装饰器`@Page`来表明这是一个业务页面

```
@Page({
  layout: '布局名称',
  name: '页面名称'  // i18n和router中的name对应
})
```

其中：

- layout 为该页面使用的布局类型
- name 该页面的标识名称

## 页面构成

业务页面有`PageHeader与PageContent`两部分构成，他们都需要通过`PageContainer`生成，所有页面内容应位于`PageContainer`内部。

```
<template>
  <page-container>
    <a-card>
      页面内容
    </a-card>
  </page-container>
</template>
```

页面内容部分建议按区域使用`a-card`包裹来保持样式的一致性
