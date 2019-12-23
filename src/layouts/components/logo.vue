<template>
  <section
    class="layout-component logo full-absolute flex-row align-items-center"
    :class="logoClass"
  >
    <div class="logo-wrap" v-if="!collapsed">LOGO</div>
    <div class="collapse-wrap" @click="onCollapseMenu">
      <a-icon v-if="collapsed" type="menu-unfold" />
      <a-icon v-else type="menu-fold" />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Logo extends Vue {
  private get logoClass() {
    return {
      'justify-content-between': !this.$app.state.collapsed,
      'justify-content-center': this.$app.state.collapsed
    }
  }
  private get collapsed() {
    return this.$app.state.collapsed
  }

  private onCollapseMenu() {
    this.$app.store.commit('updateCollapsed')
  }
}
</script>
