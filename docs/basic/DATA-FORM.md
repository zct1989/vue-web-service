# DataFrom 布局

#### labelCol/wrapperCol 说明

---

    - span   按24栅格分布, 表示占位数量
    - offset 按24栅格分布, 表示偏移数量
    - style  按样式进行布局

#### DataForm 布局支持

---

-   columns
-   labelCol
-   wrapperCol

_style 设置_:

```
  <data-form
            :labelCol="{ style: { width: '100px' } }"
            :column="3">
  </data-form>
```

_span 设置_:

```
  <data-form
            :labelCol="{ span:8 }"
            :wrapperCol="{ span:14,offset:4 }"
            :column="3">
  </data-form>
```

#### FormItem 布局支持

---

-   labelCol
-   wrapperCol

_设置_:

```
  <form-item
            :labelCol="{ span:8,style:{'font-weight':'bold'} }"
            :wrapperCol="{ span:14,offset:4 }">
  </form-item>
```

#### API

---

| 属性       | 描述             | 备注                                | 默认值              |
| ---------- | ---------------- | ----------------------------------- | ------------------- |
| columns    | 每行输入项数目   | 使用 columns 可以控制每行由几列组成 | 4                   |
| labelCol   | label 布局配置   | 支持`span`,`offset`,`style`         | {span:6}            |
| wrapperCol | wrapper 布局配置 | 支持`span`,`offset`,`style`         | {span: 16,offset:2} |
