<template>
  <div class="switch-home">
    <div class="switch-home-mid">
      <div class="header"><span>无线智能开关传感器</span></div>
      <el-tabs v-model="activeName" tab-position="left" @tab-click="changeTab">
        <el-tab-pane label="传感器列表" name="first">
          <div class="switch-content">
            <el-row :gutter="10">
              <el-col :md="8" :lg="6" :xl="4" v-for="item in tableData">
                <div class="box-info">
                  <div class="item item-title">
                    {{ item.name }}
                  </div>
                  <div class="item">
                    <svg-icon icon-class="sw-wd"></svg-icon>温度：
                    {{ item.temp }}℃
                  </div>
                  <div class="item">
                    <svg-icon icon-class="sw-sd"></svg-icon>湿度：
                    {{ item.humidity }}%RH
                  </div>
                  <div class="item">
                    <svg-icon icon-class="sw-dl"></svg-icon>电流：
                    {{ item.electricity }}A
                  </div>
                  <div class="item">
                    <svg-icon icon-class="sw-rq"></svg-icon>
                    {{ item.updateTime }}
                  </div>
                  <!-- <div class="item">
                    <svg-icon icon-class="sw-rq"></svg-icon>
                    定时任务
                  </div> -->

                  <div class="box-btn-content">
                    <div class="box-btn">
                      <i class="title"
                        ><svg-icon icon-class="dengpao"></svg-icon>
                        {{ item.onoff1Name }}</i
                      >
                      <span class="timing" @click="addOrUpdateHandle(item, 1)"
                        >定时</span
                      >

                      <span
                        :class="{ status: item.onoff1 }"
                        @click="tcSetting('onoff1', item)"
                      >
                        <svg-icon
                          icon-class="sw-kg"
                          style="font-size: 35px"
                        ></svg-icon>
                      </span>
                    </div>
                    <div class="box-btn">
                      <i class="title"
                        ><svg-icon icon-class="dengpao"></svg-icon
                        >{{ item.onoff2Name }}</i
                      >
                      <span class="timing" @click="addOrUpdateHandle(item, 2)"
                        >定时</span
                      >
                      <span
                        :class="{ status: item.onoff2 }"
                        @click="tcSetting('onoff2', item)"
                        ><svg-icon
                          icon-class="sw-kg"
                          style="font-size: 35px"
                        ></svg-icon
                      ></span>
                    </div>
                    <div class="box-btn">
                      <i class="title"
                        ><svg-icon icon-class="dengpao"></svg-icon
                        >{{ item.onoff3Name }}</i
                      >
                      <span class="timing" @click="addOrUpdateHandle(item, 3)"
                        >定时</span
                      >
                      <span
                        :class="{ status: item.onoff3 }"
                        @click="tcSetting('onoff3', item)"
                        ><svg-icon
                          icon-class="sw-kg"
                          style="font-size: 35px"
                        ></svg-icon
                      ></span>
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
              :page-sizes="[12, 24, 48, 96]"
              :page-size="pages.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="任务列表" name="second">
          <el-table :data="taskData" stripe style="width: 100%">
            <!-- <el-table-column prop="jobId" label="任务Id"></el-table-column> -->
            <el-table-column prop="jobParam" label="定时任务">
              <template slot-scope="{ row }">
                <!-- <div>{{row.jobParam[0]}}</div> -->
                <!-- <p>
                    <el-tag type="success">
                      任务开关：{{ item.status ? "开启" : "关闭" }}
                    </el-tag>
                  </p>
                  <p>
                    <el-tag type="success">
                      开关设备：{{ item.deviceId }}
                    </el-tag>
                  </p>
                  <p>
                    <el-tag type="success">
                      开关ID：{{ item.onoffNum }}
                    </el-tag>
                  </p> -->
                <div
                  class="job-param"
                  v-for="(item, index) in row.jobParam"
                  :key="index"
                >
                  <!-- 创新工作室台灯定时开启 -->
                  {{ item.deviceName }} - {{ item.onoffName }} - 定时{{
                    item.status ? "开启" : "关闭"
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jobName" label="任务别名"></el-table-column>
            <el-table-column prop="jobStatus" label="任务状态">
              <template slot-scope="{ row }">
                <el-switch
                  v-model="row.jobStatus"
                  :active-value="0"
                  :inactive-value="1"
                  active-color="#67c23a"
                  inactive-color="#f56c6c"
                  active-text="开启"
                  inactive-text="关闭"
                  @change="jobChange(row)"
                >
                </el-switch>

                <!-- <el-tag type="danger" v-if="row.jobStatus">暂停</el-tag>
                <el-tag v-else>开启</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="jobCron"
              label="Cron表达式"
            ></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
            <el-table-column label="操作" width="350">
              <template slot-scope="{ row }">
                <!-- <el-button
                  v-if="adminStatus"
                  class="btn-retry"
                  size="mini"
                  @click="getLogList(row.jobId)"
                  >日志</el-button
                > -->
                <el-button
                  class="btn-detail"
                  size="mini"
                  @click="confirmPop(1, row.jobId)"
                  >立即执行</el-button
                >
                <el-button
                  class="btn-detail"
                  size="mini"
                  @click="toEdit(row.jobId)"
                  >修改</el-button
                >
                <el-button
                  class="btn-clear"
                  size="mini"
                  @click="confirmPop(0, row.jobId)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination taR mt20x">
            <el-pagination
              @size-change="onPageSizeChange1"
              @current-change="onPageCurrentChange1"
              :current-page="pages1.pageNum"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pages1.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1"
            >
            </el-pagination>
          </div>
        </el-tab-pane>

        <!-- <el-tab-pane label="日志" name="third" v-if="adminStatus">
          <el-table :data="logData" stripe style="width: 100%">
            <el-table-column prop="jobParam" label="失败列表" width="420px">
              <template slot-scope="{ row }">
                {{ row.failInfo }}
              </template>
            </el-table-column>
            <el-table-column prop="successRatio" label="成功率，成功个数/总数">
            </el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
          </el-table>
          <div class="pagination taR mt20x">
            <el-pagination
              @size-change="onPageSizeChange2"
              @current-change="onPageCurrentChange2"
              :current-page="pages1.pageNum"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pages2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2"
            >
            </el-pagination>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>

    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @closeVisiblle="closeVisiblle"
      :jobParam="jobParamData"
    ></add-or-update>
  </div>
</template>
<script>
import * as api from "@/api/onoff";
import AddOrUpdate from "./onoff-edit";

export default {
  name: "onOff",
  props: {
    companyId: Number,
  },
  components: {
    AddOrUpdate,
  },
  computed: {
    adminStatus() {
      return this.$store.state.app.update;
    },
  },
  data() {
    return {
      itemStatus: false,
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
        pageSize: 12,
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
    itemHover(res) {
      this.itemStatus = res;
      if (res) {
      } else {
      }
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
    tcSetting(name, item) {
      let statusName;
      let status;
      if (item[name]) {
        statusName = "关闭";
        status = 0;
      } else {
        statusName = "打开";
        status = 1;
      }
      // console.log(item[name])
      clearInterval(this.nowDateId);

      this.$confirm(
        "确定修改《" + item[name + "Name"] + "》状态为" + statusName + "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          let data = {
            id: item.id,
          };

          data[name] = status;

          await api.onoffSetting(data);
          item[name] = !item[name];

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
      const { records, total } = await api.onoffList(data);
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
  background-color: #091b31;
  color: #f2f2f2;
  font-size: 12px;
  padding-bottom: 40px;
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

      .item {
        line-height: 30px;
        border-bottom: 1px solid #333333;
        svg {
          margin-right: 5px;
          font-size: 16px;
        }
      }
      .item-title {
        background-color: #000000;
        // margin-bottom: 10px;
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
// @media only screen and (max-width:1366px) {
//   .switch-home{
//     min-height: 1268px;
//   }
// }
</style>
