import request from '@/utils/request'
import Qs from 'qs'
export function changeRate(data) {
    return request({
        url: '/proxyCA/renewalRate',
        method: 'post',
        data: Qs.stringify(data)
    })
}
export function getAllchannel(data) {
    return request({
        url: '/proxyCA/pageList',
        method: 'post',
        data
    })
}

export function delChannel(id) {
    return request({
        url: `/proxyCA/${id}`,
        method: 'delete',
    })
}
export function addChannel(data) {
    return request({
        url: '/proxyCA/channelAuthorization',
        method: 'post',
        data
    })
}

