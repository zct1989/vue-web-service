<template>
  <section class="component data-form">
    <a-card>
      <div class="flex-row">
        <a-form layout="inline" class="flex-auto" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-row :gutter="24">
            <a-col span="6" v-for="(node, index) of defaultFormItems" :key="`default-${index}`">
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
            <a-icon :type="collapsed ?  'down' : 'up' " />
          </a>
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
    flex: 0 1 80px;
    text-align: center;
    padding-top: 5px;
    font-size: 18px;
  }
}
</style>
