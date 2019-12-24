<template>
  <page-container :desc="$t('desc')">
    <!-- 操作区 -->
    <template slot="header-action">
      <a-button-group style="margin-right: 4px;">
        <a-button>{{ $t('operator1') }}</a-button>
        <a-button>{{ $t('operator2') }}</a-button>
      </a-button-group>
      <a-button type="primary">{{ $t('main-operator') }}</a-button>
    </template>

    <!-- 信息区 -->
    <template slot="extra">
      <div class="flex-row">
        <HeaderInfo
          :title="$t('day-order-number')"
          content="934"
          :bordered="true"
        ></HeaderInfo>
        <HeaderInfo
          :title="$t('week-order-number')"
          content="3534"
          :bordered="true"
        ></HeaderInfo>
        <HeaderInfo
          :title="$t('month-order-number')"
          content="9334"
        ></HeaderInfo>
      </div>
    </template>
    <a-card class="margin">
      <div class="padding">{{ $t('desc') }}</div>
      <a-pagination :defaultCurrent="1" :total="50" showSizeChanger />
    </a-card>
  </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import HeaderInfo from '~/shared/components/header-info.vue'

@Page({
  name: 'workspace',
  layout: 'workspace'
})
@Component({
  components: { HeaderInfo }
})
export default class Workspace extends Vue {}
</script>

<i18n>
{
  "en-us": {
    "desc": "this is a workspace",
    "operator1":"operator1",
    "operator2":"operator2",
    "main-operator":"main operator",
    "day-order-number":"today order number",
    "week-order-number":"week order number",
    "month-order-number":"month order number"
  },
  "zh-cn": {
    "desc": "这是一个工作区",
     "operator1":"操作1",
     "operator2":"操作2",
     "main-operator":"主操作",
     "day-order-number":"当日订单数",
     "week-order-number":"本周订单数",
     "month-order-number":"本月订单数"
  }
}
</i18n>
