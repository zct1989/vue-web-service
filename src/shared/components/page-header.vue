<template>
    <section class="component page-header">
        <div class="breadcrumb" v-if="!mobile">
            <a-breadcrumb>
                <a-breadcrumb-item key="/dashboard/workspace">
                    <a href="#/">
                        <a-icon type="home" />
                    </a>
                </a-breadcrumb-item>
                <a-breadcrumb-item :key="item" v-for="item in breadcrumb.path">
                    <span>{{ $t(`menu.${item}`) }}</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <span>{{ title || $t(`menu.${breadcrumb.title}`) }}</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="flex-row justify-content-between align-items-center">
            <div class="title flex-auto">
                <span v-if="title">{{ title }}</span>
            </div>
            <div v-if="this.$slots.action" class="action">
                <slot name="action"></slot>
            </div>
        </div>
        <div class="flex-row justify-content-between align-items-start">
            <div v-if="this.$slots.content" class="content flex-auto">
                <slot name="content"></slot>
            </div>
            <div v-if="this.$slots.extra" class="extra">
                <slot name="extra"></slot>
            </div>
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
    title

    private get breadcrumb() {
        const paths = this.$route.path.split('/').filter(x => x)
        const [title] = paths.splice(-1)
        return {
            path: paths,
            title: title
        }
    }

    private get mobile() {
        return this.$app.state.mobile
    }
}
</script>

<style lang="less" scoped>
.component.page-header {
    padding: 16px 32px 0;
    border-bottom: 1px solid #e8e8e8;
    min-height: 60px;

    .breadcrumb {
        margin-bottom: 16px;
    }

    .title {
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 16px;
    }

    .action {
        flex: 0 1 auto;
        margin-bottom: 16px;
        & > * {
            margin: 0 5px;
        }
    }

    .content {
        margin-bottom: 16px;
    }

    .extra {
        flex: 0 1 auto;
        margin-bottom: 16px;
    }
}
</style>
