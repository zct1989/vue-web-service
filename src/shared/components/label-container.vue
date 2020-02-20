<template>
    <div class="label-container">
        <div v-if="title" class="title">{{ title }}</div>
        <div class="label-content">
            <slot></slot>
        </div>
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

    @Prop({ type: String })
    private title!: string
}
</script>
<style lang="less" scoped>
.title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    margin-bottom: 16px;
    font-weight: bolder;
}
</style>
