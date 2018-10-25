# User management system

front-end :  Vue + Element + Vuex + axios

back-end:  nodejs + Koa + mysql

> This project is implemented in the manner of front and back end separation. The front end USES port 9528 and the back end USES port 3000.  It is important to note that the back-end project is in the koa_servers file. After you install the front-end project, open the koa_servers folder and install the back-end project

### Create database

Login database

```
$ mysql -u root -p
```
Create database
```
$ create database userslistsql;
```
Use the created database
```
$ use userslistsql;
```

> database: userslistsql tables: users   (Tables have been built in lib/mysql)
>
> The foo.sql file under koa_servers/lib/ holds some test data that you can import into your mysql.



Table structure of users

| FIELD       | FIELD TYPE   | COMMENT         |
| ----------- | ------------ | --------------- |
| id          | INT          | AUTO_INCREMENT  |
| group_id    | INT          | Group id        |
| username    | VARCHAR(100) | User name       |
| password    | VARCHAR(100) | Password        |
| mobile      | VARCHAR(20)  | Mobile          |
| email       | VARCHAR(64)  | Email           |
| address     | VARCHAR(100) | Address         |
| age         | INT          | Age             |
| gender      | INT          | Fender          |
| note        | VARCHAR(100) | Note            |
| gen_time    | DATETIME     | Creation time   |
| modify_time | DATETIME     | Modify the time |
| updated_id  | INT          | The modifier    |
| is_del      | INT(11)      | Remove the tag  |



```
$ git clone https://github.com/lizhi9213/user-management.git
```


### Project directory structure

The front desk project

```
├── build                      // webpack config files
├── config                     // main project config
├── src                        // main source code
│   ├── api                    // api service
│   ├── assets                 // module assets like fonts,images (processed by webpack)
│   ├── components             // global components
│   ├── icons                  // svg icons
│   ├── router                 // router
│   ├── store                  // store
│   ├── styles                 // global css
│   ├── utils                  // global utils
│   ├── views                  // views
│   ├── App.vue                // main app component
│   ├── main.js                // app entry file
│   └── permission.js          // permission authentication
├── static                     // pure static assets (directly copied)
├── .babelrc                   // babel config
├── .eslintrc.js               // eslint config
├── .gitignore                 // sensible defaults for gitignore
├── favicon.ico                // favicon ico
├── index.html                 // index.html template
└── package.json               // package.json
```



The back-end directory（./koa_servers）

```
├── config                     // main project config
│   └── default.js             // The configuration file
├── lib                        // Store operational database files
│   ├── mysql.js               // Database operation instructions
│   └── foo.sql                // The users table data
├── middlewares                // Store verification file
│   └── check.js               // check.js 
├── public                     // Storing static resources
│   └── images                 // Store picture resources
├── routers                	   // main source code
│   ├── signin.js              // Process user login
│   └── users.js               // Manage user lists
├── views                	   // Store template files
├── .gitignore                 // sensible defaults for gitignore
├── index.js                   // Entrance to the file
├── package-lock.json          // package-lock.json
└── package.json               // package.json
```



### Initializing project

```
$ npm install
```
```
$ cd koa_servers
```
```
$ npm install
```


### Run the project

> Before starting the project, make sure the database is created and that default.js is configured under /koa_servers/config/. Get that ready and we can start the project right away.



Under /koa_servers

```
$ npm i supervisor -g
```
The supervisor's role is to listen for changes to files, and we don't have to reboot the program when we modify the files

```
$ supervisor --harmony index
```

Reopen a terminal and return to the top directory

```
$ npm run dev
```

Visit http://localhost:9528/#/login in your browser.

> Administrator account: **admin**
>
> Administrator password: **123456**

> We divided the users into four groups, with the first group having the most privileges and the fourth group having the least. 