<template>
  <!-- sf6温度传感器 -->
  <div class="first">
    <div class="home-flex" id="first-top" ref="firstTop">
      <div class="home-left" v-if="scrollLeftStatus" @click="toSrollLeft">
        <img src="../../../assets/images/left.png" alt="" />
      </div>
      <div class="home-right" v-if="scrollRightStatus" @click="toSrollRight">
        <img src="../../../assets/images/right.png" alt="" />
      </div>
      <div class="home-box">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />设备数量
          <span class="right">单位:台</span>
        </div>
        <div class="box-container box-container-num">
          <div class="container-num-table">
            <p class="first">
              <span
                >总数：<i>{{ deviceNum.total }}</i></span
              >
            </p>
            <p>
              <span @click="numListClick(1)"
                >在线：<i>{{ deviceNum.onLine }}</i></span
              ><span @click="numListClick(0)"
                >离线：<i>{{ deviceNum.outLine }}</i></span
              >
            </p>
            <p>
              <span @click="numListClick(3)"
                >电量低：<i>{{ deviceNum.lowElec }}</i></span
              ><span @click="numListClick(2)"
                >异常：<i>{{ deviceNum.anomaly }}</i></span
              >
            </p>
            <!-- <p><span>离线</span><span>222</span></p>
            <p><span>异常</span><span>222</span></p> -->
          </div>
        </div>
      </div>

      <div class="home-box home-box-width2">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />设备类型
          <span class="right">单位:台</span>
        </div>
        <div class="box-container" style="width: 650px">
          <div ref="chart2" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="home-box home-box-width1">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />电压等级
          <span class="right">单位:台</span>
        </div>
        <div class="box-container" style="width: 450px">
          <div ref="chart1" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="home-box home-box-width4">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb5.png" />设备报警
          <span class="right">单位: 次数</span>
        </div>
        <div class="box-container" style="width: 500px">
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
              :style="{ opacity: times == 1 ? 1 : 0.5 }"
              @click="changeTimes(1)"
            >
              1日
            </div>
            <div class="dash_dater_border"></div>
            <div
              class="dash_dater_item"
              :style="{ opacity: times == 7 ? 1 : 0.5 }"
              @click="changeTimes(7)"
            >
              7日
            </div>
            <div class="dash_dater_border"></div>
            <div
              class="dash_dater_item"
              :style="{ opacity: times == 30 ? 1 : 0.5 }"
              @click="changeTimes(30)"
            >
              30日
            </div>
          </div>
          <div class="title-right">
            <el-button class="btn-map" @click="parentRouting" size="mini">
              更多信息</el-button
            >
            <el-button class="btn-retry" @click="tableExport" :loading="onload" size="mini"
              >导出excel</el-button
            >
          </div>
        </div>
        <div class="box-container">
          <div class="warp" style="height: initial">
            <ul class="item" v-if="dataDetailsType == '火影'">
              <li>
                <span class="title" v-text="'主设备名称'"></span>
                <span class="title" v-text="'报警类型'"></span>
                <span class="title" v-text="'报警值'"></span>
                <span class="title" v-text="'报警值'"></span>
                <span class="title" v-text="'主设备电压'"></span>
                <span class="title" v-text="'额定值'"></span>
                <span class="title" v-text="'报警时间'"></span>
                <span class="title" v-text="'上次报警时间'"></span>
              </li>
            </ul>
            <ul class="item" v-else>
              <li>
                <span class="title" v-text="'主设备名称'"></span>
                <span class="title" v-text="'水浸状态'"></span>
                <!-- <span class="title" v-text="'温度'"></span> -->
                <span class="title" v-text="'更新时间'"></span>
                <span class="title" v-text="'主设备电压等级'"></span>
                <span class="title" v-text="'设备类型分类'"></span>
                <span class="title" v-text="'额定值'"></span>
              </li>
            </ul>
          </div>
          <div
            @click.stop="handleGoToDetail($event.target.title)"
            v-if="alarmList.length > 0"
          >
            <vue-seamless-scroll
              :data="alarmList"
              :class-option="newDataOption"
              class="warp"
              v-if="dataDetailsType == '火影'"
            >
              <ul class="item">
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
                    v-text="item.pressureValue"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.voltLevel"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.rated || '暂无'"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.collectionTime"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.lastCreateTime ? item.lastCreateTime : '暂无'"
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
                    v-text="item.immersionValue == 1 ? '水浸' : '正常'"
                  ></span>
                  <span
                    class="date"
                    :title="index"
                    v-text="item.collectionTime"
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
                  <span
                    class="date"
                    :title="index"
                    v-text="item.rated || '暂无'"
                  ></span>
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
          <span class="right">水浸(1)，正常(2)</span>
          <!-- <span class="right">气压: MPa</span> -->
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
import * as api from "@/api/wi";
// import json from "../dayDate.json";
import { exportExcelAlarm } from "@/utils/exportExcel";
import vueSeamlessScroll from "vue-seamless-scroll";
import moment from "moment";

