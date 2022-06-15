<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="水位数据图" name="1">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/shuiwei.png" />
          <div>
            <div class="name">2213银沙I线152号塔</div>
            <!-- <div class="status"><i class="status-icon" />在线</div> -->
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
            <!-- <div class="data-name">
              <svg-icon icon-class="dianliu" style="font-size: 20px"></svg-icon>
              电流
              <span class="data-num">5A</span>
            </div> -->
            <img class="chart-img" src="../../assets/images/004.gif" />
            <div class="chart-num">37mV</div>
            <div>2020-12-30 18:24:45</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">信号强度(dBm)</div>
              <div>3.93</div>
            </div>
            <div class="table-item">
              <div class="item-name">电量(%)</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">水位值(m)</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器地址</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器类型</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器编号</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器别名</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">绑定站点</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器经度(°)</div>
              <div>{{}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器纬度(°)</div>
              <div>{{}}</div>
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
            <span>x轴：最大值：3.93° 最小值：3.93° 平均值：3.93°</span>
            <span>y轴：最大值：3.93° 最小值：3.93° 平均值：3.93°</span>
          </div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="name" label="传感器别名" width="100">
            </el-table-column>
            <el-table-column prop="name" label="状态" width="100">
            </el-table-column>
            <el-table-column prop="" label="水位(m)"> </el-table-column>
            <el-table-column prop="" label="信号强度(dBm)"> </el-table-column>
            <el-table-column prop="" label="电量(%)"> </el-table-column>
            <el-table-column prop="" label="当前温度(℃)"> </el-table-column>
            <el-table-column prop="" label="传感器地址"> </el-table-column>
          </el-table>
          <div class="pagination taR mt20x">
            <el-pagination
              @size-change=""
              @current-change=""
              :current-page="pages.pageNum"
              :page-sizes="[10, 20, 50, 100]"
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
            v-model="value1"
            type="datetime"
            placeholder="选择起始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker type="datetime" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="" class="btn-search">查询</el-button>
          <el-button @click="" class="btn-search">导出表格</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Qingxie_detail",
  data: function () {
    return {
      activeName: "1",
      value1: "",
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    };
  },
  mounted() {
    this.initEchart();
  },
  methods: {
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
          data: ["模拟数据"],
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
          data: date,
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
          boundaryGap: [0, "100%"],
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
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "模拟数据",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            data: data,
          },
        ],
      };
      myChart.setOption(option);
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
      height: 64px;
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

