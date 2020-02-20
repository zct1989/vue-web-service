<template>
    <section
        ref="layout"
        class="layout layout-container full-absolute"
        :class="layoutClass"
    >
        <div class="header-wrap wrap">
            <Header></Header>
        </div>
        <div class="content-wrap wrap">
            <Content></Content>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import fullscreen from 'fullscreen'
import Content from './components/mobile/content.vue'
import Header from './components/mobile/header.vue'
@Component({
    components: { Content, Header }
})
export default class MobileLayout extends Vue {
    private get fullscreen() {
        return this.$app.state.fullscreen
    }

    private get layoutClass() {
        return {
            collapsed: this.$app.state.collapsed
        }
    }

    @Watch('fullscreen')
    onChildChanged(value: string) {
        const layout = fullscreen(this.$refs['layout'])
        const updateFullscreen = value ? layout.request : layout.release
        // 更新全屏状态
        updateFullscreen && updateFullscreen()
    }
}
</script>

<style lang="less" scoped>
.layout-container {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 60px auto;
    grid-template-areas:
        'header'
        'content';
}

.wrap {
    position: relative;
}

.header-wrap {
    grid-area: header;
}

.content-wrap {
    grid-area: content;
}
</style>
