<template>
  <page-container>
    <a-row :gutter="36">
      <a-col :span="12" class="margin-y">
        <a-card title="来访用户">
          <ve-line :data="chartData1"></ve-line>
        </a-card>
      </a-col>
      <a-col :span="12" class="margin-y">
        <a-card title="用户位置">
          <ve-scatter
            :data="chartData2"
            :settings="chartSettings2"
          ></ve-scatter>
        </a-card>
      </a-col>
      <a-col :span="12" class="margin-y">
        <a-card title="每日用户">
          <ve-histogram :data="chartData3"></ve-histogram>
        </a-card>
      </a-col>
    </a-row>
  </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import HeaderInfo from '~/shared/components/header-info.vue'
import WorkCalender from '~/components/dashboard/work-calendar.vue'
import { namespace } from 'vuex-class'

const userModule = namespace('userModule')

@Page({
  layout: 'workspace',
  name: 'chart'
})
@Component({
  components: { HeaderInfo, WorkCalender }
})
export default class Workspace extends Vue {
  @userModule.State
  private username

  private chartData1 = {
    columns: ['日期', '访问用户', '下单用户'],
    rows: [
      { 日期: '2018-05-22', 访问用户: 32371, 下单用户: 19810 },
      { 日期: '2018-05-23', 访问用户: 12328, 下单用户: 4398 },
      { 日期: '2018-05-24', 访问用户: 92381, 下单用户: 52910 }
    ]
  }

  private chartSettings2 = {
    dataType: {
      访问用户: 'KMB',
      年龄: 'percent',
      下单用户: 'normal'
    }
  }

  private chartData2 = {
    columns: ['日期', '访问用户', '下单用户', '年龄'],
    rows: {
      上海: [
        { 日期: '1/1', 访问用户: 123, 年龄: 3, 下单用户: 1244 },
        { 日期: '1/2', 访问用户: 1223, 年龄: 6, 下单用户: 2344 },
        { 日期: '1/3', 访问用户: 7123, 年龄: 9, 下单用户: 3245 },
        { 日期: '1/4', 访问用户: 4123, 年龄: 12, 下单用户: 4355 },
        { 日期: '1/5', 访问用户: 3123, 年龄: 15, 下单用户: 4564 },
        { 日期: '1/6', 访问用户: 2323, 年龄: 20, 下单用户: 6537 }
      ],
      北京: [
        { 日期: '1/1', 访问用户: 123, 年龄: 3, 下单用户: 1244 },
        { 日期: '1/2', 访问用户: 1273, 年龄: 6, 下单用户: 2344 },
        { 日期: '1/3', 访问用户: 3123, 年龄: 15, 下单用户: 4564 },
        { 日期: '1/4', 访问用户: 2123, 年龄: 9, 下单用户: 3245 },
        { 日期: '1/5', 访问用户: 4103, 年龄: 12, 下单用户: 4355 },
        { 日期: '1/6', 访问用户: 7123, 年龄: 10, 下单用户: 3567 }
      ],
      广州: [
        { 日期: '1/1', 访问用户: 123, 年龄: 3, 下单用户: 1244 },
        { 日期: '1/2', 访问用户: 1223, 年龄: 6, 下单用户: 2344 },
        { 日期: '1/3', 访问用户: 2123, 年龄: 30, 下单用户: 3245 },
        { 日期: '1/5', 访问用户: 4123, 年龄: 12, 下单用户: 4355 },
        { 日期: '1/4', 访问用户: 5123, 年龄: 18, 下单用户: 4564 },
        { 日期: '1/6', 访问用户: 3843, 年龄: 30, 下单用户: 4850 }
      ]
    }
  }

  private chartData3 = {
    columns: ['日期', '访问用户', '下单用户', '下单率'],
    rows: [
      { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
      { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
      { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
      { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
      { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
      { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
    ]
  }

  private get desc() {
    return ` ${this.$t('hello')}, ${this.username}`
  }
}
</script>

<i18n>
{
  "en-us": {
    "hello": "Hello",
    "operator1":"operator1",
    "operator2":"operator2",
    "main-operator":"main operator",
    "day-order-number":"today order number",
    "week-order-number":"week order number",
    "month-order-number":"month order number"
  },
  "zh-cn": {
    "hello": "你好",
     "operator1":"操作1",
     "operator2":"操作2",
     "main-operator":"主操作",
     "day-order-number":"当日订单数",
     "week-order-number":"本周订单数",
     "month-order-number":"本月订单数"
  }
}
</i18n>
