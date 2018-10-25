const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const md5 = require('md5');

//登录
router.post('/login', async (ctx, next) => {
  console.log(ctx.request.body)
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;

  await userModel.findDataByName(username)
    .then(result => {
      let res = result
      if (res.length !== 0 && username === res[0]['username'] && md5(password) === res[0]['password']) {
        console.log(res[0]['mobile'])
        ctx.body = {
          "code": 20000,
          "data": {
            "token": res[0]['mobile'],
            "uid": res[0]['id']
          }
        };
      } else {
        ctx.body = {
          "code": 50000,
          "message": "User name or password error!"
        };
      }
    }).catch(err => {
      console.log(err)
    })
})

//获取用户信息
router.get('/info', async (ctx, next) => {
  //   console.log(decodeURIComponent(ctx.request.querystring.split('=')))
  let mobile = decodeURIComponent(ctx.request.querystring.split('=')[1])

  await userModel.findDataByMobile(mobile).then(result => {
    let res = result
    let roleArr = [('group' + res[0]['group_id'])]
    if (res.length !== 0 && mobile === res[0]['mobile']) {

      ctx.body = {
        "code": 20000,
        "data": {
          "roles": roleArr,
          "groupid": res[0]['group_id'],
          "name": res[0]['username'],
          "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
        }
      };
    } else {
      ctx.body = {
        "code": 50000,
        "message": "Token failure!"
      };
    }
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router
