<template>
    <section class="component flex-column chat-user-list full-absolute">
        <div
            class="action-header padding flex-row justify-content-between align-items-center"
        >
            <div style="font-size:16px;color:black;">
                Message
            </div>
            <div class="action">
                <a-icon type="heart" theme="filled" />
                <a-icon type="form" @click="edit = !edit" />
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" href="#">
                        <a-icon type="ellipsis" :style="iconStyle" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a-icon type="inbox" :style="iconStyle" />
                        </a-menu-item>
                        <a-menu-item>
                            <a-icon type="link" :style="iconStyle" />
                        </a-menu-item>
                        <a-menu-item>
                            <a-icon type="share-alt" :style="iconStyle" />
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </div>

        <div class="list-container flex-auto">
            <div
                v-for="user of chatUserList"
                :key="user.id"
                class="list-item flex-row align-items-center"
                :class="{ active: user.id === currentUser }"
            >
                <div v-if="edit">
                    <a-checkbox
                        v-model="user.check"
                        style="width:20px;text-align:left;"
                    >
                    </a-checkbox>
                </div>
                <div class="padding-x" @click="changeUser(user.id)">
                    <a-badge
                        :count="user.unread"
                        :numberStyle="
                            !user.replay
                                ? {
                                      backgroundColor: '#cecece',
                                      color: '#5a5a5a'
                                  }
                                : {}
                        "
                    >
                        <a-avatar :size="48" :src="user.avatar"></a-avatar>
                    </a-badge>
                </div>

                <div class="flex-auto" @click="changeUser(user.id)">
                    <div class="flex-row justify-content-between">
                        <div class="username">
                            {{ user.username }}
                        </div>
                        <div>{{ user.fromNow }}</div>
                    </div>
                    <div style="color:#7f7f7f;font-weight:500;margin-top:3px">
                        The Message Description...
                    </div>
                    <div style="color:#7f7f7f;font-weight:500;margin-top:3px">
                        <span>OrderNo:</span>
                        {{ user.order }}
                    </div>
                    <div style="color:#7f7f7f;font-weight:500;margin-top:3px">
                        <span>DateTime:</span>
                        {{ user.latest | date('yyyy-MM-dd hh:mm:ss') }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import moment from 'moment'
import faker from 'faker'
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

    private edit = false

    private searchText = ''

    private checkList = {}

    private iconStyle = { fontSize: '16px', color: '#5a5a5a' }

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
                x.unread = Math.floor(Math.abs(Math.random() * 5 - 1))
                x.order = Math.floor(Math.random() * 10000) + 10000
                x.replay = !!(Math.random() > 0.5 && x.unread > 0)
                return x
            })
            .sort((x, y) => {
                let xv = (x.replay ? 2 : 0) + (x.unread == 0 ? 0 : 1)
                let yv = (y.replay ? 2 : 0) + (y.unread == 0 ? 0 : 1)
                return yv - xv
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
@primary-color: #ae6eef;

.chat-user-list {
    border-right: solid 1px rgb(200, 200, 200);
}
.list-container {
    background-color: #fff;
    overflow: auto;
}

.action-header {
    .action {
        i {
            margin-left: 15px;
            font-size: 16px;
            cursor: pointer;
            &:hover {
                color: @primary-color;
            }
        }
    }
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
    height: 100px;
    padding: 10px;
    border-bottom: solid 3px transparent;
    padding-right: 15px;
    .username {
        font-weight: bold;
        color: black;
    }
    &.active {
        border-bottom: solid 3px @primary-color;
        color: @primary-color;
        .username {
            color: @primary-color;
        }
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
