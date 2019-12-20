<template>
  <section class="layout-component side-menu full-absolute">
    <a-menu v-model="current" mode="vertical" @select="onMenuSelect($event)">
      <a-menu-item :key="item.id" v-for="item in menuResource">
        <span>{{ item.label }}</span>
      </a-menu-item>
    </a-menu>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'

@Component({
  components: {}
})
export default class SideMenu extends Vue {
  @Mutation('updateMenuActive')
  private updateMenuActive

  @State('menuActive')
  private menuActive

  private current = []

  private get menuResource() {
    if (this.menuActive) {
      return this.menuActive.children
    } else {
      return []
    }
  }

  private onMenuSelect({ key }) {
    const menu = this.menuActive.children.find(x => x.id === key)

    if (menu && menu.path) {
      this.$router.push(menu.path)
    }
  }
}
</script>

<style lang="less">
.layout-component.side-menu {
  .ant-menu {
    background: transparent;
    border-right: none;
  }
}
</style>
