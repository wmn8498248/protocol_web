<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{ info.deviceName }} - 命令</div>
    </div>
    <div class="search-container">
      <el-form ref="dataForm" label-width="140px" label-position="right" :inline="false">
        <el-row :gutter="20">
          <el-col :md="12" :lg="8">
            <el-form-item label="发送占空比">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.duty"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('duty', '发送占空比')"
                    >修改
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="发送时间间隔（S)">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.reportTime"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('reportTime', '发送时间间隔')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="变化值参数">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.variation"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('variation', '变化值参数')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="布防状态">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-switch
                    style="
                      display: inline-block;
                      font-size: 18px;
                      vertical-align: text-bottom;
                    "
                    v-model="info.alarmStatus"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#67c23a"
                    inactive-color="#f56c6c"
                    active-text="开启"
                    inactive-text="关闭"
                  >
                  </el-switch
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('alarmStatus', '布防状态')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="加热器停止温度">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.tempHigh"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('tempHigh', '加热器停止温度')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="加热器启动温度">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.tempLow"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('tempLow', '加热器启动温度')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="远程启动加热时间">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.tempTime"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('tempTime', '远程启动加热时间')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="加热器状态">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-switch
                    style="
                      display: inline-block;
                      font-size: 18px;
                      vertical-align: text-bottom;
                    "
                    v-model="info.tempStatus"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#67c23a"
                    inactive-color="#f56c6c"
                    active-text="开启"
                    inactive-text="关闭"
                  >
                  </el-switch
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('tempStatus', '加热器状态')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="加湿器停止湿度">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.humHigh"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('humHigh', '加湿器停止湿度')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="加湿器启动湿度">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.humLow"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('humLow', '加湿器启动湿度')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="远程启动加湿时间">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-input type="number" v-model="info.humTime"></el-input
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('humTime', '远程启动加湿时间')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="加湿器状态">
              <el-row :gutter="20">
                <el-col :span="17"
                  ><el-switch
                    style="
                      display: inline-block;
                      font-size: 18px;
                      vertical-align: text-bottom;
                    "
                    v-model="info.humStatus"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#67c23a"
                    inactive-color="#f56c6c"
                    active-text="开启"
                    inactive-text="关闭"
                  >
                  </el-switch
                ></el-col>
                <el-col :span="5">
                  <el-button
                    class="btn-create"
                    @click="tcSetting('humStatus', '加湿器状态')"
                    >修改
                  </el-button></el-col
                >
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button :loading="butStatus" class="btn-create" @click="messageBox(2)"
                >查询通用参数</el-button
              >
              <el-button @click="backPage" class="btn-cancel">返回</el-button>
            </el-form-item></el-col
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/wenkong";
import Validator from "@/utils/validator";
export default {
  name: "Wenkong_setting",
  data: function () {
    return {
      butStatus: false,
      timeNum: 5,
      timeRefreshItem: null,
      dutyItem: null,
      alarmStatusItem: 0,
      reportTimeItem: null,
      tempHighItem: null,
      tempLowItem: null,
      humHighItem: null,
      humLowItem: null,
      tempStatusItem: null,
      tempTimeItem: null,
      humStatusItem: 0,
      humTimeItem: null,
      variationItem: null,
      info: {
        timeRefresh: null,
        duty: null,
        alarmStatus: 0,
        reportTime: null,
        tempHigh: null,
        tempLow: null,
        humHigh: null,
        humLow: null,
        tempStatus: null,
        tempTime: null,
        humStatus: 0,
        humTime: null,
        variation: null,
      },
      deviceId: 0,
    };
  },
  activated() {
    this.deviceId = this.$route.query.deviceId || 0;
    this.$nextTick(() => {
      console.log('进入')
      this.$refs['dataForm'].resetFields()
    })
    // this.getInfo();
    // this.timeRefresh = setInterval(() => {
    //   if (this.timeNum < 1) {
    //     this.getInfo();
    //     this.timeNum = 5;
    //   }
    //   this.timeNum--;
    // }, 1000);
  },
  deactivated() {
    clearInterval(this.timeRefresh);
  },
  methods: {
    messageBox(res) {
      this.$confirm("确定提交命令到【设备：" + this.deviceId + "】", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            id: this.deviceId,
          };
          let readList = false;
          let that = this;
          that.butStatus = true;
          switch (res) {
            case 1:
              readList = await api.deviceReset(data);
              break;
            case 2:
              readList = await api.deviceQueryGeneral(data);
              setTimeout(() => {
                that.getInfo();
                that.butStatus = false;
              }, 3000);
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
        })
        .catch(() => {
          this.issuanceLoad = false;
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    tcSetting(res, name) {
      this.$confirm(
        "确定修改" + name + "=" + this.info[res] + "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          let data = {
            id: this.deviceId,
          };
          data[res] =  this.info[res];
          await api.tcDeviceSetting(data);
          this.$message.success("修改成功");
          this.getInfo();
        })
        .catch(() => {});
    },
    async getInfo() {
      let data = {
        id: this.deviceId,
      };
      this.info = await api.temperatureControlInfo(data);
      console.log(this.info, "this.info");
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.action, ["isNonEmpty", "请选择动作"]);
      validator.add(this.info.temperatureOffset, [
        "isNonEmpty",
        "请输入温度偏移",
      ]);
      validator.add(this.info.reportTime, ["isNonEmpty", "请输入上报时间间隔"]);
      validator.add(this.info.alarmHigh, ["isNonEmpty", "请输入温度报警上限"]);
      validator.add(this.info.alarmLow, ["isNonEmpty", "请输入温度报警下限"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        await api.temperatureControlSendOut({
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
    // 远程重启设备
    restart() {},
  },
};
</script>
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

    .el-input.is-disabled .el-input__inner {
      color: #e4e4e4;
      background: #00051e;
    }
  }
}
</style>
