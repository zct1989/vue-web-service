<template>
  <page-container :desc="$t('desc')">OrderPage1</page-container>
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
export default class OrderPage1 extends Vue {}
</script>

<i18n>
{
  "en-us": {
    "desc": "this is a Order Page1"
  },
  "zh-cn": {
    "desc": "这是订单页面1"
  }
}
</i18n>
