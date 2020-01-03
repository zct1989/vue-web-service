<template>
  <page-container>
    <a-card>
      <data-form ref="dataForm" @submit="getOrderList">
        <template #default>
          <a-form-item :label="$t('form.username')">
            <a-input
              :placeholder="$t('form.username')"
              v-decorator="['username', { rules: rules.username }]"
            ></a-input>
          </a-form-item>
          <a-form-item :label="$t('form.age')">
            <a-input-number
              :placeholder="$t('form.age')"
              v-decorator="[
                'age',
                {
                  rules: rules.age
                }
              ]"
            ></a-input-number>
          </a-form-item>
          <a-form-item :label="$t('form.city')">
            <a-cascader
              :options="cascaderData"
              v-decorator="['city']"
              placeholder="Please select"
            />
          </a-form-item>
          <a-form-item :label="$t('form.date')">
            <a-date-picker v-decorator="['date']" />
          </a-form-item>
          <a-form-item :label="$t('form.sex')">
            <a-select v-decorator="['sex']">
              <a-select-option value="0">{{ $t('form.male') }}</a-select-option>
              <a-select-option value="1">{{
                $t('form.female')
              }}</a-select-option>
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
      </data-form>
    </a-card>

    <a-card class="margin-y"> {{ data }} </a-card>
  </page-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Page } from '@/core/decorators'
import DataForm from '@/shared/components/data-form.vue'
import { OrderService } from '@/services/order.service'
import { RequestParams } from '@/core/http'

@Page({
  name: 'data-form',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class DataFormDemo extends Vue {
  // 表格组件
  @Ref()
  readonly dataForm!: DataForm

  private data = ''

  // 订单服务
  private orderService = new OrderService()

  private cascaderData = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州'
        }
      ]
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京'
        }
      ]
    }
  ]

  // 校验规则
  private get rules() {
    return {
      username: [
        { required: true, message: this.$t('rules.username_require') }
      ],
      age: [
        {
          min: 15,
          type: 'number',
          message: this.$t('rules.age_min')
        },
        {
          max: 40,
          type: 'number',
          message: this.$t('rules.age_max')
        }
      ]
    }
  }

  private mounted() {}

  /**
   * 获取订单数据
   */
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
      .catch(err => {
        // 异常处理
      })
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
       "city": "City",
       "date": "Date",
       "field":"Field"
    },
    "action":{
      "create":"Create",
      "delete":"Delete",
      "detail":"Detail"
    },
    "rules":{
      "username_require":"please input username",
      "age_min":"age must be more then 15 years old", 
      "age_max":"age must be less then 40 years old"
    },
    "delete":"Are you sure delete?"
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
       "city": "城市",
       "date": "日期",
       "field":"字段"
    },
    "action":{
      "create":"创建",
      "delete":"删除",
      "detail":"详情"
    },
    "rules":{
      "username_require":"请输入用户名",
      "age_min":"年龄必须大于15岁", 
      "age_max":"年龄必须小于40岁"
    },
    "delete":"是否确认删除?"
  }
}
</i18n>
