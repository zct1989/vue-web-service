<template>
  <section class="component data-form">
    <a-card>
      <a-form
        :form="formInstance"
        ref="form"
        layout="inline"
        @submit="onSumbit"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <div class="flex-row">
          <a-row :gutter="24" class="flex-auto">
            <!--基础表单项-->
            <a-col
              class="form-item-wrapper"
              span="6"
              v-for="(node, index) of defaultFormItems"
              :key="`default-${index}`"
            >
              <vnodes :vnodes="node" />
            </a-col>
            <!--折叠表单项-->
            <a-col
              :style="{ display: collapsed ? 'none' : 'block' }"
              span="6"
              v-for="(node, index) of collapseFormItems"
              :key="`collapse-${index}`"
            >
              <vnodes :vnodes="node" />
            </a-col>
          </a-row>
          <!--折叠侧边栏-->
          <div class="form-side">
            <a @click="onToggle" v-if="$slots.collapse">
              <a-icon :type="collapsed ? 'down' : 'up'" />
            </a>
          </div>
        </div>
        <div class="flex-row justify-content-between margin-top">
          <!--表单操作区-->
          <div class="form-action">
            <slot name="action"></slot>
          </div>
          <!--基础按钮区-->
          <div class="form-button">
            <a-button type="primary" htmlType="submit" icon="search">{{
              $t('search')
            }}</a-button>
            <a-button icon="undo" @click="onReset">{{ $t('reset') }}</a-button>
          </div>
        </div>
      </a-form>
    </a-card>
  </section>
</template>

<script lang="tsx">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({
  components: {
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  }
})
export default class DataForm extends Vue {
  // Form对象实例
  public formInstance

  public beforeCreate() {
    this.formInstance = this.$form.createForm(this)
  }

  // 输入栏折叠状态
  private collapsed = true

  // FormItem Label Span
  private labelCol = {
    span: 6
  }

  // FormItem Content Span
  private wrapperCol = {
    span: 16,
    offset: 2
  }

  /**
   * 默认表单项
   */
  private get defaultFormItems() {
    return this.$slots.default || []
  }

  /**
   * 折叠表单项
   */
  private get collapseFormItems() {
    return this.$slots.collapse || []
  }

  /**
   * 表单提交
   */
  @Emit('submit')
  onSumbit(e) {
    e.preventDefault()
    return e.target.value
  }

  /**
   * 折叠状态切换
   */
  private onToggle() {
    this.collapsed = !this.collapsed
  }

  /**
   * 重置表单状态
   */
  private onReset() {
    this.formInstance.resetFields()
  }

  /**
   * 获取Form表单值
   */
  public get values() {
    return this.formInstance.fieldsStore.getAllValues()
  }

  /**
   * 验证Form表单
   */
  public validateFields(option?) {
    return new Promise((resolve, reject) => {
      this.formInstance.validateFields(option, (err, values) => {
        if (err) {
          reject(err)
        } else {
          resolve(values)
        }
      })
    })
  }

  /**
   * 操作Form表单
   */
  public form(callback?: (form) => void) {
    if (callback) {
      return callback(this.formInstance)
    } else {
      return this.formInstance
    }
  }
}
</script>

<style lang="less" scoped>
.data-form.component {
  .form-item-wrapper {
    max-height: 64px;
  }
  & /deep/ .ant-form-item {
    width: 100%;
    margin-right: 24px;
    margin-bottom: 24px;
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
      width: 100px;
    }
  }
}
</style>

<i18n>
{
  "en-us":{
    "search":"Search",
    "reset":"Reset"
  },
  "zh-cn":{
    "search":"查询",
    "reset":"重置"
  }
}
</i18n>
