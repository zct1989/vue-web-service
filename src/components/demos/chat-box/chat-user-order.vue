<template>
    <section class="component chat-user-order full-absolute">
        <div class="order-title text-center padding">
            {{ userChat.username }}'s Order
        </div>
        <label-container :column="1">
            <label-item label="Order NO">{{
                Math.floor(Math.random() * 10000)
            }}</label-item>
            <label-item label="Address">xxxx</label-item>
            <label-item label="Date">2020-01-24 12:33:44</label-item>
            <label-item label="...">...</label-item>
        </label-container>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import moment from 'moment'
const chatModule = namespace('chatModule')
const userModule = namespace('userModule')

@Component({
    components: {}
})
export default class ChatUserOrder extends Vue {
    @chatModule.State
    private currentUser

    @chatModule.State
    private userList

    private get userChat() {
        return this.userList.find(x => x.id === this.currentUser)
    }
}
</script>

<style lang="less" scoped>
.chat-user-order {
    background-color: #f5f5f5;
    border-left: solid 1px #c5c5c5;
}

.order-title {
    font-size: 16px;
    font-weight: bold;
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
