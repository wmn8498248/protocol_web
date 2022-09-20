<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{type == 'edit' ? '断路器计数器修改' : '断路器计数器添加'}}</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px">
        <el-form-item label="传感器类型"> 断路器计数器 </el-form-item>
        <el-form-item label="传感器编号" required="">
          <el-input type="text" v-model="info.deviceNumber"></el-input>
        </el-form-item>
        <el-form-item label="传感器别名" required="">
          <el-input type="text" v-model="info.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="传感器地址" required>
          <el-input type="text" v-model="info.address"></el-input>
        </el-form-item>
        <el-form-item label="经度" required>
          <el-input type="text" v-model="info.longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度" required>
          <el-input type="text" v-model="info.latitude"></el-input>
        </el-form-item>
        <el-form-item label="订阅主题" required>
          <el-input type="text" v-model="info.subscribeTheme"></el-input>
        </el-form-item>
        <el-form-item label="发布主题" required>
          <el-input type="text" v-model="info.releaseTheme"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="toSave" class="btn-create">保存</el-button>
          <el-button @click="backPage" class="btn-cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Validator from "@/utils/validator";
import * as api from "@/api/jishu";
export default {
  name: "Jishu_edit",
  data: function () {
    return {
      info: {
        deviceNumber: "",
        deviceName: "",
        address: "",
        longitude: "",
        latitude: "",
        subscribeTheme: "",
        releaseTheme: "",
      },
      type: 'add',
      deviceId: 0,
      companyId: 0, //公司id
      projectId: 0, //站点id
    };
  },
  activated() {
		this.companyId = this.$route.query.companyId || 0;
		this.projectId = this.$route.query.projectId || 0;
		this.deviceId = this.$route.query.deviceId || 0;
		this.type = this.$route.query.type || 'add';
    if (this.type == 'edit') {
      this.getInfo();
    }
  },
  methods: {
    async getInfo() {
      let data = {
        deviceId: this.deviceId,
      };
      let { info } = await api.countingInfo(data);
      this.info = info;
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.deviceNumber, ["isNonEmpty", "传感器编号不能为空"]);
      validator.add(this.info.deviceName, ["isNonEmpty", "传感器别名不能为空"]);
      validator.add(this.info.address, ["isNonEmpty", "传感器位置不能为空"]);
      validator.add(this.info.longitude, ["isNonEmpty", "经度不能为空"]);
      validator.add(this.info.latitude, ["isNonEmpty", "纬度不能为空"]);
      validator.add(this.info.subscribeTheme, [
        "isNonEmpty",
        "订阅主题不能为空",
      ]);
      validator.add(this.info.releaseTheme, ["isNonEmpty", "发布主题不能为空"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      }else {
				if (this.type == 'edit') {
				  await api.countingUpdate({
						...this.info,
						deviceId: this.deviceId
					});
				} else {
				  await api.countingSave({
						...this.info,
						companyId: this.companyId,
						projectId: this.projectId
					});
				}
				this.$message.success("保存成功");
				this.backPage();
			}
    },
    backPage() {
      this.$router.go(-1);
    },
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

