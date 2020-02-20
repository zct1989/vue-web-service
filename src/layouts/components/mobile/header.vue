<template>
    <section
        class="layout-component header full-absolute flex-row flex-nowrap align-items-center justify-content-between"
    >
        <div
            class="collapse-wrap flex-row align-items-center"
            @click="onOpenMenu"
        >
            <a-icon type="menu-fold" />
        </div>
        <div>
            <a-dropdown>
                <div>
                    <a-avatar icon="user"></a-avatar>
                    <span class="padding-left">{{ username }}</span>
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="onLogout">
                            <a class="padding-x">{{ $t('logout') }}</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <a-drawer
            :bodyStyle="drawerBodyStyle"
            placement="left"
            @close="onCloseMenu"
            :closable="false"
            :visible="collapse"
        >
            <template #title>
                <div class="flex-row justify-content-between">
                    <div>{{ $t('menu') }}</div>
                    <div>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link">
                                {{ $t('lang') }}
                                <a-icon type="down" />
                            </a>
                            <template v-slot:overlay>
                                <a-menu
                                    v-model="locale"
                                    selectable
                                    @select="onSelectLangage($event)"
                                >
                                    <a-menu-item key="zh-cn">
                                        <a>中文</a>
                                    </a-menu-item>
                                    <a-menu-item key="en-us">
                                        <a>English</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </template>
            <Menu></Menu>
        </a-drawer>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Menu from './menu.vue'
import { Mutation, namespace } from 'vuex-class'
const userModule = namespace('userModule')

@Component({
    components: { Menu }
})
export default class Header extends Vue {
    @userModule.State
    private username

    @userModule.Mutation
    logout

    private collapse = false

    private locale

    private drawerBodyStyle = {
        padding: '0px'
    }

    created() {
        this.locale = [this.$app.state.locale]
    }

    private onOpenMenu() {
        this.collapse = true
    }

    private onCloseMenu() {
        this.collapse = false
    }

    private onSelectLangage({ key }) {
        this.$app.store.commit('updateLocale', key)
    }

    /**
     * 用户注销
     */
    private onLogout() {
        this.logout()
        this.$router.push({
            name: 'login-mobile'
        })
    }
}
</script>

<style lang="less" scoped>
.header {
    position: relative;
    padding: 0 10px;
}

.collapse-wrap {
    flex-basis: 50px;
    font-size: 1.5rem;
}
</style>

<i18n>
{
  "en-us": {
    "lang": "Language",
    "change-log":"Change Log",
    "docs": "Document",
    "user-info": "User Info",
    "logout": "Logout",
    "menu": "Menu"
  },
  "zh-cn": {
    "lang": "语言",
    "change-log":"更新日志",
    "docs": "文档",
    "user-info": "用户信息",
    "logout": "注销",
    "menu": "菜单"
  }
}
</i18n>
