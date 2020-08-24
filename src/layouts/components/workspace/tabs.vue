<template>
    <section class="layout-component tabs full-absolute">
        <a-tabs
            :active-key="currentTab.name"
            :hide-add="true"
            type="editable-card"
            @change="changePage"
            @edit="editPage"
        >
            <a-tab-pane :id="page.id" :key="page.id" v-for="page in tabs">
                <template v-slot:tab>
                    <span :pagekey="page.id">{{
                        page.title || $t(`menu.${page.name}`)
                    }}</span>
                </template>
            </a-tab-pane>
        </a-tabs>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component({
    components: {}
})
export default class Tabs extends Vue {
    private created() {
        if (this.$route && this.$route.name) {
            this.$app.store.commit('openTab', {
                name: this.$route.name,
                path: this.$route.path,
                params: this.$route.params,
                query: this.$route.query
            })
        }
    }

    private get tabs() {
        return this.$app.store.state.tabs
    }

    private get currentTab() {
        return this.$app.store.state.currentTab
    }

    /**
     * 监听路由改变
     */
    @Watch('$route')
    onRouteChange(newRoute, oldRoute) {
        const currentTab = this.$app.state.currentTab
        if (
            newRoute.name !== currentTab.name &&
            newRoute.path !== currentTab.path
        ) {
            this.$app.store.commit('openTab', {
                name: newRoute.name,
                path: newRoute.path,
                params: newRoute.params,
                query: newRoute.query
            })
        }
    }

    /**
     * 监听激活页面改变
     */
    @Watch('currentTab')
    onCurrentTabChange(newTab, oldTab) {
        if (
            (newTab && this.$route.name !== newTab.name) ||
            this.$route.path !== newTab.path
        ) {
            if (newTab.path) {
                return this.$router.push({
                    path: newTab.path,
                    params: newTab.params,
                    query: newTab.query
                })
            }

            if (newTab.name) {
                return this.$router.push({
                    name: newTab.name,
                    params: newTab.params,
                    query: newTab.query
                })
            }
        }
    }

    /**
     * 页面改变
     */
    private changePage(key) {
        const tab = this.tabs.find(x => x.id === key)
        this.$app.store.commit('updateCurrentTab', tab)
    }

    /**
     * 页面操作
     */
    private editPage(key, action) {
        this[action](key)
    }

    /**
     * 关闭标签页
     */
    private remove(id) {
        this.$app.store.commit('closeTab', {
            id
        })
    }
}
</script>
<style lang="less" scoped>
.layout-component.tabs {
    padding: 10px 2px 0;
    margin: 0 10px;
}
</style>
