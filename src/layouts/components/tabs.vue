<template>
  <section class="layout-component tabs full-absolute">
    <a-tabs
      :active-key="activePage"
      :hide-add="true"
      type="editable-card"
      @change="changePage"
      @edit="editPage"
    >
      <a-tab-pane :id="page.name" :key="page.name" v-for="page in pageList">
        <template v-slot:tab>
          <span :pagekey="page.name">{{ $t(`menu.${page.name}`) }}</span>
        </template>
      </a-tab-pane>
    </a-tabs>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Tabs extends Vue {
  // 页面列表
  private pageList: any[] = []
  // 当前页面
  private activePage = ''

  private created() {
    if (this.$route && this.$route.name) {
      this.pageList.push(this.$route)
      this.activePage = this.$route.name
    }
  }

  /**
   * 更新tabs列表
   */
  @Watch('pageList')
  private onPageListChange(list) {
    this.$app.store.commit(
      'updateTabs',
      list.map(x => x.name)
    )
  }

  /**
   * 监听路由改变
   */
  @Watch('$route')
  onRouteChange(newRoute, oldRoute) {
    const page = this.pageList.find(x => x.name === newRoute.name)
    if (!page) {
      this.pageList.push(newRoute)
    }

    this.activePage = newRoute.name
  }

  /**
   * 监听激活页面改变
   */
  @Watch('activePage')
  onActivePageChange(newName, oldName) {
    if (this.$route.name !== newName) {
      this.$router.push({
        name: newName
      })
    }
  }

  /**
   * 页面改变
   */
  private changePage(key) {
    this.activePage = key
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
  private remove(key) {
    if (this.pageList.length === 1) {
      this.$message.warning('这是最后一页，不能再关闭了啦')
      return
    }

    let index = this.pageList.findIndex(item => item.name === key)
    this.pageList = this.pageList.filter(item => item.name !== key)

    index = index >= this.pageList.length ? this.pageList.length - 1 : index
    this.activePage = this.pageList[index].name
  }
}
</script>
<style lang="less" scoped>
.layout-component.tabs {
  padding: 10px 2px 0;
  margin: 0 10px;
}
</style>
