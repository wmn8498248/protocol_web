<template>
  <div class="upgrade-setting" v-if="upgradeInfo !== null">
    <div>
      <ul style="width:400px">
        <li class="upload-li">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="actionUrl"
            :headers="headerObj"
            :data="{ deviceType: deviceType, deviceId: deviceId }"
            :on-success="handle_success"
            :on-preview="handlePreview"
            :file-list="fileList"
            :auto-upload="false"
          >
            <!-- <el-button size="small" type="success">选择文件</el-button> -->

            <el-button size="mini" type="info">选择文件</el-button>
          </el-upload>
          <div>
            <el-button size="small" type="primary" @click="submitUpload"
              >发送接受命令</el-button
            >
          </div>
          <!-- <el-button size="small" type="primary" @click="">升级</el-button> -->
        </li>
        <li>
          <el-button size="small" type="success" @click="messageBox(1)"
            >发送查询命令</el-button
          >
        </li>
        <li>
          <el-button size="small" type="primary" @click="messageBox(2)"
            >发送升级命令</el-button
          >
        </li>
      </ul>
      <ul>
        <!-- <li style="text-align: center;"><el-tag type="warning" size="medium ">定时刷新</el-tag>&ensp;{{ timeNum }}</li> -->
        <li style="text-align: center">
          定时刷新&ensp;<el-tag type="danger">{{ timeNum }}</el-tag>
        </li>
        <!-- <li><el-button type="primary" >定时刷新:{{ timeNum }}</el-button></li> -->
        <li>
          <p><el-tag type="success" size="medium ">设备型号</el-tag></p>&ensp;{{
            upgradeInfo.deviceVersion
          }}
        </li>
        <li>
          <p><el-tag type="success" size="medium ">硬件版本号</el-tag></p>&ensp;{{
            upgradeInfo.hardwareVersion
          }}
        </li>
        <li>
          <p><el-tag type="success" size="medium ">当前软件版本号</el-tag></p>&ensp;{{
            upgradeInfo.softwareVersion
          }}
        </li>
        <li>
          <p><el-tag type="success" size="medium ">软件包版本</el-tag></p>&ensp;{{
            upgradeInfo.softwarePackageVersion
          }}
        </li>
        <li>
          <p><el-tag type="success" size="medium ">校验状态</el-tag></p>&ensp;{{
            statusList[upgradeInfo.status]
          }}
        </li>
        <li>
          <p><el-tag type="success" size="medium ">时间</el-tag></p>&ensp;{{
            upgradeInfo.time
          }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/manage";
import { getToken } from "@/utils/auth";

export default {
  name: "Upgrade_setting",
  data() {
    return {
      timeNum: 10,
      timeRefresh: null,
      fileList: [],
      deviceType: this.$route.query.deviceType,
      deviceId: this.$route.query.deviceId,
      upgradeInfo: null,
      statusList: [
        "请发送查询命令",
        "请发送接收命令",
        "正在发送软件包，请勿重新提交",
        "校验成功，可升级",
        "校验失败",
      ],
    };
  },
  activated() {
    this.getUpgradeInfo();
    this.timeRefresh = setInterval(() => {
      if (this.timeNum < 1) {
        this.getUpgradeInfo();
        this.timeNum = 10;
      }
      this.timeNum--;
    }, 1000);
  },
  deactivated() {
    console.log("离开deactivated ");
    clearInterval(this.timeRefresh);
  },
  computed: {
    actionUrl() {
      let tt =
        window.location.protocol +
        "//" +
        window.location.host +
        "/protocol/upgrade/accept";
      return tt;
    },
    headerObj() {
      return {
        token: getToken(),
      };
    },
  },
  methods: {
    submitUpload() {
      if (this.upgradeInfo.status === 2 || this.upgradeInfo.status === 3) {
        this.$message.warning("无法进行此命令");
        return;
      }
      if (this.$refs.upload.uploadFiles.length == 0) {
        this.$message.warning("请选择上传文件");
        return;
      }
      this.$refs.upload.submit();
      //   this.fileList = []
    },
    handlePreview() {
      //   this.actionUrl =
      //     "http://tx2.yuanguaniot.com/protocol/tc/device/batchSave";
      console.log(this.actionUrl);
    },
    handle_success(res) {
      console.log(res);
      if (res.code == 200) {
        this.$message.success("上传成功");
      } else {
        this.$message.warning(res.message);
      }
      this.fileList = [];
    },
    async getUpgradeInfo() {
      let data = {
        deviceType: this.$route.query.deviceType,
        deviceId: this.$route.query.deviceId,
      };
      this.upgradeInfo = await api.upgradeInfo(data);
      // this.upgradeInfo = {
      //   deviceVersion: "DWC100-NC122",
      //   hardwareVersion: "V01",
      //   softwareVersion: "V001_20220630",
      //   softwarePackageVersion: "V013_20220622",
      //   status: 1,
      //   time: "2022-07-05 18:32:40",
      // };
    },
    messageBox(res) {
      this.$confirm("确定提交命令到【设备：" + this.deviceId + "】", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            deviceType: this.$route.query.deviceType,
            deviceId: this.$route.query.deviceId,
          };
          let readList = false;
          switch (res) {
            case 1:
              //查询
              readList = await api.upgradeQuery(data);
              break;
            case 2:
              if (this.upgradeInfo.status !== 3) {
                this.$message.warning("无法进行此命令");
                return;
              }
              //升级
              readList = await api.upgradeUpgrade(data);
              break;
            // case 3:
            //   readList = await api.deviceQueryAlarm(data);
            //   break;
            // case 4:
            //   readList = await api.deviceMonitor(data);
            //   break;

            default:
              break;
          }
          this.$message.success(readList);
          this.issuanceLoad = false;
        })
        .catch(() => {
          this.issuanceLoad = false;
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    // 查询
    async getupgradeQuery() {
      let data = {
        deviceType: this.$route.query.deviceType,
        deviceId: this.$route.query.deviceId,
      };
      this.upgradeInfo = api.upgradeQuery(data);
    },

    // 接收
    async getupgradeAccept() {
      let data = {
        deviceType: this.$route.query.deviceType,
        deviceId: this.$route.query.deviceId,
      };
      this.upgradeInfo = api.upgradeAccept(data);
    },

    // 升级
    async getupgradeUpgrade() {
      let data = {
        deviceType: this.$route.query.deviceType,
        deviceId: this.$route.query.deviceId,
      };
      this.upgradeInfo = api.upgradeUpgrade(data);
    },
  },
};
</script>
<style>
.el-message-box {
  background-color: #00051e;
  border: none;
}
.el-message-box__content,
.el-message-box__title {
  color: #14e1fa;
}
</style>
<style lang="scss" scoped>
.upgrade-setting {
  color: #fff;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  line-height: 45px;
  .upload-li {
    line-height: 32px;
  }
  ul {
    // border: 1px solid #fff;
    width: 800px;
    margin: 10px;
    padding: 0;
    box-shadow: 0 0 5px #695858;
    border-radius: 5px;
    background-color: #40526b;
    overflow: hidden;
    p{
      display: inline-block;
      width: 120px;
      text-align: right;
    }
    li {
      float: left;
      width: 50%;
      list-style: none;
      border-bottom: 1px solid #707279;
      padding: 10px 25px;
    }
    li:first-child{
      width: 100%;
    }
    li:last-child {
      // border-bottom: none;
    }
  }
}
</style>
