<template>
    <a-form-item :label="`${$t('paymethod')}`">
        <a-select
            mode="multiple"
            v-decorator="['paymethod', { rules: rules.paymethod }]"
        >
            <a-select-option value="alipay">
                支付宝
            </a-select-option>
            <a-select-option value="wxpay">
                微信
            </a-select-option>
            <a-select-option value="netpay">
                网银
            </a-select-option>
        </a-select>
    </a-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class PayMehtodFormItem extends Vue {
    private rules = {
        paymethod: []
    }
}
</script>

<i18n>
{
  "en-us":{
    "paymethod":"PayMethod"

  },
  "zh-cn":{
    "paymethod":"付款方式"
  }
}
</i18n>
