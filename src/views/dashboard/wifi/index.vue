<template>
  <div class="switch-home">
    <div class="switch-home-mid">
      <!-- <div class="header"><span>无线智能开关传感器</span></div> -->
      <div class="switch-content">
        <el-row :gutter="10">
          <el-col :md="6" :lg="6" :xl="4" v-for="item in tableData">
            <div class="box-info">
              <div class="box-info-border">
                <div class="item item-title">
                  {{ item.name }}
                </div>
                <!-- :style="{ color: item.onOffStatus ? '#13ce66' : '#909399' }" -->
                <div class="item item-wifi">
                  <svg-icon :icon-class="iconList(item)"></svg-icon>
                </div>
                <div class="item">
                  <svg-icon icon-class="sw-dl"></svg-icon>电流：
                  {{ item.electricity }}A
                </div>
                <div class="item">
                  <el-switch
                    :disabled="!item.onlineStatus"
                    v-model="item.onOffStatus"
                    @change="tcSetting(item)"
                    active-color="#13ce66"
                    inactive-color="#909399"
                    :active-value="1"
                    :inactive-value="0"
                  >
                  </el-switch>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pagination taR mt20x">
        <el-pagination
          @size-change="onPageSizeChange"
          @current-change="onPageCurrentChange"
          :current-page="pages.pageNum"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/wifi";

// import WifiBox from "@/components/WifiBox";

