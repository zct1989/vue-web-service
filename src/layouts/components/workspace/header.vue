<template>
    <section
        class="layout-component header full-absolute flex-row flex-nowrap "
    >
        <div
            class="collapse-wrap flex-row align-items-center"
            @click="onCollapseMenu"
        >
            <a-icon v-if="collapsed" type="menu-unfold" />
            <a-icon v-else type="menu-fold" />
        </div>
        <div class="menu-wrap flex-auto">
            <HeaderMenu></HeaderMenu>
        </div>
        <div class="toolbar-wrap">
            <Toolbar></Toolbar>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import HeaderMenu from './header-menu.vue'
import Toolbar from './toolbar.vue'

@Component({
    components: { HeaderMenu, Toolbar }
})
export default class Header extends Vue {
    private get collapsed() {
        return this.$app.state.collapsed
    }

    private onCollapseMenu() {
        this.$app.store.commit('updateCollapsed')
    }
}
</script>

<style lang="less" scoped>
.menu-wrap,
.toolbar-wrap {
    position: relative;
}

.collapse-wrap {
    flex-basis: 50px;
    font-size: 1.5rem;
}

.toolbar-wrap {
    flex-basis: 420px;
}
</style>
