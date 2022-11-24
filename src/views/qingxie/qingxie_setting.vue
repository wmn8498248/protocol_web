<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{info.deviceName}} - 命令</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px" :model="info">
        <el-form-item label="x轴相对零点(°)" required>
          <el-input type="text" placeholder="" v-model="info.xaxis" :disabled="axisDisable"></el-input>
        </el-form-item>
        <el-form-item label="y轴相对零点(°)" required>
          <el-input type="text" placeholder="" v-model="info.yaxis" :disabled="axisDisable"></el-input>
          <el-button @click="axisDisable = false" class="btn-create" style="width: 200px">
            修改x和y轴相对零点</el-button>
        </el-form-item>
        <el-form-item label="正常时间间隔(s)" required>
          <el-input type="text" placeholder="" v-model="info.normalTime" :disabled="timeDisable"></el-input>
          <el-button @click="timeDisable = false" class="btn-create" style="width: 200px">
            修改正常时间间隔</el-button>
        </el-form-item>
        <el-form-item label="布防状态" required>
          <el-radio-group v-model="info.status" style="width: 400px" :disabled="statusDisable">
            <el-radio :label="0">布放</el-radio>
            <el-radio :label="1">撤防</el-radio>
          </el-radio-group>
          <el-button @click="statusDisable = false" class="btn-create" style="width: 200px">
            布防状态
          </el-button>
        </el-form-item>
        <el-form-item label="报警时间间隔(s)" required>
          <el-input type="text" placeholder="" v-model="info.alarmTime" :disabled="warningDisable"></el-input>
        </el-form-item>
        <el-form-item label="x轴报警角度(°)" required>
          <el-input type="text" placeholder="" v-model="info.xalarm" :disabled="warningDisable"></el-input>
        </el-form-item>
        <el-form-item label="y轴报警角度(°)" required>
          <el-input type="text" placeholder="" v-model="info.yalarm" :disabled="warningDisable"></el-input>
        </el-form-item>
        <el-form-item label="报警延时(s)" required>
          <el-input type="text" placeholder="" v-model="info.alarmDelayed" :disabled="warningDisable"></el-input>
          <el-button @click="warningDisable = false" class="btn-create" style="width: 200px">
            修改报警参数
          </el-button>
        </el-form-item>
        <el-form-item label="报警轴" required>
          <el-input type="text" placeholder="" v-model="info.alarmAxis" :disabled="warningaxisDisable"></el-input>
          <el-button @click="warningaxisDisable = false" class="btn-create" style="width: 200px">
            修改报警轴
          </el-button>
        </el-form-item>
        <el-form-item label="服务器地址和端口" required>
          <el-input type="text" placeholder="" v-model="info.serverAddress" :disabled="serviceDisable"></el-input>
          <el-button @click="serviceDisable = false" class="btn-create" style="width: 200px">
            修改服务器地址和端口
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="returnStart" class="btn-clear">恢复出厂设置</el-button>
          <el-button @click="getInfo" class="btn-create">重读参数</el-button>
          <el-button @click="toSave" class="btn-create">保存</el-button>
          <el-button @click="backPage" class="btn-cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/qingxie";
import Validator from "@/utils/validator";
export default {
  name: "Qingxie_setting",
  data: function () {
    return {
      info: {
        normalTime: "",
        status: "",
        alarmTime: "",
        alarmDelayed: "",
        alarmAxis: "",
        serverAddress: "",
        yalarm: "",
        yaxis: "",
        xaxis: "",
        xalarm: "",
      },
      deviceId: 0,
			axisDisable: true,
			timeDisable: true,
			statusDisable: true,
			warningDisable: true,
			warningaxisDisable: true,
			serviceDisable: true,
    };
  },
  mounted() {
		this.deviceId = this.$route.query.deviceId || 0;
    this.getInfo();
  },
  methods: {
    async getInfo() {
      let data = {
        deviceId: this.deviceId,
      };
      let { info } = await api.tiltDetectionInfo(data);
      this.info = info;
    },
    async toSave() {
			let validator = new Validator();
			validator.add(this.info.xaxis, ["isValidNum", "x轴相对零点请输入有效数字"]);
			validator.add(this.info.yaxis, ["isValidNum", "y轴相对零点请输入有效数字"]);
			validator.add(this.info.normalTime, ["isValidNum", "正常时间间隔请输入有效数字"]);
			validator.add(this.info.alarmTime, ["isValidNum", "报警时间间隔请输入有效数字"]);
			validator.add(this.info.xalarm, ["isValidNum", "x轴报警角度请输入有效数字"]);
			validator.add(this.info.yalarm, ["isValidNum", "y轴报警角度请输入有效数字"]);
			validator.add(this.info.alarmDelayed, ["isValidNum", "报警延时请输入有效数字"]);
			validator.add(this.info.alarmAxis, ["isNonEmpty", "请输入报警轴"]);
			validator.add(this.info.serverAddress, ["isNonEmpty", "服务器地址和端口"]);
			let msg = validator.start();
			if (msg) {
			  this.$message.warning(msg);
			}else {
				await api.tiltDetectionSendOut({
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
		// 恢复出厂设置
		returnStart() {
			
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

