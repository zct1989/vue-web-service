<template>
  <page-container>
    <a-card>
      <VueMarkdown class="markdown-body" :source="markdownContent">
      </VueMarkdown>
    </a-card>
  </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import VueMarkdown from 'vue-markdown'

@Page({
  name: 'change-log',
  layout: 'workspace'
})
@Component({
  components: {
    VueMarkdown
  }
})
export default class ChangeLog extends Vue {
  private markdownContent = require('~/assets/change-log/README.md')
}
</script>
<style lang="less" scoped>
.markdown-body {
  font-size: 1.5rem;

  & /deep/ li {
    line-height: 2;
  }
}
</style>
