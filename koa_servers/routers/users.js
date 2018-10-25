const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const md5 = require('md5');
const moment = require('moment');

// New users
router.post('/adduser', async (ctx, next) => {
  //   console.log(ctx.request.body)
  let user = {
    username: ctx.request.body.username,
    password: ctx.request.body.password,
    againpass: ctx.request.body.againpass,
    mobile: ctx.request.body.mobile,
    email: ctx.request.body.email,
    gender: ctx.request.body.gender,
    group_id: ctx.request.body.group_id,
    address: ctx.request.body.address,
    age: ctx.request.body.age,
    note: ctx.request.body.note,
  }
  await userModel.findDataByName(user.username).then(async (result) => {
    // console.log(result)
    if (result.length) {
      try {
        throw Error('Users already exist')
      } catch (error) {
        //Processing err
        console.log(error)
      }
      // Users already exist
      ctx.body = {
        "code": 20000,
        "data": {
          "ok": false,
          "msg": 'User already exists!'
        }
      };
    } else if (user.password !== user.againpass || user.group_id === '' || user.username === '' || user.password === '' || user.mobile === '') {
      //   console.log(user)
      ctx.body = {
        "code": 20000,
        "data": {
          "ok": false,
          "msg": 'Form information error!'
        }
      };
    } else {
      await userModel.insertData([user.group_id, user.username, md5(user.password), user.mobile, user.email, user.gender, user.address, user.age, user.note, moment().format('YYYY-MM-DD HH:mm:ss')])
        .then(res => {
          //   console.log('New success', res)
          ctx.body = {
            "code": 20000,
            "data": {
              "ok": true,
              "msg": 'Save success!'
            }
          };
        })
    }
  })
})

// Get the user list
router.get('/getuserlist', async (ctx, next) => {
  //   console.log(ctx.query)
  const token = ctx.request.header['x-token'];
  const findData = ctx.query;
  let groupId = ''
  let sum = 11
  await userModel.findDataByMobile(token).then(result => {
    //
    groupId = result[0]['group_id']
  })

  await userModel.searchTotal({
    keyword: findData.keyword,
    page: findData.page,
    size: findData.size,
    gid: findData.group,
    group_id: groupId,
  }).then(totals => {
    let totalData = JSON.stringify(totals)
    totalData = JSON.parse(totalData)
    console.log(totalData)
    sum = totalData[0]['count(*)']
  })

  await userModel.findUsers({
    keyword: findData.keyword,
    page: findData.page,
    size: findData.size,
    gid: findData.group,
    group_id: groupId,
  }).then(resp => {
    // console.log(resp)
    ctx.body = {
      "code": 20000,
      "data": {
        "data": resp,
        "total": sum
      }
    };
  })
})

// Delete user
router.get('/deluser', async (ctx, next) => {
  //   console.log(ctx.query)
  await userModel.delUsers([1, ctx.query.id]).then(result => {
    let delData = JSON.stringify(result)
    delData = JSON.parse(delData)
    if (delData.changedRows === 1) {
      ctx.body = {
        "code": 20000,
        "data": {
          "ok": true,
          "msg": 'Delete the success!'
        }
      };
    } else {
      ctx.body = {
        "code": 20000,
        "data": {
          "ok": false,
          "msg": 'Delete failed!'
        }
      };
    }

  })

})

// Update user
router.post('/updateuser', async (ctx, next) => {
  //   console.log(ctx.request.body)
  let user = {
    username: ctx.request.body.username,
    password: ctx.request.body.password,
    againpass: ctx.request.body.againpass,
    mobile: ctx.request.body.mobile,
    email: ctx.request.body.email,
    gender: ctx.request.body.gender,
    group_id: ctx.request.body.group_id,
    address: ctx.request.body.address,
    age: ctx.request.body.age,
    note: ctx.request.body.note,
    id: ctx.request.body.id
  }

  await userModel.updateUsers([user.group_id, user.username, md5(user.password), user.mobile, user.email, user.gender, user.address, user.age, user.note, moment().format('YYYY-MM-DD HH:mm:ss'), user.id, user.id])
    .then(res => {
      ctx.body = {
        "code": 20000,
        "data": {
          "ok": true,
          "msg": 'Update success!'
        }
      };
    })
})

module.exports = router
