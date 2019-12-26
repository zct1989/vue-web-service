<template>
  <section
    class="layout-component toolbar full-absolute flex-row justify-content-end align-items-center padding-x"
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
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
@Component({
  components: {}
})
export default class Toolbar extends Vue {
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
    "lang": "Language"
  },
  "zh-cn": {
    "lang": "语言"
  }
}
</i18n>
