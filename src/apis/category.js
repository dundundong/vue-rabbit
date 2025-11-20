import request from '@/utils/http'

export function getCategoryApI(id) {
  return request({
    url: '/category',
    params:{
        id
    }
  })
}