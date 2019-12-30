<template>
  <section class="component order-base-detail">
    <label-container :title="$t('info')">
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
    <a-divider style="margin-bottom: 32px" />
    <data-table :data="data" rowKey="id">
      <a-table-column
        :title="$t('columns.id')"
        dataIndex="id"
        key="id"
      ></a-table-column>
      <a-table-column
        :title="$t('columns.name')"
        dataIndex="name"
        key="name"
      ></a-table-column>
      <a-table-column
        :title="$t('columns.barcode')"
        dataIndex="barcode"
        key="barcode"
      ></a-table-column>
      <a-table-column
        :title="$t('columns.price')"
        dataIndex="price"
        key="price"
      ></a-table-column>
      <a-table-column
        :title="$t('columns.number')"
        dataIndex="number"
        key="number"
      ></a-table-column>
      <a-table-column
        :title="$t('columns.amount')"
        dataIndex="amount"
        key="amount"
      ></a-table-column>
    </data-table>
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

  private data = [
    {
      id: '1234561',
      name: '矿泉水 550ml',
      barcode: '12421432143214321',
      price: '2.00',
      number: '1',
      amount: '2.00'
    },
    {
      id: '1234562',
      name: '凉茶 300ml',
      barcode: '12421432143214322',
      price: '3.00',
      number: '2',
      amount: '6.00'
    },
    {
      id: '1234563',
      name: '好吃的薯片',
      barcode: '12421432143214323',
      price: '7.00',
      number: '4',
      amount: '28.00'
    },
    {
      id: '1234564',
      name: '特别好吃的蛋卷',
      barcode: '12421432143214324',
      price: '8.50',
      number: '3',
      amount: '25.50'
    }
  ]
}
</script>

<i18n>
{
  "en-us":{
    "info":"Order Info",
    "name":"Name",
    "age":"Age",
    "address":"Address",
    "tags":"Tag",
    "columns":{
      "id": "ID",
      "name": "Name",
      "barcode": "Barcode",
      "price": "Price",
      "number": "Number",
      "amount": "Amount"
    }
  },
  "zh-cn":{
    "info":"订单基本信息",
    "name":"姓名",
    "age":"年龄",
    "address":"地址",
    "tags":"标签",
    "columns":{
      "id": "商品编号",
      "name": "商品名称",
      "barcode": "商品条码",
      "price": "单价",
      "number": "数量",
      "amount": "金额"
    }
  }
}
</i18n>
