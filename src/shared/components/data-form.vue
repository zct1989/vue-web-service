<template>
  <section class="component data-form">
    <a-card>
      <div class="flex-row">
        <a-form
          ref="form"
          layout="inline"
          class="flex-auto"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-row :gutter="24">
            <a-col
              span="6"
              v-for="(node, index) of defaultFormItems"
              :key="`default-${index}`"
            >
              <vnodes :vnodes="node" />
            </a-col>
            <a-col
              :style="{ display: collapsed ? 'none' : 'block' }"
              span="6"
              v-for="(node, index) of collapseFormItems"
              :key="`collapse-${index}`"
            >
              <vnodes :vnodes="node" />
            </a-col>
          </a-row>
        </a-form>
        <div class="form-side">
          <a @click="toggle" v-if="$slots.collapse">
            <a-icon :type="collapsed ? 'down' : 'up'" />
          </a>
        </div>
      </div>
      <div class="flex-row justify-content-between margin-top">
        <div class="form-action">
          <slot name="action"></slot>
        </div>
        <div class="form-button">
          <a-button type="primary" icon="search">查询</a-button>
          <a-button icon="undo">重置</a-button>
        </div>
      </div>
    </a-card>
  </section>
</template>

<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: {
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  }
})
export default class DataForm extends Vue {
  // 输入栏折叠状态
  private collapsed = true

  private labelCol = {
    span: 6
  }

  private wrapperCol = {
    span: 16,
    offset: 2
  }

  public get form() {
    return this.$refs['form']
  }

  private get defaultFormItems() {
    return this.$slots.default || []
  }

  private get collapseFormItems() {
    return this.$slots.collapse || []
  }

  private toggle() {
    this.collapsed = !this.collapsed
  }
}
</script>

<style lang="less" scoped>
.data-form.component {
  & /deep/ .ant-form-item {
    width: 100%;
    margin-right: 24px;
    margin-bottom: 12px;
  }

  .form-side {
    flex: 0 1 180px;
    text-align: center;
    padding-top: 5px;
    font-size: 18px;
  }

  & /deep/ .form-button,
  & /deep/ .form-action {
    & > * {
      margin-right: 16px;
      width: 80px;
    }
  }
}
</style>
