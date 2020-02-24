<template>
    <section class="component customer-detail">
        <data-table
            :data="data"
            rowKey="code"
            :rowSelection="{
                selectedRowKeys: selectedRowKeys,
                onChange: keys => (selectedRowKeys = keys)
            }"
        >
            <a-table-column
                :title="$t('columns.code')"
                dataIndex="code"
                key="code"
            ></a-table-column>
            <a-table-column
                :title="$t('columns.name')"
                dataIndex="name"
                key="name"
            ></a-table-column>
        </data-table>
        <div class="flex-row justify-content-end margin-y">
            <a-button class="margin-x" type="primary" @click="submit()"
                >提交</a-button
            >
            <a-button class="margin-x" @click="cancel()">取消</a-button>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { WareHouseService } from '~/services/warehouse.service'
import { RequestParams } from '../../core/http'

@Component({
    components: {}
})
export default class AvailableWareHouse extends Vue {
    @Emit('modal.submit')
    private submit() {
        return this.selectedRowKeys
    }

    @Emit('modal.cancel')
    private cancel() {}

    private data: any[] = []

    private selectedRowKeys: any[] = []

    private wareHouseService = new WareHouseService()

    public mounted() {
        this.getAvailableWareHouse()
    }

    private getAvailableWareHouse() {
        this.wareHouseService
            .getAvailable(new RequestParams())
            .subscribe(data => {
                this.data = data
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
