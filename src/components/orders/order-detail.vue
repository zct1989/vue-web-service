<template>
  <section class="component order-detail">
    <a-tabs defaultActiveKey="base" :style="{ height: '200px' }">
      <a-tab-pane :tab="$t('base')" key="base">
        <OrderBaseDetail :detail="detail"></OrderBaseDetail>
      </a-tab-pane>
      <a-tab-pane :tab="$t('customer')" key="customer">
        <OrderCustomerDetail :id="detail.id"></OrderCustomerDetail>
      </a-tab-pane>
      <a-tab-pane :tab="$t('product')" key="product">
        <OrderProductDetail :id="detail.id"></OrderProductDetail>
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
  components: {
    OrderBaseDetail,
    OrderCustomerDetail,
    OrderProductDetail
  }
})
export default class OrderDetail extends Vue {
  @Prop()
  detail: any
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
