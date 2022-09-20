<template>
  <div class="dataAnalysisPage">
    <div class="search-container" v-if="gatewayIdList.length > 0">
      <!-- :inline="true" -->
      <el-form label-width="160px" :rules="rulesAnalysis">
        <!-- <el-form-item label="传感器类型"> 批量导入 </el-form-item> -->
        <el-form-item required label="设备类型">
          <el-select v-model="deviceType" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in deviceTypeList"
              :key="index"
              :label="item.label"
              :value="item.url"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="网关ID">
          <el-select v-model="gatewayId" clearable placeholder="请选择">
            <el-option
              v-for="item in gatewayIdList"
              :key="item.id"
              :label="item.netName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item required label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="actionUrl"
            :headers="headerObj"
            :data="{ gatewayId: gatewayId }"
            :on-success="handle_success"
            :on-preview="handlePreview"
            :file-list="fileList"
            :auto-upload="false"
          >
            <!-- <el-button size="small" type="success">选择文件</el-button> -->
            <el-button size="mini" class="btn-cancel">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item required>
          <el-button size="small" type="success" @click="submitUpload"
            >点击上传</el-button
          >
          <el-button @click="backPage" type="info">返回</el-button>
          <!-- <el-button @click="toSave" class="btn-create">上传</el-button> -->
          <!-- <el-button @click="toSave" class="btn-create">保存</el-button>
          <el-button @click="backPage" class="btn-cancel">取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="search-container" v-else>网关不存在去添加网关</div>
  </div>
</template>
<script>
import Validator from "@/utils/validator";
import * as api from "@/api/shengsuo";
import { getToken } from "@/utils/auth";

export default {
  name: "Modify-add",
  data: function () {
    return {
      deviceType: "",
      deviceTypeList: [
        { label: "SF6", url: "/sf6/device/batchSave" },
        { label: "温控器", url: "/tc/device/batchSave" },
        { label: "温湿度", url: "/th/device/batchSave" },
        { label: "水浸", url: "/wi/device/batchSave" },
      ],
      gatewayIdList: [],
      fileList: [],
      rulesAnalysis: {
        gatewayId: [
          { required: true, message: "请输入网关Id", trigger: ["blur", "change"] },
        ],
      },

      gatewayId: null,
      type: "add",
      deviceId: 0,
      companyId: 0, //公司id
      projectId: 0, //站点id
    };
  },
  computed: {
    actionUrl() {
      let tt =
        window.location.protocol +
        "//" +
        window.location.host +
        "/protocol" +
        this.deviceType;
      return tt;
    },
    headerObj() {
      return {
        token: getToken(),
      };
    },
  },
  activated() {
    this.projectId = this.$route.query.projectId || 0;
    this.getCompanyList();
  },
  methods: {
    submitUpload() {
      let typeRes = this.deviceType !== "" && this.deviceType !== null;
      let wayRes = this.gatewayId !== "" && this.gatewayId !== null;
      if (!typeRes) {
        this.$message.warning("请选择上传设备类型");
        return
      }
      if (!wayRes) {
        this.$message.warning("请选择上传网关ID");
        return
      }
      if (this.$refs.upload.uploadFiles.length == 0) {
        this.$message.warning("请选择上传文件");
        return
      }
      this.$refs.upload.submit();
    //   this.fileList = []
    },
    handle_success(res) {
      console.log(res);
      if (res.code == 200) {
        this.$message.success("上传成功");
      } else {
        this.$message.warning(res.message);
      }
      this.fileList = []
    },
    handlePreview() {
      // this.actionUrl =
      //   "http://tx2.yuanguaniot.com/protocol/tc/device/batchSave";
      console.log(this.actionUrl);
    },
    batchExcel() {
      console.log(this.projectId);
    },
    async getCompanyList() {
      let data = {
        companyId: this.projectId,
      };
      this.gatewayIdList = await api.companyList(data);
    },

    async toSave() {
      let validator = new Validator();
      validator.add(this.gatewayId, ["isNonEmpty", "网关Id不能为空"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        await api.telescopicJointSave({
          ...this.info,
        });
        this.$message.success("保存成功");
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
  display: flex;
  justify-content: center;
  .none-gateway{
  }
  .title {
    color: #fff;
    font-size: 13px;
    height: 58px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(20, 225, 250, 0.3);
  }
  >>> .el-radio {
    color: #fff;
  }
  >>> .search-container {
    color: #fff;
    margin-top: 120px;
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
