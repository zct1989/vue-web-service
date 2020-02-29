<template>
    <a-form-item :label="`${$t('age')}`">
        <a-select v-decorator="['age', { rules: rules.age }]">
            <a-select-option :value="[12, 18]">
                12-18
            </a-select-option>
            <a-select-option :value="[19, 30]">
                19-30
            </a-select-option>
            <a-select-option :value="[30, 60]">
                30-60
            </a-select-option>
        </a-select>
    </a-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class AgeFormItem extends Vue {
    private rules = {
        age: [{ require: true }]
    }
}
</script>

<i18n>
{
  "en-us":{
    "age":"Age"

  },
  "zh-cn":{
    "age":"年龄"
  }
}
</i18n>
