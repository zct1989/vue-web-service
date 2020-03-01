import PayMehtodFormItem from '~/shared/search-items/pay-method.vue'
import Test1FormItem from '~/shared/search-items/test1.vue'
import Test2FormItem from '~/shared/search-items/test2.vue'

export const formConfig = {
    defaults: () => [
        {
            label: '付款方式',
            show: false,
            component: PayMehtodFormItem
        },
        {
            label: 'test1',
            show: false,
            component: Test1FormItem
        },
        {
            label: 'test2',
            show: false,
            component: Test2FormItem
        }
    ],
    customs: {
        order: () => [
            {
                label: '付款方式',
                show: false,
                component: PayMehtodFormItem
            },
            {
                label: 'test1',
                show: false,
                component: Test1FormItem
            }
        ],
        user: () => [
            {
                label: 'test-list',
                show: false,
                components: [Test1FormItem, Test2FormItem]
            }
        ]
    },
    condition: {
        paymethod: '=',
        test1: 'like',
        test2: '='
    }
}
