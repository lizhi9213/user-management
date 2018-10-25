import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'http://localhost:3000/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  //   console.log(token)
  return request({
    url: 'http://localhost:3000/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
