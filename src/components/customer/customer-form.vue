<template>
    <section class="component edit-customer">
        <a-form
            class="data-form"
            layout="inline"
            :form="form"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 16, offset: 2 }"
        >
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item label="客户编号" required>
                        <a-input
                            v-decorator="[
                                `customer_code`,
                                {
                                    rules: rules.customerCode
                                }
                            ]"
                            placeholder="客户编号"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="公司名称" required>
                        <a-input
                            v-decorator="[
                                `company_name`,
                                {
                                    rules: rules.companyName
                                }
                            ]"
                            placeholder="公司名称"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="联系人" required>
                        <a-input
                            v-decorator="[
                                `contact`,
                                {
                                    rules: rules.contact
                                }
                            ]"
                            placeholder="联系人"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="联系人电话" required>
                        <a-input
                            v-decorator="[
                                `contact_mobile`,
                                {
                                    rules: rules.contactMobile
                                }
                            ]"
                            placeholder="联系人电话"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <div class="flex-row justify-content-end margin-top">
            <a-button class="margin-right" @click="cancel">取消</a-button>
            <a-button type="primary" @click="onSubmit">提交</a-button>
        </div>
    </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { RequestParams } from '../../core/http'
import { Form } from 'ant-design-vue'

@Component({
    components: {}
})
export default class CustomerForm extends Vue {
    @Emit('modal.submit')
    private submit(values) {
        return values
    }

    @Emit('modal.cancel')
    private cancel() {
        return
    }

    @Prop()
    private customer

    private form: any

    private rules = {
        customerCode: [{ required: true, message: '请填写客户编号' }],
        companyName: [{ required: true, message: '请填写客户名称' }],
        contact: [{ required: true, message: '请填写联系人' }],
        contactMobile: [{ required: true, message: '请填写联系人手机' }]
    }

    public mounted() {
        if (this.customer) {
            this.setFormValues()
        }
    }

    public setFormValues() {
        this.form.setFieldsValue(this.customer)
    }

    public created() {
        this.form = this.$form.createForm(this)
    }

    private onSubmit() {
        this.form.validateFields({}, (err, values) => {
            if (!err) {
                this.submit(values)
            }
        })
    }
}
</script>

<i18n>
{
  "en-us":{
      "columns":{
            "code":"WareHouse Code",
            "name":"Customer Info"
      }
  },
  "zh-cn":{
       "columns":{    
           "code":"仓库编码",
           "name":"仓库名称"
      }
  }
}
</i18n>
