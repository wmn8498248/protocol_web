<template>
  <div class="equipment-edit">
    <div class="search-container">
      <el-form label-width="160px" :model="info" :rules="rulesAnalysis">
        <!-- <el-form-item  label="传感器类型">SF6气体压力传感器 </el-form-item> -->
        <!-- 验证至少是8位 -->
        <el-form-item required label="传感器编号" prop="deviceNumber">
          <el-input
            type="text"
            minlength="8"
            v-model="info.deviceNumber"
          ></el-input>
        </el-form-item>
        <el-form-item required label="传感器别名" prop="deviceName">
          <el-input type="text" v-model="info.deviceName"></el-input>
        </el-form-item>

        <el-form-item
          v-if="type != 'add'"
          required
          label="采集时间间隔"
          prop="deviceName"
        >
          <el-input type="text" v-model="info.dataCollection"></el-input>
        </el-form-item>
        <el-form-item
          v-if="type != 'add'"
          required
          label="采集数量"
          prop="deviceName"
        >
          <el-input type="text" v-model="info.collectionNumber"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="toSave" class="btn-create">保存</el-button>
          <el-button @click="btnCancel(true)" class="btn-cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Validator from "@/utils/validator";
import * as api from "@/api/dashboard";

export default {
  name: "equipmentEdit",
  data: function () {
    return {
      rulesAnalysis: {
        deviceNumber: [
          { required: true, message: "请输入传感器编号", trigger: "blur" },
          { min: 6, max: 100, message: "长度在 6 字符以上", trigger: "blur" },
        ],
        deviceName: [
          { required: true, message: "请输入传感器别名", trigger: "blur" },
        ],
      },
      info: {
        dataCollection: 0,
        collectionNumber: 0,
        deviceNumber: "",
        deviceName: "",
        companyId: 1,
        projectId: 1,
        address: "任意",
        longitude: 1,
        latitude: 1,
      },
      type: "add",
      deviceId: 0,
      companyId: 0, //公司id
      projectId: 0, //站点id
    };
  },
  mounted() {
    this.deviceId = this.$route.query.deviceId || 0;
    this.type = this.$route.query.type || "add";
    if (this.type == "edit") {
      this.getInfo();
    }
  },
  methods: {
    coefficient() {
      console.log("coefficient____TCU");
    },

    async getInfo() {
      let data = {
        deviceId: this.deviceId,
      };
      let { voltageInfo } = await api.voltageInfo(data);
      this.info = voltageInfo;
    },
    async toSave() {
      let validator = new Validator();
      validator.add(this.info.deviceNumber, [
        "isNonEmpty",
        "传感器编号不能为空",
      ]);
      validator.add(this.info.deviceName, ["isNonEmpty", "传感器别名不能为空"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        if (this.type == "edit") {
          await api.voltageUpdate({
            ...this.info,
            deviceId: this.deviceId,
          });
        } else {
          await api.voltageSave({
            ...this.info,
            companyId: 1,
            projectId: 1,
          });
        }
        this.$message.success("保存成功");
        this.btnCancel();
      }
    },
    btnCancel(res) {
      this.$emit("closedPopup", res);
    },
  },
};
</script>
<style lang="scss" scoped>
.equipment-edit {
  // background: #10153b;
  margin: 0 20px;
  width: 100%;
  position: relative;
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

