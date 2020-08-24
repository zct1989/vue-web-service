<template>
    <page-container>
        <order-detail-content
            v-for="key in keys"
            :key="key"
            v-show="key === id"
            :detail="data.find(x => x.id === key)"
        ></order-detail-content>
        123
    </page-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import OrderDetailContent from '@/components/orders/order-detail.vue'

@Page({
    name: 'order-detail',
    layout: 'workspace'
})
@Component({
    components: {
        OrderDetailContent
    }
})
export default class OrderDetail extends Vue {
    @Prop()
    public id

    public keys: any[] = []

    @Watch('id')
    onPropChange(id: string) {
        if (!this.data.find(x => x.id === id)) {
            this.data.push({
                id: id,
                name: id.repeat(4),
                age: id.repeat(5),
                address: `${id.repeat(2)}号地址`,
                tags: [id.repeat(2), id.repeat(3), id.repeat(4)]
            })
        }

        this.$nextTick(() => {
            if (!this.keys.includes(id)) {
                this.keys.push(id)
            }
        })
    }

    mounted() {
        this.onPropChange(this.id)
    }

    private data: any[] = []
}
</script>
