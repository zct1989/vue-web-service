<template>
    <section
        class="layout-component logo full-absolute flex-row align-items-center padding-x"
        :class="{
            'justify-content-start': !this.$app.state.collapsed,
            'justify-content-center': this.$app.state.collapsed
        }"
    >
        <a href="/" class="logo-icon-wrap padding-x">
            <a-icon type="cloud" />
        </a>
        <div class="logo-text-wrap padding-x" v-if="!collapsed">LOGO</div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class Logo extends Vue {
    private get collapsed() {
        return this.$app.state.collapsed
    }
}
</script>

<style lang="less" scoped>
.logo-icon-wrap {
    font-size: 2rem;
}
.logo-text-wrap {
    font-size: 1.5rem;
}
</style>
