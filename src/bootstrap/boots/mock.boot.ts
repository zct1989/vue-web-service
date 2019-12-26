import Mock from 'mockjs'
import * as mockServices from '../../mock'

export default function() {
  Mock.setup({
    timeout: '200-600'
  })
  Object.values(mockServices).forEach(item => {
    const services = item['services']

    if (services) {
      services.forEach(service => {
        service()
      })
    }
  })
}
