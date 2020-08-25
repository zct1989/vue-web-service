<template>
    <page-container>
        <!-- <split-container mode="column">
            <template v-slot:top>aaa</template>
            <template v-slot:bottom>bbb</template>
        </split-container> -->
        <split-container mode="row">
            <template v-slot:left>aaa</template>
            <template v-slot:right>bbb</template>
        </split-container>
    </page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import SplitContainer from '@/shared/components/split-container.vue'

@Page({
    name: 'order-page3',
    layout: 'workspace'
})
@Component({
    components: {
        SplitContainer
    }
})
export default class OrderPage3 extends Vue {}
</script>
