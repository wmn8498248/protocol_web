<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="断路器计数器数据图" name="1">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/ico_jishu.png" />
          <div>
            <div class="name">{{ info.name }}</div>
            <!-- <div :class="['status', `status_${status || 0}`]"><i class="status-icon" />{{statusName || '--'}}</div> -->
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
            <!-- <div class="data-name">
              <svg-icon icon-class="shidu" style="font-size: 20px"></svg-icon>
              湿度度
              <span class="data-num"> 14%rh </span>
            </div> -->
            <img class="chart-img" src="../../assets/images/jishuImg.png" />
            <div class="chart-num">
              <div class="num-item">
                <!-- <div class="num1">{{anum}}</div> -->
                <div class="num2" style="color: #e6c81e">A组</div>
              </div>
              <div class="num-item">
                <!-- <div class="num1">{{bnum}}</div> -->
                <div class="num2" style="color: #e62832">B组</div>
              </div>
              <div class="num-item">
                <!-- <div class="num1">{{cnum}}</div> -->
                <div class="num2" style="color: #14e1fa">C组</div>
              </div>
            </div>
            <div class="chart-time">{{ info.updateTime }}</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">规约id</div>
              <div>{{ info.id }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">网关通信id</div>
              <div>{{ info.sensorId }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器别名</div>
              <div>{{ info.name }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">网关id</div>
              <div>{{ info.gatewayId }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">电压等级</div>
              <div>{{ info.voltLevel }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">设备类型</div>
              <div>{{ info.deviceClassify }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">devType</div>
              <div v-if="info.devType===1">动作次数计数器</div>
              <div v-if="info.devType===2">打压次数计数器</div>
            </div>
            <div class="table-item">
              <div class="item-name">次数门限值</div>
              <div>{{ info.countUp }}</div>
            </div>
            <div class="table-item">
              <div class="item-name">更新时间</div>
              <div>{{ info.updateTime }}</div>
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
          <!-- <div class="history-total">
            <span class="total-name">数据统计</span>
            <span>{{ countData }}</span>
          </div> -->
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="deviceId" label="传感器Id"></el-table-column>
            <el-table-column prop="deviceName" label="传感器别名"></el-table-column>
            <el-table-column prop="phase" label="所属相位"></el-table-column>
            <el-table-column prop="actionNum" label="次数"></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
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
        <el-select
          v-model="typeValue"
          placeholder="请选择"
          @change="typeChange"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-form-item label="">
          <el-date-picker
            type="datetime"
            placeholder="选择起始时间"
            v-model="startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            type="datetime"
            placeholder="选择结束时间"
            v-model="endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
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
import * as api from "@/api/jishu";
import { exportExcel } from "@/utils/exportExcel";
import moment from "moment";

export default {
  name: "Jishu_data",
  data() {
    return {
      typeValue: "a",
      typeList: [
        { label: "A相", value: "a" },
        { label: "B相", value: "b" },
        { label: "C相", value: "c" },
      ],
      deviceNumber: "",
      companyId: 0,
      projectId: 0,
      activeName: "1",
      info: {
        countUp: null,
        createTime: "",
        devType: null,
        deviceClassify: "",
        gatewayId: "",
        id: "",
        name: "",
        sensorId: "",
        updateTime: "",
        voltLevel: "",
      },
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
  // computed: {
  //   countData() {
  //     if (this.tableData.length == 0) {
  //       return "";
  //     }
  //     // A
  //     let arrA = this.tableData.map((item) => {
  //       return +item.anum || 0;
  //     });
  //     let maxNA = Math.max.apply(null, arrA);
  //     let minNA = Math.min.apply(null, arrA);
  //     let sumA = 0;
  //     for (let i = 0; i < arrA.length; i++) {
  //       sumA += arrA[i];
  //     }
  //     let meanA = sumA / arrA.length;
  //     // B
  //     let arrB = this.tableData.map((item) => {
  //       return +item.bnum || 0;
  //     });
  //     let maxNB = Math.max.apply(null, arrB);
  //     let minNB = Math.min.apply(null, arrB);
  //     let sumB = 0;
  //     for (let i = 0; i < arrB.length; i++) {
  //       sumB += arrB[i];
  //     }
  //     let meanB = sumB / arrB.length;
  //     // C
  //     let arrC = this.tableData.map((item) => {
  //       return +item.cnum || 0;
  //     });
  //     let maxNC = Math.max.apply(null, arrC);
  //     let minNC = Math.min.apply(null, arrC);
  //     let sumC = 0;
  //     for (let i = 0; i < arrC.length; i++) {
  //       sumC += arrC[i];
  //     }
  //     let meanC = sumC / arrC.length;
  //     let unit = "MPa";
  //     return `动作次数：最大值：A:${maxNA}${unit}, B:${maxNB}${unit}, C:${maxNC}${unit}  最小值：A:${minNA}${unit}, B:${minNB}${unit}, C:${minNC}${unit}  平均值：A:${meanA.toFixed(
  //       3
  //     )}${unit}, B:${meanB.toFixed(3)}${unit}, C:${meanC.toFixed(3)}${unit}`;
  //   },
  // },
  activated() {
    this.deviceNumber = this.$route.query.deviceNumber || "";
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
    this.activeName = "1";
    this.getData();
  },
  methods: {
    typeChange(res) {
      this.typeValue = res;
      this.getList();
    },
    async getData() {
      this.info = await api.deviceInfo({
        id: this.deviceNumber,
      });
    },
    async getList() {
      let { records, total } = await api.indexChart({
        pageNum: 1,
        pageSize: 999999999,
        deviceId: this.deviceNumber,
        phase: this.typeValue,
      });
      this.tableData = records;
      this.total = total;
      // this.initEchart();
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcel({
        url: "countingHistory/exportExcel",
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
        },
        legend: {
          data: ["次数"],
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
            name: "次数：/次",
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
            type: "slider",
          },
          {
            type: "inside",
          },
        ],
        series: [
          {
            name: "次数",
            type: "line",
            yAxisIndex: 0,
            data: this.tableData
              .map((item) => {
                return item.actionNum || "0";
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
      this.getList();
    },
    // 修改列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.getList();
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
        color: #e62832;
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
      width: 60px;
      height: 60px;
      margin-top: 67px;
    }
    .chart-num {
      width: 250px;
      height: 100px;
      margin: 0px auto;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -125px;
      margin-top: -50px;
      display: flex;
      justify-content: space-between;
      .num1 {
        font-size: 28px;
        color: #14e1fa;
      }
      .num2 {
        font-size: 16px;
      }
    }
    .chart-time {
      margin-top: 80px;
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
