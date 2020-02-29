<template>
    <a-form-item label="test1">
        <a-input
            placeholder="test1"
            v-decorator="['test1', { rules: rules.test1 }]"
        ></a-input>
    </a-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class Test1FormItem extends Vue {
    private rules = {
        test1: [{ require: true }]
    }
}
</script>
