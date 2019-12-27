<template>
  <div class="label-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class LabelContainer extends Vue {
  public componentName = 'label-container'

  @Prop({ default: 80, type: Number })
  private labelWidth!: number

  @Prop({ default: 2, type: Number })
  private column!: number

  @Prop({ default: false, type: Boolean })
  private border!: number
}
</script>
