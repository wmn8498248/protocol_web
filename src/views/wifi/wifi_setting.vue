<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{ info.id }} - 命令</div>
    </div>
    <div class="search-container">
      <el-form
        ref="dataForm"
        label-width="140px"
        label-position="right"
        :inline="false"
      >
        <el-row :gutter="20">
          <el-col :md="12" :lg="8">
            <el-form-item label="wifi开关">
              <el-switch
                v-model="info.onOffStatus"
                :active-value="1"
                :inactive-value="0"
                active-color="#67c23a"
                inactive-color="#f56c6c"
                active-text="开启"
                inactive-text="关闭"
              >
              </el-switch>
            </el-form-item>
            
            <el-form-item label="上报周期(S)">
              <el-input type="number" v-model="info.collectTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="wifiSsid">
              <el-input v-model="info.wifiSsid"></el-input>
            </el-form-item>
            <el-form-item label="wifi密码">
              <el-input v-model="info.wifiPassword"></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="12" :lg="8">
            <el-form-item label="tcp地址">
              <el-input v-model="info.tcpAddress"></el-input>
            </el-form-item>

            <el-form-item label="tcp端口">
              <el-input type="number" v-model="info.tcpPort"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="messageBox(1)" class="btn-clear"
            >设置重启</el-button>
              <el-button @click="messageBox(2)" class="btn-create"
                >查询通用参数</el-button
              >
              <el-button @click="toSave" class="btn-create">保存</el-button>
              <el-button @click="backPage" class="btn-cancel">返回</el-button>
            </el-form-item></el-col
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/wifi";
import Validator from "@/utils/validator";
export default {
  name: "Wenkong_setting",
  data: function () {
    return {
      numList: [
        { label: "A", value: 1 },
        { label: "B", value: 2 },
        { label: "C", value: 3 },
      ],
      timeGrade: [
        { label: "1s", value: 1 },
        { label: "5s", value: 2 },
        { label: "10s", value: 3 },
        { label: "30s", value: 4 },
        { label: "1m", value: 5 },
        { label: "2m", value: 6 },
        { label: "3m", value: 7 },
      ],
      butStatus: false,
      info: {
        id: null,
        onOffStatus: 0,
        collectTime: null,
        wifiSsid: "",
        wifiPassword: "",
        tcpAddress: "",
        tcpPort: null,
      },
      deviceId: 2,
      timeRefresh: null,
    };
  },
  activated() {
    this.info.id = this.$route.query.deviceId || 0;
    this.$nextTick(() => {
      this.$refs["dataForm"].resetFields();
    });
    this.getInfo();
  },
  deactivated() {
    clearInterval(this.timeRefresh);
  },
  methods: {
    async getQuery() {
      await api.getQuery(data);
      // let that = this;
      // this.timeRefresh = setInterval(() => {
      //   that.getInfo();
      // }, 3000);
    },
    messageBox(res) {
      this.$confirm("确定提交命令到【设备：" + this.info.id + "】", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            id: this.info.id,
          };
          let readList = false;
          let that = this;
          that.butStatus = true;
          switch (res) {
            case 1:
              readList = await api.deviceReset(data);
              break;
            case 2:
              await api.getQuery(data);
              this.$message.success("发送成功");
              setTimeout(() => {
                that.getInfo();
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
          // this.$message({
          //   type: "info",
          //   message: "操作已取消1",
          // });
        });
    },

    async getInfo() {
      let data = {
        id: this.info.id,
      };
      // this.info = await api.onoffInfo(data);
      this.info = await api.getInfo(data);
      // this.butStatus = false;
      console.log(this.info, "this.info");
    },
    async toSave() {
      let validator = new Validator();

      let msg = validator.start();

      if (msg) {
        this.$message.warning(msg);
      } else {
        await api.deviceSetting({
          ...this.info,
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
