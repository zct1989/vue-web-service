<template>
  <section
    ref="layout"
    class="layout layout-container full-absolute"
    :class="layoutClass"
  >
    <div class="logo-wrap wrap">
      <Logo></Logo>
    </div>
    <div class="header-wrap wrap">
      <Header></Header>
    </div>
    <div class="side-wrap wrap">
      <SideMenu></SideMenu>
    </div>
    <div class="tabs-wrap wrap">
      <Tabs></Tabs>
    </div>
    <div class="content-wrap wrap">
      <Content></Content>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import fullscreen from 'fullscreen'
import Logo from './components/logo.vue'
import Header from './components/header.vue'
import SideMenu from './components/side-menu.vue'
import Tabs from './components/tabs.vue'
import Content from './components/content.vue'

@Component({
  components: { Header, SideMenu, Logo, Tabs, Content }
})
export default class WorkspaceLayout extends Vue {
  private get fullscreen() {
    return this.$app.state.fullscreen
  }

  private get layoutClass() {
    return {
      collapsed: this.$app.state.collapsed
    }
  }

  @Watch('fullscreen')
  onChildChanged(value: string) {
    const layout = fullscreen(this.$refs['layout'])
    const updateFullscreen = value ? layout.request : layout.release
    // 更新全屏状态
    updateFullscreen && updateFullscreen()
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 60px 50px auto;
  grid-template-areas:
    'logo header header'
    'side tabs tabs'
    'side content content';
}

.layout-container.collapsed {
  grid-template-columns: 80px auto;
}

.wrap {
  position: relative;
}

.logo-wrap {
  grid-area: logo;
}

.header-wrap {
  grid-area: header;
}

.side-wrap {
  grid-area: side;
}

.tabs-wrap {
  grid-area: tabs;
}

.content-wrap {
  grid-area: content;
}
</style>
