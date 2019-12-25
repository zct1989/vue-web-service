<template>
  <page-container :desc="$t('desc')">
    <data-form>
      <template slot="collapse">
        <a-form-item label="高级">
          <a-input placeholder="Username"></a-input>
        </a-form-item>
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
      <a-form-item label="用户名">
        <a-input placeholder="Username"></a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input type="password" placeholder="Password"></a-input>
      </a-form-item>
    </data-form>
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
