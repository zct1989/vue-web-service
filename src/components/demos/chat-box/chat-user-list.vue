<template>
    <section class="component flex-column chat-user-list full-absolute">
        <div class="search-box padding">
            <a-input
                allowClear
                placeholder="用户搜索"
                v-model="searchText"
            ></a-input>
        </div>
        <div class="list-container flex-auto">
            <div
                v-for="user of chatUserList"
                :key="user.id"
                @click="changeUser(user.id)"
                class="list-item flex-row justify-content-between align-items-center"
                :class="{ active: user.id === currentUser }"
            >
                <span> {{ user.username }}</span>
                <span>{{ user.fromNow }}</span>
            </div>
        </div>
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
export default class ChatUserList extends Vue {
    @chatModule.State
    private userList

    @chatModule.State
    private currentUser

    @chatModule.Mutation('changeChatUser')
    private changeUser

    private searchText = ''

    private get chatUserList() {
        return this.userList
            .filter(
                x =>
                    this.searchText === '' ||
                    x.username
                        .toLowerCase()
                        .includes(this.searchText.toLowerCase())
            )
            .map(x => {
                x.fromNow = moment(x.latest).fromNow()
                return x
            })
    }
}
</script>

<style lang="less" scoped>
.list-container {
    background-color: #cdcdcd;
    overflow: auto;
}

.list-item {
    height: 80px;
    padding: 10px;
    border-bottom: solid 1px #afafaf;
    cursor: pointer;
    &:hover {
        background-color: lightblue;
    }

    &.active {
        background-color: burlywood;
    }
}
</style>

<style lang="less" scoped></style>

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
