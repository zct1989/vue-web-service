<script lang="tsx">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { formConfig } from '@/config/form.config'
import { VNode } from 'vue'

@Component({
    components: {
        Vnodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes
        }
    }
})
export default class DataForm extends Vue {
    @Prop({ default: formConfig.defaults })
    public extends!: any[]

    @Prop({ default: 4 })
    public column!: number

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

    private moreVisible = false

    private extendFromItems: any[] = []

    private updateExtendFromItems() {
        const items: any[] = []

        this.extends
            .filter(x => x.show)
            .map(x => {
                if (x.component) {
                    items.push(x.component)
                }

                if (x.components) {
                    items.push(...x.components)
                }
            })

        this.extendFromItems = items
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
     * 主题渲染函数
     */
    public render(h) {
        return (
            <section class="component data-form">
                <a-card>
                    <a-form
                        form={this.formInstance}
                        ref="form"
                        layout="inline"
                        onSubmit={this.onSumbit}
                        labelCol={this.labelCol}
                        wrapperCol={this.wrapperCol}
                    >
                        <div class="flex-row">
                            <a-row gutter={24} class="flex-auto">
                                {this.renderDefaultFormItems(h)}
                                {this.renderExtendFromItems(h)}
                                {this.renderCollapseFormItems(h)}
                            </a-row>
                            {this.renderFormSide(h)}
                        </div>
                        {this.renderFormAction(h)}
                    </a-form>
                </a-card>
            </section>
        )
    }

    /**
     * 获取默认显示项
     */
    public renderDefaultFormItems(h) {
        return this.defaultFormItems.map((node: any, index) => (
            <a-col
                class="form-item-wrapper"
                span={
                    (node.data.attrs && node.data.attrs.span) ||
                    24 / this.column
                }
                key={`default-${index}`}
            >
                <vnodes vnodes={node} />
            </a-col>
        ))
    }

    /**
     * 扩展项渲染项
     */
    public renderExtendFromItems(h) {
        return this.extendFromItems.map((node: any, index) => (
            <a-col
                class="form-item-wrapper"
                span={24 / this.column}
                key={`extend-${index}`}
            >
                {h(node)}
            </a-col>
        ))
    }

    /**
     * 折叠项渲染项
     */
    public renderCollapseFormItems(h) {
        return this.collapseFormItems.map((node: any, index) => (
            <a-col
                style={{ display: this.collapsed ? 'none' : 'block' }}
                span={
                    (node.data.attrs && node.data.attrs.span) ||
                    24 / this.column
                }
                key={`collapse-${index}`}
            >
                <vnodes vnodes={node} />
            </a-col>
        ))
    }

    /**
     * 侧边栏渲染项目
     */
    public renderFormSide(h) {
        return (
            <div class="form-side">
                {this.$slots.collapse && (
                    <a onClick={this.onToggle}>
                        <a-icon type={this.collapsed ? 'down' : 'up'} />
                    </a>
                )}
            </div>
        )
    }

    /**
     * 操作项渲染项
     */
    public renderFormAction(h) {
        return (
            <div class="flex-row justify-content-between margin-top">
                <div class="form-action">{this.$slots.action}</div>
                <div class="form-button">
                    <a-button type="primary" htmlType="submit" icon="search">
                        {this.$t('search')}
                    </a-button>
                    <a-button icon="undo" onClick={this.onReset}>
                        {this.$t('reset')}
                    </a-button>
                    <a-dropdown trigger={['click']} v-model={this.moreVisible}>
                        <a-menu
                            slot="overlay"
                            onClick={({ domEvent }) =>
                                domEvent.key === '3' &&
                                (this.moreVisible = false)
                            }
                        >
                            {this.extends.map(item => (
                                <a-menu-item key={item.label}>
                                    <a-checkbox
                                        onChange={e => (
                                            (item.show = e.target.checked),
                                            this.updateExtendFromItems()
                                        )}
                                    >
                                        {item.label}
                                    </a-checkbox>
                                </a-menu-item>
                            ))}
                        </a-menu>
                        <a-button>
                            {this.$t('more')} <a-icon type="down" />
                        </a-button>
                    </a-dropdown>
                </div>
            </div>
        )
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
            min-width: 100px;
        }
    }
}
</style>

<i18n>
{
  "en-us":{
    "search":"Search",
    "reset":"Reset",
    "more":"More"
  },
  "zh-cn":{
    "search":"查询",
    "reset":"重置",
    "more":"更多"
  }
}
</i18n>
