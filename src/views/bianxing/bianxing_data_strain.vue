<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="无线变形数据图" name="1" v-if="dataInfo">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/bian-xing.png" />
          <div>
            <div class="name">{{ dataInfo.deviceName }}</div>
            <!-- <div class="status"><i class="status-icon" />在线</div> -->
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
            <div class="data-name">
              <svg-icon icon-class="wendu" style="font-size: 20px"></svg-icon>
              温度
              <span class="data-num"> {{ dataInfo.temdev }}℃ </span
              >&nbsp;&nbsp;&nbsp;&nbsp;
              <svg-icon icon-class="dianya" style="font-size: 20px"></svg-icon>
              电压
              <span class="data-num"> {{ dataInfo.voltage }}V </span>
            </div>
            <img class="chart-img" src="../../assets/images/bianxingImg.png" />
            <div class="chart-num">变形量ε {{ dataInfo.datavalue }}</div>
            <div class="data-time">{{ dataInfo.createTime }}</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">变形量/με</div>
              <div>{{ dataInfo.datavalue }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">温度/℃</div>
              <div>{{ dataInfo.temdev }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">电压/V</div>
              <div>{{ dataInfo.voltage }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器类型</div>
              <div>无线变形传感器</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器编号</div>
              <div>{{ dataInfo.deviceId}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器别名</div>
              <div>{{ dataInfo.deviceId }}</div>
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
            >导出表格</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/bianxing";
import { parseTime } from "@/utils/index.js";
import { exportExcel } from "@/utils/exportExcel";
import moment from "moment";

export default {
  name: "Bianxing_data",
  data() {
    return {
      dataInfo: null,
      deviceNumber: "",
      companyId: 0,
      projectId: 0,
      activeName: "1",

      pages: {
        pageNum: 1,
        pageSize: 20,
      },
      startTime:moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
			endTime: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      total: 0,
      tableData: [],
      tableList: [],
      onload: false,
    };
  },
  computed: {
    temperatureData() {
      if (this.tableData.length == 0) {
        return "";
      }
      let arr = this.tableData.map((item) => {
        return +item.datavalue || 0;
      });
      let maxN = Math.max.apply(null, arr);
      let minN = Math.min.apply(null, arr);
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      let mean = sum / arr.length;
      let unit = "";
      return `形变量：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(
        3
      )}${unit}`;
    },
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
  mounted() {
    this.deviceNumber = this.$route.query.deviceNumber || "";
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
    this.activeName = "1";
    this.getData();
  },
  methods: {
    async getData() {
      this.dataInfo = await api.deformationDataInfo({
        deviceId: this.deviceNumber,
      });
    },
    async getList() {
      this.tableData = await api.deformationHistoryList({
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
        url: "deformationhistory/exportExcel",
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
      myChart.clear();
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 52,
          left: 50,
          right: 30,
          bottom: 70,
        },
        legend: {
          data: ["形变量ε"],
          textStyle: {
            color: "#fff",
          },
          top: 20,
          right: 30, //可设定图例在左、右、居中
          icon: "line",
        },
        dataZoom: [
          {
            type: "slider",
          },
          {
            type: "inside",
          },
        ],
        yAxis: {
          type: "value",
          position: "bottom",

          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        xAxis: {
          type: "category",
          // axisLine: {show: false},
          // axisLabel: {show: false},
          axisTick: { show: false },
          splitLine: { show: false },
          data: this.tableData
            .map((item) => {
              return item.createTime || "--";
            })
            .reverse(),
        },
        series: [
          {
            name: "形变量ε",
            type: "line",
            data: this.tableData
              .map((item) => {
                return item.datavalue || "0";
              })
              .reverse(),
            areaStyle: {},
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
      margin-top: 82px;
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
      width: 64px;
      height: 64px;
      margin: 0 auto;
      margin-top: 28px;
      // background: linear-gradient(90deg, #2887f0 0%, #e6c81e 50%, #e62832 100%);
      border-radius: 4px;
      position: relative;
      text-align: center;
      .line1 {
        width: 8px;
        height: 80px;
        background: #ffffff;
        border-radius: 4px;
        display: inline-block;
        position: relative;
        top: -10px;
        right: 10px;
      }
      .line2 {
        width: 1px;
        height: 60px;
        background: #23325a;
        position: absolute;
        left: 50%;
        top: 0px;
      }
      .zero {
        width: 20px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 60px;
        margin-left: -10px;
      }
    }
    .chart-num {
      // width: 100px;
      margin: 0px auto;
      margin-top: 28px;
      // margin-left: -50px;
      // margin-top: -50px;
      color: #14e1fa;
    }
    .data-time {
      margin-top: 27px;
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
