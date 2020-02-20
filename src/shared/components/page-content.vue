<template>
    <section class="page-content">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class PageContent extends Vue {}
</script>

<style lang="less" scoped>
.page-content {
    margin: 24px 24px 0;
}
</style>
