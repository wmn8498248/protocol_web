<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="倾角数据图" name="1">
        <div class="data-top">
          <img class="data-image" src="../../assets/images/ico_qingxie.png" />
          <div>
            <div class="name">{{deviceName}}</div>
            <div :class="['status', `status_${status || 0}`]"><i class="status-icon" />{{statusName || '--'}}</div>
          </div>
        </div>
        <div class="data-detail">
          <div class="data-chart">
						<canvas id="myCanvas" width="150" height="150" class="chart-img"></canvas>
            <div>x轴偏移：{{xaxis}}°</div>
            <div>y轴偏移：{{yaxis}}°</div>
            <div>{{updateTime}}</div>
          </div>
          <div class="data-table">
            <div class="table-item">
              <div class="item-name">信号强度(dBm)</div>
              <div>{{signal}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">电量(V)</div>
              <div>{{power}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">x轴(°)</div>
              <div>{{xaxis}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">y轴(°)</div>
              <div>{{yaxis}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器地址</div>
              <div>{{address}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器类型</div>
              <div>倾斜传感器</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器编号</div>
              <div>{{deviceNumber}}</div>
            </div>
            <div class="table-item">
              <div class="item-name">传感器别名</div>
              <div>{{deviceName}}</div>
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
            <span>{{xData}}</span>
            <span>{{yData}}</span>
          </div>
          <el-table :data="tableList" stripe style="width: 100%">
            <el-table-column prop="updateTime" label="时间">
            </el-table-column>
            <el-table-column prop="deviceName" label="传感器别名">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="power" label="电量(V)"> </el-table-column>
            <el-table-column prop="signal" label="信号"> </el-table-column>
            <el-table-column prop="xAxis" label="x轴(°)"> </el-table-column>
            <el-table-column prop="yAxis" label="y轴(°)"> </el-table-column>
            <el-table-column prop="address" label="传感器地址"> </el-table-column>
          </el-table>
          <div class="pagination taR mt20x">
            <el-pagination
              @size-change="onPageSizeChange"
              @current-change="onPageCurrentChange"
              :current-page="pages.pageNum"
              :page-sizes="[20, 50, 100, 200]"
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
import * as api from "@/api/qingxie";
import { parseTime } from '@/utils/index.js';
import { exportExcel } from '@/utils/exportExcel';
export default {
  name: "Qingxie_data",
  data() {
    return {
			deviceNumber: '',
			companyId: 0,
			projectId: 0,
      activeName: '1',
			deviceName: '',
			xaxis: '',
			yaxis: '',
			updateTime: '',
			signal: '',
			power: '',
			address: '',
			longitude: '',
			latitude: '',
			status: '',
			statusName: '',
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
		xData() {
			if(this.tableData.length == 0) {
				return '';
			}
			let arr = this.tableData.map(item => {
				return +item.xAxis || 0;
			});
			let maxN = Math.max.apply(null, arr);
			let minN = Math.min.apply(null, arr);
			let sum=0;
			for(let i=0;i<arr.length;i++){
			    sum += arr[i];
			}
			let mean = sum / arr.length;
			let unit = '°';
			return `x轴：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(3)}${unit}`;
		},
		yData() {
			if(this.tableData.length == 0) {
				return '';
			}
			let arr = this.tableData.map(item => {
				return +item.yAxis || 0;
			});
			let maxN = Math.max.apply(null, arr);
			let minN = Math.min.apply(null, arr);
			let sum=0;
			for(let i=0;i<arr.length;i++){
			    sum += arr[i];
			}
			let mean = sum / arr.length;
			let unit = '°';
			return `y轴：最大值：${maxN}${unit} 最小值：${minN}${unit} 平均值：${mean.toFixed(3)}${unit}`;
		},
	},
  mounted() {
    this.deviceNumber = this.$route.query.deviceNumber || '';
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
			let { info } = await api.tiltDetectionDataInfo({
				deviceNumber: this.deviceNumber
			});
			this.deviceName = info.deviceName;
			this.xaxis = info.xaxis;
			this.yaxis = info.yaxis;
			this.updateTime = info.updateTime;
			this.signal = info.signal;
			this.power = info.power;
			this.address = info.address;
			this.longitude = info.longitude;
			this.latitude = info.latitude;
			this.status = info.status;
			this.statusName = info.statusName;
			this.setDash();
		},
		setDash() {
			let canvas = document.getElementById('myCanvas');
			let ctx = canvas.getContext('2d');
			canvas.height = canvas.height;
			ctx.strokeStyle = '#14e1fa';
			ctx.beginPath();
			ctx.arc(75, 75, 74, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.strokeStyle = 'rgba(20, 225, 250, 0.5)';
			ctx.beginPath();
			ctx.arc(75, 75, 37, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.strokeStyle = '#14e1fa';
			ctx.beginPath();
			ctx.moveTo(75, 0);
			ctx.lineTo(75, 150);
			ctx.closePath();
			ctx.stroke();
			ctx.strokeStyle = '#14e1fa';
			ctx.beginPath();
			ctx.moveTo(0, 75);
			ctx.lineTo(150, 75);
			ctx.closePath();
			ctx.stroke();
			ctx.save();
			ctx.translate(75, 75);
			ctx.strokeStyle = '#f2fa14';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(this.xaxis * 50, 0 - this.yaxis * 50);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.xaxis * 50, 0 - this.yaxis * 50);
			ctx.lineTo(this.xaxis * 50 * 0.8, 0 - this.yaxis * 50 * 0.6);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.xaxis * 50, 0 - this.yaxis * 50);
			ctx.lineTo(this.xaxis * 50 * 0.6, 0 - this.yaxis * 50 * 0.8);
			ctx.closePath();
			ctx.stroke();
			ctx.translate(-75, -75);
		},
		async getList() {
			let { pageInfo } = await api.tiltDetectionHistoryList({
				pageNum: 1,
				pageSize: 999999999,
				deviceNumber: this.deviceNumber,
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
		    url: 'tiltDetectionHistory/exportExcel',
		    params: {
		      pageNum: 1,
		      pageSize: 999999999,
		      deviceNumber: this.deviceNumber,
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
          data: ['x轴(°)', 'y轴(°)'],
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
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
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
            type: "slider",
          },
          {
            type: "inside",
          },
        ],
        series: [
          {
            name: "x轴(°)",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            data: this.tableData.map(item => { return item.xAxis || '0' }).reverse(),
          },
					{
					  name: "y轴(°)",
					  type: "line",
					  symbol: "none",
					  sampling: "lttb",
					  data: this.tableData.map(item => { return item.yAxis || '0' }).reverse(),
					},
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
    .chart-img {
      width: 150px;
      height: 150px;
      margin-top: 67px;
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

