<template>
  <page-container :desc="$t('desc')">
    <data-form ref="dataForm" @submit="getOrderList">
      <!--默认显示项-->
      <template #default>
        <a-form-item :label="$t('form.username')">
          <a-input
            :placeholder="$t('form.username')"
            v-decorator="['username', { rules: rules.username }]"
          ></a-input>
        </a-form-item>
        <a-form-item :label="$t('form.age')">
          <a-input
            :placeholder="$t('form.age')"
            v-decorator="['age']"
          ></a-input>
        </a-form-item>
        <a-form-item :label="$t('form.sex')">
          <a-select v-decorator="['sex']">
            <a-select-option value="0">{{ $t('form.male') }}</a-select-option>
            <a-select-option value="1">{{ $t('form.female') }}</a-select-option>
          </a-select>
        </a-form-item>
      </template>
      <!--折叠显示项-->
      <template #collapse>
        <a-form-item :label="`${$t('form.field')}1`">
          <a-input
            v-decorator="['field1']"
            :placeholder="`${$t('form.field')}1`"
          ></a-input>
        </a-form-item>
        <a-form-item :label="`${$t('form.field')}2`">
          <a-input
            v-decorator="['field2']"
            :placeholder="`${$t('form.field')}2`"
          ></a-input>
        </a-form-item>
        <a-form-item :label="`${$t('form.field')}3`">
          <a-input
            v-decorator="['field3']"
            :placeholder="`${$t('form.field')}3`"
          ></a-input>
        </a-form-item>
      </template>
      <!--操作行为项-->
      <template #action>
        <a-button type="primary">{{ $t('action.create') }}</a-button>
        <a-button>{{ $t('action.delete') }}</a-button>
      </template>
    </data-form>
    <data-table :data="data" :columns="columns" rowKey="id"></data-table>
  </page-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import { Inject } from 'typescript-ioc'
import { OrderService } from '~/services/order.service'
import { RequestParams } from '../../core/http'
import { PageService } from '../../bootstrap/services/page.service'
import DataForm from '../../shared/components/data-form.vue'

@Page({
  name: 'order-page1',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class OrderPage1 extends Vue {
  @Ref()
  readonly dataForm!: DataForm

  // 订单服务
  private orderService = new OrderService()

  private data: any[] = []

  // 校验规则
  // Tip: 校验提示无法实时更新语言
  private get rules() {
    return {
      username: [{ required: true, message: this.$t('rules.username_require') }]
    }
  }

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

  private mounted() {}

  private getOrderList() {
    this.dataForm
      .validateFields()
      .then(values => {
        this.orderService
          .getOrderList(new RequestParams(values))
          .subscribe(data => {
            this.data = data
          })
      })
      .catch(err => {})
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
    },
    "form":{
       "username":"Name",
       "age":"Age",
       "sex":"Sex",
       "male":"Male",
       "female":"Female",
       "field":"Field"
    },
    "action":{
      "create":"Create",
      "delete":"Delete"
    },
    "rules":{
      "username_require":"please input username"
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
    },
    "form":{
       "username":"姓名",
       "age":"年龄",
       "sex":"性别",
       "male":"男性",
       "female":"女性",
       "field":"字段"
    },
    "action":{
      "create":"创建",
      "delete":"删除"
    },
    "rules":{
      "username_require":"请输入用户名"
    }
  }
}
</i18n>
