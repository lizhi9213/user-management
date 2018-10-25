import request from '@/utils/request'

export function addUsers(result) {
  return request({
    url: 'http://localhost:3000/adduser',
    method: 'post',
    data: {
      username: result.username,
      password: result.password === '' ? '123456' : result.password,
      againpass: result.again === '' ? '123456' : result.again,
      mobile: result.phone,
      email: result.email,
      gender: result.gender,
      group_id: result.usergroup,
      address: result.address,
      age: result.age,
      note: result.note
    }
  })
}

export function getUsersList(data) {
  return request({
    url: 'http://localhost:3000/getuserlist',
    method: 'get',
    params: {
      keyword: data.keyword,
      group: data.group,
      page: data.page,
      size: data.size
    }
  })
}

export function deleteUser(data) {
  return request({
    url: 'http://localhost:3000/deluser',
    method: 'get',
    params: {
      id: data
    }
  })
}

export function updateUser(result) {
  console.log(result)
  return request({
    url: 'http://localhost:3000/updateuser',
    method: 'post',
    data: {
      username: result.username,
      password: result.password === '' ? '123456' : result.password,
      againpass: result.again === '' ? '123456' : result.again,
      mobile: result.phone,
      email: result.email,
      gender: result.gender,
      group_id: result.usergroup,
      address: result.address,
      age: result.age,
      note: result.note,
      id: result.id
    }
  })
}
