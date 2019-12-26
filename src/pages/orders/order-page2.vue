<template>
  <page-container>
    <svg-icon name="test1" class="padding" :size="28"></svg-icon>自定义图标
  </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
  name: 'order-page2',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class OrderPage2 extends Vue {}
</script>
