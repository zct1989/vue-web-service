<template>
    <section class="component customer-detail">
        <a-tabs defaultActiveKey="base">
            <a-tab-pane :tab="$t('base')" key="base">
                <label-container :column="2">
                    <label-item label="客户编号"
                        >{{ customer.customer_code }}
                    </label-item>
                    <label-item label="公司名称"
                        >{{ customer.company_name }}
                    </label-item>
                    <label-item label="联系人"
                        >{{ customer.contact }}
                    </label-item>
                    <label-item label="联系人电话"
                        >{{ customer.contact_mobile }}
                    </label-item>
                </label-container>
            </a-tab-pane>
            <a-tab-pane :tab="$t('customer')" key="customer">
                22
            </a-tab-pane>
            <a-tab-pane :tab="$t('product')" key="product">
                33
            </a-tab-pane>
        </a-tabs>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import OrderBaseDetail from './order-base-detail.vue'
import OrderCustomerDetail from './order-customer-detail.vue'
import OrderProductDetail from './order-product-detail.vue'
@Component({
    components: {}
})
export default class OrderDetail extends Vue {
    @Prop()
    customer: any
}
</script>

<i18n>
{
  "en-us":{
    "base":"Order Info",
    "customer":"Customer Info",
    "product":"Product Info"
  },
  "zh-cn":{
    "base":"基本信息",
    "customer":"客户信息",
    "product":"产品信息"
  }
}
</i18n>
