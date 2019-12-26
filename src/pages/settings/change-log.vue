<template>
  <page-container>ChangeLog</page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
  name: 'change-log',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class ChangeLog extends Vue {}
</script>
