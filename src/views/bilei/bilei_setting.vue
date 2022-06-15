<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>避雷器修改</div>
    </div>
    <div class="search-container">
      <el-form label-width="160px">
        <el-form-item label="传感器类型"> 避雷器 </el-form-item>
        <el-form-item label="板子编号" required>
          <el-select placeholder="" @change="">
            <el-option> 11</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三相" required="">
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="位置" required="">
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="避雷器序号" required="">
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="系数K" required="">
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="系数a" required="">
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="是否可用" required="">
          <el-radio-group>
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="相对计算顺序" required>
          <el-select placeholder="" @change="">
            <el-option> 11</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 是否参与三相和计算 " required="">
          <el-radio-group>
            <el-radio label="否"></el-radio>
            <el-radio label="组1"></el-radio>
            <el-radio label="组2"></el-radio>
            <el-radio label="组3"></el-radio>
            <el-radio label="组4"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="绑定站点" required>
          <el-select placeholder="" @change="">
            <el-option> 11</el-option>
          </el-select>
          <el-select placeholder="" @change="">
            <el-option> 11</el-option>
          </el-select>
          <el-select placeholder="" @change="">
            <el-option> 11</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传感器地址" required>
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="经度" required>
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="纬度" required>
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="订阅主题" required>
          <el-input type="text" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="发布主题" required>
          <el-input type="text" placeholder=""></el-input>
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
  name: "Bilei_setting",
  data: function () {
    return {};
  },
  mounted() {},
  methods: {},
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

