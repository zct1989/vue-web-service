<template>
  <section class="layout-component header full-absolute flex-row flex-nowrap">
    <div class="menu-wrap flex-span">
      <HeaderMenu></HeaderMenu>
    </div>
    <div class="toolbar-wrap">
      <Toolbar></Toolbar>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import HeaderMenu from './header-menu.vue'
import Toolbar from './toolbar.vue'

@Component({
  components: { HeaderMenu, Toolbar }
})
export default class Header extends Vue {}
</script>

<style lang="less" scoped>
.menu-wrap,
.toolbar-wrap {
  position: relative;
}

.toolbar-wrap {
  flex-basis: 200px;
}
</style>
