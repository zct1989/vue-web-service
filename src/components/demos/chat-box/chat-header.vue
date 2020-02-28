<template>
    <section
        class="component chat-header padding-x full-absolute flex-row justify-content-between align-items-center"
    >
        <template v-if="!tool">
            <div class="flex-row align-items-center">
                <div class="logo"></div>
                <div class="logo-text margin-left">ChatBox</div>
            </div>
            <div class="flex-row align-items-center">
                <div class="toolbar">
                    <a-icon
                        type="search"
                        :style="iconStyle"
                        @click="tool = 'search'"
                    />
                    <a-icon type="file-search" :style="iconStyle" />

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
                <div class="margin-left">
                    <a-avatar :src="userAvatar" :size="48" />
                </div>
            </div>
        </template>
        <template v-if="tool">
            <div>
                <a-icon
                    type="arrow-left"
                    :style="{ fontSize: '20px', color: '#7f7f7f' }"
                    @click="tool = ''"
                />
            </div>
            <div v-if="(tool = 'search')" class="flex-auto">
                <a-input
                    class="margin-x search-input"
                    placeholder="Search Here"
                ></a-input>
            </div>
        </template>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import faker from 'faker'
const chatModule = namespace('chatModule')
const userModule = namespace('userModule')

@Component({
    components: {}
})
export default class ChatUserInput extends Vue {
    private iconStyle = { fontSize: '16px', color: '#5a5a5a' }
    private userAvatar = faker.image.avatar()
    private tool = ''

    mounted() {}
}
</script>

<style lang="less" scoped>
.chat-header {
    border-bottom: solid 1px rgb(200, 200, 200);
}

.search-input {
    border: transparent;
    margin: 10px;
    width: 90%;
}

.logo {
    margin-left: 10px;
    width: 50px;
    height: 50px;
    background-image: url('~@/assets/images/chat-logo.png');

    background-size: 100% auto;
}

.logo-text {
    font-size: 16px;
    font-weight: bolder;
}

.toolbar {
    i {
        padding: 10px;
        border-radius: 100%;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
            background: #e5e5e5;
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
