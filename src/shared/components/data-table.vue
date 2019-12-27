<template>
  <section class="component data-table">
    <a-card>
      <a-table
        :columns="columns"
        :dataSource="data"
        :rowKey="rowKey"
        :rowSelection="rowSelection"
      >
        <vnodes
          :slot="key"
          v-for="[key, node] of Object.entries($slots)"
          :vnodes="node"
          :key="key"
        />
      </a-table>
    </a-card>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Table } from 'ant-design-vue'

@Component({
  components: {
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  }
})
export default class DataTable extends Vue {
  @Ref('table')
  public readonly table!: Table

  @Prop()
  public data

  @Prop()
  public columns

  @Prop()
  public rowKey

  @Prop()
  public rowSelection
}
</script>
