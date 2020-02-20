<template>
    <page-container>AccountPage1</page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
    name: 'account-page1',
    layout: 'workspace'
})
@Component({
    components: {}
})
export default class AccountPage1 extends Vue {}
</script>
