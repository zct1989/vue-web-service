import { MockService } from '../mock.decorators'
import { OrderController } from '~/config/services/order.controller'
import orderDetail from '../data/order/order-detail.json'

export class OrderMockService {
    @MockService({
        service: OrderController.getOrderList,
        key: 'list'
    })
    public static getOrderList() {
        return {
            'list|10-20': [
                {
                    'id|+1': 1,
                    name: '@NAME',
                    'age|20-50': 20,
                    address: '@CITY(true)',
                    tags: () => {
                        const array = [
                            'cool',
                            'teacher',
                            'nice',
                            'developer',
                            'boss'
                        ]
                        return array
                            .sort((x, y) => 0.5 - Math.random())
                            .slice(0, Math.floor(Math.random() * 3) + 1)
                    }
                }
            ]
        }
    }

    @MockService({
        service: OrderController.getOrderDetail
    })
    public static getOrderUserList() {
        return orderDetail
    }
}
