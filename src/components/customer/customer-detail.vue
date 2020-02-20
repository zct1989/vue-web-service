<template>
    <section class="component customer-detail">
        <a-tabs defaultActiveKey="base">
            <a-tab-pane :tab="$t('base')" key="base">
                11
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
