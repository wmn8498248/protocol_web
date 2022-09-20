<template>
  <div class="dashboard">
    <div class="dashboard-topImg">
      <!-- <img src="../../assets/images/bg05.png" /> -->
      XXXXX公司
    </div>
    <div class="dashboard-time" v-if="nowDate">
      <p>{{ nowDate }}</p>
      <!-- <p class="big">5:30:41</p>
      <p>2021/11/11pm周4</p> -->
    </div>
    <div class="dashboard-day" v-if="todayCase">
      <p>
        正常运行<span>{{ todayCase.normalDays }}</span
        >天
      </p>
    </div>
    <div class="dashboard-container">
      <div class="dashboard-left">
        <div class="dashboard-box">
          <img class="boxbg01" src="../../assets/images/boxbg01.png" />
          <img class="boxbg02" src="../../assets/images/boxbg02.png" />
          <img class="boxbg03" src="../../assets/images/boxbg03.png" />
          <img class="boxbg04" src="../../assets/images/boxbg04.png" />
          <img class="boxbg05" src="../../assets/images/boxbg05.png" />
          <div class="box-container">
            <div class="box-title">
              <img class="title-img" src="../../assets/images/title1.png" />
              <span>平台介绍</span>
              <img class="title-img" src="../../assets/images/title2.png" />
            </div>
            <div class="box-content">
              <div class="content-title">
                <div class="text-left">夏</div>
                <div class="text-right">
                  <p>XXXXX有限公司</p>
                  <p>State Grid(SG)</p>
                </div>
              </div>
              <div class="content">
                <p
                  style="text-indent: 2em"
                  title=" 公司概况:这里面可以包括注册时间,注册资本,公司性质,技术力量,规模,员工人数,员工素质等; 2. 公司发展状况:公司的发展速度,有何成绩,有何荣誉称号等; 3. 公司文化:公司的目标,理念,宗旨,使命,愿景,寄语等; ... 6. 售后服务:主要是公司售后服务的承诺。.64万平方公里，供电服务人口688万人。截至2020年底，公司用工总量13601人，其中长期职工9107人、供电服务（农电）职工3258人、集体企业用工1126人、劳务派遣110人。"
                >
                   公司概况:这里面可以包括注册时间,注册资本,公司性质,技术力量,规模,员工人数,员工素质等; 2. 公司发展状况:公司的发展速度,有何成绩,有何荣誉称号等; 3. 公司文化:公司的目标,理念,宗旨,使命,愿景,寄语等; ... 6. 售后服务:主要是公司售后服务的承诺。.64万平方公里，供电服务人口688万人。截至2020年底，公司用工总量13601人，其中长期职工9107人、供电服务（农电）职工3258人、集体企业用工1126人、劳务派遣110人。
                </p>
                <p>公司成立: 1xxx年02月28日</p>
                <p>营业期限: 1xxx年02月28日-9999年12月31日</p>
                <p>企业地址：xxx市长城东路288号</p>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-box" style="margin-top: 20px">
          <img class="boxbg01" src="../../assets/images/boxbg01.png" />
          <img class="boxbg02" src="../../assets/images/boxbg02.png" />
          <img class="boxbg03" src="../../assets/images/boxbg03.png" />
          <img class="boxbg04" src="../../assets/images/boxbg04.png" />
          <img class="boxbg05" src="../../assets/images/boxbg05.png" />
          <div class="box-container">
            <div class="box-title">
              <img class="title-img" src="../../assets/images/title1.png" />
              <span>传感器报警</span>
              <img class="title-img" src="../../assets/images/title2.png" />
            </div>
            <div
              :class="alarms.lenght > 0? 'box-content warp-img' : 'box-content'"
            >
              <div class="warp" style="height: initial">
                <ul class="alarm-item">
                  <li>
                    <span
                      class="title"
                      title="传感器别名"
                      v-text="'传感器别名'"
                    ></span>
                    <span class="title" title="压力值" v-text="'压力值'"></span>
                    <!-- <span class="title" v-text="'站点'"></span> -->
                    <span
                      class="title"
                      title="报警时间"
                      v-text="'报警时间'"
                    ></span>
                  </li>
                </ul>
              </div>
              <div @click.stop="handleToDetail($event)">
                <vue-seamless-scroll
                  :data="alarms"
                  :class-option="alarmsOption"
                  class="warp"
                >
                  <ul class="alarm-item">
                    <!-- @click="toDetail(item.deviceId, item.deviceNumber)" -->
                    <li
                      v-for="(item, index) in alarms"
                      :key="index"
                      
                    >
                      <span
                        class="date"
                        :title="item.companyName"
                        :id="index"
                        v-text="item.companyName"
                      ></span>
                      <span
                        class="date"
                        :title="item.pressure"
                        :id="index"
                        v-text="item.pressure"
                        style="color:rgb(242, 250, 20);"
                      ></span>
                      <!-- <span class="date" v-text="item.deviceName"></span> -->
                      <span
                        class="date"
                        :title="item.updateTime"
                        :id="index"
                        v-text="item.updateTime"
                      ></span>
                    </li>
                  </ul>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-center">
        <div class="center-box">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="data-title">
            <b class="data-title-left">[</b>
            <span>刷新倒计时：{{ countTime }}</span>
            <!-- <span>仪表盘等展示</span> -->
            <b class="data-title-right">]</b>
          </div>
          <div class="center-container">
            <div class="center-equipment">
              <i class="topL"></i>
              <i class="topR"></i>
              <i class="bottomL"></i>
              <i class="bottomR"></i>
              <p>
                设备总数: <span>{{ todayCase.total }}</span>
              </p>
            </div>
            <div class="equipment-online">
              <span class="online">在线：{{ todayCase.online }}</span>
              <!-- <span class="line-histogram"></span> -->
              <span class="offline">离线：{{ todayCase.outline }}</span>
            </div>
            <div class="equipment-data">
              <div class="data-chart">
                <div ref="lastChart0" style="width: 100%; height: 225px"></div>
                <div
                  v-if="last3PressureHistory.length > 0"
                  :class="
                    equipmentName == 0
                      ? 'equipment-data-title active'
                      : 'equipment-data-title'
                  "
                  @click="changeName(0)"
                >
                  <span :title="last3PressureHistory[0].deviceName">{{
                    last3PressureHistory[0].deviceName
                  }}</span>
                </div>
              </div>
              <div class="data-chart">
                <div ref="lastChart1" style="width: 100%; height: 225px"></div>
                <div
                  v-if="last3PressureHistory.length > 1"
                  :class="
                    equipmentName == 1
                      ? 'equipment-data-title active'
                      : 'equipment-data-title'
                  "
                  @click="changeName(1)"
                >
                  <span :title="last3PressureHistory[1].deviceName">{{
                    last3PressureHistory[1].deviceName
                  }}</span>
                </div>
              </div>
              <div class="data-chart">
                <div ref="lastChart2" style="width: 100%; height: 225px"></div>
                <div
                  v-if="last3PressureHistory.length > 2"
                  :class="
                    equipmentName == 2
                      ? 'equipment-data-title active'
                      : 'equipment-data-title'
                  "
                  @click="changeName(2)"
                >
                  <span :title="last3PressureHistory[2].deviceName">{{
                    last3PressureHistory[2].deviceName
                  }}</span>
                </div>
              </div>
            </div>
            <div class="equipment-status">
              <i class="topL"></i>
              <i class="topR"></i>
              <i class="bottomL"></i>
              <i class="bottomR"></i>
              <div class="dashboard-box" style="margin-top: 20px">
                <img class="boxbg01" src="../../assets/images/boxbg01.png" />
                <img class="boxbg02" src="../../assets/images/boxbg02.png" />
                <img class="boxbg03" src="../../assets/images/boxbg03.png" />
                <img class="boxbg04" src="../../assets/images/boxbg04.png" />
                <img class="boxbg05" src="../../assets/images/boxbg05.png" />
                <div class="box-container">
                  <div class="box-title" style="background-color: transparent">
                    <img
                      class="title-img"
                      src="../../assets/images/title1.png"
                    />
                    <span v-if="last3PressureHistory.length > 0">{{
                      last3PressureHistory[equipmentName].deviceName
                    }}</span>
                    <img
                      class="title-img"
                      src="../../assets/images/title2.png"
                    />
                  </div>
                  <div class="box-content" style="height: calc(100% - 55px)">
                    <div ref="chart3" style="width: 100%; height: 325px"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="dashboard-box">
          <img class="boxbg01" src="../../assets/images/boxbg01.png" />
          <img class="boxbg02" src="../../assets/images/boxbg02.png" />
          <img class="boxbg03" src="../../assets/images/boxbg03.png" />
          <img class="boxbg04" src="../../assets/images/boxbg04.png" />
          <img class="boxbg05" src="../../assets/images/boxbg05.png" />
          <div class="box-container">
            <div class="box-title">
              <img class="title-img" src="../../assets/images/title1.png" />
              <span>最新设备状态</span>
              <img class="title-img" src="../../assets/images/title2.png" />
            </div>
            <div class="box-content" style="height: calc(100% - 55px)">
              <div class="warp" style="height: initial">
                <ul class="item">
                  <li>
                    <span class="title" v-text="'传感器别名'"></span>
                    <span class="title" v-text="'气压(MPa)'"></span>
                    <span class="title" v-text="'温度(℃)'"></span>
                    <span class="title" v-text="'电量(%)'"></span>
                  </li>
                </ul>
              </div>
              <div @click.stop="handleGoToDetail($event)">
                <vue-seamless-scroll
                  :data="newData"
                  :class-option="newDataOption"
                  class="warp"
                >
                  <ul class="item">
                    <!-- @click="goToDetail(item.deviceNumber, item.companyId,item.projectId)" -->
                    <li v-for="(item, index) in newData" :key="index">
                      <span
                        class="date"
                        :title="item.deviceName"
                        :id="index"
                        v-text="item.deviceName"
                      ></span>
                      <span
                        class="date"
                        :id="index"
                        :title="item.pressure"
                        v-text="item.pressure"
                      ></span>
                      <span
                        class="date"
                        :id="index"
                        :title="item.temperature"
                        v-text="item.temperature"
                      ></span>
                      <span
                        class="date"
                        :id="index"
                        :title="item.electric"
                        v-text="item.electric"
                      ></span>
                    </li>
                  </ul>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-box" style="margin-top: 20px">
          <img class="boxbg01" src="../../assets/images/boxbg01.png" />
          <img class="boxbg02" src="../../assets/images/boxbg02.png" />
          <img class="boxbg03" src="../../assets/images/boxbg03.png" />
          <img class="boxbg04" src="../../assets/images/boxbg04.png" />
          <img class="boxbg05" src="../../assets/images/boxbg05.png" />
          <div class="box-container">
            <div class="box-title">
              <img class="title-img" src="../../assets/images/title1.png" />
              <span>最近7天数据量</span>
              <img class="title-img" src="../../assets/images/title2.png" />
            </div>
            <div class="box-content" style="height: calc(100% - 55px)">
              <div ref="chart4" style="width: 100%; height: 325px"></div>
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
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "test",
  data() {
    return {
      countTime: 30,
      deviceTime: [],
      deviceTemperature: [],
      devicepressure: [],
      alarms: [],
      last3PressureHistory: [],
      newData: [],
      todayCase: {
        normalDays: 0,
        online: 0,
        outline: 0,
        total: 0,
      },
      weekDataNum: {
        days: [],
        counts: [],
      },
      equipmentName: 0,
      nowDate: null,
      nowDateId: null,
      getDataTimeId: null,
      chartList: [],
      myChartA: null,
      myChartB: null,
      myChartC: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      equipmentDate: [],
      listData: [],
      newDataOption: {
        step: 0, // 速度
        direction: 0,
        singleHeight: 0, // 停顿
      },
      alarmsOption: {
        step: 0, // 速度
        direction: 0,
        singleHeight: 0, // 停顿
      },
    };
  },
  components: {
    vueSeamlessScroll,
  },
  created() {
    this.getData();
  },
  computed: {
    openedStutas() {
      return this.$store.getters.sidebar.opened;
    },
  },

  watch: {
    openedStutas() {
      console.log('openedStutas', this.myChartId)
      // for (let index = 0; index < this.last3PressureHistory.length; index++) {
      //   this.chartList[index].resize();
      // }
      // this.myChart3.resize();
      // this.myChart4.resize();
    },
  },
  beforeDestroy: function () {
    clearInterval(this.nowDateId);
    clearInterval(this.getDataTimeId);
  },

  mounted() {
    this.nowDateId = setInterval(() => {
      this.nowDate = parseTime(new Date(), "{y}年{m}月{d}日 {h}:{i}:{s}");
      --this.countTime;
    }, 1000);

    for (let index = 0; index < 3; index++) {
      this.chartList[index] = this.$echarts.init(
        this.$refs["lastChart" + index]
      );
      // this.chartList[index] = this.$echarts.init(
      //   this.$refs["chartList" + index]
      // );
    }

    // this.myChartA = this.$echarts.init(this.$refs.chartA);
    // this.myChartB = this.$echarts.init(this.$refs.chartB);
    // this.myChartC = this.$echarts.init(this.$refs.chartC);
    this.myChart3 = this.$echarts.init(this.$refs.chart3);
    this.myChart4 = this.$echarts.init(this.$refs.chart4);

    this.myChartId = window.addEventListener("resize", () => {
      //监听浏览器窗口大小改变
      // this.myChartA.resize();
      // this.myChartB.resize();
      // this.myChartC.resize();
      for (let index = 0; index < this.last3PressureHistory.length; index++) {
        this.chartList[index].resize();
      }
      this.myChart3.resize();
      this.myChart4.resize();
    });

    this.getDataTimeId = setInterval(() => {
      this.getData();
      this.countTime = 30;
    }, 30000);
  },
 
  deactivated() {
    console.log("deactivated");
  },
  activated() {
    console.log("activated");
  },
  methods: {
    handleGoToDetail(res) {
      let target = res.target;
      let id = target.id;
      this.goToDetail(
        this.newData[id].deviceNumber,
        this.newData[id].companyId,
        this.newData[id].projectId
      );
    },
    handleToDetail(res) {
      let target = res.target;
      let id = target.id;
      this.toDetail(this.alarms[id].deviceNumber);
      
    },
    // 查看数据
    goToDetail(deviceNumber, companyId, projectId) {
      this.$router.push({
        path: `compony1/stand1/qiya_data`,
        query: {
          deviceNumber,
          companyId,
          projectId,
        },
      });
    },
    // 查看详情
    toDetail( deviceNumber) {
      this.$router.push({
        path: "/waring/qiya",
        query: {
          deviceNumber,
        },
      });
    },
    changeName(res) {
      this.equipmentName = res;
      this.chart3Refresh();
    },
    async getData() {
      const { last3PressureHistory, alarms, newData, todayCase, weekDataNum } =
        await api.homeNew({});
      this.last3PressureHistory = last3PressureHistory; //最近3台气压温度数据

      this.alarms = alarms; // 报警警告列表

      if (alarms.length > 9) {
        this.alarmsOption.step = 1;
      } else {
        this.alarmsOption.step = 1;
      }

      this.newData = newData; //最新设备数据
      if (newData.length > 9) {
        this.newDataOption.step = 1;
      } else {
        this.newDataOption.step = 0;
      }

      this.todayCase = todayCase; // 设备总数统计

      if (weekDataNum.length > 0) {
        for (let index = 0; index < weekDataNum.length; index++) {
          this.weekDataNum.days[index] = weekDataNum[index].days;
          this.weekDataNum.counts[index] = weekDataNum[index].count;
        }
      }
      // this.weekDataNum = weekDataNum;

      let option = {
        series: [
          {
            type: "gauge",
            splitNumber: 10,
            radius: "80%",
            min: 0,
            max: 1000,
            axisLine: {
              lineStyle: {
                // color: [[1, "#14e1fa"]], // x轴圈圈
                color: [
                  [0.5, "#999999"],
                  [0.8, "#14e1fa"],
                  [1, "#CC6666"],
                ],
                width: 3,
              },
            },
            splitLine: {
              distance: 0, //-18
              length: 16,
              lineStyle: {
                color: "#14e1fa", // x轴刻度大颜色
              },
            },
            axisTick: {
              distance: 0, //-12
              length: 10,
              lineStyle: {
                color: "#14e1fa", // x轴刻度小颜色
              },
            },
            axisLabel: {
              distance: 2, //-50
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
              offsetCenter: [0, "10%"],
              icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
              length: "80%",
              itemStyle: {
                color: "#14e1fa", // 指针颜色
              },
            },
            detail: {
              valueAnimation: true,
              precision: 2, // 中间小数点
              color: "#14e1fa", // 中间文字颜色
              fontSize: 18,
            },
            title: {
              offsetCenter: [0, "-30%"],
              color: "#14e1fa", // 文字单位颜色
            },
            data: [
              {
                value: 58.46,
                name: "MPa",
              },
            ],
          },
        ],
      };

      let optinList = [];
      for (let index = 0; index < this.last3PressureHistory.length; index++) {
        optinList[index] = option;
        optinList[index].series[0].data[0].value =
          this.last3PressureHistory[index].pressure;

        optinList[index].series[0].axisLine.lineStyle.color[0][0] =
          (this.last3PressureHistory[index].num2 -
            this.last3PressureHistory[index].num1) /
          (this.last3PressureHistory[index].num4 -
            this.last3PressureHistory[index].num1);
        optinList[index].series[0].axisLine.lineStyle.color[1][0] =
          (this.last3PressureHistory[index].num3 -
            this.last3PressureHistory[index].num1) /
          (this.last3PressureHistory[index].num4 -
            this.last3PressureHistory[index].num1);
        optinList[index].series[0].max = this.last3PressureHistory[index].num1;
        optinList[index].series[0].max = this.last3PressureHistory[index].num4;

        this.chartList[index].clear();
        this.chartList[index].setOption(optinList[index]);
      }

      let deviceTime = [];
      let deviceTemperature = [];
      let devicepressure = [];

      for (let index = 0; index < 3; index++) {
        deviceTime = [];
        deviceTemperature = [];
        devicepressure = [];
        for (
          let indexMin = 0;
          indexMin < last3PressureHistory[index].history.length;
          indexMin++
        ) {
          let lenghtCount = last3PressureHistory[index].history.length;
          deviceTime.push(
            last3PressureHistory[index].history[lenghtCount - indexMin - 1]
              .updateTime
            // last3PressureHistory[index].history.sort()[indexMin].updateTime
          );
          deviceTemperature.push(
            last3PressureHistory[index].history[lenghtCount - indexMin - 1]
              .temperature
            // last3PressureHistory[index].history.sort()[indexMin].temperature
          );
          devicepressure.push(
            last3PressureHistory[index].history[lenghtCount - indexMin - 1]
              .pressure
            // last3PressureHistory[index].history.sort()[indexMin].pressure
          );
        }
        this.deviceTime[index] = deviceTime;
        this.deviceTemperature[index] = deviceTemperature;
        this.devicepressure[index] = devicepressure;
      }

      // console.log(this.deviceTime);
      // console.log(this.deviceTemperature);
      // console.log(this.devicepressure);

      this.chart3Refresh();
      this.myChart4.clear();
      this.myChart4.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 15,
          left: 15,
          right: 25,
          bottom: 20,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: this.weekDataNum.days,
          data: this.weekDataNum.days.map(function (str) {
            return str.replace("-", "\n");
          }),

          axisLabel: {
            //x轴文字的配置
            rotate: 0,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            show: true,
            boundaryGap: true,
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
            name: "条数",
            type: "line",
            data: this.weekDataNum.counts,
            symbol: "ture",
          },
        ],
      });
    
    },
    chart3Refresh() {
      this.myChart3.clear();
      this.myChart3.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["气压", "温度"],
          textStyle: {
            color: "#fff",
          },
          top: 0,
          icon: "circle",
        },
        grid: {
          top: 30,
          left: 15,
          right: 25,
          bottom: 20,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: this.deviceTime[this.equipmentName],
          data: this.deviceTime[this.equipmentName].map(function (str) {
            return str.replace(" ", "\n");
          }),
          axisLabel: {
            //x轴文字的配置
            rotate: 0,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            show: true,
            boundaryGap: true,
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
            name: "气压",
            type: "line",
            data: this.devicepressure[this.equipmentName],
            symbol: "ture",
          },
          {
            name: "温度",
            type: "line",
            data: this.deviceTemperature[this.equipmentName],
            symbol: "ture",
          },
        ],
      });
    
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
  padding: 14px;
  position: relative;
  background-color: #030c35;
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
    left: 54px;
    top: 31px;
    padding: 10px 15px;
    text-align: center;
    border: 1px solid #14e1fa;
    box-shadow: 0 0 5px #14e1fa;
    line-height: 28px;
    p.big {
      font-size: 24px;
    }
  }
  .dashboard-day {
    @extend .dashboard-time;
    left: auto;
    right: 54px;
    // line-height: 56px;
    span {
      font-size: 24px;
      color: #9ed0ff;
      padding: 0 5px;
    }
  }
  .dashboard-container {
    width: 100%;
    height: 100%;
    background-color: #030c35;
    border: 2px solid rgba(50, 155, 255, 0.5);
    display: flex;
    padding: 109px 39px 39px 39px;
  }
  .dashboard-left {
    flex: 0.3;
    width: 25%;
  }

  .dashboard-center {
    flex: 0.4;
    padding: 25px 25px;
    .center-box {
      min-height: 763px;
      height: 100%;
      background-image: radial-gradient(
        250px 250px at 50% 50%,
        hsla(209, 99%, 32%, 28),
        hsla(228, 100%, 0%, 0)
      );
      border: 2px solid #032d60;
      box-shadow: inset 0 0 30px #07417a;
      position: relative;
      .topL {
        width: 20px;
        height: 20px;
        border-top-width: 2px;
        border-top-color: #26c6f0;
        border-top-style: solid;
        border-left-width: 2px;
        border-left-color: #26c6f0;
        border-left-style: solid;
        position: absolute;
        top: -2px;
        left: -2px;
      }
      .topR {
        width: 20px;
        height: 20px;
        border-top-width: 2px;
        border-top-color: #26c6f0;
        border-top-style: solid;
        border-right-width: 2px;
        border-right-color: #26c6f0;
        border-right-style: solid;
        position: absolute;
        top: -2px;
        right: -2px;
      }
      .bottomL {
        width: 20px;
        height: 20px;
        border-bottom-width: 2px;
        border-bottom-color: #26c6f0;
        border-bottom-style: solid;
        border-left-width: 2px;
        border-left-color: #26c6f0;
        border-left-style: solid;
        position: absolute;
        bottom: -2px;
        left: -2px;
      }
      .bottomR {
        width: 20px;
        height: 20px;
        border-bottom-width: 2px;
        border-bottom-color: #26c6f0;
        border-bottom-style: solid;
        border-right-width: 2px;
        border-right-color: #26c6f0;
        border-right-style: solid;
        position: absolute;
        bottom: -2px;
        right: -2px;
      }
      .data-title {
        background-color: #000c3b;
        width: 178px;
        margin: -18px auto 0 auto;
        color: #14e1fa;
        font-size: 20px;
        .data-title-left,
        .data-title-right {
          color: #14e1fa;
          font-family: "微软雅黑";
          font-size: 20px;
        }
        span {
          text-align: center;
          width: 150px;
          display: inline-block;
          text-align: center;
          font-size: 18px;
        }
      }
    }
  }

  .center-container {
    color: #14e1fa;
    text-align: center;
    .equipment-online {
      line-height: 40px;
      margin-top: 10px;
      .line-histogram {
        // display: inline-block;
        width: 100%;
        padding: 10px 45px;
        background-color: #14e1fa;
      }
      span.online {
        display: inline-block;
        //   border: 1px solid #14e1fa;
        margin: 0 15px;
      }
      span.offline {
        color: #9ed0ff;
      }
    }
    .equipment-status {
      position: relative;
      width: 90%;
      margin: auto;
      min-height: 300px;
      box-shadow: inset 0 0 30px #07417a;
      margin-bottom: 35px;
      .equipment-status-title {
        position: relative;
        display: inline-block;
        border: 1px solid #2c8cec;
        padding: 15px;
      }
    }
    .equipment-data {
      min-height: 200px;
      display: flex;
      margin-top: 10px;
      .data-chart {
        flex: 1;
        width: 33.33333333333%;
        position: relative;
        .equipment-data-title {
          position: absolute;
          bottom: 10px;
          width: 100%;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          color: #9e9e9e;
          span {
            width: 70%;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            font-size: 14px;
          }
        }
        .equipment-data-title:hover {
          color: #14e1fa;
        }
        .active {
          color: #14e1fa;
        }
      }
    }
    .center-equipment {
      position: relative;
      display: inline-block;
      border: 1px solid #2c8cec;
      padding: 15px;
      // box-shadow: 0 0 5px #14e1fa;
      margin-top: 35px;
      span {
        font-size: 18px;
      }
    }
  }

  .dashboard-right {
    flex: 0.3;
    width: 25%;
  }

  @media screen and (max-width: 1366px) {
    .dashboard-left,
    .dashboard-right {
      // flex: .2;
      width: 10%;
    }
    .dashboard-center {
      flex: 0.6;
    }
  }

  //   calc(100% - 55px)
  .dashboard-box {
    position: relative;
    // min-width: 300px;
    min-height: 100px;
    color: #fff;
    height: 50%;
    .box-container {
      height: 396px;
      overflow: hidden;
      .box-content {
        font-size: 13px;
        line-height: 35px;
        margin: 10px;
        height: 100%;
        overflow: hidden;
        .warp {
          height: 100%;
          width: 100%;
          //   width: 360px;
          margin: 0 auto;
          overflow: hidden;
          ul {
            list-style: none;
            padding: 0;
            margin: 0 auto;
            li,
            a {
              display: block;
              height: 30px;
              line-height: 30px;
              display: flex;
              justify-content: space-between;
              // font-size: 15px;
              cursor: pointer;
            }
            span {
              width: 25%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              text-align: right;
              text-align: center;
            }
            span.title {
              font-size: 14px;
              color: #14e1fa;
            }
            li:hover {
              color: #14e1fa;
            }
          }
          ul.alarm-item {
            span {
              width: 33.3333333333333%;
            }
          }
        }

        .content-title {
          overflow: hidden;
          .text-left {
            float: left;
            font-size: 34px;
            line-height: 60px;
          }
          .text-right {
            float: left;
            line-height: 30px;
            margin-left: 15px;
          }
        }
        .content {
          line-height: 30px;
          margin-top: 10px;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
      }
      .box-title {
        height: 55px;
        background: #152349;
        color: #14e1fa;
        text-align: center;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        .title-img {
          width: 41px;
          height: 12px;
          margin: 0 9px;
        }
      }
    }
  }
  .warp-img {
    background-image: url("../../assets/images/nowarning.png");
    background-repeat: no-repeat;
    background-position: center center;
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
}
@media screen and (max-width: 1366px) {
  .dashboard,
  .dashboard-time {
    font-size: 12px !important;
  }
}
</style>