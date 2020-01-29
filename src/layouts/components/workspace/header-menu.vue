<template>
  <section class="layout-component header-menu full-absolute">
    <a-menu v-model="current" mode="horizontal" @select="onMenuSelect($event)">
      <a-menu-item :key="item.name" v-for="item in menuResource">
        <div class="full flex-row align-items-center">
          {{ $t(`menu.${item.name}`) }}
        </div>
      </a-menu-item>
    </a-menu>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
@Component({
  components: {}
})
export default class HeaderMenu extends Vue {
  @Mutation('updateMenuActive')
  private updateMenuActive

  @State('menuResource')
  private menuResource

  @State('menuActive')
  private menuActive

  private current: any[] = []

  /**
   * 初始化以及菜单状态
   */
  public created() {
    const name = this.$route.name
    const target = this.findParentMenu(name)

    if (!target) {
      return
    }

    this.current = [target.name]
    if (target.name !== this.menuActive.name) {
      this.updateMenuActive(target)
    }
  }

  /**
   * 查询父菜单
   */
  private findParentMenu(name) {
    const findPage = data => {
      if (data.children) {
        return data.children.some(findPage)
      } else {
        return data.name === name
      }
    }

    return this.menuResource.find(findPage)
  }

  /**
   * 更新当前选择菜单
   */
  private onMenuSelect({ key }) {
    const menu = this.menuResource.find(x => x.name === key)
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
