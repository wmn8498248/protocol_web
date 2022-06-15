<template>
  <div class="current-index">
    <div class="home-container">
      <div class="home-title">
        <div class="title-img">无线交直流电压监测系统</div>
        <div class="dashboard-time">
          <p>{{ nowDate }}</p>
        </div>
        <div class="dashboard-day">
          <el-dropdown class="index-dropdown" trigger="click">
            <div class="avatar-wrapper">
              <div>
                <p class="codeName">欢迎登录</p>
                <!-- <p>{{ userinfo.name || "您好" }}</p> -->
              </div>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <el-dropdown-item @click.native="logout">
                <span style="display: block">退出系统</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p>正常运行<span>110</span>天</p>
        </div>
      </div>

      <component
        :key="componentKey"
        @moreInfoPopup="moreInfoPopup"
        v-bind:is="currentTabComponent"
      ></component>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogTableVisible"
      @close="dialogClosed"
      width="800px"
      center
    >
      <router-view @closedPopup="closedPopup" />
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/dashboard";
import { parseTime } from "@/utils/index.js";

import first from "./first";
// import second from "./second";
// import third from "./third";
// import fourth from "./fourth";
// import fifth from "./fifth";
export default {
  name: "indexHome",
  components: { first },
  computed: {
    // ...mapGetters([ "userinfo"]),
  },
  data() {
    return {
      componentKey: 0,
      nowDate: null,
      dialogTitle: "",
      dialogTableVisible: false,
      currentTabComponent: first,
      isActiveList: 0,
      isActive: 0,
      equipmentType: [
        { name: "银川东", list: ["SF6", "伸缩节", "温控器"] }, //温湿度
        { name: "灵州", list: ["温控器", "计数器"] },
      ],
    };
  },
  mounted() {
    this.nowDateId = setInterval(() => {
      this.nowDate = parseTime(new Date(), "{y}年{m}月{d}日 {h}:{i}:{s}");
      --this.countTime;
    }, 1000);
  },
  methods: {
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
    dialogClosed() {
      this.$router.push({
        path: "/lz/currentIndex",
      });
    },
    deviceHistoryList(res) {
      const { historyList } = api.deviceHistoryList({
        deviceNumber: res,
        dateType: "day",
      });
    },
    alarmExport(re) {
      const { historyList } = api.alarmExport({
        deviceNumber: res,
        dateType: "day",
      });
    },
    deviceVoltLevel(res) {
      const { list } = api.deviceVoltLevel({
        projectId: 1,
        voltLevel: "750kV",
        deviceName: null,
        deviceNumber: null,
      });
    },
    deviceClassify(res) {
      const { list } = api.deviceClassify({
        projectId: 1,
        deviceClassify: null,
        deviceName: null,
        deviceNumber: null,
      });
    },
    deviceStatus(res) {
      const { list } = api.deviceStatus({
        projectId: 1,
        lineState: 1,
        deviceName: 2,
        deviceNumber: 3,
      });
    },
    alarmDate(res) {
      const { historyList } = api.alarmDate({
        projectId: 1,
        deviceName: "",
        deviceNumber: "",
        startTime: "",
        endTime: "",
      });
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
    equipmentTypeList(res) {
      this.isActiveList = res;
      switch (this.isActive) {
        case 0:
          if (res == 0) {
            this.currentTabComponent = first;
          } else if (res == 1) {
            this.currentTabComponent = second;
          } else if (res == 2) {
            this.currentTabComponent = third;
          }
          break;
        case 1:
          if (res == 0) {
            this.currentTabComponent = fourth;
          } else if (res == 1) {
            this.currentTabComponent = fifth;
          }
          break;
        default:
          break;
      }
      console.log(this.$store.getters);
    },
    equipmentTypeChange(res) {
      // console.log(this.$store);
      // console.log(this.$store);
      this.isActive = res;
      this.isActiveList = 0;
      res
        ? (this.currentTabComponent = fourth)
        : (this.currentTabComponent = first);
    },
    closedPopup(status) {
      this.$router.push({
        path: "/lz/currentIndex",
      });
      this.dialogTableVisible = false;
      if (!status) {
        this.componentKey += 1;
      }
    },
    moreInfoPopup(res, title) {
      console.log("父组件");
      this.dialogTitle = res;
      this.dialogTableVisible = true;
    },
  },
};
</script>

<style lang="scss">
.el-dialog {
  background-color: #10153b; //#213d6c
  // background-color: #213d6c;
}
.el-dialog__title {
  color: #ffffff;
}
.current-index {
  //   background-color: #323a6e;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-image: url("../../../assets/images/bg01.png"),
    url("../../../assets/images/bg02.png"),
    url("../../../assets/images/bg03.png"),
    url("../../../assets/images/bg04.png");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: top left, top right, bottom left, bottom right;
  background-color: #030c35;
  padding: 14px;
  position: relative;
  overflow: hidden;
  .title-right {
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 10;
  }
  .dash_dater {
    position: absolute;
    top: 10px;
    left: 15px;
    z-index: 10;
    border: 1px solid #19508f;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    .dash_dater_item {
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #14e1fa;
      cursor: pointer;
    }
    .dash_dater_border {
      width: 1px;
      background: #19508f;
    }
  }
  .index-dropdown {
    .avatar-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .home-flex {
    display: flex;
    height: calc(50% - 50px);
    padding-bottom: 20px; // 20px
  }
  .home-container {
    width: 100%;
    height: 100%;
    // background-color: #030c35; //030c35  00051e
    color: #ffffff;
    border: 2px solid rgba(50, 155, 255, 0.5);
    font-size: 1px;
    // overflow: hidden;
  }
  .equipment-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 54px);
  }

  .home-box {
    border: 1px solid #0f4757;
    margin: 0 10px;
    min-height: 300px;
    height: 100%;
    position: relative;
    font-size: 14px;
    // flex: 1;
    .box-container {
      height: calc(100% - 54px);
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
      }

      &::-webkit-scrollbar {
        width: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: #2887f0; //14e1fa 2887f0
        border-radius: 20px;
      }
      .warp {
        height: 100%;
        width: 100%;
        //   width: 360px;
        margin: 0 auto;
        overflow: hidden;
        ul {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          li {
            display: block;
            height: 45px;
            line-height: 45px;
            display: flex;
            justify-content: space-between;
            // font-size: 15px;
            cursor: pointer;
            span:first-child {
              border-left: none;
            }
          }
          span {
            // width: 100%;
            display: inline-block;
            width: 25%;
            border-bottom: 1px solid #0f4757;
            border-left: 1px solid #0f4757;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            text-align: right;
            text-align: center;
            font-size: 14px;
          }
          span.title {
            font-size: 16px;
            border-width: 2px;
            color: #14e1fa;
          }
          li:hover {
            color: #14e1fa;
          }
        }
        ul.alarm-item {
          span {
            width: 33.3333333333333%;
          }
        }
      }
    }
    .equipment-count,
    .equipment-state {
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      p {
        font-size: 16px;
      }
      span {
        font-size: 18px;
        color: #5f6f93;
      }
    }
    .equipment-count {
      .count-border {
        border: 1px solid #0f4757;
        box-shadow: 0 0 5px #0f4757;
        margin-bottom: 15px;
      }
    }
    .box-title {
      height: 55px;
      background: #152349;
      color: #14e1fa;
      text-align: center;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      .title-img {
        width: 41px;
        height: 12px;
        margin: 0 9px;
      }
    }
  }
  .boxbg01 {
    position: absolute;
    top: -1px;
    left: -1px;
  }
  .boxbg02 {
    position: absolute;
    top: -1px;
    right: -1px;
  }
  .boxbg03 {
    position: absolute;
    bottom: -1px;
    left: -1px;
  }
  .boxbg04 {
    position: absolute;
    bottom: -1px;
    right: -1px;
  }
  .boxbg05 {
    position: absolute;
    left: 50%;
    margin-left: -97.5px;
    width: 195px;
  }
  .home-title {
    position: relative;
    height: 100px;
    .dashboard-time {
      font-size: 14px;
      color: #14e1fa;
      position: absolute;
      left: 54px;
      top: 31px;
      padding: 10px 15px;
      text-align: center;
      border: 1px solid #14e1fa;
      box-shadow: 0 0 5px #14e1fa;
      line-height: 28px;
      p.big {
        font-size: 24px;
      }
    }
    .dashboard-day {
      @extend .dashboard-time;
      left: auto;
      top: 10px;
      right: 54px;
      line-height: 25px;
      span {
        font-size: 24px;
        color: #9ed0ff;
        padding: 0 5px;
      }
    }
    .title-img {
      position: absolute;
      left: 50%;
      top: -12px;
      margin-left: -500px;
      width: 1000px;
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #9ed0ff;
      line-height: 100px;
      background-image: url("../../../assets/images/bg07.jpg");
      background-position: top center;
      background-size: 100% auto;
      background-repeat: no-repeat;
      font-family: "test";
    }
  }
  .flex1 {
    flex: 0.1;
    width: 10%;
  }
  .flex2 {
    flex: 0.2;
    width: 20%;
  }
  .flex3 {
    flex: 0.3;
    width: 30%;
  }
  .flex4 {
    flex: 0.4;
    width: 40%;
  }
  .flex5 {
    flex: 0.5;
    width: 50%;
  }
  .flex6 {
    flex: 0.6;
    width: 60%;
  }
  .flex7 {
    flex: 0.7;
    width: 70%;
  }
  .flex8 {
    flex: 0.8;
    width: 80%;
  }
}
</style>