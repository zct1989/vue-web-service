<template>
    <page-container ref="pageContainer" :desc="$t('desc')">
        <data-form ref="dataForm" @submit="getOrderList">
            <!--默认显示项-->
            <template #default>
                <a-form-item :label="$t('form.username')">
                    <a-input
                        :placeholder="$t('form.username')"
                        v-decorator="['username', { rules: rules.username }]"
                    ></a-input>
                </a-form-item>
                <a-form-item :label="$t('form.age')">
                    <a-input
                        :placeholder="$t('form.age')"
                        v-decorator="['age']"
                    ></a-input>
                </a-form-item>
                <a-form-item :label="$t('form.sex')">
                    <a-select v-decorator="['sex']">
                        <a-select-option value="0">{{
                            $t('form.male')
                        }}</a-select-option>
                        <a-select-option value="1">{{
                            $t('form.female')
                        }}</a-select-option>
                    </a-select>
                </a-form-item>
            </template>
            <!--折叠显示项-->
            <template #collapse>
                <a-form-item :label="`${$t('form.field')}1`">
                    <a-input
                        v-decorator="['field1']"
                        :placeholder="`${$t('form.field')}1`"
                    ></a-input>
                </a-form-item>
                <a-form-item :label="`${$t('form.field')}2`">
                    <a-input
                        v-decorator="['field2']"
                        :placeholder="`${$t('form.field')}2`"
                    ></a-input>
                </a-form-item>
                <a-form-item :label="`${$t('form.field')}3`">
                    <a-input
                        v-decorator="['field3']"
                        :placeholder="`${$t('form.field')}3`"
                    ></a-input>
                </a-form-item>
            </template>
            <!--操作行为项-->
            <template #action>
                <a-button type="primary" @click="onCreateNew">{{
                    $t('action.create')
                }}</a-button>
                <a-button>{{ $t('action.delete') }}</a-button>
            </template>
        </data-form>
        <a-card class="margin-y">
            <data-table
                :data="data"
                rowKey="id"
                :rowSelection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: keys => (selectedRowKeys = keys)
                }"
            >
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
                        <a class="margin-right" @click="onDetail(detail)">
                            {{ $t('action.detail') }}</a
                        >

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
        <a-card class="margin-y" v-if="detail">
            <OrderDetail :detail="detail"></OrderDetail>
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import { Inject } from 'typescript-ioc'
import { OrderService } from '~/services/order.service'
import { RequestParams } from '~/core/http'
import { PageService } from '~/bootstrap/services/page.service'
import { LoadingService } from '~/bootstrap/services/loading.service'
import DataForm from '~/shared/components/data-form.vue'
import OrderDetail from '~/components/orders/order-detail.vue'
import PageContainer from '../../shared/components/page-container.vue'

@Page({
    name: 'order-page1',
    layout: 'workspace'
})
@Component({
    components: {
        OrderDetail
    }
})
export default class OrderPage1 extends Vue {
    // 表格组件
    @Ref()
    readonly dataForm!: DataForm

    @Ref()
    readonly pageContainer!: PageContainer

    // 订单服务
    private orderService = new OrderService()
    // Loading服务
    private loadingService = new LoadingService()
    // 表格数据源
    private data: any[] = []

    // 表格选择项
    private selectedRowKeys: any[] = []

    // 详情项
    private detail = null

    private index = 1

    // 校验规则
    private get rules() {
        return {
            username: [
                { required: true, message: this.$t('rules.username_require') }
            ]
        }
    }

    private mounted() {}

    /**
     * 获取订单数据
     */
    private getOrderList() {
        this.dataForm
            .validateFields()
            .then(values => {
                this.orderService
                    .getOrderList(new RequestParams(values))
                    .subscribe(data => {
                        this.data = data
                    })
            })
            .catch(err => {
                // 异常处理
            })
    }

    /**
     * 查看订单详情
     */
    private onDetail(detail) {
        this.detail = detail
        this.$nextTick(() => this.pageContainer.scrollToBottom())
    }

    /**
     * 删除订单操作
     */
    private onDelete(id) {}

    private onCreateNew() {
        this.$app.openTab({
            name: 'order-detail',
            title: `名称测试-${this.index}`,
            path: `/orders/order-detail/${this.index}`
        })

        this.index += 1
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
