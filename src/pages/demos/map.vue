<template>
    <page-container>
        <a-card>
            <GmapMap
                :center="{ lat: 10, lng: 10 }"
                :zoom="7"
                map-type-id="terrain"
                style="height:600px;"
            >
            </GmapMap>
        </a-card>
    </page-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Page } from '@/core/decorators'

@Page({
    layout: 'workspace',
    name: 'map'
})
@Component({
    components: {}
})
export default class Map extends Vue {}
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
