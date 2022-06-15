<template>
  <div class="systemPage">
    <div class="add-container">
      <el-form label-width="140px">
        <el-form-item label="消息发送时间">
          <el-select placeholder="" @change="">
            <el-option> 11</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="" class="btn-create">保存</el-button>
          <el-button @click="" class="btn-cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.systemPage {
  margin: 20px;
  width: 100%;
  position: relative;
  >>> .add-container {
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