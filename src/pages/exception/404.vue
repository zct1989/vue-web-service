<template>
    <section class="full-absolute">
        404
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'

@Page({
    name: '404',
    layout: 'empty'
})
@Component({
    components: {}
})
export default class Exception404 extends Vue {}
</script>
