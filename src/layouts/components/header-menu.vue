<template>
  <section class="layout-component header-menu full-absolute">
    <a-menu v-model="current" mode="horizontal" @select="onMenuSelect($event)">
      <a-menu-item :key="item.id" v-for="item in menuResource">
        <div class="full flex-row align-items-center">{{ item.label }}</div>
      </a-menu-item>
    </a-menu>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
@Component({
  components: {}
})
export default class HeaderMenu extends Vue {
  @Mutation('updateMenuActive')
  private updateMenuActive

  @State('menuResource')
  private menuResource

  private current = ['mail']

  private onMenuSelect({ key }) {
    const menu = this.menuResource.find(x => x.id === key)

    this.updateMenuActive(menu)
  }
}
</script>

<style lang="less">
.layout-component.header-menu {
  .ant-menu {
    height: 100%;
    background: transparent;
    border-bottom: none;

    .ant-menu-item {
      height: 100%;
    }
  }
}
</style>
