<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{ info.deviceName }} - 命令</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px">
        <el-form-item>
          <el-button @click="messageBox(1)" class="btn-clear"
            >设置重启</el-button
          >
          <el-button @click="messageBox(2)" class="btn-create"
            >查询通用参数</el-button
          >
          <el-button @click="messageBox(3)" class="btn-create"
            >查询报警参数</el-button
          >
          <el-button @click="messageBox(4)" class="btn-create">
            查询监测参数
          </el-button>
        </el-form-item>
        <el-form-item label="布防状态" required>
          <el-select v-model="info.alarmStatus">
            <el-option label="撤防" :value="1"></el-option>
            <el-option label="布防" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数据采集间隔(S)" required>
          <el-input
            type="text"
            v-model="info.collectionInterval"
            :disabled="disabled"
          ></el-input>
        </el-form-item>

        <el-form-item label="采集个数" required>
          <el-input
            type="text"
            v-model="info.collectionNumber"
            :disabled="disabled"
          ></el-input>
        </el-form-item>

        <el-form-item label="报警电流" required>
          <el-input
            type="text"
            v-model="info.currentLow"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <!-- 管理员才可以看到 -->
        <!-- <el-form-item label="空占比" required v-show="dutyState">
          <el-input
            type="text"
            v-model="info.duty"
            :disabled="disabled"
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="toSave" class="btn-create">保存</el-button>
          <el-button @click="backPage" class="btn-cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/shuijin";
import Validator from "@/utils/validator";
export default {
  name: "Shuijin_setting",
  data: function () {
    return {
      dutyState: this.$store.getters.userinfo.status == 1,
      issuanceLoad: false,
      info: {
        alarmStatus: 1,
        collectionInterval: "",
        collectionNumber: "",
        currentLow: "",
      },
      disabled: false,
      deviceId: 0,
      id: 0,
    };
  },
  activated() {
    this.deviceId = this.$route.query.deviceId || 0;
    this.id = this.$route.query.id || 0;
    this.getInfo();
  },
  methods: {
    async defence() {
      let data = {
        deviceId: this.deviceId,
      };
      this.issuanceLoad = true;
      let defence = await api.defence(data);
      if (defence) {
        this.$message.success(defence.msg);
        this.issuanceLoad = false;
      } else {
        this.issuanceLoad = false;
      }
    },
    async noDefence() {
      let data = {
        deviceId: this.deviceId,
      };
      this.issuanceLoad = true;
      let noDefence = await api.noDefence(data);
      if (noDefence) {
        this.$message.success(noDefence.msg);
        this.issuanceLoad = false;
      } else {
        this.issuanceLoad = false;
      }
    },
    messageBox(res) {
      this.$confirm("确定提交命令到【设备：" + this.deviceId + "】", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            deviceId: this.deviceId,
          };
          let readList = false;
          switch (res) {
            case 1:
              readList = await api.deviceReset(data);
              break;
            case 2:
              readList = await api.deviceQueryGeneral(data);
              break;
            case 3:
              readList = await api.deviceQueryAlarm(data);
              break;
            case 4:
              readList = await api.deviceMonitor(data);
              break;

            default:
              break;
          }
          this.$message.success(readList);
          this.issuanceLoad = false;
          // if (readList) {

          //   this.$message.success(readList.msg);
          //   this.issuanceLoad = false;
          // } else {

          //   this.issuanceLoad = false;
          // }
        })
        .catch(() => {
          this.issuanceLoad = false;
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    async issuanceReadList() {
      let data = {
        deviceId: this.deviceId,
      };
      let readList = await api.issuanceRead(data);
      if (readList) {
        this.$message.success(readList.msg);
        this.issuanceLoad = false;
      } else {
        this.issuanceLoad = false;
      }
    },
    async issuanceRestart() {
      let data = {
        deviceId: this.deviceId,
      };
      let restart = await api.issuanceRestart(data);
      if (restart) {
        this.$message.success(restart.msg);
        this.issuanceLoad = false;
      } else {
        this.issuanceLoad = false;
      }
    },

    async getInfo() {
      this.info.alarmStatus = null;
      this.info.collectionInterval = "";
      this.info.collectionNumber = "";
      this.info.currentLow = "";
      let data = {
        id: this.id,
      };
      this.info = await api.floodingInfo(data);
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.collectionInterval, [
        "isNonEmpty",
        "请输入数据采集间隔",
      ]);
      validator.add(this.info.collectionNumber, [
        "isNonEmpty",
        "请输入采集个数",
      ]);
      validator.add(this.info.currentLow, ["isNonEmpty", "请输入报警电流"]);

      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        await api.deviceSetGeneral({
          ...this.info,
          deviceId: this.deviceId,
        });
        await api.deviceSetAlarm({
          ...this.info,
          deviceId: this.deviceId,
        });
        this.$message.success("保存成功");
        this.backPage();
      }
    },
    backPage() {
      this.$router.go(-1);
    },
    // 重启
    restart() {},
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
.dataAnalysisPage {
  // background: #10153b;
  margin: 0 20px;
  width: 100%;
  position: relative;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 13px;
    height: 58px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(20, 225, 250, 0.3);
  }
  >>> .search-container {
    margin-top: 20px;
    .tip {
      font-size: 14px;
      font-weight: 400;
      color: #f2fa14;
    }
    .el-form-item__label {
      color: #14e1fa;
    }
    .el-input {
      width: 400px;
    }
    .el-input__inner {
      border-radius: 4px;
      width: 400px;
    }
    .el-input.is-disabled .el-input__inner {
      color: #e4e4e4;
      background: #00051e;
    }
  }
}
</style>
