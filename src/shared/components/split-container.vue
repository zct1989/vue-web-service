<template>
    <div
        ref="container"
        class="split-container justify-content-center align-items-center"
        :class="{
            moving: moving,
            'flex-column': mode === 'column',
            'flex-row': mode === 'row'
        }"
    >
        <template v-if="mode === 'column'">
            <div class="top-wrapper flex-auto">
                <slot name="top"></slot>
            </div>
            <div class="split column" ref="split"></div>
            <div
                class="down-wrap"
                :style="{
                    height: `${fixedHeight}px`,
                    flexBasis: `${fixedHeight}px`
                }"
            >
                <slot name="bottom"></slot>
            </div>
        </template>

        <template v-if="mode === 'row'">
            <div class="left-wrapper flex-auto">
                <slot name="left"></slot>
            </div>
            <div class="split row" ref="split"></div>
            <div
                class="right-wrap"
                :style="{
                    width: `${fixedWidth}px`,
                    flexBasis: `${fixedWidth}px`
                }"
            >
                <slot name="right"></slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

@Component
export default class SplitContainer extends Vue {
    @Ref('split')
    private split!: HTMLDivElement

    @Ref('container')
    private container!: HTMLDivElement

    @Prop({ default: 'column' })
    private mode

    private fixedHeight = 200
    private fixedWidth = 200

    private moving = false

    public mounted() {
        this.setupDrag()
    }

    private setupDrag() {
        // split
        this.split.onmousedown = () => (this.moving = true)
        this.split.draggable = false
        this.split.ondrag = e => e.preventDefault()
        this.split.ondragenter = e => e.preventDefault()
        this.split.ondragleave = e => e.preventDefault()
        this.container.onmouseup = () => (this.moving = false)
        this.container.onmouseup = () => (this.moving = false)
        this.container.onmouseleave = () => (this.moving = false)
        this.container.onmousemove = ({ movementX, movementY }) => {
            if (!this.moving) return

            if (this.mode === 'column') {
                if (movementY > 0 && this.fixedHeight <= 200) return
                this.fixedHeight -= movementY
            } else {
                if (movementX > 0 && this.fixedWidth <= 200) return
                this.fixedWidth -= movementX
            }
        }
    }
}
</script>

<style lang="less" scoped>
.split-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
.split {
    padding: 2px 0;
    border: solid 1px rgb(200, 200, 200);
    flex-basis: 3px;
    background: rgb(200, 200, 200);

    &.column {
        width: 100%;
        height: 3px;
        &:hover {
            cursor: row-resize;
        }
    }

    &.row {
        height: 100%;
        width: 3px;
        &:hover {
            cursor: col-resize;
        }
    }
}
</style>
