<template>
    <div
        ref="container"
        class="flex-row justify-content-center align-items-center background full-absolute"
    >
        <div
            class="chat-box-container"
            :class="{ moving: moving }"
            :style="{ 'grid-template-rows': gridTemplateRows }"
        >
            <div class="chat-header-wrap wrap">
                <chat-header></chat-header>
            </div>
            <div class="user-list-wrap wrap">
                <chat-user-list></chat-user-list>
            </div>
            <div class="message-list-wrap wrap">
                <chat-user-message></chat-user-message>
            </div>
            <div class="user-order-wrap wrap">
                <chat-user-order></chat-user-order>
            </div>
            <div class="user-input-wrap ">
                <div class="split" ref="split"></div>
                <div class="full-height wrap">
                    <chat-user-input></chat-user-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Page } from '@/core/decorators'

import ChatUserInput from '~/components/demos/chat-box/chat-user-input.vue'
import ChatUserMessage from '~/components/demos/chat-box/chat-user-message.vue'
import ChatUserOrder from '~/components/demos/chat-box/chat-user-order.vue'
import ChatUserList from '~/components/demos/chat-box/chat-user-list.vue'
import ChatHeader from '~/components/demos/chat-box/chat-header.vue'

import Mock from 'mockjs'

@Page({
    layout: 'empty',
    name: 'chat-box'
})
@Component({
    components: {
        ChatHeader,
        ChatUserInput,
        ChatUserList,
        ChatUserMessage,
        ChatUserOrder
    }
})
export default class ChatBox extends Vue {
    @Ref('split')
    private split!: HTMLDivElement

    @Ref('container')
    private container!: HTMLDivElement

    private inputHeight = 200
    private moving = false
    private get gridTemplateRows() {
        return `60px auto ${this.inputHeight}px`
    }

    public mounted() {
        this.setupDrag()
    }

    private setupDrag() {
        this.split.onmousedown = () => (this.moving = true)
        this.container.onmouseup = () => (this.moving = false)
        this.container.onmouseleave = () => (this.moving = false)
        this.container.onmousemove = ({ movementY }) => {
            if (!this.moving) return
            if (movementY > 0 && this.inputHeight <= 200) return
            this.inputHeight -= movementY
        }
    }

    // grid-template-rows: 60px auto 219px;
}
</script>

<style lang="less" scoped>
.split {
    width: 100%;
    height: 1px;
    background: rgb(200, 200, 200);
    width: 100%;
    height: 2px;
    padding: 2px 0;
    border: 2px;
    &:hover {
        cursor: row-resize;
    }
}

.chat-box-container {
    background: #ffffff;
    height: 100%;
    width: 100%;
    min-height: 600px;
    min-width: 800px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px #7a7a7a;
    display: grid;
    grid-template-columns: 300px auto 250px;
    grid-template-areas:
        'chat-header chat-header chat-header'
        'user-list chat-message user-order'
        'user-list chat-input user-order';
    &.moving {
        cursor: row-resize !important;
    }
}

.background {
    background-color: #a7a7a7;
}

.wrap {
    position: relative;
}

.chat-header-wrap {
    grid-area: chat-header;
    box-shadow: 0px 5px 5px #dadce0;
}

.user-list-wrap {
    grid-area: user-list;
}
.user-order-wrap {
    grid-area: user-order;
}
.chat-message-wrap {
    grid-area: chat-message;
}
.chat-input-wrap {
    grid-area: chat-input;
}
</style>

<i18n>
{
  "en-us":{
    "today":"Today"

  },
  "zh-cn":{
    "today":"今天"
  }
}
</i18n>
