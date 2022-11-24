<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>
        {{ type == "edit" ? "SF6气体压力传感器修改" : "SF6气体压力传感器添加" }}
      </div>
    </div>
    <div class="search-container">
      <el-form label-width="160px" :model="info" :rules="rulesAnalysis">
        <el-form-item label="传感器类型">SF6气体压力传感器 </el-form-item>

        <el-form-item required label="传感器前缀" prop="devicePrefix">
          <el-input type="text" v-model="info.devicePrefix"></el-input>
        </el-form-item>

        <!-- 验证至少是8位 -->
        <el-form-item required label="传感器编号" prop="deviceId">
          <el-input
            type="text"
            minlength="8"
            v-model="info.deviceId"
            :readonly="type == 'edit'"
          ></el-input>
        </el-form-item>
        <el-form-item required label="传感器别名" prop="deviceName">
          <el-input type="text" v-model="info.deviceName"></el-input>
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

        <el-form-item label="白名单状态" prop="isWhite">
          <el-switch
            style="display: inline-block; font-size: 18px;vertical-align: text-bottom;"
            v-model="info.isWhite"
            active-color="#67c23a"
            inactive-color="#f56c6c"
            active-text="开启"
            inactive-text="关闭">
          </el-switch>
          <!-- <el-input type="number" v-model="info.isWhite"></el-input> -->
        </el-form-item>

        <el-form-item label="白名单描述" prop="whiteDesc">
          <el-input :disabled="!info.isWhite" v-model="info.whiteDesc"></el-input>
        </el-form-item>


        <el-form-item label="经度" prop="longitude">
          <el-input type="number" v-model="info.longitude"></el-input>
        </el-form-item>

        <el-form-item label="纬度" prop="latitude">
          <el-input type="number" v-model="info.latitude"></el-input>
        </el-form-item>

        <el-form-item label="tcoOffset" prop="tco">
          <el-input type="number" v-model="info.tco"></el-input>
        </el-form-item>

        <el-form-item label="Offset" prop="offset">
          <el-input type="number" v-model="info.offset"></el-input>
        </el-form-item>

        <el-form-item label="额定值(MPa)" prop="rated">
          <el-input type="number" v-model="info.rated"></el-input>
        </el-form-item>

        <el-form-item label="量程最小值(MPa)" prop="num1">
          <el-input type="number" v-model="info.num1"></el-input>
        </el-form-item>

        <el-form-item label="量程最大值(MPa)" prop="num4">
          <el-input type="number" v-model="info.num4"></el-input>
        </el-form-item>

        <el-form-item label="低压值(MPa)" prop="num2">
          <el-input type="number" v-model="info.num2"></el-input>
        </el-form-item>

        <el-form-item label="高压值(MPa)" prop="num3">
          <el-input type="number" v-model="info.num3"></el-input>
        </el-form-item>

        <el-form-item>
          <!-- <el-button size="small" type="success" @click="coefficient()" :loading="issuanceLoad" round>温补系数</el-button> -->
          <el-button @click="toSave" class="btn-create">保存</el-button>
          <el-button @click="backPage" class="btn-cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Validator from "@/utils/validator";
import * as api from "@/api/qiya";
export default {
  name: "Qiya_edit",
  data: function () {
    return {
      gatewayIdList: [],
      rulesAnalysis: {
        devicePrefix: [
          {
            required: true,
            message: "请输入传感器前缀",
            trigger: ["blur", "change"],
          },
        ],
        deviceId: [
          {
            required: true,
            message: "请输入传感器编号",
            trigger: ["blur", "change"],
          },
          {
            min: 6,
            max: 100,
            message: "长度在 6 字符以上",
            trigger: ["blur", "change"],
          },
        ],
        deviceName: [
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
        devicePrefix: "",
        deviceId: "",
        deviceName: "",
        gatewayId: null,
        longitude: "",
        offset: "",
        num4: "",
        num2: "",
        rated: "",
        deviceClassify: "",
        num3: "",
        latitude: "",
        tco: "",
        voltLevel: "",
        num1: "",
      },
      type: "add",
      deviceId: 0,
      companyId: 0, //公司id
      projectId: 0, //站点id
    };
  },
  activated() {
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
    this.deviceId = this.$route.query.deviceId || 0;
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

    coefficient() {
    },
    async getInfo() {
      this.info.devicePrefix = "";
      this.info.deviceId = "";
      this.info.deviceName = "";
      this.info.gatewayId = null;
      this.info.longitude = "";
      this.info.offset = "";
      this.info.num4 = "";
      this.info.num2 = "";
      this.info.rated = "";
      this.info.deviceClassify = "";
      this.info.num3 = "";
      this.info.latitude = "";
      this.info.tco = "";
      this.info.voltLevel = "";
      this.info.num1 = "";
      if (this.type == "edit") {
          let data = {
          id: this.deviceId,
        };
        this.info = await api.pressureInfo(data);
      }
      
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.devicePrefix, [
        "isNonEmpty",
        "传感器前缀不能为空",
      ]);
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
          await api.pressureUpdate({
            ...this.info,
            // gatewayId: this.companyId,
            // projectId: this.projectId,
          });
        } else {
          await api.pressureSave({
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
  >>> .el-input.is-disabled .el-input__inner{
    background-color: #354446;
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
