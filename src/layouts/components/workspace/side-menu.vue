<template>
  <section class="layout-component side-menu full-absolute">
    <a-menu
      v-model="current"
      mode="inline"
      :inlineCollapsed="collapsed"
      @select="onMenuSelect($event)"
    >
      <a-menu-item :key="item.name" v-for="item in menuResource">
        <div class="flex-row justify-content-start align-items-center">
          <a-icon :type="item.icon"></a-icon>
          <span>{{ $t(`menu.${item.name}`) }}</span>
        </div>
      </a-menu-item>
    </a-menu>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'

@Component({
  components: {}
})
export default class SideMenu extends Vue {
  @Mutation('updateMenuActive')
  private updateMenuActive

  @State('menuActive')
  private menuActive

  private current: any[] = []

  created() {
    if (this.$route && this.$route.name) {
      this.current = [this.$route.name]
    }
  }

  private get collapsed() {
    return this.$app.state.collapsed
  }

  private get menuResource() {
    if (this.menuActive) {
      return this.menuActive.children
    } else {
      return []
    }
  }

  @Watch('$route')
  onRouteChange(newRoute, oldRoute) {
    this.current = [newRoute.name]
  }

  private onMenuSelect({ key }) {
    if (!this.current.includes(key)) {
      this.$router.push({
        name: key
      })
    }
  }
}
</script>

<style lang="less">
.layout-component.side-menu {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  .ant-menu {
    background: transparent;
    border-right: none;

    .ant-menu-item {
      i {
        font-size: 21px;
      }
    }
  }
}
</style>
