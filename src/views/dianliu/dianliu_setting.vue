<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{ info.deviceName }} - 命令</div>
    </div>
    <div class="search-container">
      <el-form label-width="200px">
        <el-form-item>
          <!-- <el-button @click="messageBox(1)" class="btn-clear"
            >设置重启</el-button
          > -->
          <el-button @click="messageBox(2)" class="btn-create"
            >查询通用参数</el-button
          >
          <!-- <el-button @click="messageBox(3)" class="btn-create"
            >查询报警参数</el-button
          >
          <el-button @click="messageBox(4)" class="btn-create">
            查询监测参数
          </el-button> -->
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
            v-model="info.interval" 
            :disabled="disabled"
          ></el-input>
        </el-form-item>

        <el-form-item label="占空比" required>
          <el-input
            type="text"
            v-model="info.duty"
            :disabled="disabled"
          ></el-input>
        </el-form-item>

        <el-form-item label="电流门限值（A）" required>
          <el-input
            type="text"
            v-model="info.electThreshold"
            :disabled="disabled"
          ></el-input>
        </el-form-item>

        <el-form-item label="电流偏差上送值(A)" required>
          <el-input
            type="text"
            v-model="info.electOffset"
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
import * as api from "@/api/dianliu";
import Validator from "@/utils/validator";
export default {
  name: "Dianliu_setting",
  data: function () {
    return {
      dutyState: this.$store.getters.userinfo.status == 1,
      issuanceLoad: false,
      toLoadBl: true,
      info: {
        deviceName: "",
        alarmStatus: "1",
        interval: "",
        duty: "",
        electThreshold: "",
        electOffset: "",
      },
      disabled: false,
      deviceId: null,
      id: null,
      projectId: null,
      gatewayIdList: [],
    };
  },
  
  activated() {
    this.id = this.$route.query.id || 0;
    this.deviceId = this.$route.query.deviceId || 0;
    this.getInfo();
  },
  methods: {
    async defence() {
      let data = {
        deviceId: this.info.deviceId,
      };
      this.issuanceLoad = true;
      let defence = await api.defence(data);
      console.log(defence);
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
            id: this.id,
          };
          let readList = false;
          switch (res) {
            case 1:
              readList = await api.deviceReset(data);
              break;
            case 2:
              readList = await api.pressureInfo(data);
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
          // console.log();
          // if (readList) {
          //   console.log(readList, " readList______1");

          //   this.$message.success(readList.msg);
          //   this.issuanceLoad = false;
          // } else {
          //   console.log(readList, " readList______2");

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
      console.log(restart, "restart");
      if (restart) {
        this.$message.success(restart.msg);
        this.issuanceLoad = false;
      } else {
        this.issuanceLoad = false;
      }
    },

    async getInfo() {
      let data = {
        id: this.id,
      };
      this.info = await api.temperatureInfo(data);
      // this.info = info;
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.interval, [
        "isNonEmpty",
        "请输入数据采集间隔",
      ]);
      validator.add(this.info.duty, [
        "isNonEmpty",
        "请输入占空比",
      ]);
      validator.add(this.info.electOffset, ["isNonEmpty", "请输入电流偏差上送值"]);
      validator.add(this.info.electThreshold, ["isNonEmpty", "请输入电流门限值"]);

      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        await api.deviceSetGeneral({
          ...this.info,
        });
        
        this.$message.success("保存成功");
        this.backPage()
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
