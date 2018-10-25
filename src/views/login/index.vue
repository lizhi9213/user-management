<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-logo-box"><img src="../../assets/images/logo.png" alt=""></div>
        <div class="login-left-img"><img src="../../assets/images/login_left.png" alt=""></div>
        <div class="login-con">
            <div class="login-mascot">
                <img v-show="showImg == 1" src="../../assets/images/login-normal.png" alt="亲，欢迎您登陆">
                <img v-show="showImg == 2" src="../../assets/images/login-uname.png" alt="亲，请输入用户名">
                <img v-show="showImg == 3" src="../../assets/images/login-pword.png" alt="亲，请输入密码">
            </div>
            <el-card :bordered="false" class="login-body">
                <p slot="title" class="login-header">
                    <Icon :size="20" type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <el-form ref="loginForm" :model="loginForm" :rules="formRules">
                        <el-form-item prop="username">
                            <el-input placeholder="请输入用户名" @focus="nameFocus" @blur="showNomal" v-model="loginForm.username">
                                <i slot="prepend" class="iconfont icon-mima"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="请输入密码" @focus="pwordFocus" @blur="showNomal" v-model="loginForm.password">
                                <i slot="prepend" class="iconfont icon-zhanghao"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native.prevent="handleSubmit" :loading="loading" style="width:100%;" type="primary">立即登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
            <div class="login-shadow"><img src="../../assets/images/login_shadow.png" alt=""></div>
        </div>
        <p class="login-fotter">Copyright<span class="copy">&copy;</span>2018&nbsp;前端攻城狮出品</p>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { isvalidUsername } from '@/utils/validate'
export default {
  data() {
    return {
      showImg: 1,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      }
    }
  },
  methods: {
    nameFocus() {
      this.showImg = 2
    },
    pwordFocus() {
      this.showImg = 3
    },
    showNomal() {
      this.showImg = 1
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.$message({
                message: 'Successful login!',
                type: 'success'
              })
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login_bj.png');
  background-size: cover;
  background-position: center;
  position: relative;
  &-logo-box {
    position: absolute;
    width: 240px;
    top: 10%;
    left: 12%;
    > img {
      width: 100%;
    }
  }
  &-left-img {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(-8%, -42%);
    width: 460px;
    > img {
      display: block;
      widows: 100%;
    }
  }
  &-con {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(140%, -32%);
    width: 340px;
    .login-mascot {
      position: absolute;
      top: -79px;
      left: 116px;
      width: 120px;
      z-index: 12;
      > img {
        display: block;
        width: 100%;
      }
    }
    .login-body {
      position: relative;
      z-index: 11;
      .login-header {
        font-size: 20px;
        margin-top: 20px;
        padding: 0 10px;
      }
      .form-con {
        padding: 10px 10px;
        .el-form-item {
          margin-bottom: 32px;
        }
      }
    }
    .login-shadow {
      position: absolute;
      z-index: 10;
      bottom: -20px;
      left: -58px;
      width: 476px;
      > img {
        display: block;
        width: 100%;
      }
    }
  }
  &-fotter {
    position: absolute;
    color: #ebebeb;
    bottom: 14px;
    width: 100%;
    text-align: center;
    .copy {
      display: inline-block;
      font-weight: 600;
      margin: 0 7px;
    }
  }
}
</style>
