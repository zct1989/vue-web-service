<template>
    <a-icon
        class="svg-icon"
        v-if="svgFile"
        :component="svgComponent"
        :style="iconStyle"
    />
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'svg-icon',
    components: {}
})
export default class SvgIcon extends Vue {
    @Prop({ required: true })
    private name

    @Prop({ default: '14px' })
    private size

    /**
     * 获取icon尺寸
     */
    private get iconSize() {
        if (typeof this.size === 'number') {
            return `${this.size}px`
        }

        return this.size
    }

    /**
     * 设置svg样式
     */
    private get iconStyle() {
        return {
            'font-size': this.iconSize
        }
    }

    /**
     * 获取svg文件
     */
    private get svgFile() {
        try {
            return require(`~/assets/icons/${this.name}.svg`)
        } catch (ex) {
            return null
        }
    }

    /**
     * 获取svg组件
     */
    private svgComponent(h) {
        const { default: SvgComponent } = this.svgFile
        return <SvgComponent></SvgComponent>
    }
}
</script>

<style lang="less" scoped>
.svg-icon /deep/ svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
