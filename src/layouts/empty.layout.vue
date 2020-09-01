<template>
    <div class="layout layout-container fill" style="overflow:hidden;">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Layout } from '@/core/decorators'

@Layout({
    name: 'EmptyLayout'
})
@Component({
    components: {}
})
export default class EmptyLayout extends Vue {}
</script>
