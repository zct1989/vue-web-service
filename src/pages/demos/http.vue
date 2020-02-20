<template>
    <page-container>
        <a-card>
            <data-form ref="dataForm" @submit="getInventoryList">
                <template #default>
                    <a-form-item
                        :label="$t('form.code')"
                        :span="12"
                        :labelCol="{ span: 5 }"
                        :wrapperCol="{ span: 19 }"
                    >
                        <a-select
                            mode="tags"
                            style="width: 100%"
                            :placeholder="$t('rules.code_require')"
                            v-decorator="[
                                'product_code',
                                {
                                    rules: rules.code,
                                    initialValue: ['BH106cm-2']
                                }
                            ]"
                        >
                        </a-select>
                    </a-form-item>
                </template>
            </data-form>
        </a-card>

        <a-card class="margin-y">
            <data-table :data="data" rowKey="code">
                <a-table-column
                    :title="$t('columns.code')"
                    dataIndex="code"
                    key="code"
                ></a-table-column>
                <a-table-column
                    :title="$t('columns.count')"
                    dataIndex="count"
                    key="count"
                ></a-table-column>
            </data-table>
        </a-card>

        <a-card v-if="result" class="margin-y" title="返回数据">
            {{ result }}
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Page } from '@/core/decorators'
import DataForm from '@/shared/components/data-form.vue'
import { RequestParams } from '@/core/http'
import { InventoryService } from '@/services/inventory.service'

@Page({
    name: 'http',
    layout: 'workspace'
})
@Component({
    components: {}
})
export default class DataFormDemo extends Vue {
    // 表格组件
    @Ref()
    readonly dataForm!: DataForm

    private data: any[] = []
    private result = ''
    // 订单服务
    private inventoryService = new InventoryService()

    // 校验规则
    private get rules() {
        return {
            code: [{ required: true, message: this.$t('rules.code_require') }]
        }
    }

    /**
     * 获取订单数据
     */
    private getInventoryList() {
        this.dataForm
            .validateFields()
            .then(values => {
                this.inventoryService
                    .getInventory(new RequestParams(values))
                    .subscribe(data => {
                        this.result = data
                        this.data = Object.entries(data.data).map(
                            ([key, value]) => ({
                                code: key,
                                count: value
                            })
                        )
                    })
            })
            .catch(err => {
                // 异常处理
            })
    }
}
</script>

<i18n>
{
  "en-us": {
    "desc": "this is a Order Page1",
    "columns":{
      "code":"Product Code",
      "count": "Inventory"
    },
    "form":{
       "code":"Product Code"
    },
    "rules":{
      "code_require":"please input product code"
    }
  },
  "zh-cn": {
    "desc": "这是订单页面1",
    "columns":{
      "code":"产品编号",
      "count": "库存"
    },
    "form":{
       "code":"产品编号"
    },
    "rules":{
      "code_require":"请添加产品编号"
    }
  }
}
</i18n>