export default {
  name: "onOff",
  props: {
    companyId: Number,
  },
  computed: {
    adminStatus() {
      return this.$store.state.app.update;
    },
  },
  //   components: {
  //     WifiBox,
  //   },
  data() {
    return {
      logData: [],
      activeName: "first",
      taskData: [],
      jobParamData: null,
      addOrUpdateVisible: false,
      direction: "rtl",
      drawer: false,
      searchModel: { deviceId: "", deviceName: "" },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      pages2: {
        pageNum: 1,
        pageSize: 10,
      },
      total2: 0,
      pages1: {
        pageNum: 1,
        pageSize: 10,
      },
      total1: 0,
      tableData: [],
      info: {
        duty: null,
        alarmStatus: 0,
        interval: null,
        onoff1: 0,
        onoff2: 0,
        onoff3: 0,
      },
    };
  },
  created() {
    // this.getData();
    // console.log("item")
    this.getDataOut();
  },
  destroyed() {
    clearInterval(this.nowDateId);
  },

  methods: {
    iconList(item) {
      let wifiIcon = "";
      if (item.onlineStatus) {
        if (item.signalStrength >= -50) {
          wifiIcon = "wifi3";
        } else if (item.signalStrength < -50 && item.signalStrength > -70) {
          wifiIcon = "wifi2";
        } else {
          wifiIcon = "wifi1";
        }
      } else {
        wifiIcon = "wifi0";
      }
      return wifiIcon;
    },
    changeWifi(item) {
      console.log(item);
    },
    getLogList(jobId) {
      this.activeName = "third";
      this.getJobLog(jobId);
    },
    jobChange(item) {
      api.jobUpdate(item);
      this.$message({
        type: "success",
        message: "修改成功!",
      });
    },
    async getJobLog(jobId) {
      let data = {
        jobId,
        ...this.pages2,
      };
      const { records, total } = await api.jobLog(data);
      this.logData = records;
      this.total2 = total;
    },
    confirmPop(status, id) {
      let that = this;
      this.$confirm("确定执行此操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (status === 0) {
            that.toDelete(id);
          } else if (status === 1) {
            that.toRun(id);
          }
        })
        .catch(() => {});
    },
    async toEdit(id) {
      console.log(id, "id");
      const result = await api.jobInfo(id);
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.getItem(result);
      });
    },
    async toRun(id) {
      const result = await api.jobRun(id);
      this.$message.success(result);
      this.getJobList();
    },
    async toDelete(id) {
      const result = await api.delJob(id);
      this.$message.success(result);
      this.getJobList();
    },
    changeTab(tab) {
      if (tab.name === "first") {
      } else if (tab.name === "second") {
        this.getJobList();
      } else if (tab.name === "third") {
        this.getJobLog();
      }
      console.log(tab.name);
    },
    async getJobList() {
      let data = {
        jobName: "",
        jobStatus: null,
        ...this.pages1,
      };
      const { records, total } = await api.jobList(data);
      this.taskData = records;
      this.total1 = total;
      console.log(this.taskData, "taskData______");
    },
    closeVisiblle() {
      this.addOrUpdateVisible = false;
      if (this.activeName === "first") {
        this.getData();
      } else if (this.activeName === "second") {
        this.getJobList();
      } else if (this.activeName === "third") {
        this.getJobLog();
      }
    },
    // 新增 / 修改
    addOrUpdateHandle(item, num) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(item, num);
      });
    },
    getDataOut() {
      let that = this;
      clearInterval(this.nowDateId);
      this.nowDateId = setInterval(() => {
        that.getData();
      }, 5000);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    tcSetting(item) {
      let statusName;
      if (item.onOffStatus) {
        statusName = "打开";
      } else {
        statusName = "关闭";
      }
      // console.log(item[name])
      clearInterval(this.nowDateId);
      this.$confirm(
        "确定修改《" + item.name + "》状态为" + statusName + "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          await api.deviceSetting(item);
          this.$message.success("指令发送成功");
          // setTimeout(() => {
          //   this.getData();
          // }, 1000);
          let that = this;
          this.nowDateId = setInterval(() => {
            that.getData();
          }, 5000);
        })
        .catch(() => {
          item.onOffStatus = !item.onOffStatus;
          let that = this;
          this.nowDateId = setInterval(() => {
            that.getData();
          }, 5000);
        });
    },
    // 修改列表条数
    onPageSizeChange2(e) {
      this.pages2.pageSize = e;
      this.getJobLog();
    },
    // 修改列表页数
    onPageCurrentChange2(e) {
      this.pages2.pageNum = e;
      this.getJobLog();
    },

    // 修改列表条数
    onPageSizeChange1(e) {
      this.pages1.pageSize = e;
      this.getJobList();
    },
    // 修改列表页数
    onPageCurrentChange1(e) {
      this.pages1.pageNum = e;
      this.getJobList();
    },

    // 修改列表条数
    onPageSizeChange(e) {
      this.pages.pageSize = e;
      this.getData();
    },
    // 修改列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.getData();
    },
    async getData() {
      let data = {
        companyId: this.companyId,
        ...this.searchModel,
        ...this.pages,
      };
      const { records, total } = await api.deviceList(data);
      this.tableData = records;
      this.total = total;
    },
  },
};
</script>
<style lang="scss" scoped>
.switch-home {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  width: 100%;
  min-height: 90vh;
  //   background-color: #091b31;
  color: #f2f2f2;
  font-size: 12px;
  padding-bottom: 40px;
  //   background-image: url('../../../assets/images/wifi.jpg');
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   background-size: 100%;
  .job-param {
    p {
      padding: 5px 0;
    }
  }
  .header {
    text-align: center;
    font-size: 24px;
    span {
      display: inline-block;
      background-image: linear-gradient(#213d6c, #213d6c, #213d6c);
      background-color: #213d6c;
      padding: 20px 40px;
      box-shadow: 0 0 4px #213d6c;
      border-radius: 5px;
    }
  }
  .switch-content {
    padding: 20px;

    .box-info {
      background-color: #213d6c;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      margin-bottom: 10px;
      .box-info-border {
        // border: 1px solid #818080;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 5px #f2f2f2;
      }
      .item-title {
        background-color: #003366;
      }
      .item {
        line-height: 30px;
        svg {
          margin-right: 5px;
          font-size: 16px;
        }
      }
      .item-wifi {
        color: #909399;
        svg {
          font-size: 40px;
        }
      }
    }
    .box-btn-content {
      // border-top: 5px solid #ffffff;
      box-shadow: 0 0 5px #ffffff;
      border-radius: 10px;
    }
    .box-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      .title {
        flex: 1;
        font-style: normal;
        text-align: left;
        svg {
          font-size: 24px;
          color: #ffffff;
          animation: changeing 1s infinite ease-in-out;
        }
      }

      span {
        display: inline-block;
        background-color: #ffffff;
        // border: 1px solid #ffffff;
        margin: 5px;
        cursor: pointer;
        padding: 5px;
        color: #ff3300;
        border-radius: 50%;
      }
      span.status {
        //   animation: twinkling 1s infinite ease-in-out;
        animation-fill-mode: both;
        color: #00cc00;
      }
      span:hover {
        color: #00cc00;
        background-color: #1a2e53;
      }
      span.status:hover {
        color: #ff3300;
        animation: none;
      }
      span.timing {
        border-radius: 4px;
        padding: 6px;
        // background-color: initial;
      }
    }
  }
  @keyframes changeing {
    0% {
      color: #00cc00;
    }
    25% {
      color: #b3a81a;
    }
    50% {
      color: #db1acb;
    }
    100% {
      color: #00cc00;
    }
  }

  @keyframes twinkling {
    0% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.12);
    }
    100% {
      opacity: 0.2;
      transform: scale(1);
    }
  }
}
</style>
