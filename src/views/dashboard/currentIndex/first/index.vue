<template>
  <div class="current-first">
    <div class="home-flex">
      <div class="home-box flex-box">
        <img class="boxbg01" src="../../../../assets/images/boxbg01.png" />
        <img class="boxbg02" src="../../../../assets/images/boxbg02.png" />
        <!-- <img class="boxbg03" src="../../../../assets/images/boxbg03.png" />
        <img class="boxbg04" src="../../../../assets/images/boxbg04.png" /> -->
        <img class="boxbg05" src="../../../../assets/images/boxbg05.png" />

        <div class="box-title">
          <img class="title-img" src="../../../../assets/images/title1.png" />
          <span>全部设备</span>
          <img class="title-img" src="../../../../assets/images/title2.png" />
        </div>
        <div class="box-title-add">
          <el-button class="btn-retry" @click="addList">添加设备</el-button>
        </div>
        <div class="box-container" style="height: calc(100% - 102px)">
          <!-- <img  class="box-right" src="../../../../assets/images/right.png" /> -->
          <ul>
            <!-- <li class="add-list">
              <el-button class="btn-retry" @click="addList">新增设备</el-button>
            </li> -->
            <li
              :class="{ status: voltageIndex == index }"
              v-for="(item, index) in voltageList.records"
              :key="index"
            >
              <span style="width: 100%" @click="voltageItem(item, index)">{{
                item.deviceName
              }}</span>
              <span class="voltage-right"
                ><el-button class="btn-map" @click="toUpdata(item.deviceId)"
                  >修改</el-button
                ><el-button
                  @click="toDelete(item.deviceNumber)"
                  class="btn-clear"
                  >删除</el-button
                ></span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="home-box" style="flex: 1">
        <img class="boxbg01" src="../../../../assets/images/boxbg01.png" />
        <img class="boxbg02" src="../../../../assets/images/boxbg02.png" />
        <img class="boxbg03" src="../../../../assets/images/boxbg03.png" />
        <img class="boxbg04" src="../../../../assets/images/boxbg04.png" />
        <img class="boxbg05" src="../../../../assets/images/boxbg05.png" />
        <div class="box-title">
          <img class="title-img" src="../../../../assets/images/title1.png" />
          <span>路线走势图</span>
          <img class="title-img" src="../../../../assets/images/title2.png" />
          <div class="dash_dater">
            <div
              class="dash_dater_item"
              :style="{ opacity: times == '日' ? 1 : 0.5 }"
              @click="changeTimes('日')"
            >
              日
            </div>
            <div class="dash_dater_border"></div>
            <div
              class="dash_dater_item"
              :style="{ opacity: times == '周' ? 1 : 0.5 }"
              @click="changeTimes('周')"
            >
              周
            </div>
            <div class="dash_dater_border"></div>
            <div
              class="dash_dater_item"
              :style="{ opacity: times == '月' ? 1 : 0.5 }"
              @click="changeTimes('月')"
            >
              月
            </div>
          </div>
        </div>
        <div v class="box-container" style="overflow: hidden">
          <div ref="chart0" style="width: 100%; height: 100%"></div>
        </div>
        <!-- <div v-else class="none-font">
            <svg-icon icon-class="none"></svg-icon>
            <p>暂无数据</p>
          </div> -->
      </div>
    </div>

    <div class="home-flex">
      <div class="home-box flex-box">
        <img class="boxbg01" src="../../../../assets/images/boxbg01.png" />
        <img class="boxbg02" src="../../../../assets/images/boxbg02.png" />
        <!-- <img class="boxbg03" src="../../../../assets/images/boxbg03.png" />
        <img class="boxbg04" src="../../../../assets/images/boxbg04.png" /> -->
        <img class="boxbg05" src="../../../../assets/images/boxbg05.png" />
        <div class="box-title">
          <img class="title-img" src="../../../../assets/images/title1.png" />
          <span>全部路线</span>
          <img class="title-img" src="../../../../assets/images/title2.png" />
        </div>
        <div class="box-container">
          <ul>
            <li
              :class="checkbox.includes(index) ? 'active' : ''"
              v-for="(item, index) in voltageList.records"
              :key="index"
              style="padding: 0 20px"
            >
              <div @click="check(item.deviceNumber, index)">
                {{ item.deviceName }}
              </div>
              <el-select
                @change="deviceChange"
                style="width: 100%"
                v-model="deviceValue[index]"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
      </div>
      <div class="home-box" style="flex: 1">
        <img class="boxbg01" src="../../../../assets/images/boxbg01.png" />
        <img class="boxbg02" src="../../../../assets/images/boxbg02.png" />
        <img class="boxbg03" src="../../../../assets/images/boxbg03.png" />
        <img class="boxbg04" src="../../../../assets/images/boxbg04.png" />
        <img class="boxbg05" src="../../../../assets/images/boxbg05.png" />
        <div class="box-title">
          <img class="title-img" src="../../../../assets/images/title1.png" />
          <span>路线走势图</span>
          <img class="title-img" src="../../../../assets/images/title2.png" />
          <div class="dash_dater">
            <div
              class="dash_dater_item"
              :style="{ opacity: timesMultiple == '日' ? 1 : 0.5 }"
              @click="changeTimesMultiple('日')"
            >
              日
            </div>
            <div class="dash_dater_border"></div>
            <div
              class="dash_dater_item"
              :style="{ opacity: timesMultiple == '周' ? 1 : 0.5 }"
              @click="changeTimesMultiple('周')"
            >
              周
            </div>
            <div class="dash_dater_border"></div>
            <div
              class="dash_dater_item"
              :style="{ opacity: timesMultiple == '月' ? 1 : 0.5 }"
              @click="changeTimesMultiple('月')"
            >
              月
            </div>
          </div>
        </div>
        <div class="box-container" style="overflow: hidden">
          <div ref="chart1" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/dashboard";
