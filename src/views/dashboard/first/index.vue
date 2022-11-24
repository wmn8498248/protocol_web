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

      <div class="home-box home-box-width4">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb5.png" />设备报警
          <span class="right">单位: 次数</span>
        </div>
        <div class="box-container" style="width: 500px">
          <div ref="chart3" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="home-box home-box-width1">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />额定值分类
          <span class="right">单位:台</span>
        </div>
        <div class="box-container" style="width: 400px">
          <div ref="chart6" style="width: 100%; height: 100%"></div>
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

      <div class="home-box home-box-width1">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />历史告警
          <span class="right">单位: 次数</span>
        </div>
        <div class="box-container" style="width: 750px">
          <div ref="chart5" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>

    <div class="home-flex">
      <div class="home-box flex6" style="height: 390px">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />
          <span>数据详情</span>
          <div class="dash_dater" style="border: none">
            <el-input
              @input="changeList"
              v-model="searchModel.deviceName"
              type="text"
              placeholder="请输入传感器名称"
            ></el-input>
          </div>
          <div class="title-right">
            <el-button class="btn-map" @click="parentRouting" size="mini">
              更多信息</el-button
            >
            <el-button
              class="btn-retry"
              @click="tableExport"
              :loading="onload"
              size="mini"
              >导出excel</el-button
            >
          </div>
        </div>
        <div class="box-container" style="height: 340px">
          <div class="" style="height: initial" v-if="alarmList.length > 0">
            <el-table :data="alarmList" style="width: 100%" height="250">
              <el-table-column prop="deviceName" label="主设备名称">
              </el-table-column>
              <el-table-column prop="pressureValue" label="气压值">
              </el-table-column>
              <el-table-column prop="temperature" label="温度">
              </el-table-column>
              <el-table-column prop="collectionTime" label="更新时间">
              </el-table-column>
              <el-table-column prop="voltLevel" label="电压等级">
              </el-table-column>
              <el-table-column prop="deviceClassify" label="类型分类">
              </el-table-column>
              <el-table-column prop="rated" label="额定值"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    @click="handleGoToDetail(row.deviceId, row.deviceName)"
                    >历史曲线</el-button
                  >
                </template>
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
          <div v-else class="none-font">
            <svg-icon icon-class="none"></svg-icon>
            <p>暂无数据</p>
          </div>
        </div>
      </div>

      <div class="home-box flex4" style="height: 390px">
        <div class="box-title">
          <img class="itemImg" src="../../../assets/images/sb6.png" />历史曲线
          <span class="right">气压: MPa&emsp;温度: ℃</span>
          <!-- <span class="right">气压: MPa</span> -->
        </div>
        <div class="box-container" style="height: 340px">
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
      maxN: 0,
      minN: 0,
      searchModel: {
        deviceName: "",
        deviceId: "",
        params: "",
      },
      total: 0,
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
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
      },
      typeListName: [
        "正常",
        "连续下降",
        "突变",
        "高压",
        "低压",
        "高温",
        "低温",
        "湿度过高",
        "湿度过低",
      ],
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
      myChart5: null,
      myChart6: null,
      myChartId: null,
    };
  },
  mounted() {
    this.myChart6 = this.$echarts.init(this.$refs.chart6);
    this.myChart1 = this.$echarts.init(this.$refs.chart1);
    this.myChart2 = this.$echarts.init(this.$refs.chart2);
    this.myChart3 = this.$echarts.init(this.$refs.chart3);
    this.myChart5 = this.$echarts.init(this.$refs.chart5);
    this.myChartId = window.addEventListener("resize", () => {
      this.myChart1.resize();
      this.myChart2.resize();
      this.myChart3.resize();
      this.myChart4.resize();
      this.myChart5.resize();
      this.myChart6.resize();
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
    changeList(res) {
      // console.log(res)
      this.getList();
    },
    onPageSizeChange(e) {
      this.pages.pageSize = e;
      this.getList();
    },
    // 修改列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.getList();
    },
    numListClick(res) {
      this.$emit("moreInfoPopup", "设备数量");
      this.$router.push({
        path: "/sf6/mix",
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
      this.documentObj.scrollLeft = 1920;

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
      const { total, records } = await api.getLitsMix({
        companyId: this.companyId,
        type: "all",
        ...this.searchModel,
        ...this.searchModel,
      });

      this.alarmList = records;
      this.total = total;

      if (records.length > 0) {
        this.handleGoToDetail(
          this.alarmList[0].deviceId,
          this.alarmList[0].deviceName
        );
      }
      // let deviceId = ;
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "/sf6/index/list/export",
        params: {
          alarmType: 0,
          dayNum: 30,
          companyId: this.companyId,
        },
      });
      this.onload = false;
    },

    async handleGoToDetail(deviceId, deviceName) {
      // console.log(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss') , "今天结束")
      // console.log(moment().startOf('day').day(moment().day() - 1).format('YYYY-MM-DD HH:mm:ss'), "昨天开始")
      let historyList = await api.deviceHistoryList({
        deviceId: deviceId,
        startTime: moment()
          .startOf("day")
          .day(moment().day() - this.times)
          .format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      });

      this.chart4Refresh(historyList, deviceName);

      // let target = res.target;
      // let id = target.id;
    },
    parentRouting() {
      // console.log(this.dataDetailsType,"this.dataDetailsType")
      this.$emit("moreInfoPopup", "数据详情 - " + this.dataDetailsType);
      this.$router.push({
        path: "/sf6/mix",
        query: {
          type: "all",
          companyId: this.companyId,
        },
      });
    },
    // 修改时间
    async changeTimes(times) {
      this.times = times;

      const { alarmType, page } = await api.sf6IndexListDate({
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
      this.handleGoToDetail(this.alarmList[0].deviceId);
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
        // that.getList(that.times, param.name);
        console.log(param.name, "param");
        that.$emit("moreInfoPopup", "报警类型:" + param.name);
        that.$router.push({
          path: "/sf6/mix",
          query: {
            type: "alarm",
            params: param.name,
            companyId: that.companyId,
          },
        });
      });
    },

    chart6Refresh(res, hisTitle) {
      let ratedList = [];
      let ratedValue = [];
      for (var item in res) {
        ratedList.push("额定" + item + "MPa");
        ratedValue.push({ name: item + "MPa", value: res[item] });
      }

      this.myChart6.clear();
      this.myChart6.setOption({
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
          // data: ratedList,
        },
        series: [
          {
            name: "额定值",
            type: "pie",
            radius: "40%",
            data: ratedValue,
            labelLine: {
              show: true,
              length: 10,
            },
            label: {
              formatter: "{b|{b}：}{c|{c}} ",
              // formatter: "{c|{c}} ",
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
          },
        ],
      });
      let that = this;
      this.myChart6.on("click", function (param) {
        console.log(param.name.split("MPa")[0], "param");
        that.$emit("moreInfoPopup", "额定值:" + param.name);
        that.$router.push({
          path: "/sf6/mix",
          query: {
            type: "rated",
            params: param.name.split("MPa")[0],
            companyId: that.companyId,
          },
        });
      });
    },

    chart5Refresh(res, hisTitle) {
      let dateTime = res;
      let listName = [];
      let dateListCount = []; // 次数
      for (var item in dateTime) {
        dateListCount.push(dateTime[item]);
        listName.push(item);
      }

      this.myChart5.clear();
      this.myChart5.setOption({
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
          // data: ["次数", "气压"],
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
          boundaryGap: true,
          data: listName,
          // data: listName.map(function (str) {
          //   return str.replace(" ", "\n");
          // }),
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
          // max: function (value) {
          //   return Math.round(value.max / 100) * 200;
          // },
          max: function (value) {
            return value.max < 4 ? 4 : value * 2;
          },
          // max: 4,
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
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "报警次数",
            type: "bar",
            barWidth: 10,
            data: dateListCount,
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            // itemStyle: {
            //   normal: {
            //     color: "#fac858",
            //   },
            // },
            // symbol: "none",
          },
        ],
      });

      // this.myChart4.on("click", function (param) {
      //   that.$emit("moreInfoPopup", "/tableList");
      // });
    },

    chart4Refresh(res, hisTitle, ratedValue) {
      this.historyList = res;
      this.myChart4 = this.$echarts.init(this.$refs.chart4);
      this.myChart4.clear();

      let _this = this;
      if(res.length > 0) {
        let arr = res.map((item) => {
          return + item.pressureValue || 0;
        });
        _this.maxN = Math.max.apply(null, arr);
        _this.minN = Math.min.apply(null, arr);
      }

      
      console.log(_this.minN, "/_this.maxN")
      console.log(_this.maxN, "/_this.maxN")


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
          selected: {
            压力: true,
            差值: false,
            滤波值: false,
          },
          data: ["压力", "差值", "滤波值"],
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
            return str.collectionTime.replace(" ", "\n");
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
        dataZoom: [
          {
            type: "slider", //无滑动条内置缩放   type: 'slider', //缩放滑动条
            show: true, //开启
            yAxisIndex: [0], //Y轴滑动
            left: 0, //( _this.minN/_this.maxN) *100
            start: _this.maxN===0? 0 : ( _this.minN/_this.maxN) *100, //初始化时，滑动条宽度开始标度
            end: 100, //初始化时，滑动条宽度结束标度
            width: 25,
          },
        ],
        series: [
          {
            name: "压力",
            type: "line",
            data: this.historyList
              .map((item) => {
                return item.pressureValue || "0";
              })
              .reverse(),
          },
          {
            name: "差值",
            type: "line",
            data: this.historyList
              .map((item) => {
                return item.diffValue || "0";
              })
              .reverse(),
          },
          {
            name: "滤波值",
            type: "line",
            data: this.historyList
              .map((item) => {
                return item.wfValue || "0";
              })
              .reverse(),
          },
        ],
      });

      // this.myChart4.on("click", function (param) {
      //   that.$emit("moreInfoPopup", "/tableList");
      // });
    },
    getDataOut() {
      let that = this;
      clearInterval(this.nowDateId);
      this.nowDateId = setInterval(() => {
        that.getData();
      }, 300000);
    },
    async getData() {
      const {
        ratedMap,
        alarmType,
        deviceCount,
        deviceType,
        historyAlarmCount,
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

      this.alarmType = alarmType;

      this.historyList = historyList;

      this.historyAlarmCount = historyAlarmCount;

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
          path: "/sf6/mix",
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

      for (var item in deviceType) {
        deviceTypeName.push(item);

        deviceType[item].forEach((element, index) => {
          if (index == 0) {
            deviceTypeValueA.push(element);
          }
          if (index == 1) {
            deviceTypeValueB.push(element);
          }
        });
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
            name: "正常",
            type: "bar",
            barWidth: 20,
            data: deviceTypeValueA,
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
          },
          {
            name: "报警",
            type: "bar",
            barWidth: 20,
            data: deviceTypeValueB,
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
          path: "/sf6/mix",
          query: {
            type: "deviceClassify",
            params: param.name,
            companyId: that.companyId,
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
      this.chart5Refresh(historyAlarmCount, "");
      this.chart6Refresh(ratedMap);
      this.getList(that.times, alarmType);
    },
  },
};
</script>
<style lang="scss" scoped>
.first {
  width: 100%;
  height: 100%;

  .el-table >>> th.gutter {
    display: table-cell !important;
    background-color: #081b2f;
  }
  >>> ::-webkit-scrollbar {
    width: 6px; // 横向滚动条
    height: 6px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  >>> ::-webkit-scrollbar-thumb {
    background-color: #6d9dcd;
    border-radius: 3px;
  }
  .dash_dater {
    >>> .el-input__inner {
      border: none;
      background-color: #000;
      color: #14e1fa;
      font-size: 12px;
    }
  }
  .box-title-list {
    display: flex;
  }
  >>> .el-table tr {
    background-color: #081b2f;
  }
  >>> .el-table td {
    border-bottom: 0px solid #dfe6ec;
  }
  >>> .el-table__row--striped td {
    background: #081b2f !important;
  }

  >>> .el-table {
    color: #6d9dcd;
  }
  >>> .el-table thead {
    color: #6d9dcd;
  }
  >>> .el-table th.is-leaf {
    height: 85px;
    background: #081b2f !important;
    border-bottom: 0px solid #dfe6ec;
  }
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
        cursor: initial;
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
