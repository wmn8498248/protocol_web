<template>
  <el-dialog
    width="1000px"
    title="新增"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    {{ deviceStatus }}
    <el-form
      class="onoff-from"
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="140px"
    >
      <el-form-item label="任务别名" prop="jobName">
        <el-input
          v-model="dataForm.jobName"
          placeholder="请输入任务名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="开关状态">
        <!-- <el-input v-model="dataForm.jobStatus" placeholder=""></el-input> -->
        <el-switch
          v-model="deviceStatus"
          :active-value="1"
          :inactive-value="0"
          active-color="#67c23a"
          inactive-color="#f56c6c"
          active-text="开启"
          inactive-text="关闭"
        >
        </el-switch>
      </el-form-item>

      <el-form-item label="cron表达式" prop="jobCron">
        <el-input
          readonly
          v-model="dataForm.jobCron"
          placeholder="请输入cron表达式"
        ></el-input>
        <cron
          @change="changeCron"
          @close="cronPopover = false"
          i18n="cn"
        ></cron>
      </el-form-item>

      <el-form-item label="任务开关" prop="jobStatus">
        <!-- <el-input v-model="dataForm.jobStatus" placeholder=""></el-input> -->
        <el-switch
          v-model="dataForm.jobStatus"
          :active-value="0"
          :inactive-value="1"
          active-color="#67c23a"
          inactive-color="#f56c6c"
          active-text="开启"
          inactive-text="关闭"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">保存</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as api from "@/api/onoff";

import { cron } from "vue-cron";
export default {
  components: { cron },
  data() {
    return {
      visible: false,
      deviceStatus: false,
      dataForm: {
        // id: null,
        jobName: "",
        jobParam: [],
        jobCron: "",
        jobStatus: 1,
      },
      dataRule: {
        jobName: [
          { required: true, message: "任务别名不能为空", trigger: "blur" },
        ],
        jobCron: [
          { required: true, message: "cron表达式不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeCron(val) {
      this.dataForm.jobCron = val;
    },
    getItem(item) {
      console.log(item);
      this.visible = true;
      this.dataForm = item;
      this.deviceStatus = item.jobParam[0].status;
    },
    init(item, num) {
      //   let nameList = ["onoff1","onoff2","onoff3"]
      this.visible = true;
      console.log(this.dataForm);
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.dataForm.jobId = null;
        this.dataForm.jobParam = [];
        this.dataForm.jobParam.push({
          deviceId: item.id,
          onoffNum: num,
          status: item["onoff" + num],
        });
        // this.dataForm.jobParam[0]["deviceId"] = item.id;
        // this.dataForm.jobParam[0]["onoffNum"] = num;
        // this.dataForm.jobParam[0]["status"] = item["onoff" + num];
        // if (this.dataForm.id) {

        // }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.dataForm.jobParam[0].status = this.deviceStatus;

          if (this.dataForm.jobId) {
            api.jobUpdate(this.dataForm);
          } else {
            api.jobSave(this.dataForm);
          }

          this.visible = false;
          this.$emit("closeVisiblle");
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.onoff-from {
  >>> .el-tabs--border-card {
    background-color: #10153b;
    border-color: #2e374a;
  }
  >>> .el-tabs--border-card > .el-tabs__header {
    background-color: #24294c;
    border: none;
  }
  >>> .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #10153b;
    border: none;
  }
  >>> .el-input-number__increase {
    background-color: #10153b;
  }
  >>> .el-input-number__decrease {
    background-color: #10153b;
  }
  >>> .el-form-item__label {
    color: #f2f2f2;
  }
}
</style>
