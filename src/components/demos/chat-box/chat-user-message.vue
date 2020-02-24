<template>
    <section class="component flex-column chat-user-message full-absolute">
        <div class="chat-title text-center">
            {{ userChat.username }}
        </div>
        <div ref="message-container" class="message-container flex-auto">
            <div
                v-for="item of userChat.messages"
                :key="item.time"
                class="message-item flex-row"
                :class="{
                    'justify-content-start': !isOwner(item),
                    'justify-content-end': isOwner(item)
                }"
            >
                <div v-if="!isOwner(item)" class="text-center">
                    <a-avatar shape="square" icon="user" />
                    <div>{{ item.sender.username }}</div>
                </div>
                <div>
                    <div style="padding-bottom:3px;padding-left:10px;">
                        {{ item.time | date('yyyy-MM-dd hh:mm') }}
                    </div>
                    <pre v-html="item.message" class="message-border"></pre>
                </div>

                <div v-if="isOwner(item)" class="text-center">
                    <a-avatar shape="square" icon="user" />
                    <div>{{ item.sender.username }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import moment from 'moment'
const chatModule = namespace('chatModule')
const userModule = namespace('userModule')

@Component({
    components: {}
})
export default class ChatUserMessage extends Vue {
    @userModule.State
    private username

    @userModule.State
    private id

    @chatModule.State
    private currentUser

    @chatModule.State
    private userList

    @Ref('message-container')
    private messageContainer

    @Watch('userChat.messages')
    onMessageChange() {
        this.scrollToBottom()
    }

    @Watch('currentUser')
    onUserChange() {
        this.scrollToBottom()
    }

    private scrollToBottom() {
        this.$nextTick(() => {
            this.messageContainer.scrollTo(
                0,
                this.messageContainer.scrollHeight
            )
        })
    }

    private get userChat() {
        return this.userList.find(x => x.id === this.currentUser)
    }

    private isOwner(message) {
        return message.sender.id === this.id
    }
}
</script>

<style lang="less" scoped>
.chat-title {
    flex-basis: 40px;
    font-size: 18px;
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: solid 1px #c5c5c5;
}
.message-container {
    overflow: auto;
    height: calc(100% - 40px);
}

.message-item {
    margin: 20px 10px;
}

.message-border {
    border: solid 1px #c7c7c7;
    padding: 10px;
    margin: 0 10px;
    min-width: 100px;
    max-width: 350px;
    border-radius: 2px;
    background-color: #f5f5f5;
    word-wrap: wrap;
    white-space: pre-wrap;
    word-break: break-all;
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
