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

      <el-form-item label="定时开关">
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

      <el-form-item label="cron表达式">
        <el-radio-group v-model="jobCronValue">
          <el-radio :label="0">指定时间</el-radio>
          <el-radio :label="1">每周</el-radio>
          <el-radio :label="2">每周一00:00开启</el-radio>
          <el-radio :label="3">每周五24:00关闭</el-radio>
          <!-- <el-radio :label="6">每年</el-radio> -->
          <!-- <el-radio :label="9">备选项</el-radio> -->
        </el-radio-group>
        <div v-if="jobCronValue === 0">
          <el-date-picker
            v-model="endTime"
            :clearable="false"
            :picker-options="pickerOptions"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>

        <div v-if="jobCronValue === 1">
          <!-- <el-select
            v-model="weekDay"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in optionWeek"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
          <!-- <el-radio-group v-model="weekDay">
            <el-radio :label="1">周一</el-radio>
            <el-radio :label="2">周二</el-radio>
            <el-radio :label="3">周三</el-radio>
            <el-radio :label="4">周四</el-radio>
            <el-radio :label="5">周五</el-radio>
            <el-radio :label="6">周六</el-radio>
            <el-radio :label="7">周日</el-radio>
          </el-radio-group> -->

          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(item, key) in weeks"
              :label="key + 1"
              :key="key + 1"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>

          <div>
            <el-time-picker
              :clearable="false"
              v-model="weekTime"
              placeholder="选择时间"
              value-format="HH : mm : ss"
              format="HH : mm : ss"
            >
            </el-time-picker>
          </div>
        </div>
        <!-- <el-input
          readonly
          v-model="dataForm.jobCron"
          placeholder="请输入cron表达式"
        ></el-input>
        <cron
          @change="changeCron"
          @close="cronPopover = false"
          i18n="cn"
        ></cron> -->
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
import moment from "moment";
import { cron } from "vue-cron";
const weekOptions = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
// const weekOptions = [
//   { label: "周一", value: 1 },
//   { label: "周二", value: 2 },
//   { label: "周三", value: 3 },
//   { label: "周四", value: 4 },
//   { label: "周五", value: 5 },
//   { label: "周六", value: 6 },
//   { label: "周日", value: 7 },
// ];
export default {
  components: { cron },
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        },
        selectableRange:
          new Date().getHours() +
          ":" +
          (new Date().getMinutes() + 1) +
          ":00" +
          " - 23:59:59",
      },
      checkedCities: [],
      weeks: weekOptions,
      isIndeterminate: true,
      checkAll: false,
      optionWeek: [
        {
          value: 1,
          label: "周一",
        },
        {
          value: 2,
          label: "周二",
        },
        {
          value: 3,
          label: "周三",
        },
        {
          value: 4,
          label: "周四",
        },
        {
          value: 5,
          label: "周五",
        },
        {
          value: 6,
          label: "周六",
        },
        {
          value: 7,
          label: "周日",
        },
      ],
      endTime: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      weekDay: 1,
      weekTime: "23 : 59 : 59",
      jobCronValue: 0,
      visible: false,
      deviceStatus: false,
      dataForm: {
        // id: null,
        jobName: "",
        jobParam: [],
        jobCron: "59 59 23 14 12 ? 2021-2022",
        jobStatus: 1,
      },
      dataRule: {
        jobName: [
          { required: true, message: "任务别名不能为空", trigger: "blur" },
        ],
        // jobCron: [
        //   { required: true, message: "cron表达式不能为空", trigger: "blur" },
        // ],
      },
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? weekOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.weeks.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.weeks.length;
    },
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
      let that = this;
      let year;
      let month;
      let day;
      let hours;
      let minute;
      let seconds;
      switch (that.jobCronValue) {
        case 0:
          // console.log(that.endTime, "endTime");
          year = moment(that.endTime).get("year");
          month = moment(that.endTime).get("month") + 1;
          day = moment(that.endTime).get("date");
          hours = moment(that.endTime).get("hours");
          minute = moment(that.endTime).get("minute");
          seconds = moment(that.endTime).get("seconds");
          console.log(year, month, day, hours, minute, seconds);
          // "59 59 23 1 1 ? 2021-2023"

          that.dataForm.jobCron =
            seconds +
            " " +
            minute +
            " " +
            hours +
            " " +
            day +
            " " +
            month +
            " ? " +
            (year - 1) +
            "-" +
            year;
          console.log(that.dataForm.jobCron, "that.dataForm.jobCron");
          break;
        case 1:
          // 59 59 23 ? * 1,2,3 *
          let weeksList = that.weekTime.split(" : ");
          let weekDay = that.checkedCities.sort().join(",");
          if (that.isIndeterminate) {
            that.dataForm.jobCron =
              weeksList[2] +
              " " +
              weeksList[1] +
              " " +
              weeksList[0] +
              " ? * " +
              weekDay +
              " *";
          } else {
            that.dataForm.jobCron =
              weeksList[2] +
              " " +
              weeksList[1] +
              " " +
              weeksList[0] +
              " ? * * *";
          }
          // console.log(weekDay, "checkedCities");
          // console.log(that.checkedCities.sort(), "checkedCities");
          // console.log(that.isIndeterminate, "isIndeterminate");
          // console.log(that.weekTime);
          // console.log(weeksList);
          // 59 59 23 ? * 1 *
          // weekTime
          // that.dataForm.jobCron =

          break;
        case 2:
          that.dataForm.jobCron = "0 0 0 ? * 1 *";
          console.log("每周一00:00开启");
          break;
        case 3:
          that.dataForm.jobCron = "59 59 23 ? * 5 *";
          console.log("每周五24:00关闭");
          break;
        default:
          break;
      }
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
  >>> .el-radio {
    color: #d5d5d5;
  }
  // >>> .el-switch__label.is-active{
  //   color: #14e1fa;
  // }
  // >>> .el-switch__label{
  //   color: #d5d5d5;
  // }
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
