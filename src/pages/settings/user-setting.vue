<template>
    <page-container>UserSetting</page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
    name: 'user-setting',
    layout: 'workspace'
})
@Component({
    components: {}
})
export default class UserSetting extends Vue {}
</script>
