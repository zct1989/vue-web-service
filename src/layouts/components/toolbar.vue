<template>
  <section
    class="layout-component toolbar full-absolute flex-row justify-content-end align-items-center padding-x"
  >
    <a-icon :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="onUpdateFullscreen" />
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link">
        {{ $t('lang') }}
        <a-icon type="down" />
      </a>
      <a-menu selectable slot="overlay" @select="onSelectLangage($event)">
        <a-menu-item key="zh-cn">
          <a>中文</a>
        </a-menu-item>
        <a-menu-item key="en-us">
          <a>English</a>
        </a-menu-item>
      </a-menu>
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
  private get fullscreen() {
    return this.$app.state.fullscreen
  }

  private onUpdateFullscreen() {
    this.$app.store.commit('updateFullscreen')
  }

  private onSelectLangage({ key }) {
    this.$i18n.locale = key
    this.$app.store.commit('updateLocale', key)
  }
}
</script>

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

<i18n src="~/assets/json/locale.json"></i18n>
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
