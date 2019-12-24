<template>
  <section class="page-header">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumb">
          <span v-if="index === 0">
            <a href="#/">{{ $t(`menu.${item.name}`) }}</a>
          </span>
          <span v-else>{{ $t(`menu.${item.name}`) }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { antdLocale } from '~/assets/locale'

@Component({
  components: {}
})
export default class PageHeader extends Vue {
  @Prop()
  public breadcrumb
}
</script>
