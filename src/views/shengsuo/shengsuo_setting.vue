<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>远程升级</div>
    </div>
    <div class="search-container">
      <el-form label-width="20px">
        <el-form-item label="" required>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" class="btn-create" style="width: 200px"
              >点击选择文件</el-button
            >
            <div slot="tip" class="el-upload__tip">请选择文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="" class="btn-create">提交</el-button>
          <el-button @click="goBack" class="btn-cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Shengsuo_setting",
  data: function () {
    return {
			deviceId: 0,
		};
  },
  activated() {
		this.deviceId = this.$route.query.deviceId || 0;
	},
  methods: {
		goBack() {
			this.$router.go(-1);
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
  }
}
</style>

