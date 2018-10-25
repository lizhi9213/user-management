<template>
    <div class="app-container">
        <el-card class="list-card">
            <!-- <div slot="header" class="clearfix">
                <span>List of users</span>
            </div> -->
            <el-row>
                <!-- Top operating module -->
                <el-col :span="12" class="filter-box">
                    <el-select v-model="group" clearable placeholder="please select" class="group-select">
                        <el-option label="The first group" :value="1"></el-option>
                        <el-option label="The second group" :value="2"></el-option>
                        <el-option label="The third group" :value="3"></el-option>
                        <el-option label="The fourth group" :value="4"></el-option>
                    </el-select>
                    <el-input placeholder="Please enter keywords" v-model="keyword" class="key-word-input">
                    </el-input>
                    <el-button type="primary" class="serch-btn" icon="el-icon-search" @click="userListinit">Search</el-button>
                </el-col>
                <el-col :span="12" class="btn-group" v-if="groupid < 4">
                    <el-button type="success" icon="el-icon-plus" @click="newUser">new</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteUsers">delete</el-button>
                </el-col>
                <!-- User list module -->
                <el-col :span="24" class="table-list">
                    <el-table border :data="tableData" style="width: 100%" :height="tableHeight" @selection-change="selectChange">
                        <el-table-column align="center" type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="name" label="name" width="180">
                            <template slot-scope="scope">
                                <u title="Check the details" class="user-name" @click="handleDetail(scope.row)">{{scope.row.username}}</u>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="phone" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="address">
                        </el-table-column>
                        <el-table-column prop="group_id" label="group" width="180">
                            <template slot-scope="scope">
                                <span v-text="userGruop(scope.row.group_id)"></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gen_time" label="date created" width="180">
                        </el-table-column>
                        <el-table-column fixed="right" align="center" label="操作" width="100">
                            <template slot-scope="scope">
                                <i class="el-icon-edit-outline edit-icon" @click="handleClick(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <!-- Bottom paging module -->
                <el-col :span="24" class="pagination">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentSize" layout="total, sizes, prev, pager, next, jumper" :total="currentTotal">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog :title="dialogTitle" top="4vh" :visible.sync="dialogFormVisible" @close="formClose">
            <el-form ref="userForm" :model="userForm" :rules="userRules" class="user-form">
                <el-form-item label="username" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="userForm.username" placeholder="The length is 2 to 6 characters"></el-input>
                </el-form-item>
                <el-form-item label="phone" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="userForm.phone" placeholder="Your phone number is your login"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="userForm.password" placeholder="The default unfilled password is 123456"></el-input>
                </el-form-item>
                <el-form-item label="again" prop="again" :label-width="formLabelWidth">
                    <el-input v-model="userForm.again" placeholder="Enter password again"></el-input>
                </el-form-item>
                <el-form-item label="gender" prop="gender" :label-width="formLabelWidth">
                    <el-radio-group v-model="userForm.gender">
                        <el-radio :label="1">male</el-radio>
                        <el-radio :label="0">female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="age" prop="age" :label-width="formLabelWidth">
                    <el-input v-model="userForm.age" placeholder="Please fill in age"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="userForm.email" placeholder="Please fill in the email"></el-input>
                </el-form-item>
                <el-form-item label="address" prop="address" :label-width="formLabelWidth">
                    <el-input v-model="userForm.address" placeholder="Please fill in your home address"></el-input>
                </el-form-item>
                <el-form-item label="group" prop="usergroup" :label-width="formLabelWidth">
                    <el-select v-model="userForm.usergroup" placeholder="Please select a set of" style="width: 100%;">
                        <el-option label="The first group" :value="1"></el-option>
                        <el-option label="The second group" :value="2"></el-option>
                        <el-option label="The third group" :value="3"></el-option>
                        <el-option label="The fourth group" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="note" prop="note" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="userForm.note" placeholder="Please fill in notes"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">cancel</el-button>
                <el-button type="primary" @click="submintFrom">confirm</el-button>
            </div>
        </el-dialog>
        <el-dialog title="The user details" top="4vh" :visible.sync="dialogDetailVisible">
            <ul class="detail-box">
                <li class="detail-item">
                    <span class="label">Name:</span>
                    <span class="content">{{detailData.username}}</span>
                </li>
                <li class="detail-item">
                    <span class="label">Mobile:</span>
                    <span class="content">{{detailData.mobile}}</span>
                </li>
                <li class="detail-item">
                    <span class="label">Mobile:</span>
                    <span class="content">{{detailData.mobile}}</span>
                </li>
                <li class="detail-item">
                    <span class="label">Gender:</span>
                    <span class="content">{{detailData.gender === 1 ? 'male': 'female'}}</span>
                </li>
                <li class="detail-item">
                    <span class="label">Age:</span>
                    <span class="content">{{detailData.age}}</span>
                </li>
                <li class="detail-item">
                    <span class="label">Email:</span>
                    <span class="content">{{detailData.email}}</span>
                </li>
                <li class="detail-item">
                    <span class="label">Group:</span>
                    <span class="content" v-text="userGruop(detailData.group_id)"></span>
                </li>
                <li class="detail-item">
                    <span class="label">Address:</span>
                    <span class="content">{{detailData.address}}</span>
                </li>
                <li class="detail-item">
                    <span class="label">Note:</span>
                    <span class="content">{{detailData.note}}</span>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addUsers, getUsersList, deleteUser, updateUser } from '@/api/userslist'
