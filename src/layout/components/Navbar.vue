<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
       <screenfull id="screenfull" class="right-menu-item hover-effect" />
      <!-- <template v-if="device !== 'mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template> -->

      <!-- <div class="right-menu-item setting-icon" @click="showSettings">
        <i class="el-icon-setting" />
      </div> -->

      <!-- <div
        class="lang-icon right-menu-item hover-effect"
        @click="langShow = !langShow"
      >
        <svg-icon icon-class="lang"></svg-icon>
        <p>{{ $t("keyWords.switchTxt") }}</p>
        <ul class="lang-list" v-show="langShow">
          <li @click.prevent="switchLang('cn')">
            <svg-icon class="mr10x" icon-class="zh"></svg-icon>
            简体中文
          </li>
          <li @click.prevent="switchLang('en')">
            <svg-icon class="mr10x" icon-class="en"></svg-icon>
            English
          </li>
        </ul>
      </div> -->
      <el-dropdown
        class="info-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <svg-icon
            class="info"
            icon-class="info"
            style="font-size: 32px"
          ></svg-icon>
          <i class="info-icon" v-if="alarmList.length > 0"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="message-dropdown">
          <div class="infoItem" v-for="(item, index) in alarmList" :key="index" v-if="index<5">
            <div class="infoTime">{{item.time}}</div>
            <div class="infoContent">
              · {{item.content}}
            </div>
          </div>
          <div class="info-btn">
            <el-button class="btn-search" size="mini" @click="goToWarining">更多</el-button>
            <!-- <el-button class="btn-search" size="mini" @click="">确认</el-button> -->
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <!-- <div class="avatar-wrapper">
          <img :src="userinfo.fileName" class="user-avatar" alt="" />
          <div>
            <p class="codeName">{{ userinfo.userinfoNo || '' }}</p>
            <br v-if="!userinfo.userinfoNo" />
            <p>{{ userinfo.job || userinfo.name }}</p>
          </div>
          <i class="el-icon-caret-bottom" />
        </div> -->
        <div class="avatar-wrapper">
          <!-- <img :src="userinfo.fileName" class="user-avatar" /> -->
          <div>
            <p class="codeName">欢迎登录</p>
            <p>{{ userinfo.name || "您好" }}</p>
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link :to="'/center/personal/' + userinfo.userType">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item><span>头像修改</span></el-dropdown-item>
          <router-link to="/center/changePwd">
            <el-dropdown-item>密码修改</el-dropdown-item>
          </router-link> -->
          <el-dropdown-item @click.native="logout"> 
            <span style="display: block">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import * as api from "@/api/dashboard";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
  },
  data() {
    return {
      langShow: false,
      timer: null,
      alarmList: []
    };
  },
  computed: {
    ...mapGetters(["sidebar", "userinfo", "device"]),
  },
  mounted() {
  	// this.getAlarmList();
  },
  beforeDestroy() {
  	clearTimeout(this.timer);
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("您是否确认退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$store.dispatch("user/logout");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          this.$router.push(`/login`);
        })
        .catch((err) => console.log(err));
    },
    async triggerLogout() {
      try {
        await this.$store.dispatch("user/logout");
        this.$router.push(`/login`);
        this.$message({
          type: "success",
          message: "退出登录成功!",
        });
      } catch (err) {}
    },
    switchLang(val) {
      this.$i18n.locale = val;
      localStorage.setItem("lang", val);
    },

    showSettings() {
      this.$store.commit("app/SHOW_SETTINGS");
    },
    
    // 去警告
    goToWarining() {
      this.$router.push({path: `/waring/waring`});
    },
    // 
    async getAlarmList() {
      clearTimeout(this.timer);
      let { list } = await api.getAlarmList({});
      this.alarmList = list;
      this.timer = setTimeout(() => {
      	this.getAlarmList();
      }, 30000);
    }
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.navbar {
  height: 50px;
  /*overflow: hidden;*/
  position: relative;
  background: #141e46;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    color: #fff;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .info-container {
      .info {
        position: relative;
        top: 5px;
      }
      .info-icon {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #e62832;
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
    .avatar-container {
      margin-right: 30px;
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        line-height: 20px;
        font-size: 14px;
        > div {
          margin-left: 10px;
        }
        .codeName {
          font-size: 14px;
          font-weight: 600;
          color: #14e1fa;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 14px;
          font-size: 12px;
        }
      }
    }

    .lang-icon {
      position: relative;
      margin-right: 20px;
      margin-top: 2px;
      padding-right: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      > .svg-icon {
        font-size: 25px;
        cursor: pointer;
      }
      .lang-list {
        position: absolute;
        right: 0;
        top: 50px;
        z-index: 1000;
        padding: 0;
        background-color: #fff;
        width: 110px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 0 4px #aaa;
        li {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          &:not(:first-child) {
            border-top: 1px solid #ddd;
          }
        }
      }
      &::after {
        content: "";
        position: absolute;
        top: 15px;
        right: 0;
        width: 1px;
        height: 20px;
        background-color: #e4e4e4;
      }
    }

    .setting-icon {
      i {
        font-size: 18px;
      }
    }
  }
}
>>> .popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #14e1fa !important;
}
>>> .popper__arrow::after {
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #141e46 !important;
}
.message-dropdown {
  width: 300px;
  background: #141e46;
  border: 1px solid #14e1fa;
  padding: 10px 20px 20px;
  .infoItem {
    width: 100%;
    background: #00051e;
    margin-top: 10px;
    padding: 8px 10px;
    .infoTime {
      color: rgba(20, 225, 250, 0.5);
      font-size: 14px;
    }
    .infoContent {
      margin-top: 5px;
      font-size: 14px;
      color: rgba(20, 225, 250, 1);
    }
  }
  .info-btn {
    text-align: right;
    margin-top: 10px;
    .btn-search {
      height: 30px;
      width: 80px;
    }
  }
}
</style>
