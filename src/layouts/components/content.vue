<template>
  <section class="layout-component content full-absolute">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Content extends Vue {}
</script>

<style lang="less">
@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fade-enter-active {
  animation-name: fade;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
