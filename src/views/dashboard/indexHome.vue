<template>
  <div
    class="index-home"
    :style="{ height: isActiveName==='onoff' ? 'auto' : '100%' }"
  >
    <div class="home-profile" @click="toProfile">平台介绍</div>
    <!-- <div class="home-left" @click="toProfile">{{}}</div> -->
    <div
      class="home-container"
      :style="{ height: isActiveName==='onoff' ? 'auto' : '100%' }"
    >
      <div class="home-title">
        <div class="title-left title-public">
          <span
            @click="equipmentTypeChange(index, item)"
            :class="isActive === index ? 'active btn' : 'btn'"
            v-for="(item, index) in equipmentType"
            :key="index"
            >{{ item.companyName }}</span
          >
        </div>
        <div class="title-right title-public">
          <el-dropdown class="index-dropdown" trigger="click">
            <div class="avatar-wrapper">
              <div>
                <p class="codeName">欢迎</p>
                <!-- <p>{{ userinfo.name || "您好" }}</p> -->
              </div>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <el-dropdown-item @click.native="logout">
                <span style="display: block">退出系统</span>
              </el-dropdown-item>
              <el-dropdown-item v-if="adminStatus" @click.native="adminClick">
                <span style="display: block">后台管理</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <template v-if="equipmentType[isActive].deviceTypeList.length < 8">
            <span
              @click="equipmentTypeList(index, itemList.deviceAbbr)"
              :class="isActiveList === index ? 'active btn' : 'btn'"
              v-for="(itemList, index) in equipmentType[isActive]
                .deviceTypeList"
              :key="index"
              >{{ itemList.deviceType }}</span
            >
          </template>
          <el-select
            v-else
            v-model="typeValue"
            placeholder="请选择"
            @change="equipmentTypeList(1, $event)"
          >
            <el-option
              v-for="item in equipmentType[isActive].deviceTypeList"
              :key="item.deviceAbbr"
              :label="item.deviceType"
              :value="item.deviceAbbr"
            >
            </el-option>
          </el-select>
        </div>

        <span>XXXXXXXXXXXXX物联管理平台</span>
      </div>
      <!-- slide-fade moveL slide-->
      <transition name="slide">
        <component
          ref="sensorHome"
          :companyId="companyId"
          @selectCom="selectCom"
          @moreInfoPopup="moreInfoPopup"
          v-bind:is="currentTabComponent"
        ></component>
      </transition>
    </div>

    <el-dialog
      min-height="700px"
      :title="dialogTitle"
      :visible.sync="dialogTableVisible"
      @close="dialogClosed"
      width="90%"
      :before-close="handleClose"
      center
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" @close-after="closeAfter" />
      </keep-alive>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/dashboard";

import first from "./first";
import second from "./second";
import third from "./third";
import thirdB from "./thirdb";
import thirdC from "./thirdc";
import fourth from "./fourth";
import fifth from "./fifth";
import six from "./six";
import seven from "./seven";

import eight from "./eight";

import ninth from "./ninth";

import test from "./test";

import onoff from "./onoff";

import profile from "./profile";

import jishu from "./jishu";

import nopages from "@/views/error-page/404";

