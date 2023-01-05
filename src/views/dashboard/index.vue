<template>
  <div style="width: 100%">
    <div class="dashboard">
      <div class="dashboard-topImg">
        <!-- <img src="../../assets/images/bg05.png" /> -->
        XXXXXXXXXXXXX物联网管理平台
      </div>
      <div class="dashboard-time">{{ nowDate }} 欢迎使用！</div>
      <div class="dashboard-container">
        <div class="left">
          <div class="leftbox1">
            <img class="boxbg01" src="../../assets/images/boxbg01.png" />
            <img class="boxbg02" src="../../assets/images/boxbg02.png" />
            <img class="boxbg03" src="../../assets/images/boxbg03.png" />
            <img class="boxbg04" src="../../assets/images/boxbg04.png" />
            <img class="boxbg05" src="../../assets/images/boxbg05.png" />
            <div class="box-container">
              <div class="title">
                <img class="titleImg" src="../../assets/images/title1.png" />
                <span>今日所有设备状况</span>
                <img class="titleImg" src="../../assets/images/title2.png" />
              </div>
              <div class="content">
                <div class="content-item">
                  <img class="itemImg" src="../../assets/images/online2.png" />
                  <div class="totalNum">
                    <div class="num">{{ todayCase.online || 0 }}</div>
                    <div class="status">在线</div>
                  </div>
                </div>
                <!-- <div class="content-item">
                  <img class="itemImg" src="../../assets/images/abnormal.png" />
                  <div class="totalNum">
                    <div class="num">{{todayCase.unusualline || 0}}</div>
                    <div class="status">异常</div>
                  </div>
                </div> -->
                <div class="content-item">
                  <img class="itemImg" src="../../assets/images/outline2.png" />
                  <div class="totalNum">
                    <div class="num">{{ todayCase.outline || 0 }}</div>
                    <div class="status">离线</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="leftbox3">
            <img class="boxbg01" src="../../assets/images/boxbg01.png" />
            <img class="boxbg02" src="../../assets/images/boxbg02.png" />
            <img class="boxbg03" src="../../assets/images/boxbg03.png" />
            <img class="boxbg04" src="../../assets/images/boxbg04.png" />
            <img class="boxbg05" src="../../assets/images/boxbg05.png" />
            <!-- <div class="dash_dater">
              <div class="dash_dater_item" :style="{ opacity: times == '周' ? 1 : 0.5 }" @click="changeTimes('周')">周</div>
              <div class="dash_dater_border"></div>
              <div class="dash_dater_item" :style="{ opacity: times == '月' ? 1 : 0.5 }" @click="changeTimes('月')">月</div>
              <div class="dash_dater_border"></div>
              <div class="dash_dater_item" :style="{ opacity: times == '年' ? 1 : 0.5 }" @click="changeTimes('年')">年</div>
            </div> -->
            <div class="box-container">
              <div class="title">
                <img class="titleImg" src="../../assets/images/title1.png" />
                <span>传感器报警统计</span>
                <img class="titleImg" src="../../assets/images/title2.png" />
              </div>
              <div class="content">
                <div ref="chart2" style="width: 100%; height: 325px"></div>
              </div>
            </div>
          </div>

          <div class="leftbox2">
            <img class="boxbg01" src="../../assets/images/boxbg01.png" />
            <img class="boxbg02" src="../../assets/images/boxbg02.png" />
            <img class="boxbg03" src="../../assets/images/boxbg03.png" />
            <img class="boxbg04" src="../../assets/images/boxbg04.png" />
            <img class="boxbg05" src="../../assets/images/boxbg05.png" />
            <div class="box-container">
              <div class="title">
                <img class="titleImg" src="../../assets/images/title1.png" />
                <!-- 最近12小时在线数量 -->
                <span>传感器分类统计</span>
                <img class="titleImg" src="../../assets/images/title2.png" />
              </div>
              <div class="content">
                <div ref="chart4" style="width: 100%; height: 325px"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-right">
          <div class="center">
            <img class="boxbg01" src="../../assets/images/boxbg01.png" />
            <img class="boxbg02" src="../../assets/images/boxbg02.png" />
            <img class="boxbg03" src="../../assets/images/boxbg03.png" />
            <img class="boxbg04" src="../../assets/images/boxbg04.png" />
            <img class="boxbg05" src="../../assets/images/boxbg05.png" />
            <div class="box-container">
              <div class="title">
                <img class="titleImg" src="../../assets/images/title1.png" />
                <span>今日更新设备数</span>
                <img class="titleImg" src="../../assets/images/title2.png" />
              </div>
              <div class="content">
                <div ref="chart3" style="width: 100%; height: 100%"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <img class="boxbg01" src="../../assets/images/boxbg01.png" />
            <img class="boxbg02" src="../../assets/images/boxbg02.png" />
            <img class="boxbg03" src="../../assets/images/boxbg03.png" />
            <img class="boxbg04" src="../../assets/images/boxbg04.png" />
            <img class="boxbg05" src="../../assets/images/boxbg05.png" />
            <div class="box-container">
              <div class="title">
                <img class="titleImg" src="../../assets/images/title1.png" />
                <!-- 传感器分类统计 -->
                <span>最近12小时在线数量</span>
                <img class="titleImg" src="../../assets/images/title2.png" />
              </div>
              <div class="content">
                <div
                  class="chart4"
                  ref="chart"
                  style="width: 100%; height: 100%"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index.js";
