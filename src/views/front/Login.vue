<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <div class="title-container">
      <h3 class="title">
        <img class="logo" src="@/assets/images/logo1.png" alt="" />
        <div class="name">
         XXXXXXXXXXXXX物联管理平台           
          <!-- <img src="@/assets/images/login_title.png" alt="" /> -->
        </div>
      </h3>
    </div>
    <div class="login-form">
      <!-- <el-tabs v-model="activeName">
        <el-tab-pane
          class="tab-item"
          :label="$t('keyWords.loginType1')"
          name="password"
        />
        <el-tab-pane
          class="tab-item"
          :label="$t('keyWords.loginType2')"
          name="code"
        />
      </el-tabs> -->
      <div style="padding: 0 42px">
        <div class="login">登录</div>
        <el-form
          v-show="activeName === 'password'"
          ref="loginForm"
          :model="loginForm"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="userName">
            <el-input
              v-model.trim="loginForm.userName"
              :placeholder="$t('placeholders.accountHolder')"
              type="text"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              :placeholder="$t('placeholders.passwordHolder')"
              type="password"
              show-password
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
        </el-form>
        <el-form
          v-show="activeName === 'code'"
          ref="loginForm"
          :model="loginCodeForm"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="code-num" class="code-num">
            <el-input
              v-model.trim="loginCodeForm.userName"
              :placeholder="$t('placeholders.accountHolder')"
              type="text"
            />
            <a
              href="javascript:void(0)"
              :class="['code-btn', { disabled: disabled }]"
              ref="code"
              @click="getCode"
            >
              {{ codeMsg || $t("keyWords.getCodeTxt") }}
            </a>
          </el-form-item>

          <el-form-item prop="code">
            <el-input
              v-model.trim="loginCodeForm.code"
              :placeholder="$t('placeholders.codeHolder')"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
        </el-form>
        <div class="login-tip">
          <div class="tip" v-if="loginTip.length > 0">
            <svg-icon icon-class="close" style="font-size: 20px"></svg-icon>
            <span>{{ loginTip }}</span>
          </div>
          <!-- <div>
            <svg-icon icon-class="eyeshow" style="font-size: 25px"></svg-icon>
          </div> -->
        </div>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          {{ $t("keyWords.btnLoginTxt") }}
        </el-button>
      </div>
    </div>
    <!-- <div class="copyright">Copyright © 2021-2023 YGWL 沪ICP备19009912号</div> -->
  </div>
</template>

<script>
import { codeDown } from "@/utils/codeDown";

