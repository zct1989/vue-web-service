<template>
    <section class="component order-base-detail">
        <FullCalendar
            defaultView="dayGridMonth"
            :plugins="calendarPlugins"
            :events="events"
            :weekends="false"
            :locale="$app.state.locale"
            :buttonText="buttonText"
        />
    </section>
</template>

<style lang="less" scoped>
.order-base-detail /deep/ .fc-scroller {
    height: 100% !important;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

@Component({
    components: {
        FullCalendar
    }
})
export default class WorkCalender extends Vue {
    private readonly calendarPlugins = [dayGridPlugin]

    private events = [
        { title: '今天有点事情做', date: '2019-12-30' },
        { title: '这天好像也有点', date: '2019-12-31' },
        { title: '中午需要点外卖', date: '2020-01-02' },
        { title: '下午有空开个会', date: '2020-01-02' }
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
