<template>
  <div class="warningDetailPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="报警数据" name="1">
        <div class="history-content">
          <div
            class="history-chart"
            ref="chart"
            style="width: 100%; height: 354px"
          ></div>
          <div class="history-total">
            <span class="total-name">数据统计</span>
          </div>
          <el-table :data="tableList" stripe style="width: 100%">
            <el-table-column prop="updateTime" label="时间"></el-table-column>
            <el-table-column
              prop="deviceName"
              label="传感器别名"
            ></el-table-column>
            <el-table-column
              prop="pressure"
              label="压力值(MPa)"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="传感器地址"
            ></el-table-column>
          </el-table>
          <div class="pagination taR mt20x">
            <el-pagination
              @size-change="onPageSizeChange"
              @current-change="onPageCurrentChange"
              :current-page="pages.pageNum"
              :page-sizes="[5, 5, 10, 20, 50]"
              :page-size="pages.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
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
          <el-button @click="tableExport" class="btn-search" :loading="onload"
            >导出表格</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/qiya";
import { exportExcel } from "@/utils/exportExcel";
import { parseTime } from '@/utils/date.js';
export default {
  name: "Qiya_warning",
  data() {
    return {
      deviceId: 0,
      activeName: "1",
      pages: {
        pageNum: 1,
        pageSize: 20,
      },
      startTime: "",
      endTime: "",
      total: 0,
      tableData: [],
      tableList: [],
      deviceNumber: "",
      onload: false,
    };
  },
  activated() {
    this.deviceId = this.$route.query.deviceId || 0;
    this.deviceNumber = this.$route.query.deviceNumber || 0;
    this.getList();
  },
  methods: {
    async getList() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let week = date.getDay();
      week = week == 0 ? 6 : (week - 1);
      let time = new Date(`${year}/${month}/${day} 00:00:00`).getTime();
      this.startTime = parseTime(time - week * 24 * 60 * 60 * 1000);
      this.endTime = parseTime(time + (7 - week) * 24 * 60 * 60 * 1000 - 1);

      let { pageInfo } = await api.pressureAlarmHistory({
        pageNum: 1,
        pageSize: 10,
        deviceNumber: this.deviceNumber,
        startTime: this.startTime,
        endTime: this.endTime,
      });
      this.tableData = pageInfo;
      this.total = this.tableData.length;
      this.cutList();
      this.initEchart();
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcel({
        url: "pressureAlarm/exportExcelHistory",
        params: {
          deviceId: this.deviceId,
          startTime: this.startTime,
          endTime: this.endTime,
          deviceName: this.deviceNumber
        },
      });
      this.onload = false;
    },
    chooseDate(item) {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      let second = date.getSeconds();
      let week = date.getDay();
      week = week == 0 ? 6 : week - 1;
      if (item == "0") {
        this.startTime = `${year}-${month}-${day} 00:00:00`;
        this.endTime = `${year}-${month}-${day} 23:59:59`;
      } else if (item == "1") {
        let time = new Date(`${year}/${month}/${day} 00:00:00`).getTime();
        this.startTime = parseTime(time - week * 24 * 60 * 60 * 1000);
        this.endTime = parseTime(time + (7 - week) * 24 * 60 * 60 * 1000 - 1);
      } else if (item == "2") {
        this.startTime = `${year}-${month}-${1} 00:00:00`;
        let time1 = new Date(
          `${year}/${month == 12 ? 1 : month + 1}/${1} 00:00:00`
        ).getTime();
        this.endTime = parseTime(time1 - 1);
      } else if (item == "3") {
        this.startTime = `${year}-${1}-${1} 00:00:00`;
        this.endTime = `${year}-${12}-${31} 23:59:59`;
      }
    },
    initEchart() {
      const myChart = this.$echarts.init(this.$refs.chart);
      myChart.clear();
      const option = {
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
      myChart.setOption(option);
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
.warningDetailPage {
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

  >>> .el-tabs__active-bar {
    display: none;
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
    .chart-img {
      width: 150px;
      height: 150px;
      margin-top: 67px;
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

