<template>
  <page-container :desc="$t('desc')">
    <data-form>
      <template slot="collapse">
        <a-form-item label="高级">
          <a-input placeholder="Username"></a-input>
        </a-form-item>
        <a-form-item label="用户名">
          <a-input placeholder="Username"></a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-input type="password" placeholder="Password"></a-input>
        </a-form-item>
        <a-form-item label="用户名">
          <a-input placeholder="Username"></a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-input type="password" placeholder="Password"></a-input>
        </a-form-item>
      </template>
      <template slot="action">
        <a-button type="primary">新建</a-button>
        <a-button>删除</a-button>
      </template>
      <a-form-item label="用户名">
        <a-input placeholder="Username"></a-input>
      </a-form-item>
      <a-form-item label="密码123">
        <a-select defaultValue="lucy">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-form-item>
    </data-form>
    <data-table :data="data" :columns="columns"> </data-table>
  </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
  name: 'order-page1',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class OrderPage1 extends Vue {
  private get columns() {
    return [
      {
        title: this.$t('columns.name'),
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: this.$t('columns.age'),
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: this.$t('columns.address'),
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: this.$t('columns.tags'),
        key: 'tags',
        dataIndex: 'tags'
      },
      {
        title: this.$t('columns.action'),
        key: 'action'
      }
    ]
  }

  private data: any[] = []

  created() {
    this.data = Array.from(Array(50), (item, index) => ({
      key: index,
      name: `JIM${index}`,
      age: 20 + index,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher', 'nice', 'developer'].sort(
        () => 0.5 - Math.random()
      )
    }))
  }
}
</script>

<i18n>
{
  "en-us": {
    "desc": "this is a Order Page1",
    "columns":{
      "name":"Name",
      "age":"Age",
      "address":"Address",
      "tags":"Tag",
      "action":"Action"
    }
  },
  "zh-cn": {
    "desc": "这是订单页面1",
     "columns":{
      "name":"姓名",
      "age":"年龄",
      "address":"地址",
      "tags":"标签",
      "action":"操作"
    }
  }
}
</i18n>