export default {
  name: 'List',
  computed: {
    ...mapGetters(['name', 'groupid'])
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      if (value !== '') {
        const isPhone = /^1[34578]\d{9}$/.test(value)
        if (!isPhone) {
          return callback(
            new Error('The format of mobile phone number is wrong!')
          )
        } else {
          callback()
        }
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (value !== '') {
        const isEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
        if (!isEmail) {
          return callback(new Error('Incorrect email format!'))
        } else {
          callback()
        }
      }
    }

    const checkGroup = (rule, value, callback) => {
      if (value !== '' && this.groupid > value) {
        return callback(new Error('Cannot select parent group!'))
      } else {
        callback()
      }
      // groupid
    }
    return {
      tableHeight: 500, // Table table height changes with the browser
      keyword: '', // The keyword
      group: '', // User group queries
      tableData: [], // User list data
      currentTotal: 0, // Current total
      currentPage: 1, // Current page number
      currentSize: 10, // Current page size
      dialogTitle: 'add new users',
      dialogFormVisible: false, // Pop-up layer control switch
      dialogDetailVisible: false, // Display user details
      detailData: {}, // Details of the data
      selectArr: [], // Check the user
      editId: '', // The user ID being edited
      userForm: {
        username: '',
        again: '',
        password: '',
        gender: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        usergroup: '',
        note: ''
      }, // User information form
      userRules: {
        username: [
          {
            required: true,
            message: 'Please enter a user name',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 8,
            message: 'The length is 2 to 8 characters',
            trigger: 'blur'
          }
        ],
        age: [
          {
            required: true,
            message: 'Please choose your age',
            trigger: 'change'
          }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        phone: [
          {
            required: true,
            message: 'Please fill in the contact number',
            trigger: 'blur'
          },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        usergroup: [
          { required: true, message: 'Please select group', trigger: 'change' },
          { validator: checkGroup, trigger: 'change' }
        ]
      }, // User form validation rules
      formLabelWidth: '120px' // The label width
    }
  },
  methods: {
    userListinit() {
      getUsersList({
        keyword: this.keyword,
        group: this.group,
        page: this.currentPage,
        size: this.currentSize
      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data
        this.currentTotal = res.data.total
      })
    },
    newUser(type) {
      // Clear form data and validation information
      this.editId = ''
      this.dialogTitle = 'add new users'
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      // How many per page
      console.log(`每页 ${val} 条`)
      this.currentSize = val
      this.userListinit()
    },
    handleCurrentChange(val) {
      // The current page number
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.userListinit()
    },
    handleClick(row) {
      // View user details
      //   console.log(row)
      this.dialogTitle = 'Edit the user'
      this.editId = row.id
      this.userForm = {
        username: row.username,
        again: '',
        password: '',
        gender: row.gender,
        age: row.age,
        phone: row.mobile,
        email: row.email,
        address: row.address,
        usergroup: row.group_id,
        note: row.note
      }
      this.dialogFormVisible = true
    },
    formClose() {
      this.$refs.userForm.resetFields()
      this.userForm = {
        username: '',
        again: '',
        password: '',
        gender: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        usergroup: '',
        note: ''
      }
    },
    userGruop(id) {
      switch (id) {
        case 1:
          return 'The first group'
          break
        case 2:
          return 'The second group'
          break
        case 3:
          return 'The third group'
          break
        default:
          return 'The fourth group'
      }
    },
    handleDetail(row) {
      this.detailData = row
      this.dialogDetailVisible = true
    },
    selectChange(rows) {
      //   console.log(rows)
      this.selectArr = rows
    },
    deleteUsers() {
      const _this = this
      if (this.selectArr.length !== 1) {
        this.$message({
          message: 'Please select at least one',
          type: 'warning'
        })
        return
      }
      this.$confirm(
        'This action will delete these users. Do you want to continue?',
        'prompt',
        {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }
      )
        .then(() => {
          deleteUser(_this.selectArr[0].id).then(res => {
            if (res.data.ok) {
              _this.$message({
                type: 'success',
                message: res.data.msg
              })
              _this.userListinit()
            } else {
              _this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        })
        .catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: 'cancell'
          //   })
          //   console.log('cancell')
        })
    },
    submintFrom() {
      const _this = this
      // Submit user form
      this.$refs.userForm.validate(valid => {
        if (valid) {
          console.log(this.userForm)
          if (this.editId === '') {
            addUsers(this.userForm).then(res => {
              console.log(res.data)
              if (res.data.ok) {
                _this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                _this.dialogFormVisible = false
                _this.$refs.userForm.resetFields()
                _this.userListinit()
              } else {
                _this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
                //   _this.dialogFormVisible = false
                //   _this.$refs.userForm.resetFields()
              }
            })
          } else {
            const updateData = _this.userForm
            updateData.id = _this.editId
            updateUser(updateData).then(res => {
              //   console.log(res.data)
              if (res.data.ok) {
                _this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                _this.dialogFormVisible = false
                _this.$refs.userForm.resetFields()
                _this.userListinit()
              } else {
                _this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
                //   _this.dialogFormVisible = false
                //   _this.$refs.userForm.resetFields()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    const _this = this
    this.tableHeight = window.innerHeight - 230
    // The browser window has changed
    window.onresize = function() {
      _this.tableHeight = window.innerHeight - 230
    }
    // Get the user list
    this.userListinit()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.list-card {
  .filter-box {
    display: flex;
    .key-word-input,
    .group-select {
      width: 200px;
      margin-right: 14px;
    }
  }
  .btn-group {
    text-align: right;
  }
  .table-list {
    margin-top: 16px;
    margin-bottom: 20px;
    .user-name {
      color: #409eff;
      cursor: pointer;
    }
    .edit-icon {
      cursor: pointer;
      font-size: 24px;
    }
  }
  .pagination {
    text-align: right;
  }
}
.user-form {
  // height: ;
}
.detail-box {
  list-style: none;
  .detail-item {
    display: flex;
    line-height: 38px;
    .label {
      width: 20%;
      text-align: right;
    }
    .content {
      padding-left: 14px;
      flex: 1;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.list-card {
}
</style>

