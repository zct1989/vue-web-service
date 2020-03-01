<template>
    <section
        class="component full-absolute chat-user-input padding-x flex-column"
    >
        <div>
            <a-select
                defaultValue="模版一"
                style="width: 200px"
                class="priority-container margin-y"
            >
                <a-select-option value="template1">模版一</a-select-option>
                <a-select-option value="template2">模版二</a-select-option>
                <a-select-option value="template3">模版三</a-select-option>
            </a-select>
        </div>
        <a-textarea
            class="flex-auto"
            placeholder="please input message"
            :rows="4"
            v-model="content"
            :autosize="false"
            :resize="false"
            style="resize: none;"
        />
        <div
            class="flex-row align-items-center justify-content-between margin-y"
        >
            <div>
                <a-button class="margin-right">Action1</a-button>
                <a-button class="margin-right">Action2</a-button>
                <a-button class="margin-right">Action3</a-button>
            </div>
            <div>
                <a-button type="primary" @click="onSendMessage()"
                    >send</a-button
                >
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const chatModule = namespace('chatModule')
const userModule = namespace('userModule')

@Component({
    components: {}
})
export default class ChatUserInput extends Vue {
    @userModule.State
    private username

    @userModule.State
    private id

    @chatModule.State
    private userList

    @chatModule.State
    private currentUser

    @chatModule.Mutation('addUserMessage')
    private addUserMessage

    private get receiverUser() {
        const receiver = this.userList.find(x => x.id === this.currentUser)
        return {
            id: receiver.id,
            username: receiver.username
        }
    }

    private get senderUser() {
        return {
            username: this.username,
            id: this.id
        }
    }

    private content = ''
    private onSendMessage() {
        if (this.content.trim() === '') {
            return
        }

        this.addUserMessage({
            sender: this.senderUser,
            receiver: this.receiverUser,
            message: this.content
        })

        this.content = ''
    }
}
</script>

<style lang="less" scoped>
.chat-user-input {
    border-top: solid 1px rgb(200, 200, 200);
    padding: 5px;
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
