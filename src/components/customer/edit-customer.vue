<template>
    <section class="component edit-customer"></section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { RequestParams } from '../../core/http'

@Component({
    components: {}
})
export default class EditCustomer extends Vue {}
</script>

<i18n>
{
  "en-us":{
      "columns":{
            "code":"WareHouse Code",
            "name":"Customer Info"
      }
  },
  "zh-cn":{
       "columns":{    
           "code":"仓库编码",
           "name":"仓库名称"
      }
  }
}
</i18n>
