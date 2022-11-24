<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="气压数据图" name="1" v-if="dataInfo">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/qiya.png" />
          <div>
            <div class="name">{{ dataInfo.deviceName }}</div>
            <!-- <div :class="['status', `status_${status || 0}`]"><i class="status-icon" />{{statusName || '--'}}</div> -->
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
            <div class="chart-img" ref="chart"></div>
            <div>当前气压aaa：{{ dataInfo.pressureValue }}MPa</div>
            <div>{{ dataInfo.collectionTime }}</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">当前温度(℃)</div>
              <div>{{ dataInfo.temperature }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">压力值(MPa)</div>
              <div>{{ dataInfo.pressureValue }}</div>
            </div>

            <div class="table-item">
              <div class="item-name">额定值(MPa)</div>
              <div>{{ dataInfo.rated }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">白名单状态</div>
              <div v-if="dataInfo.isWhite">
                <el-tag size="mini" type="success">开启</el-tag>
              </div>
              <div v-else><el-tag type="danger" size="mini">关闭</el-tag></div>
            </div>
            <div class="table-item">
              <div class="item-name">白名单描述</div>
              <div>{{ dataInfo.whiteDesc }}</div>
            </div>

            <div class="table-item">
              <div class="item-name">最小量程</div>
              <div>{{ dataInfo.num1 }}</div>
            </div>

            <div class="table-item">
              <div class="item-name">最大量程</div>
              <div>{{ dataInfo.num4 }}</div>
            </div>

            <div class="table-item">
              <div class="item-name">低压值</div>
              <div>{{ dataInfo.num2 }}</div>
            </div>

            <div class="table-item">
              <div class="item-name">高压值</div>
              <div>{{ dataInfo.num3 }}</div>
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
            ref="chart2"
            style="width: 100%; height: 354px"
          ></div>
          <!-- <div class="history-total">
            <span class="total-name">数据统计</span>
            <span>{{ temperatureData }}</span>
          </div> -->
          <div class="history-total">
            <span class="total-name">数据统计</span>
            <span>{{ pressureData }}</span>
          </div>
          <el-table :data="tableList" stripe style="width: 100%">
            <el-table-column
              prop="deviceName"
              label="传感器别名"
            ></el-table-column>
            <el-table-column
              prop="collectionTime"
              label="时间"
            ></el-table-column>
            <el-table-column prop="pressureValue" label="压力值(MPa)">
            </el-table-column>
            <el-table-column prop="temperature" label="当前温度(℃)">
            </el-table-column>
          </el-table>
          <div class="pagination taR mt20x">
            <el-pagination
              @size-change="onPageSizeChange"
              @current-change="onPageCurrentChange"
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
        <el-form-item label="">
          <el-button @click="getList" class="btn-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <!---->
          <download-excel
            class="export-excel-wrapper"
            :fetch="fetchData"
            :data="json_list"
            :fields="json_fields"
            name="filename.xls"
          >
            <el-button type="primary" size="small">导出EXCEL</el-button>
          </download-excel>
          <!-- <el-button @click="tableExport" class="btn-search" :loading="onload"
            >导出表格</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/qiya";
import { parseTime } from "@/utils/index.js";
import { exportExcel } from "@/utils/exportExcel";
import moment from "moment";

export default {
  name: "Qiya_data",
  data() {
    return {
      json_list: [],
      rated: null,
      json_fields: {
        传感器别名: "deviceName",
        时间: "collectionTime",
        "压力值(MPa)": "pressureValue",
        "当前温度(℃)": "temperature",
      },
      dataInfo: {
        deviceId: "",
        deviceName: "",
        pressureValue: "",
        currentValue: "",
        temperature: "",
        frameNum: "",
        collectionTime: "",
        rated: "",
        num1: null,
        num2: null,
        num3: null,
        num4: null,
      },
      deviceNumber: "",
      companyId: 0,
      projectId: 0,
      activeName: "1",

      pages: {
        pageNum: 1,
        pageSize: 20,
      },
      endTime: moment().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
      startTime: moment(new Date())
        .subtract(2, "months")
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss"),
      total: 0,
      tableData: [],
      tableList: [],
      onload: false,
      maxN: null,
      minN: null,
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
    pressureData() {
      if (this.tableData.length == 0) {
        return "";
      }
      // let arr = this.tableData.map((item) => {
      //   return +item.pressureValue || 0;
      // });
      // let maxN = Math.max.apply(null, arr);
      // let minN = Math.min.apply(null, arr);
      // let sum = 0;
      // for (let i = 0; i < arr.length; i++) {
      //   sum += arr[i];
      // }
      // let mean = sum / arr.length;
      let unit = "MPa";
      return `气压：最大值：${this.maxN}${unit} 最小值：${this.minN}${unit}`;
    },
    temperatureData() {
      if (this.tableData.length == 0) {
        return "";
      }
      let arr = this.tableData.map((item) => {
        return +item.temperature || 0;
      });
      this.maxN = Math.max.apply(null, arr);
      this.minN = Math.min.apply(null, arr);
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      let mean = sum / arr.length;
      let unit = "℃";
      return `温度：最大值：${this.maxN}${unit} 最小值：${
        this.minN
      }${unit} 平均值：${mean.toFixed(3)}${unit}`;
    },
  },
  activated() {
    this.deviceNumber = this.$route.query.deviceNumber || "";
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
    this.rated = this.$route.query.rated || 0;
    this.activeName = "1";
    this.getData();
  },

  methods: {
    async getData() {
      this.dataInfo = await api.pressureDataInfo({
        deviceId: this.deviceNumber,
      });
      // if (result === null) {
      //   // this.$router.go(-1);
      //   // this.$emit("close-after", true);
      //   // this.$message.warning("此设备不存在，无法查看！");
      // }
      if (this.dataInfo === null) {
        this.activeName = "2";
        this.getList();
      } else {
        this.$nextTick(() => {
          this.setDash();
        });
      }
    },
    setDash() {
      const myChart = this.$echarts.init(this.$refs.chart);
      myChart.clear();

      const option = {
        series: [
          {
            type: "gauge",
            min: this.dataInfo.num1 || 0,
            max: this.dataInfo.num4 || 0,
            // splitNumber: 5,

            radius: "100%",
            axisLine: {
              lineStyle: {
                width: 7,
                color: [
                  [
                    (this.dataInfo.num2 || 0 - this.dataInfo.num1 || 0) /
                      (this.dataInfo.num4 || 0 - this.dataInfo.num1 || 0),
                    "#67e0e3",
                  ],
                  [
                    (this.dataInfo.num3 || 0 - this.dataInfo.num1 || 0) /
                      (this.dataInfo.num4 || 0 - this.dataInfo.num1 || 0),
                    "#37a2da",
                  ],
                  [1, "#fd666d"],
                ],
              },
            },
            splitLine: {
              distance: -5, //-18
              length: 16,
              lineStyle: {
                color: "#14e1fa", // x轴刻度大颜色
              },
            },
            axisTick: {
              distance: 0, //-12
              length: 4,
              lineStyle: {
                color: "#14e1fa", // x轴刻度小颜色
              },
            },
            axisLabel: {
              distance: 8, //-50
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

            // axisTick: {
            //   show: false,
            // },
            // splitLine: {
            //   show: false,
            // },
            // axisLabel: {
            //   show: false,
            // },
            detail: {
              show: false,
              valueAnimation: true,
              color: "auto",
            },
            data: [
              {
                value: this.dataInfo.pressureValue,
              },
              // {
              //   value: this.num2,
              // },
              // {
              //   value: this.num3,
              // },
              // {
              //   value: this.num4,
              // },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    async fetchData() {
      this.json_list = await api.pressureHistoryList({
        deviceId: this.deviceNumber,
        startTime: this.startTime,
        endTime: this.endTime,
      });

      return this.json_list.reverse();
    },
    async getList() {
      this.tableData = await api.pressureHistoryList({
        deviceId: this.deviceNumber,
        startTime: this.startTime,
        endTime: this.endTime,
      });
      this.tableData = this.tableData.reverse();
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
      let _this = this;
      if(this.tableData.length > 0) {
        let arr = _this.tableData.map((item) => {
          return +item.pressureValue || 0;
        });
        _this.maxN = Math.max.apply(null, arr);
        _this.minN = Math.min.apply(null, arr);
      }
      console.log(_this.minN/_this.maxN)

      const option2 = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: true,
          data: ["压力", "差值", "滤波值"],
          selected: {
            压力: true,
            差值: false,
            滤波值: false,
          },
          textStyle: {
            color: "#14e1fa",
          },
          top: 0,
          icon: "roundRect",
        },
        grid: {
          top: 52,
          left: 66,
          right: 40,
          bottom: 80,
        },
        xAxis: {
          type: "category",
          // min: function (value, aaa) {
          //   return _this.startTime;
          // },
          // max: function (value) {
          //   return _this.endTime;
          // },
          // maxInterval: 3600 * 24 * 1000,
          boundaryGap: false,
          data: this.tableData
            .map((item) => {
              return item.collectionTime.replace(" ", "\n") || "--";
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
          // max: _this.maxN,
          // min: 0, 
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
            type: "slider", //无滑动条内置缩放   type: 'slider', //缩放滑动条
            show: true, //开启
            xAxisIndex: [0], //X轴滑动
            start: 0, //初始化时，滑动条宽度开始标度
            end: 100, //初始化时，滑动条宽度结束标度
            // height: 5,
          },
          {
            type: "slider", //无滑动条内置缩放   type: 'slider', //缩放滑动条
            show: true, //开启
            yAxisIndex: [0], //Y轴滑动
            left: 0,
            start: _this.maxN===0? 0 : ( _this.minN/_this.maxN) *100, //初始化时，滑动条宽度开始标度
            end: 100, //初始化时，滑动条宽度结束标度
            width: 25,
          },
        ],
        series: [
          {
            name: "压力",
            type: "line",
            data: this.tableData
              .map((item) => {
                return item.pressureValue || "0";
              })
              .reverse(),
          },
          {
            name: "差值",
            type: "line",
            data: this.tableData
              .map((item) => {
                return item.diffValue || "0";
              })
              .reverse(),
          },
          {
            name: "滤波值",
            type: "line",
            data: this.tableData
              .map((item) => {
                return item.wfValue || "0";
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
