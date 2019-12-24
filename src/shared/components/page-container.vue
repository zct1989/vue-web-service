<template>
  <section class="page-container">
    <PageHeader :breadcrumb="breadcrumb">
      <slot name="action" slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
    </PageHeader>
    <slot ref="page" class="page-content">
      <slot></slot>
    </slot>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import PageHeader from './page-header.vue'

@Component({
  components: { PageHeader }
})
export default class PageContainer extends Vue {
  private get breadcrumb() {
    console.log(this.$route.matched)
    return this.$route.matched
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
</style>
