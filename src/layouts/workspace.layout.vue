<template>
  <!-- <a-locale-provider :locale="zh_CN"> -->
  <div class="layout layout-container full-absolute">
    <div class="logo-wrap wrap">
      <Logo></Logo>
    </div>
    <div class="header-wrap wrap">
      <Header></Header>``
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
  </div>
  <!-- </a-locale-provider> -->
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Logo from './components/logo.vue'
import Header from './components/header.vue'
import SideMenu from './components/side-menu.vue'
import Tabs from './components/tabs.vue'
import Content from './components/content.vue'
// import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
@Component({
  components: { Header, SideMenu, Logo, Tabs, Content }
})
export default class WorkspaceLayout extends Vue {
  // private zh_CN = zh_CN
}
</script>

<style lang="less" scoped>
.layout-container {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 60px 60px auto;
  grid-template-areas:
    'logo header header'
    'side tabs tabs'
    'side content content';
}

.layout-container.collapsed {
  grid-template-columns: 60px auto;
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
