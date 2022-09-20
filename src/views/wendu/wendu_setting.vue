<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>命令下发</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px">
       <!-- <el-form-item label="具体发送到传感器" required>
          <el-select v-model="info.sendServer">
            <el-option> 11</el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="电流报警值(mA)" required>
          <el-input type="text" v-model="info.currentAlarm"></el-input>
        </el-form-item>
        <el-form-item label="电流对比间隔(s)" required>
          <el-input type="text" v-model="info.currentComparison"></el-input>
        </el-form-item>
        <el-form-item label="电流对比报警差值(mA)" required>
          <el-input type="text" v-model="info.currentComparisonAlarm"></el-input>
        </el-form-item>
        <el-form-item label="高温报警值(℃)" required>
          <el-input type="text" v-model="info.highAlarm"></el-input>
        </el-form-item>
        <el-form-item label="低温报警值(℃)" required>
          <el-input type="text" v-model="info.lowAlarm"></el-input>
        </el-form-item>
        <el-form-item label="温度对比间隔(s)" required>
          <el-input type="text" v-model="info.temperatureContrast"></el-input>
        </el-form-item>
        <el-form-item label="温度对比报警差值(℃)" required>
          <el-input type="text" v-model="info.temperatureAlarm"></el-input>
        </el-form-item>
        <el-form-item label="传感器采集间隔(s)" required>
          <el-input type="text" v-model="info.deviceCollection"></el-input>
        </el-form-item>
        <el-form-item label="正常样本采集间隔(s)" required>
          <el-input type="text" v-model="info.sampleCollection"></el-input>
        </el-form-item>
        <el-form-item label="正常样本上报间隔(min)" required>
          <el-input type="text" v-model="info.sampleReport"></el-input>
        </el-form-item>
        <el-form-item label="报警样本采集间隔(s)" required>
          <el-input type="text" v-model="info.alarmSampleCollection"></el-input>
        </el-form-item>
        <el-form-item label="报警样本上报间隔(s)" required>
          <el-input type="text" v-model="info.alarmSampleReport"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="toSend" class="btn-create">发送</el-button>
          <el-button @click="backPage" class="btn-cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Validator from "@/utils/validator";
import * as api from "@/api/wendu";
export default {
  name: "Wendu_setting",
  data: function () {
    return {
      info: {
        sendServer: '',
        currentAlarm: "",
        currentComparison: "",
        currentComparisonAlarm: "",
        highAlarm: "",
        lowAlarm: "",
        temperatureAlarm: "",
        temperatureContrast: "",
        deviceCollection: "",
        sampleCollection: "",
        alarmSampleCollection: "",
        alarmSampleReport: "",
      },
      deviceId: 0,
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
		  let { info } = await api.temperatureElectricInfo(data);
		  this.info = info;
		},
    backPage() {
      this.$router.go(-1);
    },
    async toSend() {
      let validator = new Validator();
      validator.add(this.info.currentAlarm, ["isNonEmpty", "电流报警值不能为空"]);
      validator.add(this.info.currentComparison, ["isNonEmpty", "电流对比间隔不能为空"]);
      validator.add(this.info.currentComparisonAlarm, ["isNonEmpty", "电流对比报警差值不能为空"]);
      validator.add(this.info.highAlarm, ["isNonEmpty", "高温报警值不能为空"]);
      validator.add(this.info.lowAlarm, ["isNonEmpty", "低温报警值不能为空"]);
      validator.add(this.info.temperatureAlarm, ["isNonEmpty", "温度对比间隔不能为空"]);
      validator.add(this.info.temperatureContrast, ["isNonEmpty", "温度对比报警差值不能为空"]);
      validator.add(this.info.deviceCollection, ["isNonEmpty", "传感器采集间隔不能为空"]);
      validator.add(this.info.sampleCollection, ["isNonEmpty", "正常样本采集间隔不能为空"]);
      validator.add(this.info.sampleReport, ["isNonEmpty", "正常样本上报间隔不能为空"]);
      validator.add(this.info.alarmSampleCollection, ["isNonEmpty", "报警样本采集间隔不能为空"]);
      validator.add(this.info.alarmSampleReport, ["isNonEmpty", "报警样本上报间隔不能为空"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
				await api.temperatureElectricSendOut({
					...this.info,
					deviceId: this.deviceId
				});
				this.$message.success("保存成功");
				this.backPage();
			}
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
    .el-input__inner {
      border-radius: 4px;
      width: 400px;
    }
  }
}
</style>

