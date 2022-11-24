<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>{{ type == "edit" ? "单火开关传感器修改" : "单火开关传感器添加" }}</div>
    </div>
    <div class="search-container">
      <el-form label-width="200px" :model="info" :rules="rulesAnalysis">
        <el-form-item label="传感器类型"> 单火开关传感器 </el-form-item>
        <!-- <el-form-item required label="规约类型" prop="deviceType">
          <el-select v-model="info.deviceType" placeholder="请选择">
            <el-option
              v-for="item in deviceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item required label="规约Id" prop="id">
          <el-input type="text" v-model="info.id" :disabled="type == 'edit'"></el-input>
        </el-form-item>

        <el-form-item label="传感器别名" required="" prop="name">
          <el-input type="text" v-model="info.name"></el-input>
        </el-form-item>

        <el-form-item required label="网关Id" prop="gatewayId">
          <el-select v-model="info.gatewayId" clearable placeholder="请选择">
            <el-option
              :disabled="type == 'edit'"
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
        
        <el-form-item required label="开关1地址" prop="deviceClassify">
          <el-input v-model="info.onoff1Name"></el-input>
        </el-form-item>
        <el-form-item required label="开关2地址" prop="deviceClassify">
          <el-input v-model="info.onoff2Name"></el-input>
        </el-form-item>

        <el-form-item required label="开关3地址" prop="deviceClassify">
          <el-input v-model="info.onoff3Name"></el-input>
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
import * as api from "@/api/onoff";
export default {
  name: "Onoff",
  data: function () {
    return {
      deviceTypeOptions: [{
        value: 1,
        label: 'bt'
      }, {
        value: 2,
        label: '规约'
      }],
      gatewayIdList: [],

      rulesAnalysis: {
        id: [
          {
            required: true,
            message: "请输入规约Id",
            trigger: ["blur", "change"],
          },
          {
            min: 12,
            max: 12,
            message: "长度在 12 字符",
            trigger: ["blur", "change"],
          },
        ],
  
        name: [
          {
            required: true,
            message: "请输入传感器别名",
            trigger: ["blur", "change"],
          },
        ],
        gatewayId: [
          {
            required: true,
            message: "请输入网关Id",
            trigger: ["blur", "change"],
          },
        ],
        deviceClassify: [
          {
            required: true,
            message: "请输入设备分类",
            trigger: ["blur", "change"],
          },
        ],
        voltLevel: [
          {
            required: true,
            message: "请输入电压分类",
            trigger: ["blur", "change"],
          },
        ],
      },
      info: {
        gatewayId: null,
        onoff1Name:"",
        onoff2Name:"",
        onoff3Name:"",
        name: "",
        id: "",
        voltLevel: "",
        deviceClassify: "",
        onlineThreshold: "",
      },
      type: "add",
      sensorId: 0,
      companyId: 0, //公司id
      projectId: 0, //站点id
    };
  },
  activated() {
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
    this.sensorId = this.$route.query.deviceId || 0;
    this.type = this.$route.query.type || "add";
    this.getCompanyList();
    this.getInfo();
    
  },
  methods: {
    async getCompanyList() {
      let data = {
        companyId: this.projectId,
      };
      this.gatewayIdList = await api.companyList(data);
    },
    async getInfo() {
      this.info.id = "";
      this.info.name = "";
      this.info.gatewayId = null;
      this.info.deviceClassify = "";
      this.info.voltLevel = "";
      this.info.longitude = "";
      this.info.latitude = "";
      this.info.onoff1Name = "";
      this.info.onoff2Name = "";
      this.info.onoff3Name = "";
      if (this.type == "edit") {
        let data = {
          id: this.sensorId,
        };
        this.info = await api.onoffInfo(data);
      }
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.id, [
        "isNonEmpty",
        "规约Id不能为空",
      ]);
      validator.add(this.info.name, ["isNonEmpty", "传感器别名不能为空"]);
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
          await api.onofUpdae({
            ...this.info,
          });
        } else {
          await api.onoffAdd({
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
