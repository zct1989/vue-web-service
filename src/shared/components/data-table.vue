<template>
  <section class="component data-table">
    <div
      v-if="$slots.action || $slots.extra"
      class="flex-row justify-content-between padding-bottom"
    >
      <div class="table-action flex-row align-items-center">
        <vnodes
          :slot="key"
          v-for="[key, node] of Object.entries($slots.action)"
          :vnodes="node"
          :key="key"
        />
      </div>
      <div class="table-extra flex-row align-items-center">
        <template v-if="$slots.extra">
          <vnodes
            :slot="key"
            v-for="[key, node] of Object.entries($slots.extra)"
            :vnodes="node"
            :key="key"
          />
        </template>
        <a @click="exportExcel">导出Excel</a>
      </div>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :rowKey="rowKey"
      :loading="loadingState"
      :rowSelection="rowSelection"
    >
      <vnodes
        :slot="key"
        v-for="[key, node] of Object.entries($slots)"
        :vnodes="node"
        :key="key"
      />
    </a-table>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Table } from 'ant-design-vue'
import { LoadingService } from '../../bootstrap/services/loading.service'
import XLSX from 'xlsx'

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
  public loading!: LoadingService

  @Prop()
  public columns

  @Prop()
  public rowKey

  @Prop()
  public rowSelection

  private loadingState = false

  mounted() {
    if (this.loading) {
      this.loading.status.subscribe(value => (this.loadingState = value))
    }
  }

  public exportExcel() {
    const excelFile = this.createExcelFile()
    this.saveAs(excelFile, 'excel.xlsx')
  }

  private createExcelFile() {
    const workbook = XLSX.utils.table_to_book(this.$el.querySelector('table'))
    return new Blob([
      XLSX.write(workbook, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      })
    ])
  }

  private saveAs(obj, fileName) {
    const tmpLink = document.createElement('a')
    tmpLink.download = fileName || 'download'
    tmpLink.href = URL.createObjectURL(obj)
    tmpLink.click()
    setTimeout(() => {
      URL.revokeObjectURL(obj)
    }, 1000)
  }
}
</script>
