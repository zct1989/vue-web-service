<template>
  <section class="page-container">
    <PageHeader :title="pageTitle">
      <slot name="header-action" slot="action"></slot>
      <slot name="header-content" slot="content"> </slot>
      <div slot="content" v-if="!$slots['header-content'] && desc">
        <div class="content-desc">{{ desc }}</div>
      </div>
      <slot name="extra" slot="extra"></slot>
    </PageHeader>
    <PageContent>
      <slot></slot>
    </PageContent>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import PageHeader from './page-header.vue'
import PageContent from './page-content.vue'

@Component({
  components: { PageHeader, PageContent }
})
export default class PageContainer extends Vue {
  @Prop()
  private title

  @Prop()
  private desc

  /**
   * 获取页面标题
   */
  private get pageTitle() {
    const name = this.$parent.$options.name
    return this.title || this.$t(`menu.${name}`)
  }
}
</script>

<style lang="less" scoped>
.page-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.content-desc {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
}
</style>
