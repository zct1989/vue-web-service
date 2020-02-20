<template>
    <page-container>
        <a-card>
            <data-table
                :data="data"
                rowKey="id"
                :rowSelection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: keys => (selectedRowKeys = keys)
                }"
            >
                <template #action>
                    <a-button>操作一</a-button>
                </template>
                <a-table-column
                    :title="$t('columns.name')"
                    dataIndex="name"
                    key="name"
                ></a-table-column>
                <a-table-column
                    :title="$t('columns.age')"
                    dataIndex="age"
                    key="age"
                ></a-table-column>
                <a-table-column
                    :title="$t('columns.address')"
                    dataIndex="address"
                    key="address"
                ></a-table-column>
                <a-table-column
                    :title="$t('columns.tags')"
                    dataIndex="tags"
                    key="tags"
                >
                    <template slot-scope="tags">
                        <span>
                            <a-tag
                                v-for="tag in tags"
                                color="blue"
                                :key="tag"
                                >{{ tag }}</a-tag
                            >
                        </span>
                    </template>
                </a-table-column>
                <a-table-column :title="$t('columns.action')" key="action">
                    <template slot-scope="detail">
                        <a-popconfirm
                            :title="$t('delete')"
                            @confirm="onDelete(detail.id)"
                        >
                            <a class="margin-right">
                                {{ $t('action.delete') }}</a
                            >
                        </a-popconfirm>
                    </template>
                </a-table-column>
            </data-table>
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Page } from '@/core/decorators'
import { OrderService } from '@/services/order.service'
import { RequestParams } from '@/core/http'

@Page({
    name: 'data-table',
    layout: 'workspace'
})
@Component({
    components: {
        FullCalendar
    }
})
export default class DataTableDemo extends Vue {
    private readonly calendarPlugins = [dayGridPlugin]

    private data = []
    // 表格选择项
    private selectedRowKeys: any[] = []

    // 订单服务
    private orderService = new OrderService()

    private mounted() {
        this.getOrderList()
    }

    /**
     * 获取订单数据
     */
    private getOrderList() {
        this.orderService.getOrderList(new RequestParams()).subscribe(data => {
            this.data = data
        })
    }
}
</script>

<i18n>
{
  "en-us": {
    "desc": "this is a Order Page1",
    "columns":{
      "name":"Name",
      "age":"Age",
      "address":"Address",
      "tags":"Tag",
      "action":"Action"
    },
    "form":{
       "username":"Name",
       "age":"Age",
       "sex":"Sex",
       "male":"Male",
       "female":"Female",
       "field":"Field"
    },
    "action":{
      "create":"Create",
      "delete":"Delete",
      "detail":"Detail"
    },
    "rules":{
      "username_require":"please input username"
    },
    "delete":"Are you sure delete?"
  },
  "zh-cn": {
    "desc": "这是订单页面1",
    "columns":{
      "name":"姓名",
      "age":"年龄",
      "address":"地址",
      "tags":"标签",
      "action":"操作"
    },
    "form":{
       "username":"姓名",
       "age":"年龄",
       "sex":"性别",
       "male":"男性",
       "female":"女性",
       "field":"字段"
    },
    "action":{
      "create":"创建",
      "delete":"删除",
      "detail":"详情"
    },
    "rules":{
      "username_require":"请输入用户名"
    },
    "delete":"是否确认删除?"
  }
}
</i18n>
