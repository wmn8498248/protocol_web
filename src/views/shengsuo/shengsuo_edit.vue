<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>
        {{ type == "edit" ? "无线伸缩节传感器修改" : "无线伸缩节传感器添加" }}
      </div>
    </div>
    <div class="search-container">
      <el-form label-width="160px" :model="info" :rules="rulesAnalysis">
        <el-form-item label="传感器类型"> 无线伸缩节传感器 </el-form-item>
        <el-form-item label="传感器编号" required prop="deviceId">
          <el-input type="text" v-model="info.deviceId"></el-input>
        </el-form-item>

        <el-form-item label="传感器别名" required="" prop="deviceName">
          <el-input type="text" v-model="info.deviceName"></el-input>
        </el-form-item>

        <el-form-item required label="网关Id" prop="gatewayId">
          <el-select v-model="info.gatewayId" clearable placeholder="请选择">
            <el-option
              v-for="item in gatewayIdList"
              :key="item.id"
              :label="item.netName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item required label="设备分类" prop="deviceClassify">
          <el-input v-model="info.deviceClassify"></el-input>
        </el-form-item>

        <el-form-item required label="电压分类" prop="voltLevel">
          <el-input type="number" v-model="info.voltLevel"></el-input>
        </el-form-item>

        <el-form-item label="经度" prop="longitude">
          <el-input type="number" v-model="info.longitude"></el-input>
        </el-form-item>

        <el-form-item label="纬度" prop="latitude">
          <el-input type="number" v-model="info.latitude"></el-input>
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
import * as api from "@/api/shengsuo";
export default {
  name: "Shengsuo_edit",
  data: function () {
    return {
      gatewayIdList: [],

      rulesAnalysis: {
        deviceId: [
          { required: true, message: "请输入传感器编号", trigger: "blur" },
          { min: 6, max: 100, message: "长度在 6 字符以上", trigger: "blur" },
        ],
        deviceName: [
          { required: true, message: "请输入传感器别名", trigger: "blur" },
        ],
        gatewayId: [
          { required: true, message: "请输入网关Id", trigger: "blur" },
        ],
        deviceClassify: [
          { required: true, message: "请输入设备分类", trigger: "blur" },
        ],
        voltLevel: [
          { required: true, message: "请输入电压分类", trigger: "blur" },
        ],
      },
      info: {
        voltLevel: "",
        deviceClassify: "",
        gatewayId: null,
        deviceId: "",
        deviceName: "",
        address: "",
        longitude: "",
        latitude: "",
        subscribeTheme: "",
        releaseTheme: "",
      },
      type: "add",
      deviceId: 0,
      companyId: 0, //公司id
      projectId: 0, //站点id
    };
  },
  mounted() {
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
    this.deviceId = this.$route.query.deviceId || 0;
    this.type = this.$route.query.type || "add";
    this.getCompanyList();

    if (this.type == "edit") {
      this.getInfo();
    }
  },
  methods: {
    
    async getCompanyList() {
      let data = {
        companyId: this.projectId,
      };
      this.gatewayIdList = await api.companyList(data);
    },
    async getInfo() {
      let data = {
        id: this.deviceId,
      };
      this.info = await api.telescopicJointInfo(data);
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.deviceId, ["isNonEmpty", "传感器编号不能为空"]);
      validator.add(this.info.deviceName, ["isNonEmpty", "传感器别名不能为空"]);
      validator.add(this.info.gatewayId, ["isNonEmpty", "网关Id不能为空"]);
      validator.add(this.info.deviceClassify, [
        "isNonEmpty",
        "设备分类不能为空",
      ]);
      validator.add(this.info.voltLevel, ["isNonEmpty", "电压分类不能为空"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        if (this.type == "edit") {
          await api.telescopicJointUpdate({
            ...this.info,
          });
        } else {
          await api.telescopicJointSave({
            ...this.info,
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
