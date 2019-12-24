<template>
  <page-container>OrderPage1</page-container>
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
