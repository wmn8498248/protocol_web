<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="areas + '数据图'" name="1">
        <div class="history-content">
          <div
            class="history-chart"
            ref="chart"
            style="width: 100%; height: 354px"
          ></div>
          <div class="history-total">
            <span class="total-name">数据统计</span>
          </div>
          <el-table :data="tableList" stripe style="width: 100%">
            <el-table-column prop="fftId" label="时间"></el-table-column>
						<el-table-column prop="currentRms" label="泄漏电流(mA)"></el-table-column>
						<el-table-column label="3次谐波含有量">
							<template slot-scope="{ row }">
								{{row.a3 | percentageChange}}
							</template>
						</el-table-column>
						<el-table-column label="5次谐波含有量">
							<template slot-scope="{ row }">
								{{row.a5 | percentageChange}}
							</template>
						</el-table-column>
						<el-table-column label="7次谐波含有量">
							<template slot-scope="{ row }">
								{{row.a7 | percentageChange}}
							</template>
						</el-table-column>
						<el-table-column label="总谐波含有量">
							<template slot-scope="{ row }">
								{{row.a331 | percentageChange}}
							</template>
						</el-table-column>
						<el-table-column prop="resistance" label="阻性电流(mA)"></el-table-column>
						<el-table-column label="阻性电流含有量">
							<template slot-scope="{ row }">
								{{row.state | percentageChange}}
							</template>
						</el-table-column>
						<el-table-column prop="rms01" label="IO基波(mA)"></el-table-column>
						<el-table-column prop="rms03" label="IO三次谐波(mA)"></el-table-column>
          </el-table>
          <div class="pagination taR mt20x">
            <el-pagination
              @size-change="onPageSizeChange"
              @current-change="onPageCurrentChange"
              :current-page="pages.pageNum"
              :page-sizes="[5, 10, 20, 50, 100]"
              :page-size="pages.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="search-container">
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
import * as api from "@/api/bilei";
import { parseTime } from '@/utils/index.js';
import { exportExcel } from '@/utils/exportExcel';
export default {
  name: "Bilei_detail",
  data () {
    return {
			companyId: 0,
			projectId: 0,
			boardId: '',
			name: '',
			areas: '',
      activeName: "1",
      pages: {
        pageNum: 1,
        pageSize: 20,
      },
			startTime: '',
			endTime: '',
      total: 0,
      tableData: [],
			bushingId: '',
      tableList: [],
      onload: false
    };
  },
	filters: {
		percentageChange(val) {
			let num = +val || 0;
			return (num*100).toFixed(2) + '%';
		}
	},
  mounted() {
    this.companyId = this.$route.query.companyId || 0;
    this.projectId = this.$route.query.projectId || 0;
		this.boardId = this.$route.query.boardId || '';
		this.name = this.$route.query.name || '';
		this.areas = this.$route.query.areas || '';
		this.bushingId = this.$route.query.bushingId || '';
    let newDate = new Date().getTime();
    this.endTime = parseTime(newDate);
    this.startTime = parseTime(newDate - 24*60*60*1000);
		this.getList();
  },
  methods: {
		async getList() {
			let { pageInfo } = await api.blqHistoryList({
				pageNum: 1,
        pageSize: 999999999,
				boardId: this.boardId,
				name: this.name,
				companyId: this.companyId,
				projectId: this.projectId,
				startTime: this.startTime,
				endTime: this.endTime,
				threePhase: this.bushingId
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
		    url: 'blqHistory/exportExcel',
		    params: {
		      pageNum: 1,
		      pageSize: 999999999,
		      boardId: this.boardId,
		      name: this.name,
		      companyId: this.companyId,
		      projectId: this.projectId,
		      startTime: this.startTime,
		      endTime: this.endTime,
		      threePhase: this.bushingId
		    },
		  });
		  this.onload = false;
		},
    initEchart() {
      const myChart = this.$echarts.init(this.$refs.chart);
      myChart.clear();
      const option = {
				tooltip: {
					trigger: 'axis',
					formatter:function(params) {  
						var relVal = params[0].name;
						let arr = ['3次谐波含有量', '5次谐波含有量', '7次谐波含有量', '总谐波含有量', '阻性电流含有量'];
						let change = val => {
							let num = +val || 0;
							return (num*100).toFixed(2) + '%';
						};
						for (var i = 0, l = params.length; i < l; i++) {
							if(arr.includes(params[i].seriesName)) {
								relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + change(params[i].value);
							}else {
								relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value;
							}
						}
						return relVal;  
					}
				},
        legend: {
          data: ['泄漏电流', '3次谐波含有量', '5次谐波含有量', '7次谐波含有量', '总谐波含有量', '阻性电流', '阻性电流含有量', 'IO基波', 'IO三次谐波'],
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
          data: this.tableData.map(item => { return item.fftId || '--' }).reverse(),
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
          	name: '泄漏电流',
          	type: 'line',
          	yAxisIndex: 0,
          	data: this.tableData.map(item => { return item.currentRms || '0' }).reverse()
          },
					{
						name: '3次谐波含有量',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.a3 || '0' }).reverse()
					},
					{
						name: '5次谐波含有量',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.a5 || '0' }).reverse()
					},
					{
						name: '7次谐波含有量',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.a7 || '0' }).reverse()
					},
					{
						name: '总谐波含有量',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.a331 || '0' }).reverse()
					},
					{
						name: '阻性电流',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.resistance || '0' }).reverse()
					},
					{
						name: '阻性电流含有量',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return +item.state || '0' }).reverse()
					},
					{
						name: 'IO基波',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.rms01 || '0' }).reverse()
					},
					{
						name: 'IO三次谐波',
						type: 'line',
						yAxisIndex: 0,
						data: this.tableData.map(item => { return item.rms03 || '0' }).reverse()
					},
        ],
      };
      myChart.setOption(option);
    },
		// 修改列表条数
		onPageSizeChange(e) {
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

  >>> .el-tabs__active-bar {
    display: none;
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

