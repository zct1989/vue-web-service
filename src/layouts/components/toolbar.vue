<template>
  <section
    class="layout-component tabs full-absolute flex-row justify-content-end align-items-center padding-x"
  >
    <a-icon :type="fullscreen?'fullscreen-exit' : 'fullscreen'" @click="onUpdateFullscreen" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
@Component({
  components: {}
})
export default class Toolbar extends Vue {
  private get fullscreen() {
    return this.$app.state.fullscreen
  }

  private onUpdateFullscreen() {
    this.$app.store.commit('updateFullscreen')
  }
}
</script>

<style lang="less" scoped>
.layout-component.tabs {
  i {
    font-size: 18px;
    color: #ffffff;
  }
}
</style>
