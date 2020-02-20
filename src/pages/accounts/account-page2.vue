<template>
    <page-container>AccountPage2</page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
    name: 'account-page2',
    layout: 'workspace'
})
@Component({
    components: {}
})
export default class AccountPage2 extends Vue {}
</script>
