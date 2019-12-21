<template>
  <section class="layout-component content full-absolute">
    <router-view />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Content extends Vue {}
</script>
