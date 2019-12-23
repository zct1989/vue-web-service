<template>
  <div class="about">
    <h1>This is an about page {{ $t('menu.home') }}</h1>
    <a-pagination :defaultCurrent="1" :total="50" showSizeChanger />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '../core/decorators'

@Page({
  name: 'home',
  layout: 'workspace'
})
@Component({
  components: {}
})
export default class Home extends Vue {}
</script>
