<template>
  <page-container>OrderPage2</page-container>
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
