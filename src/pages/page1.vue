<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '../core/decorator'

@Layout('workspace')
@Component({
  components: {}
})
export default class Page1 extends Vue {
  public aaa = 1
}
</script>