export default {
  props: {
    companyId: Number,
  },
  data() {
    return {
      typeList: {
        正常: 0,
        连续下降: 1,
        突变: 2,
        高压: 3,
        低压: 4,
        高温: 5,
        低温: 6,
        湿度过高: 7,
        湿度过低: 8,
        水浸: 9,
      },
      historyAlarmCount: [],
      scrollLeftStatus: false,
      scrollRightStatus: true,
      documentObj: null,
      nowDateId: null,
      dataDetailsType: "正常",
      onload: false,
      deviceNum: {},
      deviceType: {},
      alarmType: {},
      historyList: [],
      alarmList: [],
      voltLevel: {},
      times: 1,
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
      // myChart0: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChartId: null,
    };
  },
  mounted() {
    this.myChart1 = this.$echarts.init(this.$refs.chart1);
    this.myChart2 = this.$echarts.init(this.$refs.chart2);
    this.myChart3 = this.$echarts.init(this.$refs.chart3);
    this.myChartId = window.addEventListener("resize", () => {
      this.myChart1.resize();
      this.myChart2.resize();
      this.myChart3.resize();
      this.myChart4.resize();
    });
  },
  components: {
    vueSeamlessScroll,
  },
  beforeDestroy() {
    clearInterval(this.nowDateId);
    if (!this.documentObj) return;
    this.documentObj.removeEventListener(
      "DOMMouseScroll",
      this.handlerMouserScroll
    );
    this.documentObj.removeEventListener(
      "mousewheel",
      this.handlerMouserScroll
    );
  },

  created() {
    let that = this;
    this.$nextTick(() => {
      that.setScroolFun();
    });
    this.getDataOut();
  },
  destroyed() {
    clearInterval(this.nowDateId);
  },
  methods: {
    getDataOut() {
      let that = this;
      clearInterval(this.nowDateId);
      this.nowDateId = setInterval(() => {
        that.getData();
      }, 300000);
    },
    numListClick(res) {
      this.$emit("moreInfoPopup", "设备数量");
      this.$router.push({
        path: "/wi/mix",
        query: {
          type: "status",
          params: res,
          companyId: this.companyId,
        },
      });
    },
    toSrollLeft() {
      this.documentObj.scrollLeft = 0;
      this.scrollLeftStatus = false;
    },
    toSrollRight() {
      this.scrollLeftStatus = true;
      this.documentObj.scrollLeft = 1170;

      // this.scrollLeftStatus = false;
    },
    setScroolFun() {
      this.documentObj = this.$refs.firstTop; // 获取DOM元素节点
      // 添加监听事件（不同浏览器，事件方法不一样，所以可以作判断，也可以如下偷懒）
      this.documentObj.addEventListener(
        "DOMMouseScroll",
        this.handlerMouserScroll,
        false
      );
      this.documentObj.addEventListener(
        "mousewheel",
        this.handlerMouserScroll,
        false
      );
    },
    handlerMouserScroll(event) {
      let detail = event.wheelDelta || event.detail;
      let moveForwardStep = -1;
      let moveBackStep = 1;
      let step = 0;
      step = detail > 0 ? moveForwardStep * 100 : moveBackStep * 100;
      this.documentObj.scrollLeft = this.documentObj.scrollLeft + step;
      event.preventDefault();
      if (this.documentObj.scrollLeft == 0) {
        this.scrollLeftStatus = false;
      } else {
        this.scrollLeftStatus = true;
      }
    },
    async getList(status, res) {
      this.dataDetailsType = res;
      this.alarmList = [];

      const { alarmType, page } = await api.alarmDate({
        companyId: this.companyId,
        alarmType: this.typeList[res],
        dayNum: this.times,
        pageNum: 1,
        pageSize: 100,
      });
      let list = page.records;

      if (list.length > 7) {
        this.newDataOption.step = 1;
      } else {
        this.newDataOption.step = 0;
      }
      this.alarmList = list;

      let alarmTypeName = [];
      let alarmTypeValue = [];

      for (var item in alarmType) {
        alarmTypeName.push(item);
        alarmTypeValue.push(alarmType[item]);
      }

      this.chart3Refresh(alarmTypeName, alarmTypeValue);

      this.handleGoToDetail(0);
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "/wi/index/list/export",
        params: {
          alarmType: this.dataDetailsType,
          dayNum: this.times,
          companyId: this.companyId,
        },
      });
      this.onload = false;
    },

    async handleGoToDetail(res) {
      let historyList = [];
      let deviceName = "";
      if (this.alarmList.length > 0) {
        let deviceId = this.alarmList[res].deviceId;
        historyList = await api.deviceHistoryList({
          deviceId: deviceId,
          startTime: moment()
            .startOf("day")
            .day(moment().day() - this.times)
            .format("YYYY-MM-DD HH:mm:ss"),
          endTime: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
        });
        deviceName = this.alarmList[res].deviceName;
      }

      this.chart4Refresh(historyList, deviceName);

      // let target = res.target;
      // let id = target.id;
    },
    parentRouting() {
      // console.log(this.dataDetailsType,"this.dataDetailsType")
      this.$emit("moreInfoPopup", "数据详情 - " + this.dataDetailsType);
      this.$router.push({
        path: "/wi/alarmList",
        query: {
          alarmType: this.typeList[this.dataDetailsType],
          companyId: this.companyId,
          times: this.times,
        },
      });
    },
    // 修改时间
    async changeTimes(times) {
      this.times = times;

      const { alarmType, page } = await api.alarmDate({
        companyId: this.companyId,
        alarmType: this.typeList[this.dataDetailsType],
        dayNum: times,
        pageNum: 1,
        pageSize: 100,
      });
      let list = page.records;

      if (list.length > 7) {
        this.newDataOption.step = 1;
      } else {
        this.newDataOption.step = 0;
      }
      this.alarmList = list;

      let alarmTypeName = [];
      let alarmTypeValue = [];

      for (var item in alarmType) {
        alarmTypeName.push(item);
        alarmTypeValue.push(alarmType[item]);
      }

      this.chart3Refresh(alarmTypeName, alarmTypeValue);
      this.handleGoToDetail(0);
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
            // itemStyle: {
            //   normal: {
            //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       { offset: 0, color: "rgba(20, 225, 250, 1)" }, //柱图渐变色
            //       { offset: 1, color: "rgba(20, 225, 250, 0)" }, //柱图渐变色
            //     ]),
            //   },
            // },
          },
        ],
      });
      let that = this;

      this.myChart3.off("click"); //先移除，再点击
      this.myChart3.on("click", function (param) {
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

    chart4Refresh(res, hisTitle, ratedValue) {
      this.historyList = res;

      this.myChart4 = this.$echarts.init(this.$refs.chart4);

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
          data: ["水浸状态"],
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
          data: this.historyList.map(function (str) {
            return str.collectionTime;
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
          // max: parseInt(ratedValue) + 100,
          // min: parseInt(ratedValue) - 100,
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
          // {
          //   name: "额定值",
          //   type: "line",
          //   data: this.historyList.map(function (str) {
          //     return str.rated;
          //   }),
          //   symbol: "none",
          //   lineStyle: {
          //     // type: "dotted", //'dotted'虚线 'solid'实线
          //   },
          //   itemStyle: {
          //     normal: {
          //       lineStyle: {
          //         width: 1,
          //       },
          //       color: "#fac858",
          //     },
          //   },
          // },
          {
            name: "水浸状态",
            type: "line",
            data: this.historyList.map(function (str) {
              return str.immersionValue;
            }),
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                },
                // color: "#ff0000",
              },
            },
          },
          // {
          //   name: "湿度",
          //   type: "line",
          //   data: this.historyList.map(function (str) {
          //     return str.humidityValue;
          //   }),
          //   symbol: "none",
          //   itemStyle: {
          //     normal: {
          //       lineStyle: {
          //         // width: 1,
          //       },
          //       // color: "#ff0000",
          //     },
          //   },
          // },
        ],
      });

      // this.myChart4.on("click", function (param) {
      //   that.$emit("moreInfoPopup", "/tableList");
      // });
    },

    async getData() {
      const {
        // alarmType,
        deviceCount,
        deviceType,
        // historyAlarmCount,
        voltLevel,
      } = await api.homeSf6({
        companyId: this.companyId,
      });
      let alarmList = [];
      let historyList = [];

      if (alarmList.length > 7) {
        this.newDataOption.step = 1;
      } else {
        this.newDataOption.step = 0;
      }

      this.deviceNum = deviceCount;

      this.deviceType = deviceType;

      // this.alarmType = alarmType;

      this.historyList = historyList;

      // this.historyAlarmCount = historyAlarmCount;

      this.alarmList = alarmList;

      this.voltLevel = voltLevel;

      let that = this;

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
            radius: ["25%", "40%"],
            labelLine: {
              show: true,
              length: 30,
            },
            label: {
              formatter: "{b|{b}：}{c|{c}} ",
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
                  fontSize: 13,
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
        that.$emit("moreInfoPopup", "电压等级:" + param.name + "(V)");
        that.$router.push({
          path: "/wi/mix",
          query: {
            type: "voltLevel",
            params: param.name,
            companyId: that.companyId,
          },
        });
      });

      let deviceTypeName = [];
      let deviceTypeValueA = [];
      let deviceTypeValueB = [];

      console.log(deviceType, "deviceType____________");

      for (var item in deviceType) {
        deviceTypeName.push(item);
        deviceTypeValueA.push(deviceType[item]);
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
        xAxis: {
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
        series: [
          {
            name: "报警",
            type: "bar",
            barWidth: 20,
            data: deviceTypeValueA,
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            itemStyle: {
              normal: {
                color: "#fac858",
              },
            },
          },
        ],
      });

      this.myChart2.on("click", function (param) {
        that.$emit("moreInfoPopup", "设备类型：" + param.name);
        that.$router.push({
          path: "/wi/mix",
          query: {
            type: "deviceClassify",
            params: param.name,
            companyId: that.companyId,
          },
        });
      });

      this.getList(that.times, "正常");
    },
  },
};
</script>
<style lang="scss" scoped>
.first {
  width: 100%;
  height: 100%;
  .home-left {
    position: absolute;
    left: 25px;
    top: 25%;
    cursor: pointer;
    opacity: 0.6;
    z-index: 99;
  }
  .home-right {
    position: absolute;
    right: 25px;
    top: 25%;
    cursor: pointer;
    opacity: 0.6;
    z-index: 99;
  }
  .home-left:hover,
  .home-right:hover {
    opacity: 1;
  }
  .home-box-width1 {
    // width: 21%;
  }
  .home-box-width2 {
    // width: 25%;
  }
  .home-box-width3 {
    // width: 31%;
  }
  .home-box-width4 {
    // width: 23%;
  }
  .box-container-num {
    min-width: 230px;
    font-size: 14px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .container-num-table {
      border-top: 1px solid #68989e;
      margin: 0 25px;
    }
    p {
      // margin-bottom: 10px;
      border-left: 1px solid #68989e;
      display: flex;
      // border-top: 1px solid #68989e;
      // margin-top: 20px;
      span {
        width: 140px;
        flex: 1;
        border-right: 1px solid #68989e;
        border-bottom: 1px solid #68989e;
        display: inline-block;
        padding: 0 10px;
        text-align: center;
        cursor: pointer;
        i {
          font-style: normal;
          color: #14e1fa;
        }
      }
      span:hover {
        background-color: #8a96a3;
      }
    }
    p.first {
      span {
        background-color: #213d6c;
        color: #ffffff;
        font-size: 16px;
      }
    }
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
