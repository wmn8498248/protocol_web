<template>
  <div class="second">
    <div class="home-flex">
      <div class="home-box home-box-width1">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />设备数量
        </div>
        <div class="box-container">
          <div ref="chart0" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="home-box home-box-width2">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />设备类型
        </div>
        <div class="box-container">
          <div ref="chart2" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="home-box home-box-width3">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />电压等级
        </div>
        <div class="box-container">
          <div ref="chart1" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="home-box home-box-width4">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb5.png" />设备报警
        </div>
        <div class="box-container">
          <div ref="chart3" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>

    <div class="home-flex">
      <div class="home-box flex6">
        <div class="box-title">
          <img
            class="itemImg"
            src="../../../assets/images/sb6.png"
          />数据详情<span v-if="dataDetailsType">({{ dataDetailsType }})</span>
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
          <div class="title-right">
            <el-button class="btn-map" @click="parentRouting">
              更多信息</el-button
            >
            <el-button class="btn-retry" @click="tableExport" :loading="onload"
              >导出excel</el-button
            >
          </div>
        </div>
        <div class="box-container">
          <div class="warp" style="height: initial">
            <ul class="item" v-if="dataDetailsType !== '正常'">
              <li>
                <span class="title" v-text="'主设备名称'"></span>
                <!-- <span class="title" v-text="'传感器位置'"></span> -->
                <span class="title" v-text="'报警类型'"></span>
                <span class="title" v-text="'报警值'"></span>
                <!-- <span class="title" v-text="'压力等级'"></span> -->
                <span class="title" v-text="'主设备电压'"></span>
                <span class="title" v-text="'额定值'"></span>
                <span class="title" v-text="'报警时间'"></span>
                <span class="title" v-text="'上次报警时间'"></span>
                <span class="title" v-text="'上次处理结果'"></span>
              </li>
            </ul>
            <ul class="item" v-else>
              <li>
                <span class="title" v-text="'主设备名称'"></span>
                <span class="title" v-text="'气压值'"></span>
                <span class="title" v-text="'温度'"></span>
                <span class="title" v-text="'更新时间'"></span>
                <span class="title" v-text="'主设备电压等级'"></span>
                <span class="title" v-text="'设备类型分类'"></span>
                <span class="title" v-text="'额定值'"></span>
              </li>
            </ul>
          </div>
          <div
            @click.stop="handleGoToDetail($event)"
            v-if="alarmList.length > 0"
          >
            <vue-seamless-scroll
              :data="alarmList"
              :class-option="newDataOption"
              class="warp"
              v-if="dataDetailsType !== '正常'"
            >
              <ul class="item">
                <!-- @click="goToDetail(item.deviceNumber, item.companyId,item.projectId)" -->
                <li v-for="(item, index) in alarmList" :key="index">
                  <span
                    class="date"
                    :title="index"
                    v-text="item.deviceName"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.alarmType"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.pressure"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.voltLevel"
                  ></span>
                  <span class="date" :title="index" v-text="item.rated"></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.createTime"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.lastCreateTime ? item.lastCreateTime : '暂无'"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.status ? '已处理' : '未处理'"
                  ></span>
                </li>
              </ul>
            </vue-seamless-scroll>
            <vue-seamless-scroll
              :data="alarmList"
              :class-option="newDataOption"
              class="warp"
              v-else
            >
              <ul class="item">
                <!-- @click="goToDetail(item.deviceNumber, item.companyId,item.projectId)" -->
                <li v-for="(item, index) in alarmList" :key="index">
                  <span
                    class="date"
                    :title="index"
                    v-text="item.deviceName"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.pressure"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.temperature"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.updateTime"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.voltLevel"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.deviceClassify"
                  ></span>
                  <span class="date" :title="index" v-text="item.rated"></span>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
          <div v-else class="none-font">
            <svg-icon icon-class="none"></svg-icon>
            <p>暂无数据</p>
          </div>
        </div>
      </div>

      <div class="home-box flex4">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />历史曲线
        </div>
        <div class="box-container">
          <div ref="chart4" style="width: 100%; height: 100%"></div>
        </div>
        <div class="none-font container-none" v-if="alarmList.length == 0">
          <svg-icon icon-class="none"></svg-icon>
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/dashboard";
import dayDate from "../dayDate.json";
import { exportExcelAlarm } from "@/utils/exportExcel";
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  data() {
    return {
      dataDetailsType: null,
      onload: false,
      deviceNum: {},
      deviceType: {},
      alarmType: {},
      historyList: [],
      alarmList: [],
      voltLevel: {},
      times: "日",
      searchModel: {
        name: "",
        deviceNumber: "",
        startTime: "",
        endTime: "",
      },
      newData: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      newDataOption: {
        step: 0, // 速度
        direction: 0,
        singleHeight: 0, // 停顿
      },
      histStatic: true,
      myChart0: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChartId: null,
    };
  },
  mounted() {
    // console.log(json, "_______________________-");
    this.myChart0 = this.$echarts.init(this.$refs.chart0);
    this.myChart1 = this.$echarts.init(this.$refs.chart1);
    this.myChart2 = this.$echarts.init(this.$refs.chart2);
    this.myChart3 = this.$echarts.init(this.$refs.chart3);
    // this.myChart4 = this.$echarts.init(this.$refs.chart4);
    this.myChartId = window.addEventListener("resize", () => {
      this.myChart0.resize();
      this.myChart1.resize();
      this.myChart2.resize();
      this.myChart3.resize();
      this.myChart4.resize();
    });
  },
  components: {
    vueSeamlessScroll,
  },
  // beforeDestroy() {
  // },
  // destroyed() {
  // },
  // beforeCreate() {
  // },
  created() {
    this.getDataOut();
  },
  destroyed() {
    clearTimeout(this.nowDateId);
  },
  methods: {
     getDataOut() {
      let that = this;
      clearTimeout(this.nowDateId);
      this.nowDateId = setInterval(() => {
        that.getData();
      }, 300000);
    },
    async getList(status, res) {
      this.dataDetailsType = res;
      let alarmListData = [];
      this.alarmList = [];
      switch (status) {
        case "日":
          alarmListData = await api.alarmDay({
            projectId: 1,
            alarmType: this.dataDetailsType,
          });
          break;
        case "周":
          alarmListData = await api.alarmWeek({
            projectId: 1,
            alarmType: this.dataDetailsType,
          });
          break;
        case "月":
          alarmListData = await api.alarmMonth({
            projectId: 1,
            alarmType: this.dataDetailsType,
          });
          break;
        default:
          break;
      }
      if (res == "正常") {
        if (alarmListData.normalList.length > 7) {
          this.newDataOption.step = 1;
        } else {
          this.newDataOption.step = 0;
        }
        this.alarmList = alarmListData.normalList;
        let hisTitle =
          alarmListData.normalList.length > 0
            ? alarmListData.normalList[0].deviceName
            : "";
        this.chart4Refresh(alarmListData.historyList, hisTitle);
      } else {
        if (alarmListData.alarmList.length > 7) {
          this.newDataOption.step = 1;
        } else {
          this.newDataOption.step = 0;
        }
        this.alarmList = alarmListData.alarmList;
        let hisTitle =
          alarmListData.alarmList.length > 0
            ? alarmListData.alarmList[0].deviceName
            : "";
        this.chart4Refresh(alarmListData.historyList, hisTitle);
      }
      console.log(this.alarmList, "日周月警告列表2");
      // this.tableData = alarmListData.alarmList
      // this.total = alarmListData.alarmList.length
      // this.cutList()
      //   const { list } = await api.alarmDate({
      //     projectId: 1,
      //     alarmType: this.$route.query.alarmType,
      //   });
      //   this.tableData = list;
      //   this.total = list
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "sf6/alarm/export",
        params: {
          projectId: 1,
        },
      });
      this.onload = false;
    },
    async handleGoToDetail(res) {
      let dateType;
      if (this.times == "日") {
        dateType = "day";
      } else if (this.times == "周") {
        dateType = "week";
      } else if (this.times == "月") {
        dateType = "month";
      }
      let deviceNumber = this.alarmList[res.target.title].deviceNumber;
      const { historyList } = await api.deviceHistoryList({
        deviceNumber: deviceNumber,
        dateType: dateType,
      });
      this.chart4Refresh(
        historyList,
        this.alarmList[res.target.title].deviceName
      );
      // let target = res.target;
      // let id = target.id;
    },
    parentRouting() {
      // console.log(this.dataDetailsType,"this.dataDetailsType")
      this.$emit("moreInfoPopup", "数据详情");
      this.$router.push({
        path: "/sf6/alarmList",
        query: {
          isAll: this.dataDetailsType,
        },
      });
    },
    // 修改时间
    async changeTimes(times) {
      this.times = times;

      let alarmTypeName;
      let alarmTypeValue;
      let alarmType;
      this.alarmList = [];
      if (this.dataDetailsType == "正常") {
        switch (times) {
          case "日":
            let alarmDaydata = await api.alarmDay({
              projectId: 1,
              alarmType: this.dataDetailsType,
            });
            alarmTypeName = [];
            alarmTypeValue = [];
            alarmType = alarmDaydata.alarmType;
            for (var item in alarmType) {
              alarmTypeName.push(item);
              alarmTypeValue.push(alarmType[item]);
            }
            if (alarmDaydata.normalList.length > 7) {
              this.newDataOption.step = 1;
            } else {
              this.newDataOption.step = 0;
            }
            this.alarmList = alarmDaydata.normalList;
            this.chart3Refresh(alarmTypeName, alarmTypeValue);
            this.chart4Refresh(
              alarmDaydata.historyList,
              alarmDaydata.normalList.length > 0
                ? alarmDaydata.normalList[0].deviceName
                : ""
            );
            break;
          case "周":
            let alarmWeekData = await api.alarmWeek({
              projectId: 1,
              alarmType: this.dataDetailsType,
            });
            alarmTypeName = [];
            alarmTypeValue = [];
            alarmType = alarmWeekData.alarmType;
            for (var item in alarmType) {
              alarmTypeName.push(item);
              alarmTypeValue.push(alarmType[item]);
            }
            if (alarmWeekData.normalList.length > 7) {
              this.newDataOption.step = 1;
            } else {
              this.newDataOption.step = 0;
            }
            this.alarmList = alarmWeekData.normalList;
            this.chart3Refresh(alarmTypeName, alarmTypeValue);
            this.chart4Refresh(
              alarmWeekData.historyList,
              alarmWeekData.normalList.length > 0
                ? alarmWeekData.normalList[0].deviceName
                : ""
            );
            break;
          case "月":
            let alarmMonthData = await api.alarmMonth({
              projectId: 1,
              alarmType: this.dataDetailsType,
            });
            alarmTypeName = [];
            alarmTypeValue = [];
            alarmType = alarmMonthData.alarmType;
            for (var item in alarmType) {
              alarmTypeName.push(item);
              alarmTypeValue.push(alarmType[item]);
            }
            if (alarmMonthData.normalList.length > 7) {
              this.newDataOption.step = 1;
            } else {
              this.newDataOption.step = 0;
            }
            this.alarmList = alarmMonthData.normalList;
            this.chart3Refresh(alarmTypeName, alarmTypeValue);
            this.chart4Refresh(
              alarmMonthData.historyList,
              alarmMonthData.normalList.length > 0
                ? alarmMonthData.normalList[0].deviceName
                : ""
            );
            break;
          default:
            break;
        }
      } else {
        switch (times) {
          case "日":
            let alarmDaydata = await api.alarmDay({
              projectId: 1,
              alarmType: this.dataDetailsType,
            });
            alarmTypeName = [];
            alarmTypeValue = [];
            alarmType = alarmDaydata.alarmType;
            for (var item in alarmType) {
              alarmTypeName.push(item);
              alarmTypeValue.push(alarmType[item]);
            }
            if (alarmDaydata.alarmList.length > 7) {
              this.newDataOption.step = 1;
            } else {
              this.newDataOption.step = 0;
            }
            this.alarmList = alarmDaydata.alarmList;
            this.chart3Refresh(alarmTypeName, alarmTypeValue);
            this.chart4Refresh(
              alarmDaydata.historyList,
              alarmDaydata.alarmList.length > 0
                ? alarmDaydata.alarmList[0].deviceName
                : ""
            );
            break;
          case "周":
            let alarmWeekData = await api.alarmWeek({
              projectId: 1,
              alarmType: this.dataDetailsType,
            });
            alarmTypeName = [];
            alarmTypeValue = [];
            alarmType = alarmWeekData.alarmType;
            for (var item in alarmType) {
              alarmTypeName.push(item);
              alarmTypeValue.push(alarmType[item]);
            }
            if (alarmWeekData.alarmList.length > 7) {
              this.newDataOption.step = 1;
            } else {
              this.newDataOption.step = 0;
            }
            this.alarmList = alarmWeekData.alarmList;
            this.chart3Refresh(alarmTypeName, alarmTypeValue);
            this.chart4Refresh(
              alarmWeekData.historyList,
              alarmWeekData.alarmList.length > 0
                ? alarmWeekData.alarmList[0].deviceName
                : ""
            );
            break;
          case "月":
            let alarmMonthData = await api.alarmMonth({
              projectId: 1,
              alarmType: this.dataDetailsType,
            });
            alarmTypeName = [];
            alarmTypeValue = [];
            alarmType = alarmMonthData.alarmType;
            for (var item in alarmType) {
              alarmTypeName.push(item);
              alarmTypeValue.push(alarmType[item]);
            }
            if (alarmMonthData.alarmList.length > 7) {
              this.newDataOption.step = 1;
            } else {
              this.newDataOption.step = 0;
            }
            this.alarmList = alarmMonthData.alarmList;
            this.chart3Refresh(alarmTypeName, alarmTypeValue);
            this.chart4Refresh(
              alarmMonthData.historyList,
              alarmMonthData.alarmList.length > 0
                ? alarmMonthData.alarmList[0].deviceName
                : ""
            );
            break;
          default:
            break;
        }
      }
    },
    chart3Refresh(alarmTypeName, alarmTypeValue) {
      this.myChart3.clear();
      this.myChart3.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 30,
          left: 80,
          right: 40,
          bottom: 50,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: alarmTypeName,
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
              color: "rgba(91, 122, 137, 0.1)",
            },
          },
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
        // dataZoom: [
        //   {
        //     type: "slider",
        //     show: true,
        //     xAxisIndex: [0],
        //     start: 0,
        //     end: 100,
        //   },
        // ],
        series: [
          {
            name: "设备报警",
            type: "bar",
            barWidth: 20,
            data: alarmTypeValue,
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(20, 225, 250, 1)" }, //柱图渐变色
                  { offset: 1, color: "rgba(20, 225, 250, 0)" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      });
      let that = this;

      this.myChart3.off("click"); //先移除，再点击
      this.myChart3.on("click", function (param) {
        console.log(param, "设备报警____________");
        that.getList(that.times, param.name);
        // that.$emit("moreInfoPopup", "设备报警：" + param.name);
        // that.$router.push({
        //   path: "/sf6/alarmType",
        //   query: {
        //     alarmType: param.name,
        //     alarmTime: that.times,
        //   },
        // });
      });
    },

    chart4Refresh(res, hisTitle) {
      this.historyList = res;

      this.myChart4 = this.$echarts.init(this.$refs.chart4);

      let dateTime = res;
      let timeList = [];
      let dateListTemperature = []; // 温度
      let dateListPressure = []; // 气压

      dateTime.forEach((element) => {
        dateListTemperature.push(parseFloat(element.temperature)); // 温度
        dateListPressure.push(parseFloat(element.pressure)); // 气压
        timeList.push(element.time); // 时间
      });

      this.myChart4.clear();
      this.myChart4.setOption({
        title: {
          text: hisTitle,
          // subtext: "",
          top: 10,
          left: "center",
          textStyle: {
            width: 100,
            height: 35,
            fontSize: 16,
            color: "rgba(255, 255, 255, 1)",
            // fontWeight: "bolder",
            lineHeight: 35,
            textBorderWidth: 3,
            textBorderColor: "#213d6c",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: keyData,
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          data: ["温度", "气压"],
          textStyle: {
            color: "#fff",
          },
          bottom: 15,
          icon: "circle",
        },
        grid: {
          top: 60,
          left: 80,
          right: 40,
          bottom: 70,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: timeList,
          data: timeList.map(function (str) {
            return str.replace(" ", "\n");
          }),
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
          max: function (value) {
            return Math.round(value.max / 100) * 200;
            // return value.max + 500;
          },
          nameTextStyle: {
            color: "#3BDFFF",
          },
          type: "value",
          splitLine: {
            lineStyle: {
              color: "rgba(91, 122, 137, 0.1)",
            },
          },
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
        series: [
          {
            name: "温度",
            type: "line",
            data: dateListTemperature,
            // symbol: "none",
          },

          {
            name: "气压",
            type: "line",
            data: dateListPressure,
            // symbol: "none",
          },
        ],
      });

      // this.myChart4.on("click", function (param) {
      //   that.$emit("moreInfoPopup", "/tableList");
      // });
    },

    async getData() {
      // const {
      //   deviceNum,
      //   deviceType,
      //   alarmType,
      //   historyList,
      //   alarmList,
      //   voltLevel,
      // } = await api.homeSf6({
      //   projectId: 1,
      // });

      const {
        deviceNum,
        deviceType,
        alarmType,
        historyList,
        alarmList,
        voltLevel,
      } = await dayDate;
      if (alarmList.length > 7) {
        this.newDataOption.step = 1;
      } else {
        this.newDataOption.step = 0;
      }
      this.deviceNum = deviceNum;
      this.deviceType = deviceType;
      this.alarmType = alarmType;
      this.historyList = historyList;
      this.alarmList = alarmList;
      this.voltLevel = voltLevel;

      let that = this;
      this.myChart0.clear();
      this.myChart0.setOption({
        title: {
          text: "总数：" + deviceNum.total,
          // subtext: "",
          top: 20,
          left: "center",
          textStyle: {
            width: 100,
            height: 35,
            fontSize: 18,
            color: "rgba(255, 255, 255, 1)",
            fontWeight: "bolder",
            lineHeight: 35,
            textBorderWidth: 3,
            textBorderColor: "#213d6c",
          },
        },
        label: {
          trigger: "item",
          show: true,
          // formatter: "{a} {hr}<br/>{b}: {c} ({d}%)",
          backgroundColor: "#F6F8FC",
          borderColor: "#8C8D8E",
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
            rich: {
              a: {
                color: "#6E7079",
                lineHeight: 22,
                align: "center",
              },
              hr: {
                borderColor: "#8C8D8E",
                width: "100%",
                borderWidth: 1,
                height: 0,
              },
              b: {
                color: "#4C5058",
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 33,
              },
            },
          },
        },

        legend: {
          textStyle: {
            color: "#fff",
          },
          bottom: 20,
          data: ["在线", "离线", "异常"],
        },
        series: [
          {
            name: "设备数量",
            type: "pie",
            radius: "35%",
            labelLine: {
              length: 10,
            },
            label: {
              // formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              formatter: "{b|{b}：}{c|{c}}",
              backgroundColor: "#213d6c",
              borderColor: "#1b2c58",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#FFFFFF",
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 33,
                },
                c: {
                  color: "#FFFFFF",
                  fontSize: 13,
                  lineHeight: 33,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                },
              },
            },
            data: [
              { value: deviceNum.online, name: "在线" },
              { value: deviceNum.outline, name: "离线" },
              { value: deviceNum.anomaly, name: "异常" },
            ],
          },
        ],
      });
      this.myChart0.on("click", function (param) {
        that.$emit("moreInfoPopup", "设备数量");
        that.$router.push({
          path: "/sf6/quantity",
          query: {
            lineState: param.dataIndex,
          },
        });
      });

      let voltLevelList = [];
      let voltLevelName = [];
      for (var item in voltLevel) {
        voltLevelName.push(item);
        voltLevelList.push({ name: item, value: voltLevel[item] });
      }

      this.myChart1.clear();
      this.myChart1.setOption({
        tooltip: {
          trigger: "item",
          show: true,
          // formatter: "{a} {hr}<br/>{b}: {c} ({d}%)",
          backgroundColor: "#F6F8FC",
          borderColor: "#8C8D8E",
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
            rich: {
              a: {
                color: "#6E7079",
                lineHeight: 22,
                align: "center",
              },
              hr: {
                borderColor: "#8C8D8E",
                width: "100%",
                borderWidth: 1,
                height: 0,
              },
              b: {
                color: "#4C5058",
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 33,
              },
            },
          },
        },
        legend: {
          textStyle: {
            color: "#fff",
          },
          bottom: 20,
          data: voltLevelName,
        },
        series: [
          {
            name: "电压等级",
            type: "pie",
            radius: ["45%", "20%"],
            labelLine: {
              length: 70,
            },
            label: {
              formatter:
                "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c|{c}}  {per|{d}%}  ",
              // formatter: "{b|{b}}{abg|}\n{hr|}\n {c|{c}}  {per|{d}%}  ",
              backgroundColor: "#213d6c",
              borderColor: "#1b2c58",
              borderWidth: 1,
              borderRadius: 4,
              // rotate: 90,
              //  position: 'top',
              offset: [0, -20],
              // distance: 6.5,
              rich: {
                a: {
                  color: "#FFFFFF",
                  lineHeight: 28,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: "#14e1fa",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 28,
                  align: "center",
                },
                c: {
                  color: "#FFFFFF",
                  fontSize: 13,
                  lineHeight: 33,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                },
              },
            },
            data: voltLevelList,
          },
        ],
      });
      this.myChart1.on("click", function (param) {
        that.$emit("moreInfoPopup", "电压等级:" + param.name);
        that.$router.push({
          path: "/sf6/grade",
          query: {
            voltLevel: param.name,
          },
        });
      });

      let deviceTypeName = [];
      let deviceTypeValue = [];
      for (var item in deviceType) {
        deviceTypeName.push(item);
        deviceTypeValue.push(deviceType[item]);
      }

      this.myChart2.clear();
      this.myChart2.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 30,
          left: 80,
          right: 40,
          bottom: 50,
        },
        yAxis: {
          type: "category",
          boundaryGap: true,
          data: deviceTypeName,
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 225, 250, 0.2)",
            },
          },
        },
        xAxis: {
          nameTextStyle: {
            color: "#3BDFFF",
          },
          type: "value",
          splitLine: {
            lineStyle: {
              color: "rgba(91, 122, 137, 0.1)",
            },
          },
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
        series: [
          {
            name: "设备类型",
            type: "bar",
            barWidth: 20,
            data: deviceTypeValue,
            label: {
              show: true,
              position: "right",
              color: "#fff",
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 1, color: "rgba(51, 183, 92, 1)" }, //柱图渐变色
                  { offset: 0, color: "rgba(164, 187, 189, 0)" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      });
      this.myChart2.on("click", function (param) {
        that.$emit("moreInfoPopup", "设备类型：" + param.name);
        that.$router.push({
          path: "/sf6/equipmentType",
          query: {
            deviceClassify: param.name,
          },
        });
      });

      let alarmTypeName = [];
      let alarmTypeValue = [];
      for (var item in alarmType) {
        alarmTypeName.push(item);
        alarmTypeValue.push(alarmType[item]);
      }

      this.chart3Refresh(alarmTypeName, alarmTypeValue);

      this.chart4Refresh(
        historyList,
        alarmList.length > 0 ? alarmList[0].deviceName : ""
      );
      // if (alarmList.length == 0) {
      //   this.getList(that.times, "正常");
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.second {
  width: 100%;
  height: 100%;
  .home-box-width1 {
    width: 21%;
  }
  .home-box-width2 {
    width: 25%;
  }
  .home-box-width3 {
    width: 31%;
  }
  .home-box-width4 {
    width: 23%;
  }
  .none-font {
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
    justify-content: center;
    align-items: center;
    p {
      font-size: 22px;
      color: #8a96a3;
      margin-left: 5px;
    }
    svg {
      font-size: 45px;
    }
  }
  .container-none {
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    height: calc(100% - 54px);
    z-index: 5;
    background-color: #091b31;
  }
}
</style>