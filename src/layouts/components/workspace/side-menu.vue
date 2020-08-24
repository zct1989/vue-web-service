<template>
    <section class="layout-component side-menu full-absolute">
        <a-menu
            v-model="current"
            mode="inline"
            :inlineCollapsed="collapsed"
            @select="onMenuSelect($event)"
        >
            <template v-for="item in menuResource">
                <a-sub-menu :key="item.name" v-if="item.children">
                    <a-menu-item
                        :key="sub_item.name"
                        v-for="sub_item of subItem"
                    >
                        <div
                            class="flex-row justify-content-start align-items-center"
                        >
                            <a-icon :type="sub_item.icon"></a-icon>
                            <span>{{ $t(`menu.${sub_item.name}`) }}</span>
                        </div>
                    </a-menu-item>
                </a-sub-menu>

                <a-menu-item :key="item.name" v-else>
                    <div
                        class="flex-row justify-content-start align-items-center"
                    >
                        <a-icon :type="item.icon"></a-icon>
                        <span>{{ $t(`menu.${item.name}`) }}</span>
                    </div>
                </a-menu-item>
            </template>
        </a-menu>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'

@Component({
    components: {}
})
export default class SideMenu extends Vue {
    @Mutation('updateMenuActive')
    private updateMenuActive

    @State('menuActive')
    private menuActive

    private current: any[] = []

    created() {
        if (this.$route && this.$route.name) {
            this.current = [this.$route.name]
        }
    }

    private get collapsed() {
        return this.$app.state.collapsed
    }

    private get menuResource() {
        if (this.menuActive) {
            return this.menuActive.children
        } else {
            return []
        }
    }

    @Watch('$route')
    onRouteChange(newRoute, oldRoute) {
        if (this.menuResource.find(x => x.name === newRoute.name)) {
            this.current = [newRoute.name]
        } else {
            this.current = []
        }
    }

    private onMenuSelect({ key }) {
        if (!this.current.includes(key)) {
            this.$router.push({
                name: key
            })
        }
    }
}
</script>

<style lang="less">
.layout-component.side-menu {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
    .ant-menu {
        background: transparent;
        border-right: none;

        .ant-menu-item {
            i {
                font-size: 21px;
            }
        }
    }
}
</style>