import { exportExcelAlarm } from "@/utils/exportExcel";
import vueSeamlessScroll from "vue-seamless-scroll";
import jlData from "../../jlData.json";
import moment from "moment";
export default {
  data() {
    return {
      branchList: [],
      voltageData: null,
      myChartStatusA: true,
      checkbox: [],
      times: "日",
      timesMultiple: "日",
      options: [
        {
          value: "0a",
          label: "A路",
        },
        {
          value: "0b",
          label: "B路",
        },
        {
          value: "0c",
          label: "C路",
        },
        {
          value: "0d",
          label: "D路",
        },
      ],
      optionsLine: {
        "0a": "线路A",
        "0b": "线路B",
        "0c": "线路C",
        "0d": "线路D",
      },
      deviceValue: [],
      historyListA: [],
      historyListB: [],
      historyListC: [],
      historyListD: [],
      voltageIndex: 1,
      myChart0: null,
      myChart1: null,
      myChartId: null,
      voltageList: [],
    };
  },
  mounted() {
    this.myChart0 = this.$echarts.init(this.$refs.chart0);
    this.myChart1 = this.$echarts.init(this.$refs.chart1);
    this.myChartId = window.addEventListener("resize", () => {
      this.myChart0.resize();
      this.myChart1.resize();
    });
  },
  components: {
    vueSeamlessScroll,
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },

  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    this.getData();
  },
  methods: { 
    deviceChange(res) {
      this.branchList = [];
      this.deviceValue.forEach((element, index) => {
        element.forEach((item) => {
          if (item) {
            this.branchList.push({
              companyId: 1,
              projectId: 1,
              deviceId: this.voltageList.records[index].deviceId,
              branch: item,
            });
          }
        });
      });
      this.deviceMultiple(this.branchList);
    },
    async deviceMultiple(resJson) {
      this.renewChart1(resJson);
    },
    //多选
    check(deviceNumber, i) {
      var idx = this.checkbox.indexOf(i);
      //如果已经选中了，那就取消选中，如果没有，则选中
      if (idx > -1) {
        this.checkbox.splice(idx, 1);
      } else {
        this.checkbox.push(i);
      }
    },
    async toUpdata(deviceId) {
      this.$emit("moreInfoPopup", "修改设备");
      this.$router.push({
        path: "/lz/equipmentEdit",
        query: {
          type: "edit",
          deviceId: deviceId,
        },
      });
    },
    async toDelete(deviceNumbers) {
      this.$confirm("确定删除该设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            deviceNumbers: [deviceNumbers],
          };
          await api.voltageDelete(data);
          this.$message.success("删除成功");
          this.getData();
        })
        .catch(() => {});
    },
    addList() {
      this.$emit("moreInfoPopup", "添加设备");
      this.$router.push({
        path: "/lz/equipmentEdit",
        query: {
          type: "add",
        },
      });
    },
    // 修改时间
    async changeTimes(times) {
      this.times = times;
      this.voltageItem(this.voltageData, this.voltageIndex);
    },

    async changeTimesMultiple(times) {
      this.timesMultiple = times;
      this.deviceMultiple(this.branchList);
    },

    async voltageItem(res, index) {
      this.voltageIndex = index;
      this.voltageData = res;
      let deviceId = res.deviceId;
      let voltageHistoryEntityList = [
        { companyId: 1, projectId: 1, deviceId: deviceId, branch: "0a" },
        { companyId: 1, projectId: 1, deviceId: deviceId, branch: "0b" },
        { companyId: 1, projectId: 1, deviceId: deviceId, branch: "0c" },
        { companyId: 1, projectId: 1, deviceId: deviceId, branch: "0d" },
      ];
      let deviceList = null;
      switch (this.times) {
        case "日":
          deviceList = await api.historyListDay({
            voltageHistoryEntityList: voltageHistoryEntityList,
          });
          break;
        case "周":
          deviceList = await api.historyListWeek({
            voltageHistoryEntityList: voltageHistoryEntityList,
          });
          break;
        case "月":
          deviceList = await api.historyListMonth({
            voltageHistoryEntityList: voltageHistoryEntityList,
          });
          break;
        default:
          break;
      }
      if (deviceList.data.length == 0) {
        return;
      }

      let chartSeries = [];
      let legendData = [];

      deviceList.data.forEach((element, elIndex) => {
        legendData.push(
          element.deviceName + "——" + this.optionsLine[element.branch]
        );
        let dataLenght = [];
        element.historyList.forEach((item, lenIndex) => {
          dataLenght[lenIndex] = [item.time, item.voltage];
        });
        chartSeries.push({
          name: element.deviceName + "——" + this.optionsLine[element.branch],
          type: "line",
          data: dataLenght,
        });
      });
      this.myChart0.clear();
      this.myChart0.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: keyData,
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          data: legendData,
          textStyle: {
            color: "#fff",
          },
          top: 15,
          left: 25,
          icon: "circle",
        },
        grid: {
          top: 62,
          left: 75,
          right: 30,
          bottom: 50,
        },
        xAxis: {
          type: "time",
          boundaryGap: true,
          // data: this.listBjUp.map((item) => {
          //   return item.name;
          // }),
          // data: timeList,
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
        },
        yAxis: {
          nameTextStyle: {
            color: "#3BDFFF",
          },
          type: "value",
          splitLine: {
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
            // show: true,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
          },
        ],
        series: chartSeries,
      });
    },

    async renewChart1(voltageHistoryEntityList, hisTitle) {
      let deviceList = [];
      // this.voltageListChartB = voltageHistoryEntityList
      switch (this.timesMultiple) {
        case "日":
          deviceList = await api.historyListDay({
            voltageHistoryEntityList: voltageHistoryEntityList,
          });
          break;
        case "周":
          deviceList = await api.historyListWeek({
            voltageHistoryEntityList: voltageHistoryEntityList,
          });
          break;
        case "月":
          deviceList = await api.historyListMonth({
            voltageHistoryEntityList: voltageHistoryEntityList,
          });
          break;
        default:
          break;
      }
      if (deviceList.data.length == 0) {
        this.myChart1.clear();
        return;
      }

      let chartSeries = [];
      let legendData = [];

      deviceList.data.forEach((element, elIndex) => {
        legendData.push(
          element.deviceName + "——" + this.optionsLine[element.branch]
        );
        let dataLenght = [];
        element.historyList.forEach((item, lenIndex) => {
          dataLenght[lenIndex] = [item.time, item.voltage];
        });
        chartSeries.push({
          name: element.deviceName + "——" + this.optionsLine[element.branch],
          type: "line",
          data: dataLenght,
        });
      });
      console.log(chartSeries, "chartSeries_____________");
      this.myChart1.clear();
      this.myChart1.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: keyData,
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          data: legendData,
          textStyle: {
            color: "#fff",
          },
          top: 15,
          left: 25,
          icon: "circle",
        },
        grid: {
          top: 62,
          left: 75,
          right: 30,
          bottom: 50,
        },
        xAxis: {
          type: "time",
          boundaryGap: true,
          // data: this.listBjUp.map((item) => {
          //   return item.name;
          // }),
          // data: timeList,
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
        },
        yAxis: {
          nameTextStyle: {
            color: "#3BDFFF",
          },
          type: "value",
          splitLine: {
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
            // show: true,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
          },
        ],
        series: chartSeries,
      });
    },

    async getData() {
      const { voltageList, voltLevel } = await api.voltageList({
        companyId: 1,
        projectId: 1,
        pageNum: 1,
        pageSize: 100,
      });
      this.voltageList = voltageList;
      if (voltageList.records.length > 0) {
        this.voltageItem(voltageList.records[0]);
        this.voltageIndex = 0;
      }

      // const { normalList, historyList } = await jlData;

      // this.historyListA = historyListA;
      // this.historyListB = historyListB;
      // this.historyListC = historyListC;
      // this.historyListD = historyListD;
      // this.renewChart0(historyList, "123");
      // this.renewChart1(historyList, "123");
    },
  },
};
</script>
<style lang="scss" scoped>
.current-first {
  width: 100%;
  height: 100%;
  .btn-detail,
  .btn-map,
  .btn-clear,
  .btn-retry {
    border-radius: 0;
  }
  .box-title-add {
    text-align: center;
    padding: 10px 0;
  }
  .flex-box {
    // min-width: 350px;
  }
  .box-container {
    min-width: 400px;
    ul {
      padding: 0;
      margin: 0;
      li {
        line-height: 40px;
        border-bottom: 1px solid #0f4757;
        list-style-type: none;
        text-align: left;
        padding: 0 180px 0 20px;
        cursor: pointer;
        position: relative;
        span {
          display: inline-block;
        }
        .voltage-right {
          position: absolute;
          right: 20px;
          top: 0;
          z-index: 2;
        }
      }
      li.add-list {
        text-align: center;
        color: #14e1fa;
        font-size: 15px;
        padding: 0 20px;
      }
      li.status {
        background-color: #215187;
        color: #fff;
      }
      li:hover {
        background-color: #215187;
        color: #fff;
      }
    }
  }
}
</style>