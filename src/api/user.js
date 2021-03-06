import request from '@/utils/request'
import Qs from 'qs'
//登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}
//注册
export function register(data) {
  return request({
    url: '/base/user/save',
    method: 'post',
    data
  })
}
//用户登录记录
export function getloginLog(data) {
  return request({
    url: '/loginlog/list',
    method: 'post',
    data
  })
}
//获取用户
export function getUsers(data) {
  return request({
    url: '/base/user/list',
    method: 'post',
    data
  })
}
//删除用户
export function delUser(id) {
  return request({
    url: `/base/user/${id}`,
    method: 'delete',
  })
}
//用户信息
export function getInfo() {
  return request({
    url: `/base/user/getCurrentUser`,
    method: 'get',
  })
}
//用户信息
export function getRoles() {
  return request({
    url: `/role/getRole`,
    method: 'get',
  })
}
//修改密码
export function changePassword(data) {
  return request({
    url: '/base/user/password',
    method: 'put',
    data
  })
}
//退出
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
