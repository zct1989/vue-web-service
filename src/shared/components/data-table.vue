<template>
  <section class="component data-table">
    <a-card>
      <a-table ref="table" :columns="columns" :dataSource="data"> </a-table>
    </a-card>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class DataTable extends Vue {
  @Prop()
  public data

  @Prop()
  public columns

  public get table() {
    return this.$refs['table']
  }
}
</script>
