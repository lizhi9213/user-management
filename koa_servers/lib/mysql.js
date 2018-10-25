var mysql = require('mysql');
var config = require('../config/default.js');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve((rows))
          }
          connection.release()
        })
      }
    })
  })
}

let users = `
create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT COMMENT '自增主键',
    group_id INT NOT NULL COMMENT '组id',
    username VARCHAR(100) NOT NULL COMMENT '用户姓名',
    password VARCHAR(100) NOT NULL COMMENT '用户密码',
    mobile VARCHAR(20) NOT NULL COMMENT '用户电话',
    email VARCHAR(64) COMMENT '邮箱',
    gender INT COMMENT '性别',
    address VARCHAR(100) COMMENT '地址',
    age INT COMMENT '年龄',
    note VARCHAR(100) COMMENT '备注',
    gen_time DATETIME NULL DEFAULT NULL COMMENT '创建时间',
    modify_time DATETIME NULL DEFAULT NULL COMMENT '修改时间',
    last_login_time DATETIME NULL DEFAULT NULL COMMENT '上次登录时间',
    updated_id INT NULL DEFAULT NULL COMMENT '修改id',
    is_del INT(11) DEFAULT NULL COMMENT '是否删除',
    PRIMARY KEY ( id )
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '用户表';`

let createTable = function (sql) {
  return query(sql, [])
}

// 建表
createTable(users)

// 注册用户
let insertData = function (value) {
  let _sql = "insert into users set group_id=?,username=?,password=?,mobile=?,email=?,gender=?,address=?,age=?,note=?,gen_time=?;"
  return query(_sql, value)
}

// 通过名字查找用户
let findDataByName = function (name) {
  let _sql = `select * from users where username="${name}";`
  return query(_sql)
}

// 通过手机号查找用户
let findDataByMobile = function (mobile) {
  let _sql = `select * from users where mobile="${mobile}";`
  return query(_sql)
}

// 查询总条数
let searchTotal = function (data) {
  let _sql = ''
  if (data.keyword !== '' && data.gid !== '') {
    _sql = ` select count(*) from users where is_del is null and group_id >= ${data.group_id} and group_id = ${data.gid} and username like "${data.keyword}" or mobile like "${data.keyword}";`
  } else if (data.keyword === '' && data.gid !== '') {
    _sql = ` select count(*) from users where is_del is null and group_id >= ${data.group_id} and group_id = ${data.gid};`
  } else if (data.keyword !== '' && data.gid === '') {
    _sql = ` select count(*) from users where is_del is null and group_id >= ${data.group_id} and username like "${data.keyword}" or mobile like "${data.keyword}";`
  } else {
    _sql = ` select count(*) from users where is_del is null and group_id >= ${data.group_id};`
  }

  return query(_sql)
}

// 查询所有用户
let findUsers = function (data) {
  let _sql = ''
  if (data.keyword !== '' && data.gid !== '') {
    _sql = ` select * from users where is_del is null and group_id >= ${data.group_id} and group_id = ${data.gid} and  order by id desc limit ${(data.page-1)*data.size},${data.size};`
  } else if (data.keyword === '' && data.gid !== '') {
    _sql = ` select * from users where is_del is null and group_id >= ${data.group_id} and group_id = ${data.gid}  order by id desc limit ${(data.page-1)*data.size},${data.size};`
  } else if (data.keyword !== '' && data.gid === '') {
    _sql = ` select * from users where is_del is null and group_id >= ${data.group_id} and username like "${data.keyword}" or mobile like "${data.keyword}"  order by id desc limit ${(data.page-1)*data.size},${data.size};`
  } else {
    _sql = ` select * from users where is_del is null and group_id >= ${data.group_id} order by id desc limit ${(data.page-1)*data.size},${data.size};`
  }
  return query(_sql)
}

// 删除用户
let delUsers = function (value) {
  let _sql = `update users set is_del= ? where id = ?;`
  return query(_sql, value)
}

// 更新用户
let updateUsers = function (value) {
  let _sql = "update users set group_id=?,username=?,password=?,mobile=?,email=?,gender=?,address=?,age=?,note=?,modify_time=?,updated_id=? where id=?;"
  return query(_sql, value)
}

module.exports = {
  query,
  createTable,
  insertData,
  findDataByName,
  findDataByMobile,
  searchTotal,
  findUsers,
  delUsers,
  updateUsers
}
