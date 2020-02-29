<template>
    <a-form-item label="test2">
        <a-input
            placeholder="test2"
            v-decorator="['test2', { rules: rules.test2 }]"
        ></a-input>
    </a-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class Test2FormItem extends Vue {
    private rules = {
        test2: [{ required: true, message: 'test2 is require' }]
    }
}
</script>
