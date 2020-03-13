<template>
    <page-container>
        <a-card title="基础表格">
            <data-table
                :data="data1"
                rowKey="id"
                :rowSelection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: keys => (selectedRowKeys = keys)
                }"
            >
                <template #action>
                    <a-button @click="action1">操作一</a-button>
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
                    <template>
                        <a-popconfirm :title="$t('delete')" @confirm="() => {}">
                            <a class="margin-right">
                                {{ $t('action.delete') }}</a
                            >
                        </a-popconfirm>
                    </template>
                </a-table-column>
            </data-table>
        </a-card>

        <a-card title="可编辑表格" class="margin-top">
            <template slot="extra">
                <a-button type="link" v-if="editing" @click="onSubmit2()"
                    >提交</a-button
                >
                <a-button type="link" v-if="editing" @click="onCancel2()"
                    >取消</a-button
                >
                <a-button type="link" v-if="!editing" @click="onEdit2()"
                    >编辑</a-button
                >
            </template>
            <data-table :data="data2" rowKey="id">
                <a-table-column
                    :title="$t('columns.name')"
                    dataIndex="name"
                    key="name"
                >
                    <template slot-scope="name, row">
                        <a-input
                            v-if="editing"
                            :value="name"
                            @change="e => onInputChange2(e, row.id, 'name')"
                        />
                        <div v-else>{{ name }}</div>
                    </template>
                </a-table-column>
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
                    <template>
                        <a-popconfirm :title="$t('delete')" @confirm="() => {}">
                            <a class="margin-right">
                                {{ $t('action.delete') }}</a
                            >
                        </a-popconfirm>
                    </template>
                </a-table-column>
            </data-table>
        </a-card>

        <a-card title="行编辑表格" class="margin-top">
            <data-table :data="data3" rowKey="id">
                <a-table-column
                    :title="$t('columns.name')"
                    dataIndex="name"
                    key="name"
                >
                    <template slot-scope="name, row">
                        <a-input
                            v-if="row.editing"
                            :value="name"
                            @change="e => onInputChange3(e, row.id, 'name')"
                        />
                        <div v-else>{{ name }}</div>
                    </template>
                </a-table-column>
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
                    <template slot-scope="row">
                        <a-button
                            type="link"
                            v-if="row.editing"
                            @click="onSubmit3(row)"
                            >提交</a-button
                        >
                        <a-button
                            type="link"
                            v-if="row.editing"
                            @click="onCancel3(row)"
                            >取消</a-button
                        >
                        <a-button
                            type="link"
                            v-if="!row.editing"
                            @click="onEdit3(row)"
                            >编辑</a-button
                        >
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
import { cloneDeep } from 'lodash'

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

    private data1: any[] = []
    private data2: any[] = []
    private data3: any[] = []

    private cacheData2: any[] = []
    private cacheData3: any[] = []
    private editing = false
    // 表格选择项
    public selectedRowKeys: any[] = []

    // 订单服务
    private orderService = new OrderService()

    private mounted() {
        this.getOrderList()
    }

    private action1() {
        this.selectedRowKeys = []
    }

    /**
     * 获取订单数据
     */
    private getOrderList() {
        const data = [
            {
                id: 1,
                name: '123',
                age: 1,
                address: '123',
                tag: ['1', '2']
            },
            {
                id: 2,
                name: '333',
                age: 3,
                address: '444',
                tag: ['1', '2']
            }
        ]
        // this.orderService.getOrderList(new RequestParams()).subscribe(data => {
        //     this.data = data
        // })

        this.data1 = cloneDeep(data)
        this.data2 = cloneDeep(data)
        this.data3 = cloneDeep(data)
    }

    /**
     * 提交编辑数据
     */
    private onSubmit2() {
        this.editing = false
        this.data1 = cloneDeep(this.data2)
        this.data3 = cloneDeep(this.data2)
    }

    /**
     * 取消编辑数据
     */
    private onCancel2() {
        this.editing = false
        this.data2 = [...this.cacheData2]
    }

    /**
     * 开启编辑模式
     */
    private onEdit2() {
        this.editing = true
        this.cacheData2 = cloneDeep(this.data2)
    }
    /**
     * 单元格编辑
     */
    onInputChange2(e, key, column) {
        const data = [...this.data2]
        const [target] = data.filter(item => key === item.id)
        if (target) {
            target[column] = e.target.value
            this.data2 = data
        }
    }

    /**
     * 提交编辑数据
     */
    private onSubmit3(row) {
        const target = this.data3.find(x => x.id === row.id)
        delete target.editing
        this.data1 = cloneDeep(this.data3)
        this.data2 = cloneDeep(this.data3)
    }

    /**
     * 取消编辑数据
     */
    private onCancel3(row) {
        const target = this.data3.find(x => x.id === row.id)
        delete target.editing
        this.data3 = [...this.cacheData3]
    }

    /**
     * 开启编辑模式
     */
    private onEdit3(row) {
        this.cacheData3 = cloneDeep(this.data3)
        const target = this.data3.find(x => x.id === row.id)
        target.editing = true
        this.data3 = [...this.data3]
    }

    /**
     * 单元格编辑
     */
    onInputChange3(e, key, column) {
        const data = [...this.data3]
        const [target] = data.filter(item => key === item.id)
        if (target) {
            target[column] = e.target.value
            this.data3 = data
        }
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
