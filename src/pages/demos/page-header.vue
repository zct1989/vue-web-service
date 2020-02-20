<template>
    <page-container :desc="desc">
        <!-- 操作区 -->
        <template v-slot:header-action>
            <a-button-group style="margin-right: 4px;">
                <a-button>{{ $t('operator1') }}</a-button>
                <a-button>{{ $t('operator2') }}</a-button>
            </a-button-group>
            <a-button type="primary">{{ $t('main-operator') }}</a-button>
        </template>

        <!-- 信息区 -->
        <template v-slot:extra>
            <div class="flex-row">
                <HeaderInfo
                    :title="$t('day-order-number')"
                    content="934"
                    :bordered="true"
                ></HeaderInfo>
                <HeaderInfo
                    :title="$t('week-order-number')"
                    content="3534"
                    :bordered="true"
                ></HeaderInfo>
                <HeaderInfo
                    :title="$t('month-order-number')"
                    content="9334"
                ></HeaderInfo>
            </div>
        </template>

        <a-card>
            {{ $t('info') }}
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import HeaderInfo from '~/shared/components/header-info.vue'
import WorkCalender from '~/components/dashboard/work-calendar.vue'
import { namespace } from 'vuex-class'

const userModule = namespace('userModule')
@Page({
    name: 'page-header',
    layout: 'workspace'
})
@Component({
    components: { HeaderInfo, WorkCalender }
})
export default class PageHeader extends Vue {
    @userModule.State
    private username

    private get desc() {
        return ` ${this.$t('hello')}, ${this.username}`
    }
}
</script>

<i18n>
{
  "en-us": {
    "hello": "Hello",
    "operator1":"operator1",
    "operator2":"operator2",
    "main-operator":"main operator",
    "day-order-number":"today order number",
    "week-order-number":"week order number",
    "month-order-number":"month order number",
    "info":"page header demo"
  },
  "zh-cn": {
    "hello": "你好",
     "operator1":"操作1",
     "operator2":"操作2",
     "main-operator":"主操作",
     "day-order-number":"当日订单数",
     "week-order-number":"本周订单数",
     "month-order-number":"本月订单数",
     "info":"页面头部示例"
  }
}
</i18n>
