<template>
  <div class="bileiPage">
    <div class="dianliu">
      <div class="dianliuItem" @click="toDetail(item)" v-for="(item, index) in bushings" :key="index">
        <div class="item-num">电流:{{item.currentRms}}ma</div>
        <div class="item-name">{{item.areas}}</div>
        <div class="item-todetail">实时监控图 →</div>
      </div>
    </div>
    <div class="charts">
      <div class="chartItem" v-for="(item, index) in lineList" :key="index">
        <div class="chartsName">{{item.name}}实时数据图</div>
        <div class="chartsDetail">
          <div :ref="`chart${item.boardId}`" style="width: 100%; height: 325px"></div>
        </div>
      </div>
    </div>
		<div class="charts" v-if="lineList.length > 0">
			<div class="chartItem chartItem3">
			  <div class="chartsName">今日数据统计</div>
			  <div class="chartsDetail">
			    <div ref="chart3" style="width: 100%; height: 325px"></div>
			  </div>
			</div>
		</div>
		<div class="charts">
			<div class="chartItem chartItem4" v-if="lineList.length > 0">
			  <div class="chartsName">避雷器矢量图</div>
			  <div class="chartsDetail">
			    <div :ref="`circle${item.boardId}`" style="width: 600px; height: 600px" v-for="(item, index) in lineList" :key="index"></div>
					<div ref="chart4" style="width: 600px; height: 600px" ></div>
			  </div>
			</div>
		</div>
  </div>
</template>

