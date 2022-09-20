<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{info.deviceName}} - 命令</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px">
        <el-form-item label="动作" required>
          <el-select v-model="info.action" :disabled="actionDisabled">
            <el-option label="吸合" value="吸合"></el-option>
            <el-option label="松开" value="松开"></el-option>
          </el-select>
          <el-button @click="actionDisabled = false" class="btn-create"> 修改以上参数 </el-button>
        </el-form-item>
        <el-form-item label="温度偏移(°C)" required>
          <el-input type="text" v-model="info.temperatureOffset" :disabled="temperatureOffsetDisabled"></el-input>
          <el-button @click="temperatureOffsetDisabled = false" class="btn-create"> 修改以上参数 </el-button>
        </el-form-item>
        <el-form-item label="上报时间间隔(S)" required>
          <el-input type="text" v-model="info.reportTime" :disabled="reportTimeDisabled"></el-input>
          <el-button @click="reportTimeDisabled = false" class="btn-create"> 修改以上参数 </el-button>
        </el-form-item>
        <el-form-item label="温度报警上限" required>
          <el-input type="text" v-model="info.alarmHigh" :disabled="alarmHighDisabled"></el-input>
          <el-button @click="alarmHighDisabled = false" class="btn-create"> 修改以上参数 </el-button>
        </el-form-item>
        <el-form-item label="温度报警下限" required>
          <el-input type="text" v-model="info.alarmLow" :disabled="alarmLowDisabled"></el-input>
          <el-button @click="alarmLowDisabled = false" class="btn-create"> 修改以上参数 </el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click="restart" class="btn-clear">远程重启设备</el-button> -->
          <el-button @click="toSave" class="btn-create">保存 </el-button>
          <el-button @click="backPage" class="btn-cancel">返回</el-button>
        </el-form-item>
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
      info: {
        action: "",
        temperatureOffset: "",
        reportTime: "",
        alarmHigh: "",
        alarmLow: "",
      },
      deviceId: 0,
      actionDisabled: true,
			temperatureOffsetDisabled: true,
			reportTimeDisabled: true,
			alarmHighDisabled: true,
			alarmLowDisabled: true
    };
  },
  activated() {
		this.deviceId = this.$route.query.deviceId || 0;
    this.getInfo();
  },
  methods: {
    async getInfo() {                                                                                                                                                                                                                 
      let data = { 
        deviceId: this.deviceId,
      };
      let { info } = await api.temperatureControlInfo(data);
      this.info = info;
    },
    async toSave() {
			let validator = new Validator();
			validator.add(this.info.action, ["isNonEmpty", "请选择动作"]);
			validator.add(this.info.temperatureOffset, ["isNonEmpty", "请输入温度偏移"]);
			validator.add(this.info.reportTime, ["isNonEmpty", "请输入上报时间间隔"]);
			validator.add(this.info.alarmHigh, ["isNonEmpty", "请输入温度报警上限"]);
			validator.add(this.info.alarmLow, ["isNonEmpty", "请输入温度报警下限"]);
			let msg = validator.start();
			if (msg) {
			  this.$message.warning(msg);
			}else {
				await api.temperatureControlSendOut({
					...this.info,
					deviceId: this.deviceId
				});
				this.$message.success("保存成功");
				this.backPage();
			}
    },
    backPage() {
      this.$router.go(-1);
    },
		// 远程重启设备
		restart() {
			
		}
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

