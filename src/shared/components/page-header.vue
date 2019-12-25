<template>
  <section class="component page-header">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item key="/dashboard/workspace">
          <a href="#/">
            <a-icon type="home" />
          </a>
        </a-breadcrumb-item>
        <a-breadcrumb-item :key="item" v-for="item in breadcrumb">
          <span>{{ $t(`menu.${item}`) }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="flex-row justify-content-between align-items-center">
      <div class="title flex-auto">
        <span v-if="title">{{ title }}</span>
      </div>
      <div v-if="this.$slots.action" class="action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="flex-row justify-content-between align-items-start">
      <div v-if="this.$slots.content" class="content flex-auto">
        <slot name="content"></slot>
      </div>
      <div v-if="this.$slots.extra" class="extra">
        <slot name="extra"></slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { antdLocale } from '~/assets/locale'

@Component({
  components: {}
})
export default class PageHeader extends Vue {
  @Prop()
  title

  private get breadcrumb() {
    return this.$route.path.split('/').filter(x => x)
  }
}
</script>

<style lang="less" scoped>
.component.page-header {
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;
  min-height: 100px;

  .breadcrumb {
    margin-bottom: 16px;
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 16px;
  }

  .action {
    flex: 0 1 auto;
    margin-bottom: 16px;
  }

  .content {
    margin-bottom: 16px;
  }

  .extra {
    flex: 0 1 auto;
    margin-bottom: 16px;
  }
}
</style>

