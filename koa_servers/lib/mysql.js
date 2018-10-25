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
    id INT NOT NULL AUTO_INCREMENT COMMENT 'On the primary key',
    group_id INT NOT NULL COMMENT 'Group id',
    username VARCHAR(100) NOT NULL COMMENT 'The user name',
    password VARCHAR(100) NOT NULL COMMENT 'The user password',
    mobile VARCHAR(20) NOT NULL COMMENT 'User Tel',
    email VARCHAR(64) COMMENT 'email',
    gender INT COMMENT 'gender',
    address VARCHAR(100) COMMENT 'address',
    age INT COMMENT 'age',
    note VARCHAR(100) COMMENT 'note',
    gen_time DATETIME NULL DEFAULT NULL COMMENT 'Creation time',
    modify_time DATETIME NULL DEFAULT NULL COMMENT 'Modify the time',
    last_login_time DATETIME NULL DEFAULT NULL COMMENT 'Last login time',
    updated_id INT NULL DEFAULT NULL COMMENT 'Modify the id',
    is_del INT(11) DEFAULT NULL COMMENT 'Whether or not to delete',
    PRIMARY KEY ( id )
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'The users table';`

let createTable = function (sql) {
  return query(sql, [])
}

// Build table
createTable(users)

// Registered users
let insertData = function (value) {
  let _sql = "insert into users set group_id=?,username=?,password=?,mobile=?,email=?,gender=?,address=?,age=?,note=?,gen_time=?;"
  return query(_sql, value)
}

// Find the user by name
let findDataByName = function (name) {
  let _sql = `select * from users where username="${name}";`
  return query(_sql)
}

// Find the user by phone number
let findDataByMobile = function (mobile) {
  let _sql = `select * from users where mobile="${mobile}";`
  return query(_sql)
}

// Total query number
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

// Query for qualified users, descending sort
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

// Delete the user, marked as delete status
let delUsers = function (value) {
  let _sql = `update users set is_del= ? where id = ?;`
  return query(_sql, value)
}

// Update user
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
