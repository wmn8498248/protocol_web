<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{deviceName}} - 命令</div>
    </div>
    <div class="search-container">
      <el-form label-width="130px">
        <el-form-item label="设备类型" required>
          <el-select v-model="deviceType" :disabled="deviceTypeDisabled">
            <el-option label="动作次数计数器" value="动作次数计数器"></el-option>
            <el-option label="打压次数计数器" value="打压次数计数器"></el-option>
          </el-select>
          <el-button @click="deviceTypeDisabled = false" class="btn-create">修改设备类型</el-button>
        </el-form-item>
        <el-form-item label="动作报数时间(s)" required>
          <el-input type="text" v-model="actionTime" :disabled="actionTimeDisabled"></el-input>
          <el-button @click="actionTimeDisabled = false" class="btn-create">修改动作报数时间</el-button>
        </el-form-item>
        <el-form-item label="A相动作次数" required>
          <el-input type="text" v-model="actionA" :disabled="actionADisabled"></el-input>
          <el-button @click="actionADisabled = false" class="btn-create">修改A相动作次数</el-button>
        </el-form-item>
        <el-form-item label="B相动作次数" required>
          <el-input type="text" v-model="actionB" :disabled="actionBDisabled"></el-input>
          <el-button @click="actionBDisabled = false" class="btn-create">修改B相动作次数</el-button>
        </el-form-item>
        <el-form-item label="C相动作次数" required>
          <el-input type="text" v-model="actionC" :disabled="actionCDisabled"></el-input>
          <el-button @click="actionCDisabled = false" class="btn-create">修改C相动作次数</el-button>
        </el-form-item>
        <!-- <el-form-item label="断路器动作波形 是否上报标志" required>
          <el-input type="text" placeholder=""></el-input>
          <el-button @click="Disabled = false" class="btn-create">修改上报标志状态</el-button>
        </el-form-item> -->
        <el-form-item label="互感器偏移值" required>
          <el-input type="text" v-model="offset" :disabled="offsetDisabled"></el-input>
          <el-button @click="offsetDisabled = false" class="btn-create">修改偏移值</el-button>
        </el-form-item>
        <el-form-item label="门限阈值" required>
          <el-input type="text" v-model="threshold" :disabled="thresholdDisabled"></el-input>
          <el-button @click="thresholdDisabled = false" class="btn-create">修改门限阈值算法</el-button>
        </el-form-item>
        <el-form-item label="算法N值" required>
          <el-input type="text" v-model="algorithm" :disabled="algorithmDisabled"></el-input>
          <el-button @click="algorithmDisabled = false" class="btn-create">修改算法N值</el-button>
        </el-form-item>
        <el-form-item label="半波个数" required>
          <el-input type="text" v-model="halfWave" :disabled="halfWaveDisabled"></el-input>
          <el-button @click="halfWaveDisabled = false" class="btn-create">修改半波个数</el-button>
        </el-form-item>
        <el-form-item label="半波电流阈值" required>
          <el-input type="text" v-model="halfWaveThreshold" :disabled="halfWaveThresholdDisabled"></el-input>
          <el-button @click="halfWaveThresholdDisabled = false" class="btn-create">修改半波电流阈值</el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click="restart" class="btn-clear">远程重启设备</el-button> -->
					<el-button @click="getInfo" class="btn-retry">重读参数</el-button>
					<el-button @click="toSave" class="btn-create">保存 </el-button>
          <el-button @click="backPage" class="btn-cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
	import * as api from "@/api/jishu";
	import Validator from "@/utils/validator";
export default {
  name: "Jishu_setting",
  data() {
    return {
			deviceId: 0,
			deviceName: '',
			deviceType: '',
			actionTime: '',
			actionA: '',
			actionB: '',
			actionC: '',
			offset: '',
			threshold: '',
			algorithm: '',
			halfWave: '',
			halfWaveThreshold: '',
			deviceTypeDisabled: true,
			actionTimeDisabled: true,
			actionADisabled: true,
			actionBDisabled: true,
			actionCDisabled: true,
			offsetDisabled: true,
			thresholdDisabled: true,
			algorithmDisabled: true,
			halfWaveDisabled: true,
			halfWaveThresholdDisabled: true
		};
  },
  activated() {
		this.deviceId = this.$route.query.deviceId || 0;
		this.getInfo();
	},
  methods: {
		async getInfo() {
		  let { info } = await api.countingInfo({
		    deviceId: this.deviceId,
		  });
			this.deviceName = info.deviceName || '';
			this.deviceType = info.deviceType || '';
			this.actionTime = info.actionTime || '';
			this.actionA = info.actionA || '';
			this.actionB = info.actionB || '';
			this.actionC = info.actionC || '';
			this.offset = info.offset || '';
			this.threshold = info.threshold || '';
			this.algorithm = info.algorithm || '';
			this.halfWave = info.halfWave || '';
			this.halfWaveThreshold = info.halfWaveThreshold || '';
		},
		async toSave() {
			let validator = new Validator();
			validator.add(this.deviceType, ["isNonEmpty", "请选择设备类型"]);
			validator.add(this.actionTime, ["isNonEmpty", "请输入动作报数时间"]);
			validator.add(this.actionA, ["isNonEmpty", "请输入A相动作次数"]);
			validator.add(this.actionB, ["isNonEmpty", "请输入B相动作次数"]);
			validator.add(this.actionC, ["isNonEmpty", "请输入C相动作次数"]);
			validator.add(this.offset, ["isNonEmpty", "请输入互感器偏移值"]);
			validator.add(this.threshold, ["isNonEmpty", "请输入门限阈值"]);
			validator.add(this.algorithm, ["isNonEmpty", "请输入算法N值"]);
			validator.add(this.halfWave, ["isNonEmpty", "请输入半波个数"]);
			validator.add(this.halfWaveThreshold, ["isNonEmpty", "请输入采集延时"]);
			let msg = validator.start();
			if (msg) {
			  this.$message.warning(msg);
			}else {
				await api.countingSendOut({
					deviceId: this.deviceId,
					deviceType: this.deviceType,
					actionTime: this.actionTime,
					actionA: this.actionA,
					actionB: this.actionB,
					actionC: this.actionC,
					offset: this.offset,
					threshold: this.threshold,
					algorithm: this.algorithm,
					halfWave: this.halfWave,
					halfWaveThreshold: this.halfWaveThreshold
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
    .btn-create {
      width: 200px;
    }
		
		.el-input.is-disabled .el-input__inner {
			color: #e4e4e4;
			background: #00051e;
		}
  }
}
</style>

