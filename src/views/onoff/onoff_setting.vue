<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{ info.deviceName }} - 命令</div>
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
            <el-form-item label="开关编号">
              <el-select v-model="info.onoffNum" clearable placeholder="请选择">
                <el-option
                  v-for="item in numList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开关状态">
              <el-switch
                    v-model="info.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#67c23a"
                    inactive-color="#f56c6c"
                    active-text="开启"
                    inactive-text="关闭"
                  >
                  </el-switch>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="最大重发次数">
              <el-input type="number" v-model="info.sum"></el-input>
            </el-form-item>
            <el-form-item label="重发时间等级">
              <el-select v-model="info.grade" clearable placeholder="请选择">
                <el-option
                  v-for="item in timeGrade"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <!-- <el-button
                :loading="butStatus"
                class="btn-create"
                @click="messageBox(2)"
                >查询通用参数</el-button
              > -->
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
import * as api from "@/api/onoff";
import Validator from "@/utils/validator";
export default {
  name: "Wenkong_setting",
  data: function () {
    return {
      numList:[
        {label:"A", value: 1},
        {label:"B", value: 2},
        {label:"C", value: 3},
      ],
      timeGrade:[
        {label:"1s", value: 1},
        {label:"5s", value: 2},
        {label:"10s", value: 3},
        {label:"30s", value: 4},
        {label:"1m", value: 5},
        {label:"2m", value: 6},
        {label:"3m", value: 7},
      ],
      butStatus: false,
      info: {
        id: null,
        onoffNum: 1,
        status: 0,
        sum: 1,
        timeLevel: 1,
      },
      deviceId: 2,
    };
  },
  activated() {
    this.info.id = this.$route.query.deviceId || 0;
    this.$nextTick(() => {
      console.log("进入");
      this.$refs["dataForm"].resetFields();
    });
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
              that.getInfo();

              // readList = await api.onoffQuery(data);
              // setTimeout(() => {
              //   that.getInfo();
              // }, 3000);
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
        id: this.deviceId,
      };
      this.info = await api.onoffInfo(data);
      this.butStatus = false;
      console.log(this.info, "this.info");
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.onoffNum, ["isNonEmpty", "请输入开关编号"]);
      
      validator.add(this.info.status, ["isNonEmpty", "请输入开关状态"]);
      validator.add(this.info.sum, ["isNonEmpty", "请输入最大重发次数"]);
      validator.add(this.info.timeLevel, ["isNonEmpty", "请输入重发时间等级"]);
      let msg = validator.start();

      if (msg) {
        this.$message.warning(msg);
      } else {
        await api.onoffSettingNew({
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
