<template>
  <section class="component order-base-detail">
    {{ $t('info') }}
    <label-container>
      <label-item :label="$t('name')">{{ detail.name }}</label-item>
      <label-item :label="$t('age')">{{ detail.age }}</label-item>
      <label-item :label="$t('address')">{{ detail.address }}</label-item>
      <label-item :label="$t('tags')">
        <span>
          <a-tag v-for="tag in detail.tags" color="blue" :key="tag">{{
            tag
          }}</a-tag>
        </span>
      </label-item>
    </label-container>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class OrderBaseDetail extends Vue {
  @Prop()
  detail: any
}
</script>

<i18n>
{
  "en-us":{
    "info":"order base info",
    "name":"Name",
    "age":"Age",
    "address":"Address",
    "tags":"Tag"

  },
  "zh-cn":{
    "info":"订单基本信息",
    "name":"姓名",
    "age":"年龄",
    "address":"地址",
    "tags":"标签"
  }
}
</i18n>
