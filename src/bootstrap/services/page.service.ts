import { ExtendService, RequestParams } from '~/core/http'
import { AutoWired } from 'typescript-ioc'

@AutoWired
export class PageService extends ExtendService {
    public default = {
        pageSize: 10,
        pageIndex: 1,
        total: 0,
        pageSizeOpts: [20, 50, 100, 200]
    }
    public pageSize: number
    public pageIndex: number
    public total: number
    public pageSizeOpts: number[]

    constructor(data?: any) {
        super()

        if (data) this.default = { ...this.default, ...data }

        this.pageSize = this.default.pageSize
        this.pageIndex = this.default.pageIndex || 1
        this.total = this.default.total
        this.pageSizeOpts = this.default.pageSizeOpts
    }

    public before = params => {
        params.data = {
            ...params.data,
            page_size: this.pageSize,
            page_index: this.pageIndex
        }
    }

    public after = (response: any, params) => {
        const result = response.data.result
        this.total = result.length
    }

    public reset() {
        this.pageIndex = this.default.pageIndex
        this.pageSize = this.default.pageSize
    }
}
