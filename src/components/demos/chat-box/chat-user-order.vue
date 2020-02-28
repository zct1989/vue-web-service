<template>
    <section class="component chat-user-order full-absolute">
        <div class="margin text-right">
            <a class="margin-left">查看订单</a>
            <a class="margin-left">删除订单</a>
            <a class="margin-left">查看物流</a>
        </div>
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
    background-color: #fff;
    border-left: solid 1px rgb(200, 200, 200);
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
