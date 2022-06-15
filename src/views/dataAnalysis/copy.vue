<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>数据分析</div>
      <el-button @click="tableExport" class="btn-search">导出报表</el-button>
    </div>

    <div class="search-container">
      <el-form label-width="140px">
        <el-form-item label="选择公司/站点">
          <el-select
            placeholder="请选择公司"
            v-model="companyId"
            value-key="companyId"
            @change="chooseCompany($event)"
          >
            <el-option
              v-for="item in companyList"
              :key="item.companyId"
              :label="item.companyName"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-select
            placeholder="请选择站点"
            value-key="projectId"
            v-model="projectId"
						@change="clearDevices"
          >
            <el-option
              v-for="item in siteList"
              :key="item.projectId"
              :label="item.name"
              :value="item.projectId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统计区间">
					<el-select
					  placeholder="请选择统计区间"
					  v-model="dateId"
					  value-key="id"
					  @change="chooseDate($event)"
					>
					  <el-option
					    v-for="item in dateList"
					    :key="item.id"
					    :label="item.name"
					    :value="item.id"
					  >
					  </el-option>
					</el-select>
					<el-date-picker type="datetime" placeholder="选择起始时间" @change="onDateChange" v-model="startTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					<el-date-picker type="datetime" placeholder="选择结束时间" @change="onDateChange" v-model="endTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
        </el-form-item>
        <el-form-item label="选择传感器类型">
          <el-select
            placeholder="请选择传感器类型"
            v-model="sensorType"
            value-key="type"
						@change="changeSensorType"
          >
            <el-option
              v-for="item in sensorList"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>
				<template v-if="sensorType == 1">
					
				</template>
				<template v-else-if="sensorType == 2">
					<el-form-item label="最低温度">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高温度">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 3">
					<el-form-item label="最低温度">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高温度">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
					<el-form-item label="最低湿度">
					  <el-input type="text" v-model="mix2Value"></el-input>
					</el-form-item>
					<el-form-item label="最高湿度">
					  <el-input type="text" v-model="max2Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 4">
					<el-form-item label="最低伸缩量">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高伸缩量">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 5">
					<el-form-item label="最低形变量">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高形变量">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 6">
					<el-form-item label="最低温度">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高温度">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
					<el-form-item label="最低电流">
					  <el-input type="text" v-model="mix2Value"></el-input>
					</el-form-item>
					<el-form-item label="最高电流">
					  <el-input type="text" v-model="max2Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 7">
					<el-form-item label="最低x轴角度">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高x轴角度">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
					<el-form-item label="最低y轴角度">
					  <el-input type="text" v-model="mix2Value"></el-input>
					</el-form-item>
					<el-form-item label="最高y轴角度">
					  <el-input type="text" v-model="max2Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 8">
					<el-form-item label="最低压力">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高压力">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 9">
					<el-form-item label="最低水浸值">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高水浸值">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 10">
					<el-form-item label="最低水位值">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高水位值">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
				</template>
				<template v-else-if="sensorType == 11">
					<el-form-item label="最低温度">
					  <el-input type="text" v-model="mix1Value"></el-input>
					</el-form-item>
					<el-form-item label="最高温度">
					  <el-input type="text" v-model="max1Value"></el-input>
					</el-form-item>
					<el-form-item label="最低湿度">
					  <el-input type="text" v-model="mix2Value"></el-input>
					</el-form-item>
					<el-form-item label="最高湿度">
					  <el-input type="text" v-model="max2Value"></el-input>
					</el-form-item>
				</template>
        <template v-else-if="sensorType == 12">
        	<el-form-item label="最低A相计数">
        	  <el-input type="text" v-model="mix1Value"></el-input>
        	</el-form-item>
        	<el-form-item label="最高A相计数">
        	  <el-input type="text" v-model="max1Value"></el-input>
        	</el-form-item>
        	<el-form-item label="最低B相计数">
        	  <el-input type="text" v-model="mix2Value"></el-input>
        	</el-form-item>
        	<el-form-item label="最高B相计数">
        	  <el-input type="text" v-model="max2Value"></el-input>
        	</el-form-item>
					<el-form-item label="最低C相计数">
					  <el-input type="text" v-model="mix3Value"></el-input>
					</el-form-item>
					<el-form-item label="最高C相计数">
					  <el-input type="text" v-model="max3Value"></el-input>
					</el-form-item>
        </template>
        <el-form-item label="选择传感器" v-if="projectId != '' && sensorType != ''">
          <el-select v-model="choosenType" @change="clearDevices">
            <el-option label="全部传感器" value="1"></el-option>
						<el-option label="指定传感器" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定传感器" v-if="choosenType == 2 && projectId != '' && sensorType != ''">
          <el-select multiple v-model="deviceIds" value-key="deviceId">
            <el-option
              v-for="item in deviceList"
              :key="item.deviceId"
              :label="item.deviceName"
              :value="item.deviceId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-total">
      查询结果 共<span class="total-num">50</span>个传感器,<span
        class="total-num"
        >50</span
      >个测量值满足条件
    </div>
    <div class="chart" ref="chart" style="width: 100%; height: 354px"></div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="updateTime" label="时间"> </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column prop="temperature" label="温度"> </el-table-column>
      <!-- <el-table-column prop="name" label="水位/m"> </el-table-column>
      <el-table-column prop="" label="公司"> </el-table-column>
      <el-table-column prop="" label="项目"> </el-table-column>
      <el-table-column prop="" label="区域"> </el-table-column>
      <el-table-column prop="" label="传感器地址"> </el-table-column> -->
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
</template>
<script>
import * as manage from "@/api/manage";
import * as analysis from "@/api/dataAnalysis";
import { parseTime } from '@/utils/date.js';
import Validator from "@/utils/validator";
export default {
  name: "DataAnalysisPage",
  data() {
    return {
      pages: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      tableData: [],
			companyList: [],
			companyId: '',
			siteList: [],
			projectId: '',
			dateList: [
				{ name: '当日', id: '0' },
				{ name: '当周', id: '1' },
				{ name: '当月', id: '2' },
				{ name: '当年', id: '3' },
				{ name: '自定义', id: '4' }
			],
			dateId: '',
			startTime: '',
			endTime: '',
			sensorList: [
				{ name: '避雷', type: '1' },
				{ name: '无线温度', type: '2' },
				{ name: '温湿度', type: '3' },
				{ name: '无线伸缩节', type: '4' },
				{ name: '无线变形', type: '5' },
				{ name: '温度电流', type: '6' },
				{ name: '倾斜', type: '7' },
				{ name: 'SF6气体压力', type: '8' },
				{ name: '水侵', type: '9' },
				{ name: '水位', type: '10' },
				{ name: '温控', type: '11' },
				{ name: '断路器计数器', type: '12' },
			],
			sensorType: '',
			mix1Value: '',
			max1Value: '',
			mix2Value: '',
			max2Value: '',
			mix3Value: '',
			max3Value: '',
			choosenType: '',
			deviceIds: [],
			deviceList: [],
			
    };
  },
  mounted() {
    this.getCompanyList();
  },
  methods: {
		async getCompanyList() {
		  let { roleForms } = await manage.userRightsAll({name: ''});
		  this.companyList = roleForms;
		},
		chooseCompany(item) {
			this.projectId = '';
		  this.siteList = item.role;
		},
		chooseDate(item) {
			let date = new Date();
			let year =  date.getFullYear();
			let month =  date.getMonth() + 1;
			let day =  date.getDate();
			let hour =  date.getHours();
			let min =  date.getMinutes();
			let second =  date.getSeconds();
			let week =  date.getDay();
			week = week == 0 ? 6 : (week - 1);
			if(item == '0') {
				this.startTime = `${year}-${month}-${day} 00:00:00`;
				this.endTime = `${year}-${month}-${day} 23:59:59`;
			} else if(item == '1') {
				let time = new Date(`${year}/${month}/${day} 00:00:00`).getTime();
				this.startTime = parseTime(time - week*24*60*60*1000);
				this.endTime = parseTime(time + (7 - week)*24*60*60*1000 - 1);
			} else if(item == '2') {
				this.startTime = `${year}-${month}-${1} 00:00:00`;
				let time1 = new Date(`${year}/${month == 12 ? 1 : (month + 1)}/${1} 00:00:00`).getTime();
				this.endTime = parseTime(time1 - 1);
			} else if(item == '3') {
				this.startTime = `${year}-${1}-${1} 00:00:00`;
				this.endTime = `${year}-${12}-${31} 23:59:59`;
			}
		},
		onDateChange() {
			this.dateId = '4';
		},
		// 修改传感器类型
		changeSensorType() {
			this.mix1Value = '';
			this.max1Value = '';
			this.mix2Value = '';
			this.max2Value = '';
			this.mix3Value = '';
			this.max3Value = '';
			this.choosenType = '';
			this.clearDevices();
		},
		// 修改站点和传感器类型时情况选择列表
		clearDevices() {
			this.deviceIds = [];
			if(this.projectId != '' && this.sensorType != '') {
				this.getDeviceList();
			}
		},
		// 获取传感器列表信息
		async getDeviceList() {
			let { list } = await analysis.sensorSearch({
				projectId: this.projectId,
				sensorType: this.sensorType
			});
			this.deviceList = list;
		},
		// 查询
		async search() {
			let validator = new Validator();
			validator.add(this.companyId, ["isNonEmpty", "请选择公司"]);
			validator.add(this.projectId, ["isNonEmpty", "请选择站点"]);
			validator.add(this.sensorType, ["isNonEmpty", "请选择传感器类型"]);
			validator.add(this.choosenType, ["isNonEmpty", "请选择传感器范围"]);
			if(this.choosenType == 2) {
				validator.addRule('isLength', (val, errorMsg) => {
					return val.length == 0 ? errorMsg : void 0;
				});
				validator.add(this.deviceIds, ["isLength", "请选择指定传感器"]);
			}
			let msg = validator.start();
			if (msg) {
			  this.$message.warning(msg);
			}else {
				let { list } = await analysis.analysis({
					companyId: this.projectId,
					projectId: this.projectId,
					startTime: this.startTime,
					endTime: this.endTime,
					...this.pages,
					sensorType: this.sensorType,
					choosenType: this.choosenType,
					deviceIds: this.deviceIds.join(','),
					mix1Value: this.mix1Value,
					max1Value: this.max1Value,
					mix2Value: this.mix2Value,
					max2Value: this.max2Value,
					mix3Value: this.mix3Value,
					max3Value: this.max3Value
				});
				this.tableData = list.records;
				this.total = list.total;
			}
		},
		// 导出表格
		tableExport() {
			
		},
		// 修改列表条数
		onPageSizeChange(e) {
			this.pages.pageSize = e;
			this.search();
		},
		// 修改列表页数
		onPageCurrentChange(e) {
			this.pages.pageNum = e;
			this.search();
		},
    initEchart() {
      const myChart = this.$echarts.init(this.$refs.chart);
      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];
      var data = [Math.random() * 300];
      for (var i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }
      const option = {
        legend: {
          data: ["模拟数据"],
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
          data: date,
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
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "模拟数据",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            data: data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.dataAnalysisPage {
  // background: #10153b;
  margin: 20px;
  width: 100%;
  position: relative;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 13px;
    height: 58px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(20, 225, 250, 0.3);
  }
  >>> .search-container {
    margin-top: 20px;
    .tip {
      font-size: 14px;
      font-weight: 400;
      color: #f2fa14;
    }
    .el-form-item__label {
      color: #14e1fa;
    }
    .el-input__inner {
      border-radius: 4px;
      width: 400px;
    }
  }
  .search-total {
    font-size: 14px;
    color: #ffffff;
    position: relative;
    // top: 10px;
    // left: 20px;
    .total-num {
      color: #14e1fa;
    }
  }
  .chart {
    width: 100%;
    position: relative;
    top: -20px;
  }
}
</style>

