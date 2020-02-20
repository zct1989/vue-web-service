<template>
    <section
        class="component calender-detail margin"
        :class="{ comment: edit.comment }"
    >
        <div class="title-wrap">
            <div @click="onTitleFocus" v-if="edit.title === false">
                {{ model.title }}
            </div>
            <a-input
                ref="title"
                v-else
                v-model="model.title"
                @blur="edit.title = false"
            />
        </div>
        <a-row type="flex" justify="center">
            <a-col span="6" class="text-center">
                <a-popover
                    :arrowPointAtCenter="false"
                    placement="bottomLeft"
                    trigger="click"
                    v-model="popover.status"
                >
                    <template v-slot:content>
                        <div
                            class="status-popover flex-row align-items-center"
                            v-for="item of statusList"
                            :key="item.key"
                            @click="onSelectStatus(item.key)"
                        >
                            <a-icon
                                :type="item.icon"
                                :style="{ color: item.color }"
                            />
                            <span class="margin-x">{{ item.title }}</span>
                            <div class="flex-auto text-right">
                                <a-icon
                                    v-if="model.status === item.key"
                                    type="check"
                                />
                            </div>
                        </div>
                    </template>
                    <div class="status-container flex-row">
                        <a-icon
                            :type="status.icon"
                            :style="{ color: status.color }"
                        />
                        <div class="text-left margin-x">
                            <div class="title">{{ status.title }}</div>
                            <div class="tip">当前状态</div>
                        </div>
                    </div>
                </a-popover>
            </a-col>
            <a-col span="6" class="text-center">
                <a-popover
                    :arrowPointAtCenter="false"
                    placement="bottom"
                    trigger="click"
                    v-model="popover.person"
                >
                    <template v-slot:content>
                        <a-tabs defaultActiveKey="1">
                            <a-tab-pane tab="团队" key="1">
                                <a-tree
                                    :treeData="personTeamList"
                                    defaultExpandAll
                                    @select="popover.person = false"
                                >
                                </a-tree>
                            </a-tab-pane>
                            <a-tab-pane tab="部门" key="2" forceRender>
                                <a-tree
                                    :treeData="personGroupList"
                                    defaultExpandAll
                                    @select="popover.person = false"
                                >
                                </a-tree
                            ></a-tab-pane>
                        </a-tabs>
                    </template>
                    <div class="person-container flex-row">
                        <a-avatar :size="45" icon="user" />
                        <div class="text-left margin-x">
                            <div class="title">{{ model.user }}</div>
                            <div>负责人</div>
                        </div>
                    </div>
                </a-popover>
            </a-col>
            <a-col span="6" class="text-center">
                <a-date-picker v-model="model.startTime" :showTime="true">
                    <div class="starttime-container flex-row">
                        <a-avatar :size="45" icon="calendar" />
                        <div class="text-left margin-x">
                            <div class="title">
                                {{
                                    model.startTime
                                        ? model.startTime.format('YYYY-MM-DD')
                                        : '请选择开始时间'
                                }}
                            </div>
                            <div>开始时间</div>
                        </div>
                    </div>
                </a-date-picker>
            </a-col>
            <a-col span="6" class="text-center">
                <a-date-picker v-model="model.endTime" :showTime="true">
                    <div class="endtime-container flex-row">
                        <a-avatar :size="45" icon="calendar" />
                        <div class="text-left margin-x">
                            <div class="title">
                                {{
                                    model.endTime
                                        ? model.endTime.format('YYYY-MM-DD')
                                        : '请选择结束时间'
                                }}
                            </div>
                            <div>结束时间</div>
                        </div>
                    </div>
                </a-date-picker>
            </a-col>
        </a-row>

        <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="任务信息" key="1">
                <a-row class="padding">
                    <a-col span="8">
                        <div>任务类型:</div>
                        <div class="flex-row align-items-center margin-y">
                            <a-icon type="profile" />
                            <div class="margin-x">任务</div>
                        </div>
                    </a-col>
                    <a-col span="8">
                        <div>优先级:</div>
                        <a-select
                            defaultValue="2"
                            style="width: 200px"
                            class="priority-container margin-y"
                        >
                            <a-select-option
                                :value="item.key"
                                v-for="item of priorityList"
                                :key="item.key"
                                >{{ item.title }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col span="8">
                        <div>标签:</div>
                        <a-select
                            class="tag-container margin-y"
                            mode="multiple"
                            :defaultValue="[]"
                            style="width: 100%"
                            placeholder="选择标签"
                        >
                            <a-select-option :key="0">标签一</a-select-option>
                            <a-select-option :key="1">标签二</a-select-option>
                            <a-select-option :key="2">标签三</a-select-option>
                            <a-select-option :key="3">标签四</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col span="24" class="margin-y">
                        <div>参与人:</div>
                        <div class="flex-row align-items-center">
                            <a-avatar :size="30" style="margin-right:10px;"
                                >张三</a-avatar
                            >
                            <a-popover
                                :arrowPointAtCenter="false"
                                placement="right"
                                trigger="click"
                                v-model="popover.members"
                            >
                                <template v-slot:content>
                                    <a-tabs defaultActiveKey="1">
                                        <a-tab-pane tab="团队" key="1">
                                            <a-tree
                                                :treeData="personTeamList"
                                                defaultExpandAll
                                                @select="
                                                    popover.members = false
                                                "
                                            >
                                            </a-tree>
                                        </a-tab-pane>
                                        <a-tab-pane
                                            tab="部门"
                                            key="2"
                                            forceRender
                                        >
                                            <a-tree
                                                :treeData="personGroupList"
                                                defaultExpandAll
                                                @select="
                                                    popover.members = false
                                                "
                                            >
                                            </a-tree
                                        ></a-tab-pane>
                                    </a-tabs>
                                </template>
                                <div
                                    class="members-container flex-row margin-y"
                                >
                                    <a-avatar
                                        :size="30"
                                        icon="plus"
                                        style="cursor:pointer"
                                    />
                                </div>
                            </a-popover>
                        </div>
                    </a-col>
                    <a-col span="24" class="margin-y">
                        <div>描述:</div>
                        <div class="description-container flex-row margin-y">
                            <div
                                v-if="edit.description === false"
                                @click="edit.description = true"
                                class="margin"
                                v-html="model.description"
                            ></div>
                            <quill-editor
                                v-else
                                v-model="model.description"
                                :options="editorOption"
                            >
                            </quill-editor>
                            <div
                                v-if="edit.description === true"
                                class="margin-y"
                            >
                                <a-button
                                    shape="round"
                                    type="primary"
                                    class="margin-right"
                                    @click="edit.description = false"
                                    >保存</a-button
                                >
                                <a-button
                                    shape="round"
                                    @click="edit.description = false"
                                    >取消</a-button
                                >
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-tab-pane>
        </a-tabs>
        <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="评论" key="1">
                <a-list
                    class="comment-list"
                    itemLayout="horizontal"
                    :dataSource="comments"
                >
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-comment :author="item.author" :avatar="item.avatar">
                            <p slot="content">{{ item.content }}</p>
                            <a-tooltip
                                slot="datetime"
                                :title="
                                    item.datetime.format('YYYY-MM-DD HH:mm:ss')
                                "
                            >
                                <span>{{ item.datetime.fromNow() }}</span>
                            </a-tooltip>
                        </a-comment>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
        </a-tabs>
        <div
            class="footer flex-row align-items-center "
            :class="{ edit: edit.comment }"
        >
            <div style="flex-basis:120px;text-align:right;padding-right:20px;">
                <a-avatar :size="35">张三</a-avatar>
            </div>
            <div class="flex-auto" style="padding-right:50px;">
                <a-input
                    v-if="edit.comment === false"
                    @focus="onFocuComment"
                    placeholder="评论内容，文字上限2000(Ctrl+Enter发送)"
                />
                <a-textarea
                    ref="comment"
                    v-model="model.comment"
                    v-else
                    placeholder="评论内容，文字上限2000(Ctrl+Enter发送)"
                    :autosize="{ minRows: 4, maxRows: 6 }"
                />
                <div
                    v-if="edit.comment === true"
                    class="action flex-row justify-content-between"
                >
                    <div></div>
                    <div>
                        <a-button
                            shape="round"
                            size="small"
                            type="primary"
                            class="margin-right"
                            @click="onComment"
                            >发送</a-button
                        >
                        <a-button
                            size="small"
                            shape="round"
                            @click="edit.comment = false"
                            >取消</a-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { quillEditor } from 'vue-quill-editor'
import moment from 'moment'

@Component({
    components: { quillEditor }
})
export default class CalenderDetail extends Vue {
    @Prop()
    public title?: string

    @Prop()
    public id?: string

    private popover = {
        status: false,
        person: false,
        members: false,
        startTime: false,
        endTime: false
    }
    private edit = {
        title: false,
        description: false,
        comment: false
    }

    private model = {
        title: this.title,
        user: '张三',
        status: '0',
        startTime: null,
        endTime: null,
        comment: '',
        description: '这是一个测试的文本'
    }

    private personTeamList = [
        {
            title: '全部联系人 (1人)',
            key: '0-0',
            children: [{ title: '张三', key: '0-0-0' }]
        }
    ]

    private personGroupList = [
        {
            title: '一号部门 (1人)',
            key: '0-0',
            children: [{ title: '张三', key: '0-0-0' }]
        }
    ]

    private get status() {
        return this.statusList.find(x => x.key === this.model.status)
    }

    private statusList = [
        {
            key: '0',
            color: '#52D5BC',
            icon: 'minus-circle',
            title: '未开始'
        },
        {
            key: '1',
            color: '#F8A733',
            icon: 'clock-circle',
            title: '进行中'
        },
        {
            key: '2',
            color: '#F06359',
            icon: 'check-circle',
            title: '已完成'
        }
    ]

    private priorityList = [
        {
            key: '0',
            title: '最低'
        },
        {
            key: '1',
            title: '较低'
        },
        {
            key: '2',
            title: '普通'
        },
        {
            key: '3',
            title: '较高'
        },
        {
            key: '4',
            title: '最高'
        }
    ]

    private onSelectStatus(key) {
        this.model.status = key
        this.popover.status = false
    }

    private content = '<h2>I am Example</h2>'
    private editorOption = {
        placeholder: '请输入描述信息',
        modules: {
            toolbar: [
                [{ size: ['small', false, 'large'] }],
                ['bold', 'italic'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image']
            ]
        }
    }

    private comments = [
        {
            author: '张三',
            avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: '今天下午是否可以完成需要的功能?',
            datetime: moment().subtract(1, 'days')
        },
        {
            author: '李四',
            avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: '测试评论了信息',
            datetime: moment().subtract(2, 'days')
        }
    ]

    private onTitleFocus() {
        this.edit.title = true
        this.$nextTick(() => {
            const titleCompoent = this.$refs['title'] as any
            titleCompoent.focus()
        })
    }

    private onFocuComment() {
        this.edit.comment = true
        this.$nextTick(() => {
            const commentCompoent = this.$refs['comment'] as any
            commentCompoent.focus()
        })
    }

    private onComment() {
        this.edit.comment = false
        const commentCompoent = this.$refs['comment'] as any

        this.comments.unshift({
            author: '张三',
            avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.model.comment,
            datetime: moment()
        })

        this.model.comment = ''
    }
}
</script>

<style lang="less" scoped>
.calender-detail {
    min-width: 800px;
    margin-bottom: 60px !important;

    & > * {
        margin-bottom: 30px;
    }

    &.comment {
        margin-bottom: 100px !important;
    }
}

.status-container,
.person-container,
.starttime-container,
.endtime-container {
    svg {
        width: 40px;
        height: 40px;
    }
    .tip {
        color: #aeaeae;
    }
    .title {
        font-weight: 500;
    }
}

.status-popover {
    padding: 5px 10px;
    font-size: 14px;
    width: 180px;
    cursor: pointer;
    i {
        font-size: 20px;
    }

    &:hover {
        background: #ededed;
    }
}

.priority-container {
    & /deep/ .ant-select-selection.ant-select-selection--single {
        border: none;
    }
}

.quill-editor {
    width: 100%;

    & /deep/ .ql-container {
        height: 200px;
        width: 100%;
    }
}

.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 0;

    &.edit {
        height: 120px;
    }

    .action {
        position: absolute;
        right: 60px;
        bottom: 20px;
    }
}

.comment-list {
    max-height: 300px;
    overflow: auto;
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
