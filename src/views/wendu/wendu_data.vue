<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="温度电流监控图" name="1">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/wendu-data.png" />
          <div>
            <div class="name">{{deviceName}}</div>
            <!-- <div class="status"><i class="status-icon" />在线</div> -->
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
            <div class="data-name">
              <svg-icon icon-class="dianliu" style="font-size: 20px"></svg-icon>
              电流
              <span class="data-num">{{electricCurrent}}</span>
            </div>
            <img class="chart-img" src="../../assets/images/001.gif" />
            <div class="chart-num">{{temperature}}℃</div>
            <div>{{updateTime}}</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">信号强度(dBm)</div>
              <div>{{signal}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">电量(%)</div>
              <div>{{electric}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">当前温度(℃)</div>
              <div>{{temperature}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">当前电流</div>
              <div>{{electricCurrent}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器地址</div>
              <div>{{address}}</div>
            </div>
            <!-- <div class="table-item">
              <div class="item-name">传感器类型</div>
              <div>{{}}</div>
            </div> -->
            <!-- <div class="table-item">
              <div class="item-name">项目类型</div>
              <div>{{}}</div>
            </div> -->
            <!-- <div class="table-item">
              <div class="item-name">传输协议</div>
              <div>{{}}</div>
            </div> -->
            <div class="table-item">
              <div class="item-name">项目及编号</div>
              <div>{{projectNumber}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器别名</div>
              <div>{{deviceName}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">汇集单元识别码</div>
              <div>{{nodeId}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器编号</div>
              <div>{{sensorId}}</div>
            </div>
            <!-- <div class="table-item">
              <div class="item-name">绑定站点</div>
              <div>{{}}</div>
            </div> -->
            <div class="table-item">
              <div class="item-name">传感器经度(°)</div>
              <div>{{longitude}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器纬度(°)</div>
              <div>{{latitude}}</div>
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
            <span>{{temperatureData}}</span>
            <span>{{electricData}}</span>
          </div>
          <el-table :data="tableList" stripe style="width: 100%">
            <el-table-column prop="updateTime" label="时间">
            </el-table-column>
            <el-table-column prop="deviceName" label="传感器别名">
            </el-table-column>
            <el-table-column prop="address" label="传感器地址">
            </el-table-column>
            <el-table-column prop="signals" label="信号强度(dBm)">
            </el-table-column>
						<el-table-column prop="electric" label="电量(%)"> </el-table-column>
            <el-table-column prop="temperature" label="当前温度(℃)"> </el-table-column>
            <el-table-column prop="electricCurrent" label="当前电流(mA)"> </el-table-column>
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
          <el-date-picker type="datetime" placeholder="选择起始时间" v-model="startTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker type="datetime" placeholder="选择结束时间" v-model="endTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" class="btn-search">查询</el-button>
          <el-button @click="tableExport" class="btn-search" :loading="onload">导出表格</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/wendu";
import { parseTime } from '@/utils/index.js';
import { exportExcel } from '@/utils/exportExcel';
export default {
  name: "Wendu_data",
  data: function () {
    return {
			deviceCode: '',
			companyId: 0,
			projectId: 0,
      activeName: '1',
			address: '',
			electricCurrent: '',
			temperature: '',
			updateTime: '',
			signal: '',
			electric: '',
			projectNumber: '',
      nodeId: '',
			sensorId: '',
			longitude: '',
			latitude: '',
      deviceName: '',
      pages: {
        pageNum: 1,
        pageSize: 20,
      },
			startTime: '',
			endTime: '',
      total: 0,
      tableData: [],
      tableList: [],
      onload: false
    };
  },
	watch: {
		activeName(newVal, oldVal) {
			if(newVal == '1') {
				this.getData();
			}else if(newVal == '2') {
				this.getList();
			}
		}
	},
	computed: {
		temperatureData() {
			if(this.tableData.length == 0) {
				return '';
			}
			let arr = this.tableData.map(item => {
				return +item.temperature || 0;
			});
			let maxN = Math.max.apply(null, arr);
			let minN = Math.min.apply(null, arr);
			let sum=0;
			for(let i=0;i<arr.length;i++){
			    sum += arr[i];
			}
			let mean = sum / arr.length;
			let unit = '℃';
			return `温度：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(3)}${unit}`;
		},
		electricData() {
			if(this.tableData.length == 0) {
				return '';
			}
			let arr = this.tableData.map(item => {
				return +item.electricCurrent || 0;
			});
			let maxN = Math.max.apply(null, arr);
			let minN = Math.min.apply(null, arr);
			let sum=0;
			for(let i=0;i<arr.length;i++){
			    sum += arr[i];
			}
			let mean = sum / arr.length;
			let unit = 'mA';
			return `电流：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(3)}${unit}`;
		}
	},
  activated() {
    //deviceCode实际上是projectNumber，版本遗留
		this.deviceCode = this.$route.query.deviceCode || '';
		this.companyId = this.$route.query.companyId || 0;
		this.projectId = this.$route.query.projectId || 0;
    let newDate = new Date().getTime();
    this.endTime = parseTime(newDate);
    this.startTime = parseTime(newDate - 24*60*60*1000);
		this.activeName = '1';
		this.getData();
  },
  methods: {
		async getData() {
			let { info } = await api.temperatureElectricDataInfo({
				deviceCode: this.deviceCode
			});
			this.address = info.address;
			this.electricCurrent = info.electricCurrent;
			this.temperature = info.temperature;
			this.updateTime = info.updateTime;
			this.signal = info.signal;
			this.electric = info.electric;
			this.projectNumber = info.projectNumber;
      this.nodeId = info.nodeId;
			this.sensorId = info.sensorId;
			this.longitude = info.longitude;
			this.latitude = info.latitude;
      this.deviceName = info.deviceName;
		},
		async getList() {
			let { pageInfo } = await api.temperatureElectricHistoryList({
				pageNum: 1,
				pageSize: 999999999,
				deviceCode: this.deviceCode,
				companyId: this.companyId,
				projectId: this.projectId,
				startTime: this.startTime,
				endTime: this.endTime
			});
			this.tableData = pageInfo.records;
			this.total = this.tableData.length;
      this.cutList();
			this.initEchart();
		},
		// 导出表格
		async tableExport() {
		  this.onload = true;
		  await exportExcel({
		    url: 'temperatureElectricHistory/exportExcel',
		    params: {
		      pageNum: 1,
		      pageSize: 999999999,
		      deviceCode: this.deviceCode,
		      companyId: this.companyId,
		      projectId: this.projectId,
		      startTime: this.startTime,
		      endTime: this.endTime
		    },
		  });
		  this.onload = false;
		},
    initEchart() {
      const myChart = this.$echarts.init(this.$refs.chart);
			myChart.clear();
      const option = {
				tooltip: {
					trigger: 'axis'
				},
        legend: {
          data: ['温度', '电流']
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
          data: this.tableData.map(item => { return item.updateTime || '--' }).reverse(),
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
						name: '温度(℃)',
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
						name: '电流(mA)',
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
					}
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
						name: '温度',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.temperature || '0' }).reverse()
					},
					{
						name: '电流',
						type: 'bar',
						yAxisIndex: 1,
						data: this.tableData.map(item => { return item.electricCurrent || '0' }).reverse()
					}
        ],
      };
      myChart.setOption(option);
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
      this.tableList = this.tableData.slice((this.pages.pageNum - 1)*this.pages.pageSize, this.pages.pageNum*this.pages.pageSize);
    }
  },
};
</script>
<style lang="scss" scoped>
.qingxieDataPage {
  background: #10153b;
  margin: 20px;
  width: 100%;
  position: relative;
	min-width: 1000px;
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

