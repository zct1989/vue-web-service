<template>
    <page-container>
        <a-card>
            <a-tabs defaultActiveKey="change">
                <a-tab-pane :tab="$t('task-log')" key="change">
                    <VueMarkdown class="markdown-body" :source="changeContent">
                    </VueMarkdown>
                </a-tab-pane>
                <a-tab-pane :tab="$t('commit-log')" key="commit">
                    <VueMarkdown class="markdown-body" :source="commitContent">
                    </VueMarkdown>
                </a-tab-pane>
            </a-tabs>
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
    private changeContent = require('~/assets/change-log/README.md')
    private commitContent = require('../../../CHANGELOG.md')
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
<i18n>
{
  "en-us": {
    "task-log":"Task Log",
    "commit-log":"Commit Log"
  },
  "zh-cn":{
    "task-log":"任务日志",
    "commit-log":"提交日志"
  }
}
</i18n>
