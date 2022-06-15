<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>避雷器设置</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px">
        <el-form-item label="阻性电流K值" required>
          <el-input type="text" placeholder="系数K" v-model="numK"></el-input>
        </el-form-item>
        <el-form-item label="系数A" required>
          <el-input type="text" placeholder="系数A" v-model="numA"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSave" class="btn-create">保存</el-button>
          <el-button @click="onCancel" class="btn-cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
	import Validator from "@/utils/validator";
	import * as api from "@/api/bilei";
export default {
  name: "Bilei_set",
  data: function () {
    return {
			numK: '',
			numA: ''
		};
  },
  mounted() {},
  methods: {
		onCancel() {
			this.$router.go(-1);
		},
		async onSave() {
			let validator = new Validator();
			validator.add(this.numK, ["isNonEmpty", "阻性电流K值不能为空"]);
			validator.add(this.numA, ["isNonEmpty", "系数A不能为空"]);
			let msg = validator.start();
			if (msg) {
			  this.$message.warning(msg);
			}else {
				// await api.blqSendOut({
				// 	...this.info,
				// 	companyId: this.companyId,
				// 	projectId: this.projectId
				// });
				this.$message.success("保存成功");
				this.onCancel()
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

