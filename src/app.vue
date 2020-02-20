<template>
    <a-config-provider :getPopupContainer="getPopupContainer">
        <a-locale-provider :locale="locale">
            <main class="full-absolute" ref="main">
                <slot></slot>
            </main>
        </a-locale-provider>
    </a-config-provider>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { antdLocale } from '~/assets/locale'

@Component({
    components: {}
})
export default class App extends Vue {
    private getPopupContainer(el, dialogContext) {
        if (dialogContext) {
            return dialogContext
        } else {
            return document.querySelector('.layout.layout-container')
        }
    }

    private get locale() {
        return antdLocale[this.$app.state.locale].antd
    }
}
</script>
