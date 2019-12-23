<template>
  <div class="about">
    <h1>This is an about page2222</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '../core/decorators'

@Page({
  name: 'page2',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class Page2 extends Vue {
  public aaa = 1

  mounted() {
    console.log(this.$i18n)
  }
}
</script>