export default {
  name: "indexHome",
  components: {
    onoff,
    first,
    second,
    third,
    thirdB,
    thirdC,
    fourth,
    fifth,
    six,
    seven,
    eight,
    ninth,
    profile,
    nopages,
    test,
    jishu,
  },
  computed: {
    // ...mapGetters([ "userinfo"]),
  },
  data() {
    return {
      isActiveName: "",
      typeValue: "",
      companyId: null,
      dialogTitle: "",
      dialogTableVisible: false,
      currentTabComponent: first,
      isActiveList: 0,
      isActive: 0,
      sensorType: [],
      equipmentType: [{ deviceTypeList: [] }],
      openPop: false,
    };
  },
  created() {
    this.getCompanyList(0);
  },
  computed: {
    cachedViews() {
      this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
    adminStatus() {
      return this.$store.state.app.update;
    },
  },
  methods: {
    closeAfter(res) {
      this.openPop = res;
    },
    handleClose(done) {
      if (this.openPop) {
        this.$router.go(-1);
      } else {
        done();
        // this.dialogTableVisible = false;
      }
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      //     done();
      //   })
      //   .catch((_) => {});
    },
    async getCompanyList(res) {
      this.equipmentType = await api.getCompanyHasDevice();
      if (this.equipmentType.length > 0) {
        this.companyId = this.equipmentType[0].companyId;
        this.equipmentTypeList(
          0,
          this.equipmentType[0].deviceTypeList[0].deviceAbbr
        );
        this.typeValue = this.equipmentType[0].deviceTypeList[0].deviceAbbr;
      }
      // this.companyId = this.equipmentType[res].companyId;

      // this.getSensorType(this.companyId);

      // this.$nextTick(() => {
      //   this.$refs.sensorHome.getData();
      // });
    },
    adminClick() {
      this.$router.push({
        path: "/manage/sensor",
      });
    },
    async getSensorType(res) {
      let arrayList = await api.getCompanyDevice({
        companyId: res,
      });

      this.sensorType = [];

      if (arrayList.length > 0) {
        arrayList.forEach((element) => {
          for (var item in element) {
            this.sensorType.push({
              typeName: item,
              typeId: element[item],
            });
          }
        });
        this.equipmentTypeList(0, this.sensorType[0].typeId);
      } else {
        this.currentTabComponent = nopages;
      }
    },

    selectCom() {
      this.currentTabComponent = first;
      this.isActive = 0;
      this.isActiveList = 0;
      this.getCompanyList(0);
      console.log(this.typeValue, "this.typeValue ");
    },
    toProfile() {
      // this.currentTabComponent = profile;
    },
    dialogClosed() {
      this.$store.commit("app/SET_SIZE", 1);
      this.$router.push({
        path: "/indexHome",
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
    equipmentTypeList(res, deviceName) {
      // console.log(deviceName, "设备类型pages");
      this.isActiveList = res;
      // deviceName = "onoff";
      this.isActiveName = deviceName;

      switch (deviceName) {
        case "count":
          this.currentTabComponent = jishu;
          break;
        case "onoff":
          this.currentTabComponent = onoff;
          break;

        // 电流
        case "ec":
          this.currentTabComponent = fifth;
          break;

        // 温度
        case "temp":
          this.currentTabComponent = second;
          break;

        // 湿度
        case "humidity":
          this.currentTabComponent = fourth;
          break;

        case "sf6":
          this.currentTabComponent = first;
          break;

        case "bt/temperature":
          this.currentTabComponent = third;
          break;

        case "bt/offset":
          this.currentTabComponent = thirdB;
          break;

        case "bt/strain":
          this.currentTabComponent = thirdC;
          break;

        case "tc":
          this.currentTabComponent = six;
          break;

        case "th":
          this.currentTabComponent = eight;
          break;

        case "wi":
          this.currentTabComponent = ninth;
          break;

        default:
          this.currentTabComponent = nopages;

          break;
      }

      this.$nextTick(() => {
        this.$refs.sensorHome.getData();
      });
    },

    equipmentTypeChange(res, item) {
      this.isActive = res;
      this.companyId = item.companyId;
      if (this.equipmentType[this.isActive].deviceTypeList.length > 0) {
        this.equipmentTypeList(
          0,
          this.equipmentType[this.isActive].deviceTypeList[0].deviceAbbr
        );
        this.typeValue =
          this.equipmentType[this.isActive].deviceTypeList[0].deviceAbbr;
      } else {
        this.currentTabComponent = nopages;
      }
    },
    moreInfoPopup(res, title) {
      this.dialogTitle = res;
      this.dialogTableVisible = true;
    },
  },
};
</script>

<style lang="scss">
.slide-enter-active {
  transition: all 0.5s linear;
}
.slide-leave-active {
  transition: all 0.1s linear;
}
.slide-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(110%);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.moveL-enter-active,
.moveL-leave-active {
  transition: all 0.3s linear;
  transform: translateX(0%);
}
.moveL-enter,
.moveL-leave {
  transform: translateX(-100%);
}
.moveL-leave-to {
  transform: translateX(-100%);
}

.el-dialog {
  background-color: #10153b; //#213d6c
  // background-color: #213d6c;
}
.el-dialog__title {
  color: #ffffff;
}
.index-home {
  //   background-color: #323a6e;
  height: 100%;
  min-height: 768px;
  width: 100%;
  box-sizing: border-box;
  //   background-image: url("../../assets/images/bg01.png"),
  //     url("../../assets/images/bg02.png"), url("../../assets/images/bg03.png"),
  //     url("../../assets/images/bg04.png");
  //   background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  //   background-position: top left, top right, bottom left, bottom right;
  background-image: url("../../assets/images/bg.png");
  padding: 15px 25px;
  position: relative;
  .home-profile {
    position: absolute;
    top: 15px;
    left: 25px;
    color: #ffff;
    writing-mode: vertical-rl;
    border: 1px solid #19508f;
    padding: 10px;
    z-index: 1;
    cursor: pointer;
  }
  .home-right {
    position: absolute;
    top: 15px;
    right: 25px;
    color: #ffff;
    writing-mode: vertical-rl;
    padding: 10px;
    z-index: 1;
    cursor: pointer;
  }

  .home-profile:hover {
    background-color: #213d6c;
  }
  .index-dropdown {
    .avatar-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  >>> .el-dialog {
    background-color: #0f4757;
  }
  >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #4f4c53;
  }
  >>> .el-dialog__header {
    background-color: #6c6f80;
  }
  >>> .el-dialog__body {
    background-color: #4f4c53;
    .th.is-leaf {
      height: auto;
    }
  }
  >>> .el-table {
    color: #ffffff;
    thead {
      color: #ffffff;
      background-color: #6c6f80;
      font-size: 16px;
    }
    &::before {
      background-color: #ffffff;
    }
    th.is-leaf {
      height: auto;
      background-color: #4f4c53 !important;
    }
    tr {
      background-color: #4f4c53;
    }
  }
  .home-box-left {
    float: left;
    width: 48%;
    height: 100%;
    box-sizing: border-box;
  }
  .home-box-right {
    float: left;
    width: 52%;
    height: 100%;
  }
  .home-flex {
    display: flex;
    height: calc(50% - 50px);
    margin-bottom: 10px; // 20px
    padding-bottom: 10px; // 20px
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      height: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #2887f0; //14e1fa 2887f0
      border-radius: 20px;
    }
  }
  .home-container {
    width: 100%;
    height: 100%;
    // background-color: #030c35; //030c35  00051e
    color: #ffffff;
    border: 2px solid #0f4757;
    box-shadow: 0 0 5px #0f4757;
    font-size: 1px;
    overflow: hidden;
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
    .box-container {
      height: calc(100% - 54px);
      overflow: hidden;
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
    .equipment-state {
    }
    .box-title {
      font-size: 16px;
      line-height: 50px;
      padding-left: 26px;
      padding-right: 18px;
      padding-bottom: 3px;
      border-bottom: 1px solid #1b2c58;
      position: relative;
      span.right {
        float: right;
        color: #b1b2b4;
      }
      .dash_dater {
        display: inline-block;
        border: 1px solid #19508f;
        border-radius: 5px;
        display: inline-flex;
        flex-direction: row;
        align-items: stretch;
        margin-left: 15px;
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
      .title-right {
        float: right;
        line-height: 50px;
      }
      .itemImg {
        //   width: 15px;
        height: 15px;
        margin-right: 5px;
      }
      //   background-image: url("../../assets/images/title-bg.png");
      //   background-repeat: no-repeat;
      //   background-position: left bottom;
      position: relative;
    }
    .topL {
      width: 20px;
      height: 20px;
      border-top-width: 2px;
      border-top-color: #26c6f0;
      border-top-style: solid;
      border-left-width: 2px;
      border-left-color: #26c6f0;
      border-left-style: solid;
      position: absolute;
      top: -2px;
      left: -2px;
    }
    .topR {
      width: 20px;
      height: 20px;
      border-top-width: 2px;
      border-top-color: #26c6f0;
      border-top-style: solid;
      border-right-width: 2px;
      border-right-color: #26c6f0;
      border-right-style: solid;
      position: absolute;
      top: -2px;
      right: -2px;
    }
    .bottomL {
      width: 20px;
      height: 20px;
      border-bottom-width: 2px;
      border-bottom-color: #26c6f0;
      border-bottom-style: solid;
      border-left-width: 2px;
      border-left-color: #26c6f0;
      border-left-style: solid;
      position: absolute;
      bottom: -2px;
      left: -2px;
    }
    .bottomR {
      width: 20px;
      height: 20px;
      border-bottom-width: 2px;
      border-bottom-color: #26c6f0;
      border-bottom-style: solid;
      border-right-width: 2px;
      border-right-color: #26c6f0;
      border-right-style: solid;
      position: absolute;
      bottom: -2px;
      right: -2px;
    }
  }
  .home-title {
    font-family: "test";
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    line-height: 90px;
    // background-image: url("../../assets/images/bg07.jpg");
    background-position: top center;
    background-size: auto 100%;
    background-repeat: no-repeat;
    position: relative;
    top: -4px;
    .title-public {
      position: absolute;
      font-size: 18px;
      top: 31px;
      line-height: 40px;
      span.btn {
        display: inline-block;
        padding: 0 20px;
        border: 1px solid #5f6f93;
        font-family: initial;
        cursor: pointer;
      }
      span:hover {
        background-color: #213d6c;
        // color: #213d6c;
      }
      span.active {
        background-color: #213d6c;
        // color: #213d6c;
      }
    }
    .title-left {
      left: 66px;
      span {
      }
    }
    .title-right {
      width: 500px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: center;
      top: 8px;
      right: 28px;
      font-size: 16px;
      span.btn {
        line-height: 30px;
      }
    }
  }
  @media screen and (max-width: 1366px) {
    .home-title {
      font-size: 30px;
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
  .flex10 {
    flex: 1;
    width: 100%;
  }
}
</style>