<script>
import * as api from "@/api/bilei";
export default {
	name: 'Bilei',
  data() {
    return {
			companyId: 0,
			projectId: 0,
			bushings: [],
			lineList: [],
			timer: null
		};
  },
  mounted() {
		this.projectId = this.$route.meta.standId || 0;
		this.companyId = this.$route.meta.companyId || 0;
		// this.getData();
  },
	beforeDestroy() {
		clearTimeout(this.timer);
	},
  methods: {
		async getData() {
			clearTimeout(this.timer);
			let { bushings, lineList } = await api.blqNewList({
				companyId: this.companyId,
				projectId: this.projectId
			});
			this.bushings = [];
			bushings.forEach(item => {
				let obj = {
					currentRms: Math.round((+item.currentRms || 0) * 100)/100,
					companyId: item.companyId,
					projectId: item.projectId,
					bushingId: item.bushingId,
					boardId: item.boardId,
					name: item.name,
					areas: item.areas,
					ima1: item.ima1,
					currentRms: item.currentRms
				};
				this.bushings.push(obj);
			});
			this.lineList = lineList;
			if(lineList.length > 0) {
				this.$nextTick(() => {
					setTimeout(() => {
						this.initEchart();
					}, 300)
				});
			}
			this.timer = setTimeout(() => {
				this.getData();
			}, 30000);
		},
    toDetail(item) {
			this.$router.push({
			  path: `${this.$route.path}_detail`,
			  query: {
			    companyId: item.companyId,
			    projectId: item.projectId,
			    boardId: item.boardId,
			    name: item.name,
					areas: item.areas,
					bushingId: item.bushingId
			  },
			});
    },
    initEchart() {
			this.lineList.forEach(item => {
				let lineChart = this.$echarts.init(this.$refs[`chart${item.boardId}`][0]);
				lineChart.clear();
				lineChart.setOption({
					legend: {
						data: ["la/ma", "lb/ma", "lc/ma"],
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
						bottom: 50,
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: item.list.map(ele => { return ele.fftId }),
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
						name: "电流（mA）",
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
							name: item.list[0].name1,
							type: "line",
							stack: "总量",
							data: item.list.map(ele => { return ele.av }),
							symbol: "none",
						},
						{
							name: item.list[0].name2,
							type: "line",
							stack: "总量",
							data: item.list.map(ele => { return ele.bv }),
							symbol: "none",
						},
						{
							name: item.list[0].name3,
							type: "line",
							stack: "总量",
							data: item.list.map(ele => { return ele.cv }),
							symbol: "none",
						},
					],
				});
				let circleChart = this.$echarts.init(this.$refs[`circle${item.boardId}`][0]);
				let circleChartOption = this.bushings.filter(ele => { return ele.boardId == item.boardId });
				circleChart.clear();
				circleChart.setOption({
					legend: {
						data: circleChartOption.map(ele => { return ele.areas; }),
						textStyle: {
							color: "#fff",
						},
						selectedMode: false,
						icon: "line",
						orient: "vertical",
						left: "left",
					},
					polar: {
						center: ["50%", "54%"],
					},
					angleAxis: {
						//坐标轴轴线设置
						type: "value",
						startAngle: 0,
						clockwise: false,
						axisLine: {
							//坐标轴轴线设置
							lineStyle: {
								color: "#fff",
								width: 2,
							},
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
							},
						},
						axisLabel: {
							//x轴文字的配置
							textStyle: {
								color: "#fff",
							},
						},
					},
					radiusAxis: {
						min: 0,
						max: 1,
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
							},
						},
						axisLabel: {
							//x轴文字的配置
							textStyle: {
								color: "#fff",
							},
						},
					},
					series: circleChartOption.map(ele => {
						let ima1 = ele.ima1 || '1:1';
						let ima1Arr = ima1.split(':');
						let ima1ArrA = +ima1Arr[0] || 1;
						let ima1ArrB = +ima1Arr[1] || 1;
						let rage = Math.atan2(ima1ArrB, ima1ArrA);
						return {
							coordinateSystem: "polar",
							name: ele.areas,
							type: "line",
							itemStyle: {
								normal: {
									lineStyle: {
										width: 3,
									},
								},
							},
							showSymbol: false,
							data: [
								[0, 0],
								[0, 0],
								[0, 0],
								[ele.currentRms, rage],
								[ele.currentRms - 0.05, rage+0.01],
								[ele.currentRms, rage],
								[ele.currentRms - 0.05, rage-0.01],
								[ele.currentRms, rage],
							]
						};
					}),
					animationDuration: 1,
				});
			});
			let myChart3 = this.$echarts.init(this.$refs.chart3);
			let myChart3List = this.lineList.map(item => { return {
				boardId: item.boardId,
				name: item.name,
				av: item.list[item.list.length - 1].av,
				bv: item.list[item.list.length - 1].bv,
				cv: item.list[item.list.length - 1].cv
			} });
			myChart3.clear();
			myChart3.setOption({
        legend: {
          data: ["A相", "B相", "C相"],
          textStyle: {
            color: "#fff",
          },
          top: 20,
          right: 30, //可设定图例在左、右、居中
          icon: "line",
        },
				tooltip: {
					trigger: 'axis'
				},
        grid: {
          top: 52,
          left: 66,
          right: 30,
          bottom: 50,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: myChart3List.map(ele => { return ele.name || '避雷器' }),
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
          name: "电流（mA）",
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
            name: "A相",
            type: "bar",
            data: myChart3List.map(ele => { return ele.av }),
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(40, 135, 240, 1)" }, //柱图渐变色
                  { offset: 1, color: "rgba(40, 135, 240, 0)" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "B相",
            type: "bar",
            data: myChart3List.map(ele => { return ele.bv }),
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(230, 200, 30, 1)" }, //柱图渐变色
                  { offset: 1, color: "rgba(230, 200, 30, 0)" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "C相",
            type: "bar",
            data: myChart3List.map(ele => { return ele.cv }),
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
    },
  },
};
</script>

<style lang="scss" scoped>
.bileiPage {
  padding: 20px;
  color: #fff;
  width: 100%;
  .dianliu {
    display: flex;
		flex-wrap: wrap;
  }
  .dianliuItem {
    width: 264px;
    height: 85px;
    background: url(../../assets/images/dianliu.png);
    background-size: cover;
    font-size: 10px;
    font-weight: 400;
    color: #14e1fa;
    padding: 16px 19px;
    margin-right: 20px;
    line-height: 25px;
    position: relative;
		margin-bottom: 10px;
    .item-num {
      font-size: 16px;
    }
    .item-todetail {
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      right: 28px;
    }
  }
  .charts {
    display: flex;
    flex-wrap: wrap;
		justify-content: space-between;
  }
  .chartItem {
    width: calc(50% - 10px);
    .chartsName {
      height: 58px;
      line-height: 58px;
      font-size: 14px;
    }
    .chartsDetail {
      background: rgba(35, 50, 90, 0.2);
      display: flex;
			flex-wrap: wrap;
    }
  }
  .chartItem3,
  .chartItem4 {
    width: 100%;
  }
}
</style>
