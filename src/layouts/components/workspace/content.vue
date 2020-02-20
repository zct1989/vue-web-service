<template>
    <section class="layout-component content full-absolute">
        <transition name="fade">
            <keep-alive :include="tabs">
                <router-view></router-view>
            </keep-alive>
        </transition>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class Content extends Vue {
    private get tabs() {
        return this.$app.state.tabs
    }
}
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
