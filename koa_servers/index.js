const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const ejs = require('ejs');
const cors = require('koa2-cors');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const router = require('koa-router')
const views = require('koa-views')
// const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const app = new Koa()

app.use(cors())

// Session storage configuration
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// Configure session middleware
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))


// Configure static resource loading middleware
// app.use(koaStatic(
//   path.join(__dirname , './public')
// ))

// The cache
app.use(staticCache(path.join(__dirname, './public'), {
  dynamic: true
}, {
  maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), {
  dynamic: true
}, {
  maxAge: 365 * 24 * 60 * 60
}))

// Configure server-side template rendering engine middleware
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(bodyParser({
  formLimit: '1mb'
}))

//  router
app.use(require('./routers/signin.js').routes())
app.use(require('./routers/users.js').routes())


app.listen(3000)

console.log(`listening on port ${config.port}`)
