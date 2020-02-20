<template>
    <page-container>
        <a-card>
            <FullCalendar
                defaultView="dayGridMonth"
                :plugins="calendarPlugins"
                :events="events"
                :weekends="false"
                :locale="$app.state.locale"
                :buttonText="buttonText"
                @eventClick="onEventClick"
            />
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Page } from '@/core/decorators'
import CalenderDetail from '@/components/demos/calender-detail.vue'

@Page({
    layout: 'workspace',
    name: 'calender'
})
@Component({
    components: {
        FullCalendar
    }
})
export default class Calender extends Vue {
    private readonly calendarPlugins = [dayGridPlugin]

    private events = [
        { id: '1', title: '今天有点事情做', date: '2019-12-30' },
        { id: '2', title: '这天好像也有点', date: '2019-12-31' },
        { id: '3', title: '中午需要点外卖', date: '2020-01-02' },
        { id: '4', title: '下午有空开个会', date: '2020-01-02' }
    ]

    private get buttonText() {
        return {
            today: this.$t('today'),
            month: 'month',
            week: 'week',
            day: 'day',
            list: 'list'
        }
    }

    private onEventClick({ event }) {
        this.$modal.open(
            CalenderDetail,
            {
                id: event.id,
                title: event.title
            },
            {
                title: '#' + event.id,
                width: 980
            }
        )
    }
}
</script>

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
