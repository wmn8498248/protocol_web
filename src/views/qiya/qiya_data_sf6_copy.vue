<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="气压数据图" name="1">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/qiya.png" />
          <div>
            <div class="name">{{ deviceName }}</div>
            <!-- <div :class="['status', `status_${status || 0}`]"><i class="status-icon" />{{statusName || '--'}}</div> -->
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
            <div class="chart-img" ref="chart"></div>
            <div>当前气压：{{ pressureValue }}MPa</div>
            <div>{{ collectionTime }}</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">电流值</div>
              <div>{{ currentValue }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">当前温度(℃)</div>
              <div>{{ temperature }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">压力值(MPa)</div>
              <div>{{ pressureValue }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">帧计数器</div>
              <div>{{ frameNum }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">额定值(MPa)</div>
              <div>{{ rated }}</div>
            </div>

            <div class="table-item">
              <div class="item-name">传感器别名</div>
              <div>{{ deviceName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史数据" name="2">
        <div class="history-content">
          <div
            class="history-chart"
            ref="chart2"
            style="width: 100%; height: 354px"
          ></div>
          <div class="history-total">
            <span class="total-name">数据统计</span>
            <span>{{ temperatureData }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="search-container" v-if="activeName == '2'">
      <el-form inline label-width="100px">
        <el-form-item label="">
          <el-date-picker
            type="datetime"
            placeholder="选择起始时间"
            v-model="startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            type="datetime"
            placeholder="选择结束时间"
            v-model="endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" class="btn-search">查询</el-button>
          <!-- <el-button @click="tableExport" class="btn-search" :loading="onload"
            >导出表格</el-button -->
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/qiya";
import { parseTime } from "@/utils/index.js";
import { exportExcel } from "@/utils/exportExcel";
export default {
  name: "Qiya_data",
  data() {
    return {
      deviceNumber: "",
      companyId: 0,
      projectId: 0,
      activeName: "1",
      deviceId: "",
      deviceName: "",
      pressureValue: "",
      currentValue: "",
      temperature: "",
      frameNum: "",
      collectionTime: "",
      rated: "",
      collectionTime: "",

      pages: {
        pageNum: 1,
        pageSize: 20,
      },
      startTime: "",
      endTime: "",
      total: 0,
      tableData: [],
      tableList: [],
      onload: false,
    };
  },
  watch: {
    activeName(newVal, oldVal) {
      if (newVal == "1") {
        this.getData();
      } else if (newVal == "2") {
        this.getList();
      }
    },
  },
  computed: {
    temperatureData() {
      if (this.tableData.length == 0) {
        return "";
      }
      let arr = this.tableData.map((item) => {
        return + item.pressure || 0;
      });
      let maxN = Math.max.apply(null, arr);
      let minN = Math.min.apply(null, arr);
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      let mean = sum / arr.length;
      let unit = "MPa";
      return `气压：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(
        3
      )}${unit}`;
    },
  },
  activated() {
    this.deviceNumber = this.$route.query.deviceNumber || "";
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
    let newDate = new Date().getTime();
    this.endTime = parseTime(newDate);
    this.startTime = parseTime(newDate - 24 * 60 * 60 * 1000);
    this.activeName = "1";
    this.getData();
  },
  methods: {
    async getData() {
      let result = await api.pressureDataInfo({
        deviceId: this.deviceNumber,
      });

      this.deviceId = result.deviceId;
      this.deviceName = result.deviceName || "无";
      this.pressureValue = result.pressureValue || "无";
      this.currentValue = result.currentValue || "无";
      this.temperature = result.temperature || "无";
      this.frameNum = result.frameNum || "无";
      this.collectionTime = result.collectionTime || "无";
      this.rated = result.rated || "无";
      this.setDash();
    },
    setDash() {
      const myChart = this.$echarts.init(this.$refs.chart);
      myChart.clear();
      let pressure =
        ((+this.pressure - this.num1) / (this.num4 - this.num1)) * 100;
      const option = {
        series: [
          {
            type: "gauge",
            radius: "100%",
            axisLine: {
              lineStyle: {
                width: 7,
                color: [
                  [
                    (this.num2 - this.num1) / (this.num4 - this.num1),
                    "#67e0e3",
                  ],
                  [
                    (this.num3 - this.num1) / (this.num4 - this.num1),
                    "#37a2da",
                  ],
                  [1, "#fd666d"],
                ],
              },
            },
            splitLine: {
              distance: -3, //-18
              length: 16,
              lineStyle: {
                color: "#14e1fa", // x轴刻度大颜色
              },
            },
            axisTick: {
              distance: 0, //-12
              length: 10,
              lineStyle: {
                color: "#14e1fa", // x轴刻度小颜色
              },
            },
            axisLabel: {
              distance: 2, //-50
              color: "#14e1fa", // x轴刻度文字颜色
              fontSize: 9,
            },
            anchor: {
              show: true,
              size: 12,
              itemStyle: {
                borderColor: "#14e1fa", // 中心点
                borderWidth: 2,
              },
            },

            pointer: {
              width: 2,
              length: "80%",
              itemStyle: {
                color: "auto",
              },
            },

            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
              valueAnimation: true,
              color: "auto",
            },
            data: [
              {
                value: pressure,
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    async getList() {
      let { pageInfo } = await api.pressureHistoryList({
        pageNum: 1,
        pageSize: 999999999,
        deviceNumber: this.deviceNumber,
        projectId: this.projectId,
        startTime: this.startTime,
        endTime: this.endTime,
      });
      this.tableData = pageInfo.records;
      this.total = this.tableData.length;
      this.cutList();
      this.initEchart();
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcel({
        url: "pressureHistory/exportExcel",
        params: {
          pageNum: 1,
          pageSize: 999999999,
          deviceNumber: this.deviceNumber,
          deviceName: this.deviceName,
          companyId: this.companyId,
          projectId: this.projectId,
          startTime: this.startTime,
          endTime: this.endTime,
        },
      });
      this.onload = false;
    },
    initEchart() {
      const myChart2 = this.$echarts.init(this.$refs.chart2);
      myChart2.clear();
      const option2 = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["压力"],
          textStyle: {
            color: "#fff",
          },
          top: 20,
          right: 30, //可设定图例在左、右、居中
          icon: "line",
        },
        grid: {
          top: 52,
          left: 66,
          right: 30,
          bottom: 70,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.tableData
            .map((item) => {
              return item.updateTime || "--";
            })
            .reverse(),
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "压力/MPa",
          splitLine: {
            show: false,
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
        },
        dataZoom: [
          {
            type: "slider",
          },
          {
            type: "inside",
          },
        ],
        series: [
          {
            name: "压力",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            data: this.tableData
              .map((item) => {
                return item.pressure || "0";
              })
              .reverse(),
          },
        ],
      };
      myChart2.setOption(option2);
    },
    // 修改列表条数
    onPageSizeChange(e) {
      this.pages.pageNum = 1;
      this.pages.pageSize = e;
      this.cutList();
    },
    // 修改列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.cutList();
    },
    // 分割数组
    cutList() {
      this.tableList = this.tableData.slice(
        (this.pages.pageNum - 1) * this.pages.pageSize,
        this.pages.pageNum * this.pages.pageSize
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.qingxieDataPage {
  background: #10153b;
  margin: 20px;
  width: 100%;
  position: relative;

  .search-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 7px;
    right: 0;
  }
  >>> .el-tabs__nav-wrap::after {
    background-color: rgba(20, 225, 250, 0.2);
    height: 1px;
  }
  >>> .el-tabs__item {
    height: 56px;
    line-height: 56px;
    color: rgba(20, 225, 250, 0.5);
  }
  >>> .el-tabs__item.is-active {
    color: #14e1fa;
  }
  >>> .el-tabs__nav {
    margin: 0 20px;
  }
  .data-top {
    display: flex;
    font-size: 20px;
    line-height: 14px;
    color: #ffffff;
    padding: 20px;
    align-items: center;
    .data-image {
      margin-right: 20px;
    }
    .status {
      font-size: 14px;
      margin-top: 15px;
      .status-icon {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .status_0 {
      color: #14e1fa;
      .status-icon {
        background: #14e1fa;
      }
    }
    .status_1 {
      color: #f2fa14;
      .status-icon {
        background: #f2fa14;
      }
    }
    .status_2 {
      color: #e62832;
      .status-icon {
        background: #e62832;
      }
    }
  }
  .data-detail {
    display: flex;
    padding: 0 20px;
    .data-name {
      position: relative;
      top: 50px;
      .data-num {
        color: #14e1fa;
      }
    }
  }
  .data-chart {
    background-image: url(../../assets/images/qingxieBG.png);
    background-size: cover;
    width: 400px;
    height: 400px;
    text-align: center;
    color: #ffffff;
    line-height: 38px;
    margin-right: 20px;
    position: relative;
    .chart-img {
      width: 150px;
      height: 150px;
      margin: 0 auto;
      margin-top: 67px;
    }
    .chart-num {
      width: 100px;
      height: 100px;
      margin: 0px auto;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
    }
  }
  .data-table {
    color: #ffffff;
    font-size: 14px;
    width: calc(100% - 420px);
    .table-item {
      display: flex;
      height: 47px;
      line-height: 47px;
      padding: 0 20px;
      &:nth-child(odd) {
        background: rgba(0, 5, 30, 1);
      }
      &:nth-child(even) {
        background: rgba(0, 5, 30, 0.5);
      }
      .item-name {
        width: 100px;
      }
    }
  }
  .history-content {
    background: #00051e;
    width: 100%;
    min-height: 100%;
    >>> .el-table th.is-leaf {
      height: 40px;
    }
  }
  .history-chart {
    width: 100%;
    background: #10153b;
  }
  .history-total {
    height: 45px;
    line-height: 45px;
    background: #23325a;
    font-size: 14px;
    color: #ffffff;
    padding: 0 20px;
    margin-top: 10px;
    span {
      margin-right: 30px;
    }
    .total-name {
      color: #14e1fa;
    }
  }
}
</style>