import * as user from "@/api/user";
import Validator from "@/utils/validator";
import { setToken } from "@/utils/auth";
import Cookies from "js-cookie";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: process.env.NODE_ENV === "development" ? "laoma01" : "", //只开发环境才固定账号密码
        password: process.env.NODE_ENV === "development" ? "laoma01" : "",
      }, //账号密码
      loginCodeForm: {
        userName: "",
        code: "",
      }, //账号验证码
      loading: false,
      activeName: "password", // password, code，
      codeMsg: null,
      disabled: false,
      langShow: false,
      timer: null,
      loginTip: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect; // 记录url 传redirect值
      },
      immediate: true,
    },
  },
  methods: {
    // 登录
    handleLogin() {
      let validator = new Validator();
      validator.add(this.loginForm.userName, ["isNonEmpty", "账号不能为空"]);
      validator.add(this.loginForm.password, ["isNonEmpty", "密码不能为空"]);
      let msg = validator.start();
      if (msg) {
        this.loginTip = msg;
        this.$message.warning(msg);
      } else {
        this.loginTip = "";
        this.loginByPassword(this.loginForm);
      }
    },
    //密码方式登录
    async loginByPassword(req) {
      this.loading = true;

      //*************************************************************************/
      await user
        .loginByPassword(req)
        .then((res) => {
          setToken(res.token);
          // this.$router.push({ path: this.redirect || "/" }); // 有redirect跳转对应页面  没有跳转默认页面
          if (res.userLevel == 0) {
            Cookies.set("userName", res.userName);
            console.log(res.userName, "res.userName__")
            this.$store.commit("app/SET_UPDATE_TRUE");
            this.$router.push({ path: "/dataHistory/dataHistory" }); // 有redirect跳转对应页面  没有跳转默认页面
          } else {
            this.$store.commit("app/SET_UPDATE_FALSE");
            this.$router.push({ path: "/indexHome" }); // 有redirect跳转对应页面  没有跳转默认页面
          }

          this.loading = false; // 关闭动画
        })
        .catch(() => {
          this.loading = false; // 关闭动画
        }); //请求接口返回成功数据
      ///////////////////////////////////////////上下切换//////////////////////////
      //测试数据data 开发删除
      // let { data } = {
      //   data: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3MCI",
      //   code: 200,
      //   msg: "登录成功",
      // };
    },
    //验证码方式
    async loginByCode(req) {
      this.loading = true;
      let { data } = await user.loginByCode(req);
      setToken(data);
      clearInterval(this.timer);
      this.$router.push({ path: this.redirect || "/" }); // 有redirect跳转对应页面  没有跳转默认页面
      this.loading = false; // 关闭动画
    },
    // 获取验证码
    async getCode() {
      if (this.disabled) {
        return;
      }
      if (!this.loginCodeForm.userName) {
        this.$message.warning("请输入账号");
        return;
      }
      let req = {};
      if (this.loginCodeForm.userName.includes("@")) {
        req["email"] = this.loginCodeForm.userName;
      } else {
        req["mobile"] = this.loginCodeForm.userName;
      }

      this.$message.success("发送成功");
      this.timer = codeDown(this.codeMsg, 60, (msg) => {
        this.disabled = /\d/g.test(msg);
        this.codeMsg = msg;
      });
    },
    switchLang(val) {
      this.$i18n.locale = val;
      localStorage.setItem("lang", val);
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #b8b8b8;

@supports (-webkit-mask: none) and (not (caret-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;

    input {
      background-color: transparent;
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 40px;
      caret-color: $cursor;
      border: 1px solid #329bff;
      border-radius: 4px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-button {
    height: 40px;
    background: #329bff;
    border: 1px solid #329bff;
  }

  .code-num {
    .el-form-item__content {
      display: flex;
      .code-btn {
        text-align: right;
        width: 110px;
        color: #42b983;
        &.disabled {
          color: #d3cccc;
        }
      }
      .el-input {
        flex-grow: 1;
      }
    }
  }
  .login-form {
    .el-tabs__header {
      margin-bottom: 35px;
    }
  }
  .el-form {
    /*padding: 0 110px;*/
  }
  .el-form-item {
    margin-bottom: 16px;
    background: rgba(20, 225, 250, 0.1);
    border: 1px solid #329bff;
    border-radius: 5px;
    color: #fff;
    width: 295px;
    height: 40px;
  }

  .el-tabs__nav {
    float: none;
    margin: 0 auto;
    width: 240px;
    /*text-align: center;*/

    .el-tabs__item {
      padding: 0;
      text-align: center;
      width: 50%;
      color: #999;
      &.is-active {
        color: #005634;
        font-weight: 600;
      }
    }

    .el-tabs__active-bar {
      /*background-color: #005634;*/
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #f8f8f8;
$dark_gray: #889aa4;
$light_gray: #eee;
$white: #fff;
$black: #000;
$green: #77946d;
$grey: #b8b8b8;

.green {
  color: $green;
}
.grey {
  float: right;
}
p {
  margin: 0;
}
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background: $bg;
  overflow: hidden;
  .login-bg {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/loginBg.png") no-repeat center center /
      cover;
  }

  .login-form {
    background: url("../../assets/images/login.png");
    background-size: 100% 100%;
    position: absolute;
    top: 28.81rem;
    left: 50%;
    z-index: 10;
    width: 378px;
    height: 378px;
    margin: 0 auto;
    overflow: hidden;
    transform: translate(-50%, -50%);
    .tab-item {
      text-align: center;
      width: 50%;
    }
    .login {
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      margin: 66px 0 40px 0;
    }
  }
  .login-tip {
    margin-bottom: 24px;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $grey;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: absolute;
    top: 11.25rem;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    .title {
      margin: 0 auto 20px;
      text-align: center;
      img.logo {
        margin-right: 15px;
        width: 6.25rem;
      }
      .name {
        margin-top: 1.08rem;
        font-family: "test";
        text-align: center;
        font-size: 35px;
        font-weight: 400;
        line-height: 50px;
        color: #9ed0ff;
      }
    }
  }
  @media screen and (max-height: 666px) {
    .title-container {
      top: 6.25rem;
    }
    .login-form {
      top: 22.81rem;
    }
  }
  .copyright {
    position: absolute;
    top: 41.31rem;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 10;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
