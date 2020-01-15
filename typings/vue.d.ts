import Vue from 'vue'
import { ModalService } from '@/shared/utils/modal.service';

// 扩展vue接口
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $app: any
    $dict: any
    $layout: string
    $filter: any
    $logger: any
    $common: any
    $modal: ModalService
    $window: any
  }
}
