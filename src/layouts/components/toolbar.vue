<template>
  <section
    class="layout-component toolbar full-absolute flex-row flex-nowrap justify-content-end align-items-center padding-x"
  >
    <a-icon
      :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'"
      @click="onUpdateFullscreen"
    />
    <a-popover tar placement="bottom" trigger="click">
      <template v-slot:content>
        <div class="flex-row theme-panel">
          <div
            class="theme-item margin-right"
            v-for="theme of themeList"
            :key="theme.name"
            :style="{ 'background-color': theme.color }"
            @click="onUpdateTheme(theme.name)"
          >
            <a-icon v-if="$app.state.theme === theme.name" type="check" />
          </div>
        </div>
      </template>
      <a-icon type="bg-colors" />
    </a-popover>

    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link">
        {{ $t('lang') }}
        <a-icon type="down" />
      </a>
      <template v-slot:overlay>
        <a-menu v-model="locale" selectable @select="onSelectLangage($event)">
          <a-menu-item key="zh-cn">
            <a>中文</a>
          </a-menu-item>
          <a-menu-item key="en-us">
            <a>English</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <router-link :to="{ name: 'change-log' }">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ $t('change-log') }}</span>
        </template>
        <a-icon type="info-circle"></a-icon>
      </a-tooltip>
    </router-link>

    <a :href="`${location.origin}${location.pathname}docs`" target="_blank">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ $t('docs') }}</span>
        </template>
        <a-icon type="book"></a-icon>
      </a-tooltip>
    </a>

    <div>
      <a-dropdown>
        <div>
          <a-avatar icon="user"></a-avatar>
          <span class="padding-left">{{ username }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a class="padding-x">{{ $t('user-info') }}</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="onLogout">
              <a class="padding-x">{{ $t('logout') }}</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation, namespace } from 'vuex-class'
const userModule = namespace('userModule')
@Component({
  components: {}
})
export default class Toolbar extends Vue {
  @userModule.State
  private username

  @userModule.Mutation
  logout

  private locale

  private themeList = [
    {
      name: 'default',
      color: '#3a5899'
    },
    {
      name: 'light',
      color: '#6db89b'
    }
  ]

  created() {
    this.locale = [this.$app.state.locale]
  }

  private get location() {
    return window.location
  }

  private get fullscreen() {
    return this.$app.state.fullscreen
  }

  private onUpdateFullscreen() {
    this.$app.store.commit('updateFullscreen')
  }

  private onSelectLangage({ key }) {
    this.$app.store.commit('updateLocale', key)
  }

  private onUpdateTheme(theme) {
    this.$app.store.commit('updateTheme', theme)
  }

  /**
   * 用户注销
   */
  private onLogout() {
    this.logout()
    this.$router.push({
      name: 'login'
    })
  }
}
</script>

<style lang="less">
.theme-panel {
  min-width: 100px;

  .theme-item {
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 4px;
    color: white;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
<style lang="less" scoped>
.layout-component.toolbar {
  white-space: nowrap;

  & > * {
    padding: 0 10px;
  }

  i {
    font-size: 18px;
    color: #ffffff;
  }
}
</style>

<i18n>
{
  "en-us": {
    "lang": "Language",
    "change-log":"Change Log",
    "docs": "Document",
    "user-info": "User Info",
    "logout": "Logout"
  },
  "zh-cn": {
    "lang": "语言",
    "change-log":"更新日志",
    "docs": "文档",
    "user-info": "用户信息",
    "logout": "注销"
  }
}
</i18n>
