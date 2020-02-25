<template>
    <section class="component flex-column chat-user-list full-absolute">
        <div
            class="search-header padding flex-row justify-content-between align-items-center"
        >
            <a-checkbox @change="onAllCheck"></a-checkbox>
            <a-select defaultValue="Options" style="width: 120px">
                <a-select-option value="option1">option1</a-select-option>
                <a-select-option value="option2">option2</a-select-option>
                <a-select-option value="option3">option3</a-select-option>
            </a-select>
            <a-button @click="$message.info('target action')">Action</a-button>
        </div>
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
                class="list-item"
                :class="{ active: user.id === currentUser }"
            >
                <div class="flex-row" style="width:100%;margin-bottom:2px;">
                    <a-checkbox
                        v-model="user.check"
                        style="width:20px;text-align:left;"
                    >
                    </a-checkbox>
                    <div
                        class="flex-auto padding-x"
                        style="font-weight:bolder;color:black"
                    >
                        {{ user.username }}
                    </div>
                    <div>
                        <a-icon class="margin-left item-action" type="delete" />
                        <a-icon class="margin-left item-action" type="flag" />
                    </div>
                </div>
                <div
                    class="flex-row align-items-center"
                    style="margin-bottom:5px"
                >
                    <a-icon
                        type="mail"
                        style="width:20px;text-align:left;font-size:15px;"
                    />
                    <div style="margin-left:10px;font-weight:bolder">
                        Message Title
                    </div>
                </div>
                <div style="margin-left:30px;">
                    The Message Description...
                </div>
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

    private checkList = {}

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
                x.check = false
                return x
            })
    }

    private onAllCheck({ target }) {
        const { checked } = target
        this.chatUserList.forEach(element => {
            element.check = checked
        })
    }
}
</script>

<style lang="less" scoped>
.search-header {
    background-color: #2f5564;
}

.list-container {
    background-color: #f5f5f5;
    overflow: auto;
}

.item-action {
    cursor: pointer;
    font-size: 14px;
    &:hover {
        color: black;
        font-weight: bold;
    }
}

.list-item {
    height: 80px;
    padding: 10px;
    border-bottom: solid 1px #afafaf;
    &:hover {
        background-color: lightblue;
    }

    &.active {
        background-color: burlywood;
    }
}
</style>

<style lang="less" scoped>
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
