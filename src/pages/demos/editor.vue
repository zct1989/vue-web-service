<template>
    <page-container>
        <a-card>
            <template #extra>
                <a v-clipboard="copyContent">复制</a>
            </template>
            <quill-editor v-model="content" :options="editorOption">
            </quill-editor>
            <a-divider></a-divider>
            <code>{{ content }}</code>
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Page } from '@/core/decorators'
import { quillEditor } from 'vue-quill-editor'

@Page({
    layout: 'workspace',
    name: 'editor'
})
@Component({
    components: {
        quillEditor
    }
})
export default class Editor extends Vue {
    private content = '<h2>I am Example</h2>'
    private editorOption = {
        placeholder: '输入任何内容，支持html'
    }

    private copyContent() {
        this.$message.success('已复制到粘贴板')
        return this.content
    }
}
</script>

<style lang="less" scoped>
.quill-editor /deep/ .ql-editor {
    height: 400px;
}

code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
}
</style>

<i18n>
{
  "en-us":{
    "today":"Today"

  },
  "zh-cn":{
    "today":"今天"
  }
}
</i18n>
