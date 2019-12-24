<template>
  <page-container>
    <h1>This is an about page {{ $t('menu.dashboard') }}</h1>
    <a-pagination :defaultCurrent="1" :total="50" showSizeChanger />
  </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
  name: 'workspace',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class Workspace extends Vue {}
</script>
