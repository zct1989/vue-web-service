<template>
    <page-container ref="pageContainer">
        <template #header-action>
            <a-button type="primary" @click="onCreateCustomer">{{
                $t('action.create')
            }}</a-button>
            <a-button type="primary">{{ $t('action.batch-create') }}</a-button>
        </template>
        <data-form
            :extends="extendItems"
            ref="dataForm"
            @submit="getCustomerList"
            :column="3"
        >
            <!--默认显示项-->
            <template #default>
                <a-form-item :label="$t('form.status')">
                    <a-select v-decorator="['status', { initialValue: '' }]">
                        <a-select-option value="">
                            {{ $t('dict.all') }}
                        </a-select-option>
                        <a-select-option
                            :value="item.value"
                            v-for="item of $dict.CustomerStatus"
                            :key="item.value"
                        >
                            {{ $t(item.label) }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :label="$t('form.customer_code')">
                    <a-input
                        :placeholder="$t('form.customer_code')"
                        v-decorator="['customer_code']"
                    ></a-input>
                </a-form-item>
                <a-form-item :label="$t('form.company_name')">
                    <a-input
                        :placeholder="$t('form.company_name')"
                        v-decorator="['company_name']"
                    ></a-input>
                </a-form-item>
                <a-form-item :label="`${$t('form.contract_start')}`">
                    <a-date-picker
                        :placeholder="$t('form.contract_start')"
                        v-decorator="[
                            'contract_start',
                            { rules: rules.contract_start }
                        ]"
                    />
                </a-form-item>
                <a-form-item :label="`${$t('form.contract_end')}`">
                    <a-date-picker
                        :placeholder="$t('form.contract_end')"
                        v-decorator="[
                            'contract_end',
                            { rules: rules.contract_end }
                        ]"
                    />
                </a-form-item>
            </template>
            <!--折叠显示项-->
            <!-- <template #collapse>
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
            </template> -->
            <!--操作行为项-->
            <template #action>
                <a-button
                    type="primary"
                    @click="onBatchAssignStorage()"
                    :disabled="!selectedRowKeys.length"
                    >{{ $t('action.batch-assign-storage') }}</a-button
                >
                <a-button type="primary" disabled>{{
                    $t('action.batch-assign-delegate')
                }}</a-button>
                <a-button type="primary" disabled>{{
                    $t('action.export-customer-info')
                }}</a-button>
                <a-button type="primary" disabled>{{
                    $t('action.export-customer-balance')
                }}</a-button>
            </template>
        </data-form>
        <a-card class="margin-y">
            <data-table
                :stripe="true"
                :data="data"
                :page="pageService"
                rowKey="customer_code"
                :rowSelection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: keys => (selectedRowKeys = keys)
                }"
                @on-page-change="getCustomerList"
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
                    :title="$t('columns.billing_currency')"
                    dataIndex="billing_currency"
                    key="billing_currency"
                >
                    <template slot-scope="currency">
                        {{ currency | dict('currency') }}
                    </template>
                </a-table-column>
                <a-table-column
                    :title="$t('columns.status')"
                    dataIndex="status"
                    key="status"
                >
                    <template slot-scope="status">
                        {{ status | dict('CustomerStatus') | translate }}
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
import { CommonService } from '../../shared/utils/common.service'
import AvailableWareHouse from '~/components/customer/available-warehouse.vue'
import CustomerForm from '~/components/customer/customer-form.vue'
import { formConfig } from '../../config/form.config'

@Page({
    layout: 'workspace',
    name: 'customer-manage'
})
@Component({
    components: {
        CustomerDetail,
        AvailableWareHouse
    }
})
export default class CustomerManage extends Vue {
    // 表格组件
    @Ref()
    readonly dataForm!: DataForm

    @Ref()
    readonly pageContainer!: PageContainer

    private get extendItems() {
        return formConfig.defaults()
    }

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

    private get rules() {
        return {
            contract_start: [
                {
                    validator: (rule, value, callback) => {
                        const { getFieldValue } = this.dataForm.formInstance
                        const contractEnd = getFieldValue('contract_end')
                        if (!contractEnd || !value || contractEnd - value > 0) {
                            callback()
                        } else {
                            callback(this.$t('rules.date_range_error'))
                        }
                    }
                }
            ],
            contract_end: [
                {
                    validator: (rule, value, callback) => {
                        const { getFieldValue } = this.dataForm.formInstance
                        const contractStart = getFieldValue('contract_start')
                        if (
                            !contractStart ||
                            !value ||
                            value - contractStart > 0
                        ) {
                            callback()
                        } else {
                            callback(this.$t('rules.date_range_error'))
                        }
                    }
                }
            ]
        }
    }

    private mounted() {}

    private onCreateCustomer() {
        this.$modal
            .open(
                CustomerForm,
                {},
                {
                    title: '客户开户',
                    width: '80%'
                }
            )
            .subscribe(data => {
                this.saveCustomer(data)
            })
    }

    private saveCustomer(data) {
        this.customerService.save(new RequestParams(data)).subscribe(
            () => {
                this.$message.success('操作成功')
                this.getCustomerList()
            },
            () => {
                this.$message.success('操作失败')
            }
        )
    }

    /**
     * 获取订单数据
     */
    private getCustomerList() {
        this.dataForm
            .validateFields()
            .then(values => {
                this.customerService
                    .getCustomerList(
                        new RequestParams(
                            CommonService.createQueryCondition(values, {
                                customer_code: '=',
                                company_name: 'like',
                                status: '=',
                                contract_start: '>=',
                                contract_end: '<=',
                                ...formConfig.condition
                            }),
                            {
                                page: this.pageService
                            }
                        )
                    )
                    .subscribe(data => {
                        this.data = data
                    })
            })
            .catch(err => {
                // 异常处理
            })
    }

    /**
     * 批量分配仓库
     */
    private onBatchAssignStorage() {
        this.$modal
            .open(
                AvailableWareHouse,
                {},
                { title: this.$t('action.batch-assign-storage') }
            )
            .subscribe((data: any[]) => {
                const params = this.selectedRowKeys.map(customerCode => ({
                    customer_code: customerCode,
                    whs_ids: data.map(x => ({
                        whs_id: x
                    }))
                }))
                this.customerService
                    .batchSetStorage(
                        new RequestParams({ customer_wms: params })
                    )
                    .subscribe(data => {
                        this.$message.success('分配成功')
                        this.getCustomerList()
                    })
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
    private onEdit(row) {
        this.$modal
            .open(
                CustomerForm,
                {
                    customer: row
                },
                {
                    title: '客户编辑',
                    width: '80%'
                }
            )
            .subscribe(data => {
                this.saveCustomer(data)
            })
    }

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
      "action":"Action",
      "billing_currency":"Billing Currency"
    },
    "form":{
       "status":"Status",
       "customer_code":"Customer Code",
       "company_name":"Company Name",
       "contract_start":"Contract Start Date",
       "contract_end":"Contract End Date",
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
       "date_range_error":"start date can't later start date"
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
      "action":"操作",
      "billing_currency":"账单币种"
    },
    "form":{
       "status":"状态",
       "customer_code":"客户编号",
       "company_name":"公司名称",
       "contract_start":"合同开始日期",
       "contract_end":"合同结束日期",
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
      "date_range_error":"开始日期不能大于结束日期"
    },
    "delete":"是否确认删除?"
  }
}
</i18n>
