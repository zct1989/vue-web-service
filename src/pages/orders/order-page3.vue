<template>
    <page-container>OrderPage3</page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
    name: 'order-page3',
    layout: 'workspace'
})
@Component({
    components: {}
})
export default class OrderPage3 extends Vue {}
</script>
