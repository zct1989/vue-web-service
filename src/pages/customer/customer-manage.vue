<template>
    <page-container ref="pageContainer">
        <template #header-action>
            <a-button type="primary">{{ $t('action.create') }}</a-button>
            <a-button type="primary">{{ $t('action.batch-create') }}</a-button>
        </template>
        <data-form ref="dataForm" @submit="getCustomerList">
            <!--默认显示项-->
            <template #default>
                <a-form-item :label="$t('form.status')">
                    <a-select v-decorator="['status', { initialValue: '' }]">
                        <a-select-option value="">
                            全部
                        </a-select-option>
                        <a-select-option
                            :value="item.value"
                            v-for="item of $dict.CustomerStatus"
                            :key="item.value"
                        >
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
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
                <a-button type="primary">{{
                    $t('action.batch-assign-storage')
                }}</a-button>
                <a-button type="primary">{{
                    $t('action.batch-assign-delegate')
                }}</a-button>
                <a-button type="primary">{{
                    $t('action.export-customer-info')
                }}</a-button>
                <a-button type="primary">{{
                    $t('action.export-customer-balance')
                }}</a-button>
            </template>
        </data-form>
        <a-card class="margin-y">
            <data-table
                :data="data"
                rowKey="customer_code"
                :rowSelection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: keys => (selectedRowKeys = keys)
                }"
            >
                <a-table-column
                    :title="$t('columns.customer_code')"
                    key="customer_code"
                    align="right"
                    width="120px"
                >
                    <template slot-scope="row">
                        <a @click="onDetail(row)">{{ row.customer_code }}</a>
                    </template>
                </a-table-column>
                <a-table-column
                    :title="$t('columns.company_name')"
                    dataIndex="company_name"
                    key="company_name"
                ></a-table-column>
                <a-table-column
                    :title="$t('columns.available_balance')"
                    dataIndex="available_balance"
                    key="available_balance"
                    align="right"
                ></a-table-column>
                <a-table-column
                    :title="$t('columns.credit')"
                    dataIndex="credit"
                    key="credit"
                    align="right"
                ></a-table-column>
                <a-table-column
                    :title="$t('columns.status')"
                    dataIndex="status"
                    key="status"
                >
                    <template slot-scope="status">
                        {{ status | dict('CustomerStatus') }}
                    </template>
                </a-table-column>
                <a-table-column :title="$t('columns.action')" key="action">
                    <template slot-scope="row">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item @click="onEdit(row)"
                                    >编辑</a-menu-item
                                >
                                <a-menu-item @click="onAssign(row)"
                                    >分配代表</a-menu-item
                                >
                                <a-menu-item @click="onApply(row)"
                                    >申请额度</a-menu-item
                                >
                                <a-menu-item @click="onStop(row)"
                                    >停用</a-menu-item
                                >
                            </a-menu>
                            <a-button>
                                更多操作 <a-icon type="down" />
                            </a-button>
                        </a-dropdown>
                        <!-- <a-popconfirm
                            :title="$t('delete')"
                            @confirm="onDelete(detail.id)"
                        >
                            <a class="margin-right">
                                {{ $t('action.delete') }}</a
                            >
                        </a-popconfirm> -->
                    </template>
                </a-table-column>
            </data-table>
        </a-card>
        <a-card class="margin-y" v-if="current">
            <CustomerDetail :customer="current"></CustomerDetail>
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import { CustomerService } from '~/services/customer.service'
import { RequestParams } from '~/core/http'
import { PageService } from '~/bootstrap/services/page.service'
import { LoadingService } from '~/bootstrap/services/loading.service'
import DataForm from '~/shared/components/data-form.vue'
import CustomerDetail from '~/components/customer/customer-detail.vue'
import PageContainer from '../../shared/components/page-container.vue'
import { CustomerStatus } from '~/config/dict.config'

@Page({
    layout: 'workspace',
    name: 'customer-manage'
})
@Component({
    components: {
        CustomerDetail
    }
})
export default class CustomerManage extends Vue {
    // 表格组件
    @Ref()
    readonly dataForm!: DataForm

    @Ref()
    readonly pageContainer!: PageContainer

    // 订单服务
    private customerService = new CustomerService()
    // Loading服务
    private loadingService = new LoadingService()
    // 分页服务
    private pageService = new PageService()
    // 表格数据源
    private data: any[] = []

    // 表格选择项
    private selectedRowKeys: any[] = []

    // 详情项
    private current = null

    private mounted() {}

    /**
     * 获取订单数据
     */
    private getCustomerList() {
        this.pageService.pageSize = 2
        this.dataForm
            .validateFields()
            .then(values => {
                this.customerService
                    .getCustomerList(
                        new RequestParams(values, {
                            page: this.pageService
                        })
                    )
                    .subscribe(data => {
                        this.data = data
                        console.log(data)
                    })
            })
            .catch(err => {
                // 异常处理
            })
    }

    /**
     * 查看订单详情
     */
    private onDetail(row) {
        this.current = row
        this.$nextTick(() => this.pageContainer.scrollToBottom())
    }

    /**
     * 编辑
     */
    private onEdit(row) {}

    private onStop(row) {}

    private onApply(row) {}

    private onAssign(row) {}

    /**
     * 删除订单操作
     */
    private onDelete(id) {}
}
</script>

<i18n>
{
  "en-us": {
    "desc": "this is a Order Page1",
    "columns":{
      "customer_code":"Customer No",
      "company_name":"Company Name",
      "available_balance":"Balance",
      "credit":"Credit",
      "status":"Status",
      "action":"Action"
    },
    "form":{
       "status":"Status",
       "age":"Age",
       "sex":"Sex",
       "male":"Male",
       "female":"Female",
       "field":"Field"
    },
    "action":{
      "create":"Open Account",
      "batch-create":"Batch Open Account",
      "delete":"Delete",
      "detail":"Detail",
      "batch-assign-storage":"Assign Storeage",
      "batch-assign-delegate":"Assign Delegate",
      "export-customer-info":"Export Customer",
      "export-customer-balance":"Export Balance"
    },
    "rules":{
      "username_require":"please input username"
    },
    "delete":"Are you sure delete?"
  },
  "zh-cn": {
    "desc": "这是订单页面1",
    "columns":{
      "customer_code":"客户编号",
      "company_name":"公司名称",
      "available_balance":"可用余额",
      "credit":"信用额度",
      "status":"状态",
      "action":"操作"
    },
    "form":{
       "status":"状态",
       "age":"年龄",
       "sex":"性别",
       "male":"男性",
       "female":"女性",
       "field":"字段"
    },
    "action":{
      "create":"开户",
      "batch-create":"批量开户",
      "batch-assign-storage":"批量分配仓库",
      "batch-assign-delegate":"批量分配代表",
      "export-customer-info":"导出客户信息",
      "export-customer-balance":"导出客户余额",
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