import * as api from "@/api/dashboard";
export default {
  name: "Dashboard",
  data() {
    return {
      myChartId: null,
      nowDate: "",
      todayCase: {},
      todayTimesList: {},
      alarmSbList: [],
      listBjCount: [],
      listBjUp: [],
      myChart: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      times: "周",
    };
  },
  activated() {
    this.getData();
    this.myChart.resize();
    this.myChart2.resize();
    this.myChart3.resize();
    this.myChart4.resize();
  },
  beforeDestroy() {},
 
  beforeCreate() {},
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chart);
    this.myChart2 = this.$echarts.init(this.$refs.chart2);
    this.myChart3 = this.$echarts.init(this.$refs.chart3);
    this.myChart4 = this.$echarts.init(this.$refs.chart4);
    this.myChartId = window.addEventListener("resize", () => {
      //监听浏览器窗口大小改变
      this.myChart.resize();
      this.myChart2.resize();
      this.myChart3.resize();
      this.myChart4.resize();
    });
    this.nowDate = parseTime(new Date(), "{y}年{m}月{d}日 {h}:{i}");
    // this.initEchart();
  },
  methods: {
    async getData() {
      const { todayCase, todayTimesList } = await api.home({});
      this.todayCase = todayCase;
      this.todayTimesList = todayTimesList;
      const { alarmSbList, listBjCount, listBjUp } = await api.home2({
        times: this.times,
      });
      this.alarmSbList = alarmSbList;
      this.listBjCount = listBjCount;
      this.listBjUp = listBjUp;
      this.nowDate = parseTime(new Date(), "{y}年{m}月{d}日 {h}:{i}");
      this.myChart.clear();
      let keyData = [];
      for (const key in this.todayTimesList) {
        keyData.push(key);
      }
      console.log("keyData", keyData);
      this.myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: keyData,
          data: [
            "避雷器",
            "温度",
            "温湿度",
            "伸缩节",
            "变形",
            "温度电流",
            "倾斜",
            "气压",
            "水浸",
            "水位",
            "温控",
            "计数",
          ],
          textStyle: {
            color: "#fff",
          },
          bottom: 5,
          icon: "circle",
        },
        grid: {
          top: 22,
          left: 36,
          right: 30,
          bottom: 90,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.todayTimesList.times,
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
            show: true,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
        },
        series: [
          {
            name: "避雷器",
            type: "line",
            data: this.todayTimesList.lightningArrester,
            symbol: "none",
          },
          {
            name: "温度",
            type: "line",
            data: this.todayTimesList.wirelessTemperature,
            symbol: "none",
          },
          {
            name: "温湿度",
            type: "line",
            data: this.todayTimesList.temperatureAndHumidity,
            symbol: "none",
          },
          {
            name: "伸缩节",
            type: "line",
            data: this.todayTimesList.telescopicJoint,
            symbol: "none",
          },
          {
            name: "变形",
            type: "line",
            data: this.todayTimesList.deformation,
            symbol: "none",
          },
          {
            name: "温度电流",
            type: "line",
            data: this.todayTimesList.temperatureElectric,
            symbol: "none",
          },
          {
            name: "倾斜",
            type: "line",
            data: this.todayTimesList.tiltDetection,
            symbol: "none",
          },
          {
            name: "气压",
            type: "line",
            data: this.todayTimesList.pressure,
            symbol: "none",
          },
          {
            name: "水浸",
            type: "line",
            data: this.todayTimesList.flooding,
            symbol: "none",
          },
          {
            name: "水位",
            type: "line",
            data: this.todayTimesList.waterLevel,
            symbol: "none",
          },
          {
            name: "温控",
            type: "line",
            data: this.todayTimesList.temperatureControl,
            symbol: "none",
          },
          {
            name: "计数",
            type: "line",
            data: this.todayTimesList.counting,
            symbol: "none",
          },
        ],
      });
      this.myChart2.clear();
      this.myChart2.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 52,
          left: 75,
          right: 30,
          bottom: 50,
        },
        yAxis: {
          type: "category",
          boundaryGap: true,
          data: this.alarmSbList.map((item) => {
            return item.name;
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
        xAxis: {
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
            show: true,
            lineStyle: {
              color: "rgba(20, 225, 250, 0.2)",
            },
          },
        },
        series: [
          {
            name: "报警数量",
            type: "bar",
            data: this.alarmSbList.map((item) => {
              return item.value;
            }),
            label: {
              show: true,
              position: "right",
              color: "#fff",
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 1, color: "rgba(230, 40, 50, 1)" }, //柱图渐变色
                  { offset: 0, color: "rgba(230, 40, 50, 0)" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      });
      this.myChart3.clear();
      this.myChart3.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 52,
          left: 75,
          right: 30,
          bottom: 50,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.listBjUp.map((item) => {
            return item.name;
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
            end: 100,
          },
        ],
        series: [
          {
            name: "今日更新设备数",
            type: "bar",
            data: this.listBjUp.map((item) => {
              return item.value;
            }),
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
     
     
     this.myChart4.clear();
      this.myChart4.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          textStyle: {
            color: "#fff",
          },
          bottom: 10,
          right: 10, //可设定图例在左、右、居中
          icon: "circle",
        },
        graphic: [
          {
            type: "text",
            left: "center",
            top: "34%",
            style: {
              text: this.listBjCount.reduce(
                (total, currentValue, currentIndex, arr) => {
                  return currentValue.value
                    ? total + currentValue.value
                    : total;
                },
                0
              ),
              fill: "#fff",
              fontSize: 16,
            },
          },
          {
            type: "text",
            left: "center",
            top: "42%",
            style: {
              text: "设备总数",
              fill: "#fff",
              fontSize: 14,
            },
          },
        ],

        series: [
          {
            name: "传感器分类统计",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: this.listBjCount,
            center: ["center", "40%"], // 这个属性调整图像的位置！！！！！
          },
        ],
      });
    },
    // 修改时间
    changeTimes(times) {
      this.times = times;
      this.getData();
    },
    toDetail() {
      this.$router.push({
        path: "/ningxia/yingchuan/bilei_detail",
      });
    },
    initEchart() {
      const myChart3 = this.$echarts.init(this.$refs.chart3);
      const myChart4 = this.$echarts.init(this.$refs.chart4);
      const option3 = {};
      const option4 = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  min-height: 960px;
  background-image: url("../../assets/images/bg01.png"),
    url("../../assets/images/bg02.png"), url("../../assets/images/bg03.png"),
    url("../../assets/images/bg04.png");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: top left, top right, bottom left, bottom right;
  position: relative;
  // background-color: #030c35;
  .dashboard-topImg {
    position: absolute;
    left: 50%;
    top: 4px;
    margin-left: -500px;
    width: 1000px;
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    color: #9ed0ff;
    line-height: 132px;
    background-image: url("../../assets/images/bg07.jpg");
    background-position: top center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    font-family: "test";
  }
  .dashboard-time {
    font-size: 14px;
    color: #14e1fa;
    position: absolute;
    left: 44px;
    top: 31px;
  }
  .dashboard-container {
    width: 100%;
    height: 100%;
    background-color: #030c35;
    border: 2px solid rgba(50, 155, 255, 0.5);
    display: flex;
    padding: 109px 39px 39px 39px;
  }
  .left {
    // width: 51.25rem;
    width: 40%;
    height: 100%;
    .leftbox1 {
      background: #081437;
      border: 1px solid #19508f;
      width: 100%;
      height: calc(20% - 5px);
      position: relative;
      text-align: center;
      min-height: 185px;
    }
    .leftbox2 {
      @extend .leftbox1;
      height: 40%;
      margin-top: 10px;
      min-height: 320px;
    }
    .leftbox3 {
      @extend .leftbox2;
      .dash_dater {
        position: absolute;
        top: 10px;
        right: 15px;
        z-index: 10;
        border: 1px solid #19508f;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        .dash_dater_item {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          font-size: 14px;
          color: #14e1fa;
          cursor: pointer;
        }
        .dash_dater_border {
          width: 1px;
          background: #19508f;
        }
      }
    }
  }
  .dashboard-right {
    width: 60%;
    height: 100%;
  }
  .center {
    // width: 28.51rem;
    width: 100%;
    margin: 0 11px;
    background: #081437;
    border: 1px solid #19508f;
    height: 50%;
    position: relative;
    text-align: center;
    min-height: 185px;
  }
  .right {
    margin-top: 15px;
    @extend .center;
  }
  .boxbg01 {
    position: absolute;
    top: -1px;
    left: -1px;
  }
  .boxbg02 {
    position: absolute;
    top: -1px;
    right: -1px;
  }
  .boxbg03 {
    position: absolute;
    bottom: -1px;
    left: -1px;
  }
  .boxbg04 {
    position: absolute;
    bottom: -1px;
    right: -1px;
  }
  .boxbg05 {
    position: absolute;
    left: 50%;
    margin-left: -97.5px;
    width: 195px;
  }
  .box-container {
    height: 100%;
    .title {
      height: 55px;
      background: #152349;
      color: #14e1fa;
      text-align: center;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      .titleImg {
        width: 41px;
        height: 12px;
        margin: 0 9px;
      }
    }
    .content {
      display: flex;
      align-items: center;
      height: calc(100% - 55px);
      justify-content: space-around;
      .content-item {
        display: flex;
        align-items: center;
        justify-content: center;
        .itemImg {
          width: 3.88rem;
        }
        .totalNum {
          text-align: left;
          margin: 20px;
          .num {
            font-size: 1.75rem;
            color: #ffffff;
            line-height: 24px;
          }
          .status {
            font-size: 0.88rem;
            line-height: 24px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
