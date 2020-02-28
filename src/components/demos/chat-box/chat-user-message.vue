<template>
    <section class="component flex-column chat-user-message full-absolute">
        <div class="chat-title flex-row align-items-center">
            <a-avatar
                :size="36"
                :src="userChat.avatar"
                class="margin-right"
            ></a-avatar>
            <div>
                <div class="username">{{ userChat.username }}</div>
                <div class="latest">
                    last seen at {{ moment(userChat.latest).fromNow() }}
                </div>
            </div>
        </div>
        <div ref="message-container" class="message-container flex-auto">
            <div
                v-for="(item, index) of userChat.messages"
                :key="item.time"
                class="message-item flex-row"
                :class="{
                    'justify-content-start': !isOwner(item),
                    'justify-content-end': isOwner(item),
                    'is-owner': isOwner(item)
                }"
            >
                <div>
                    <div
                        style="padding-bottom:3px;padding-left:20px;color:#a5a5a5;padding-right: 20px;"
                        :style="{
                            'text-align': !isOwner(item) ? 'left' : 'right'
                        }"
                    >
                        {{ item.time | date('yyyy-MM-dd hh:mm') }}
                    </div>
                    <div class="flex-row align-items-center">
                        <div class="message-action">
                            <a-dropdown :trigger="['click']">
                                <a class="ant-dropdown-link" href="#">
                                    <a-icon
                                        type="ellipsis"
                                        class="action"
                                        :style="iconStyle"
                                    />
                                </a>
                                <a-menu slot="overlay">
                                    <a-menu-item>
                                        <a-icon
                                            type="delete"
                                            :style="iconStyle"
                                            @click="revertMessage(index)"
                                        />
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a-icon
                                            type="link"
                                            :style="iconStyle"
                                        />
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a-icon
                                            type="share-alt"
                                            :style="iconStyle"
                                        />
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </div>

                        <pre
                            class="message-border"
                            :class="{ 'is-owner': isOwner(item) }"
                            v-html="item.message"
                        ></pre>
                    </div>
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

    private iconStyle = { fontSize: '16px', color: '#5a5a5a' }

    private get moment() {
        return moment
    }

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

    private revertMessage(index) {
        this.userChat.messages.splice(index, 1)
    }
}
</script>

<style lang="less" scoped>
.chat-title {
    flex-basis: 60px;
    padding: 10px;
    background-color: #fff;
    border-bottom: solid 1px rgb(200, 200, 200);

    .username {
        font-size: 14px;
        color: black;
        font-weight: 500;
    }

    .latest {
        color: #7f7f7f;
    }
}
.message-container {
    overflow: auto;
    height: calc(100% - 60px);
    padding: 0 10px;
}

.message-item {
    margin: 20px 10px;
    .message-action {
        order: 2;
        cursor: pointer;
        .action {
            padding: 5px;
            border-radius: 10px;
            &:hover {
                background: #e5e5e5;
            }
        }
    }
    .message-border {
        order: 1;
    }

    &.is-owner {
        .message-action {
            order: 1;
        }
        .message-border {
            order: 2;
        }
    }
}

.message-border {
    padding: 10px;
    margin: 0 10px;
    min-width: 100px;
    max-width: 350px;
    border-radius: 10px;
    background-color: #d8eaff;
    word-wrap: wrap;
    white-space: pre-wrap;
    word-break: break-all;

    &.is-owner {
        background-color: #f4ecff;
    }
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
