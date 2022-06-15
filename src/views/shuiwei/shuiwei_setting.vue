<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{info.deviceName}} - 命令</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px">
        <el-form-item label="布防状态" required>
          <el-select v-model="info.statusName" :disabled="disabled">
            <el-option label="撤防" value="1"></el-option>
            <el-option label="布防" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备模式" required>
          <el-select v-model="info.devicePattern" :disabled="disabled">
            <el-option label="安装模式" value="安装模式"></el-option>
            <el-option label="仓储模式" value="仓储模式"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据采集间隔(S)" required>
          <el-input type="text" v-model="info.dataCollection" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="采集个数" required>
          <el-input type="text" v-model="info.collectionNumber" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="水位告警低阈值(mA)" required>
          <el-input type="text" v-model="info.gasLow" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="水位告警高阈值(mA)" required>
          <el-input type="text" v-model="info.gasHigh" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="水浸告警低阈值(mV)" required>
          <el-input type="text" v-model="info.floodLow" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="水浸告警高阈值(mV)" required>
          <el-input type="text" v-model="info.floodHigh" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="采集延时(ms)" required>
          <el-input type="text" v-model="info.collectionTime" :disabled="disabled"></el-input>
          <el-button @click="disabled = false" class="btn-create"> 修改以上参数 </el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click="restart" class="btn-clear">远程重启设备</el-button> -->
          <el-button @click="getInfo" class="btn-retry">远程重读参数</el-button>
          <el-button @click="toSave" class="btn-create">保存 </el-button>
          <el-button @click="backPage" class="btn-cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/shuiwei";
import Validator from "@/utils/validator";
export default {
  name: "Shuiwei_setting",
  data: function () {
    return {
      info: {
        statusName: "",
        devicePattern: "",
        dataCollection: "",
        collectionNumber: "",
        gasLow: "",
        gasHigh: "",
        floodLow: "",
        floodHigh: "",
        collectionTime: "",
      },
      deviceId: 0,
      disabled: true
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
      let { info } = await api.waterLevelInfo(data);
      this.info = info;
    },
    async toSave() {
			let validator = new Validator();
			validator.add(this.info.statusName, ["isNonEmpty", "请选择布防状态"]);
			validator.add(this.info.devicePattern, ["isNonEmpty", "请选择设备模式"]);
			validator.add(this.info.dataCollection, ["isNonEmpty", "请输入数据采集间隔"]);
			validator.add(this.info.collectionNumber, ["isNonEmpty", "请输入采集个数"]);
			validator.add(this.info.gasLow, ["isNonEmpty", "请输入水位告警低阈值"]);
			validator.add(this.info.gasHigh, ["isNonEmpty", "请输入水位告警高阈值"]);
			validator.add(this.info.floodLow, ["isNonEmpty", "请输入水浸告警低阈值"]);
			validator.add(this.info.floodHigh, ["isNonEmpty", "请输入水浸告警高阈值"]);
			validator.add(this.info.collectionTime, ["isNonEmpty", "请输入采集延时"]);
			let msg = validator.start();
			if (msg) {
			  this.$message.warning(msg);
			}else {
				await api.waterLevelSendOut({
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

