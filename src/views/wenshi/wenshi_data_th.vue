<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="温湿器数据图" name="1" v-if="dataInfo">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/wen-shi.png" />
          <div>
            <div class="name">{{ dataInfo.deviceName }}</div>
            <!-- <div class="status"><i class="status-icon" />在线</div> -->
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
            <div class="data-name">
              <svg-icon icon-class="shidu" style="font-size: 20px"></svg-icon>
              湿度
              <span class="data-num"> {{ dataInfo.humidityValue }}%rh </span>
            </div>
            <img class="chart-img" src="../../assets/images/001.gif" />
            <div class="chart-num">{{ dataInfo.temperatureValue }}℃</div>
            <div>{{ dataInfo.collectionTime }}</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">温度（°C）</div>
              <div>{{ dataInfo.temperatureValue }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">湿度（%rh）</div>
              <div>{{ dataInfo.humidityValue }}</div>
            </div>

            <div class="table-item">
              <div class="item-name">传感器类型</div>
              <div>温湿度传感器</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器编号</div>
              <div>{{ dataInfo.deviceId }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器别名</div>
              <div>{{ dataInfo.deviceName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史数据" name="2">
        <div class="history-content">
          <div
            class="history-chart"
            ref="chart"
            style="width: 100%; height: 354px"
          ></div>
          <div class="history-total">
            <span class="total-name">数据统计</span>
            <span>{{ temperatureData }}</span>
            <span>{{ humidityData }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="search-container">
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
            >导出表格</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { parseTime } from "@/utils/index.js";
import * as api from "@/api/wenshi";
import moment from "moment";

export default {
  name: "Wenshi_data",
  data: function () {
    return {
      dataInfo: null,
      activeName: "1",
      value1: "",
      pages: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      tableData: [],
      tableList: [],
      onload: false,
      startTime:moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
			endTime: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
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
        return +item.temperatureValue || 0;
      });
      let maxN = Math.max.apply(null, arr);
      let minN = Math.min.apply(null, arr);
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      let mean = sum / arr.length;
      let unit = "°C";
      return `温度：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(
        3
      )}${unit}`;
    },
    humidityData() {
      if (this.tableData.length == 0) {
        return "";
      }
      let arr = this.tableData.map((item) => {
        return +item.humidityValue || 0;
      });
      let maxN = Math.max.apply(null, arr);
      let minN = Math.min.apply(null, arr);
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      let mean = sum / arr.length;
      let unit = "%rh";
      return `湿度：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(
        3
      )}${unit}`;
    },
  },
  mounted() {
    // this.initEchart();
    this.deviceNumber = this.$route.query.deviceNumber || "";
    
    this.activeName = "1";
    this.getData();
  },
  methods: {
    async getData() {
      this.dataInfo = await api.thHistoryInfo({
        deviceId: this.deviceNumber,
      });
    },
    async getList() {
      this.tableData = await api.thHistoryChart({
        deviceId: this.deviceNumber,
        startTime: this.startTime,
        endTime: this.endTime,
      });
      this.tableData = this.tableData.reverse()
      this.total = this.tableData.length;
      this.cutList();
      this.initEchart();
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcel({
        url: "temperatureControlHistory/exportExcel",
        params: {
          pageNum: 1,
          pageSize: 999999999,
          deviceNumber: this.deviceNumber,
          companyId: this.companyId,
          projectId: this.projectId,
          startTime: this.startTime,
          endTime: this.endTime,
        },
      });
      this.onload = false;
    },
    initEchart() {
      const myChart = this.$echarts.init(this.$refs.chart);
      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];
      var data = [Math.random() * 300];
      for (var i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }
      const option = {
        legend: {
          data: ["温度", "湿度"],
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
              return item.createTime || "--";
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
        yAxis: [
          {
            type: "value",
            name: "温度(℃)",
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
          {
            type: "value",
            name: "湿度(%rh)",
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
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 4,
          },
          {
            start: 0,
            end: 4,
          },
        ],
        series: [
          {
            name: "温度",
            type: "line",
            yAxisIndex: 0,
            barWidth: 20, //柱图宽度
            data: this.tableData
              .map((item) => {
                return item.temperatureValue || "0";
              })
              .reverse(),
          },
          {
            name: "湿度",
            type: "bar",
            yAxisIndex: 1,
            barWidth: 20, //柱图宽度
            data: this.tableData
              .map((item) => {
                return item.humidityValue || "0";
              })
              .reverse(),
          },
        ],
      };
      myChart.setOption(option);
    },
    // 修改列表条数
    onPageSizeChange(e) {
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
      width: 64px;
    }
    .status {
      font-size: 14px;
      color: #14e1fa;
      margin-top: 15px;
      .status-icon {
        width: 8px;
        height: 8px;
        background: #14e1fa;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
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
        // color: #e62832;
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
