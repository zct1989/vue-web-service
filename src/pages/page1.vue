<template>
  <div class="about">
    <h1>This is an about page11111</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '../core/decorators'

@Page({
  name: 'page1',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class Page1 extends Vue {
  public aaa = 1

  mounted() {}
}
</script>
