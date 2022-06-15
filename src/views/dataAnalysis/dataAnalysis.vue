<template>
  <div class="dataAnalysisPage">
    <div class="title">
      <div>数据分析</div>
      <el-button @click="tableExport" class="btn-search">导出报表</el-button>
    </div>
    
    <el-form label-width="140px" class="data_form">
      <el-form-item label="选择公司/站点">
        <el-select placeholder="请选择公司" v-model="companyId" value-key="companyId" @change="chooseCompany($event)">
          <el-option v-for="item in companyList" :key="item.companyId" :label="item.companyName" :value="item" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="统计区间">
        <el-select placeholder="请选择统计区间" v-model="dateId" value-key="id" @change="chooseDate($event)" class="data_form_short">
          <el-option v-for="item in dateList" :key="item.id" :label="item.name" :value="item.id" ></el-option>
        </el-select>
        <el-date-picker type="datetime" placeholder="选择起始时间" @change="onDateChange" v-model="startTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" class="data_form_dater"></el-date-picker>
        <el-date-picker type="datetime" placeholder="选择结束时间" @change="onDateChange" v-model="endTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" class="data_form_dater"></el-date-picker>
      </el-form-item>
      <el-form-item label="选择传感器类型">
        <el-select placeholder="请选择传感器类型" v-model="sensorType" value-key="type" @change="changeSensorType">
          <el-option v-for="item in sensorList" :key="item.type" :label="item.name" :value="item.type" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择传感器" v-if="projectId != '' && sensorType != ''">
        <el-select v-model="choosenType" @change="clearDevices">
          <el-option label="全部传感器" value="1"></el-option>
      		<el-option label="指定传感器" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指定传感器" v-if="choosenType == 2 && projectId != '' && sensorType != ''">
        <el-select multiple filterable v-model="deviceIds" value-key="deviceId">
          <el-option v-for="item in deviceList" :key="item.deviceId" :label="item[deviceLabel]" :value="item" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" class="btn-search">查询</el-button>
      </el-form-item>
    </el-form>
    
    <div class="page_border"></div>
    
    <el-tabs v-model="sensorName" @tab-click="handleSensorClick">
      <el-tab-pane :label="item[deviceLabel]" :name="item.deviceId + ''" v-for="(item, index) in deviceIds" :key="index"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="phaseName" @tab-click="handlePhaseClick" v-if="sensorType == '1'">
      <el-tab-pane label="A相" name="A"></el-tab-pane>
      <el-tab-pane label="B相" name="B"></el-tab-pane>
      <el-tab-pane label="C相" name="C"></el-tab-pane>
    </el-tabs>
    
    <div ref="chart" style="width: 100%; height: 354px;margin: 15px 0;"></div>
    
    <div class="page_border"></div>
    
    <el-table :data="tableList" stripe style="width: 100%" v-if="sensorType == '1'">
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
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '2'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="temperature" label="温度/℃"></el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '3'">
      
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '4'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="datavalue" label="伸缩量/mm"></el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '5'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="deformation" label="形变量ε"> </el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '6'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="temperature" label="温度/℃"> </el-table-column>
      <el-table-column prop="electricCurrent" label="电流/mA"> </el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '7'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="xAxis" label="x轴(°)"> </el-table-column>
      <el-table-column prop="yAxis" label="y轴(°)"> </el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '8'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="temperature" label="温度（°C）"> </el-table-column>
      <el-table-column prop="pressure" label="压力值(KPa)"> </el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '9'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="pressure" label="水浸值/mV"> </el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '10'">
      
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '11'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column prop="temperature" label="温度（°C）"> </el-table-column>
      <el-table-column prop="humidity" label="湿度（%rh）"></el-table-column>
    </el-table>
    <el-table :data="tableList" stripe style="width: 100%" v-else-if="sensorType == '12'">
      <el-table-column prop="updateTime" label="时间"></el-table-column>
      <el-table-column label="动作次数">
      	<template slot-scope="{ row }">
      	  A: {{row.actionA || '--'}}, B: {{row.actionB || '--'}}, C: {{row.actionC || '--'}}, 
      	</template>
      </el-table-column>
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
</template>

<script>
import * as manage from "@/api/manage";
import { parseTime } from '@/utils/date.js';
import Validator from "@/utils/validator";
import * as analysis from "@/api/dataAnalysis";
export default {
  name: 'DataAnalysisPage',
  data() {
    return {
      companyId: '',
      companyList: [],
      projectId: '',
      siteList: [],
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
      	// { name: '避雷', type: '1' },
      	// { name: '无线温度', type: '2' },
      	// { name: '温湿度', type: '3' },
      	// { name: '无线伸缩节', type: '4' },
      	// { name: '无线变形', type: '5' },
      	// { name: '温度电流', type: '6' },
      	// { name: '倾斜', type: '7' },
      	{ name: 'SF6气体压力', type: '8' },
      	// { name: '水浸', type: '9' },
      	// { name: '水位', type: '10' },
      	// { name: '温控', type: '11' },
      	// { name: '断路器计数器', type: '12' },
      ],
      sensorType: '',
      choosenType: '',
      deviceIds: [],
      deviceList: [],
      sensorName: '',
      phaseName: 'A',
      pages: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      tableData: [],
      tableList: [],
      deviceLabel: '',
      myChart: null
    }
  },
  filters: {
  	percentageChange(val) {
  		let num = +val || 0;
  		return (num*100).toFixed(2) + '%';
  	}
  },
  async mounted() {
    await this.getCompanyList();
    this.myChart = this.$echarts.init(this.$refs.chart);
  },
  methods: {
    // 导出报表
    tableExport() {
      
    },
    // 获取公司列表
    async getCompanyList() {
      let { roleForms } = await manage.userRightsAll({name: ''});
      this.companyList = roleForms;
    },
    // 选择公司
    chooseCompany(item) {
    	this.projectId = '';
      this.siteList = item.role;
    },
    // 修改站点和传感器类型时情况选择列表
    clearDevices() {
      this.deviceIds = [];
      if(this.projectId != '' && this.sensorType != '') {
      	this.getDeviceList();
      }
    },
    // 选择统计区间
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
    // 自定义选择起止时间
    onDateChange() {
    	this.dateId = '4';
    },
    // 修改传感器类型
    changeSensorType() {
    	this.choosenType = '';
      if(this.sensorType == '1') {
        this.deviceLabel = 'name';
      }else {
        this.deviceLabel = 'deviceName';
      }
    	this.clearDevices();
    },
    // 获取传感器列表
    async getDeviceList() {
    	let { list } = await analysis.sensorSearch({
    		projectId: this.projectId,
    		sensorType: this.sensorType
    	});
    	this.deviceList = list;
    },
    // 查询
    search() {
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
        if(this.choosenType == '1' ) {
          this.deviceIds = this.deviceList;
        }
        if(this.deviceIds.length>0) {
          this.sensorName = this.deviceIds[0].deviceId + '';
          this.getList();
        }
    	}
    },
    // 获取数据
    async getList() {
      let obj = this.deviceIds.find(ele => { return ele.deviceId == +this.sensorName });
      let query = {};
      let api = '';
      if(this.sensorType == '1') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          boardId: obj.boardId,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
          threePhase: this.phaseName
        };
        api = 'blq';
      }else if(this.sensorType == '2') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'wlwirelesstemperature';
      }else if(this.sensorType == '3') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'temperatureandhumidity';
      }else if(this.sensorType == '4') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'ygwltelescopicjoint';
      }else if(this.sensorType == '5') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'deformation';
      }else if(this.sensorType == '6') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'temperatureElectric';
      }else if(this.sensorType == '7') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'tiltDetection';
      }else if(this.sensorType == '8') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'pressure';
      }else if(this.sensorType == '9') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'flooding';
      }else if(this.sensorType == '10') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'waterLevel';
      }else if(this.sensorType == '11') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'temperatureControl';
      }else if(this.sensorType == '12') {
        query = {
          companyId: this.companyId.companyId,
          projectId: this.projectId,
          deviceNumber: obj.deviceNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          pageNum: 1,
          pageSize: 999999999,
        };
        api = 'counting';
      }
      let { pageInfo } = await analysis[api](query);
      this.tableData = pageInfo.records;
      this.total = this.tableData.length;
      this.cutList();
      this.initEchart();
    },
    // 选择传感器
    handleSensorClick(tab) {
      this.getList();
    },
    // 选择避雷器相位
    handlePhaseClick(tab) {
      this.getList();
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
    },
    // 绘制图
    initEchart() {
      this.myChart.clear();
      let option = {};
      console.log(this.sensorType, "绘制图")
      if(this.sensorType == '1'){
        option = {
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
      }else if(this.sensorType == '2') {
        option = {
        	tooltip: {
        		trigger: 'axis'
        	},
          legend: {
            data: ["温度"],
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
              name: "温度",
              type: "line",
              symbol: "none",
              sampling: "lttb",
              data: this.tableData.map(item => { return item.temperature || '0' }).reverse()
            },
          ],
        };
      }else if(this.sensorType == '3') {
        
      }else if(this.sensorType == '4') {
        option = {
        	tooltip: {
        		trigger: 'axis',
        		axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        			type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        		}
        	},
        	grid: {
            top: 52,
            left: 50,
            right: 30,
            bottom: 70,
          },
        	legend: {
        	  data: ["伸缩量/mm"],
        	  textStyle: {
        	    color: "#fff",
        	  },
        	  top: 20,
        	  right: 30, //可设定图例在左、右、居中
        	  icon: "line",
        	},
        	dataZoom: [
        	  {
        	    type: "slider",
        	  },
        	  {
        	    type: "inside",
        	  },
        	],
        	yAxis: {
        		type: 'value',
        		position: 'bottom',
        		splitLine: {
        			lineStyle: {
        				type: 'dashed'
        			}
        		}
        	},
        	xAxis: {
        		type: 'category',
        		// axisLine: {show: false},
        		// axisLabel: {show: false},
        		axisTick: {show: false},
        		splitLine: {show: false},
        		data: this.tableData.map(item => { return item.updateTime || '--' }).reverse(),
        	},
        	series: [
        		{
        			name: '伸缩量/mm',
        			type: 'bar',
        			data: this.tableData.map(item => { return item.datavalue || '0' }).reverse()
        		}
        	]
        };
      }else if(this.sensorType == '5') {
        option = {
        	tooltip: {
        		trigger: 'axis',
        		axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        			type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        		}
        	},
        	grid: {
            top: 52,
            left: 50,
            right: 30,
            bottom: 70,
          },
        	legend: {
        	  data: ["形变量ε"],
        	  textStyle: {
        	    color: "#fff",
        	  },
        	  top: 20,
        	  right: 30, //可设定图例在左、右、居中
        	  icon: "line",
        	},
        	dataZoom: [
        	  {
        	    type: "slider",
        	  },
        	  {
        	    type: "inside",
        	  },
        	],
        	yAxis: {
        		type: 'value',
        		position: 'bottom',
        		
        		splitLine: {
        			lineStyle: {
        				type: 'dashed'
        			}
        		}
        	},
        	xAxis: {
        		type: 'category',
        		// axisLine: {show: false},
        		// axisLabel: {show: false},
        		axisTick: {show: false},
        		splitLine: {show: false},
        		data: this.tableData.map(item => { return item.updateTime || '--' }).reverse(),
        	},
        	series: [
        		{
        			name: '形变量ε',
        			type: 'line',
        			data: this.tableData.map(item => { return item.deformation || '0' }).reverse(),
        			areaStyle: {}
        		}
        	]
        };
      }else if(this.sensorType == '6') {
        option = {
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
      }else if(this.sensorType == '7') {
        option = {
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
      }else if(this.sensorType == '8') {
        option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ["压力", "温度"],
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
						name: '压力/KPa',
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
							name: "压力",
							type: "line",
							symbol: "none",
							sampling: "lttb",
							data: this.tableData.map(item => { return item.pressure || '0' }).reverse(),
						},
            {
							name: "温度",
							type: "line",
							symbol: "none",
							sampling: "lttb",
							data: this.tableData.map(item => { return item.temperature || '0' }).reverse(),
						},
					],
				};
      }else if(this.sensorType == '9') {
        // option = {
        // 	tooltip: {
        // 		trigger: 'axis'
        // 	},
        // 	legend: {
        // 		data: ["水浸值"],
        // 		textStyle: {
        // 			color: "#fff",
        // 		},
        // 		top: 20,
        // 		right: 30, //可设定图例在左、右、居中
        // 		icon: "line",
        // 	},
        // 	grid: {
        // 		top: 52,
        // 		left: 66,
        // 		right: 30,
        // 		bottom: 70,
        // 	},
        // 	xAxis: {
        // 		type: "category",
        // 		boundaryGap: false,
        // 		data: this.tableData.map(item => { return item.updateTime || '--' }).reverse(),
        // 		splitLine: {
        // 			show: true,
        // 			lineStyle: {
        // 				color: "rgba(20, 225, 250, 0.2)",
        // 			},
        // 		},
        // 		axisLabel: {
        // 			//x轴文字的配置
        // 			textStyle: {
        // 				color: "#fff",
        // 			},
        // 		},
        // 		axisLine: {
        // 			show: false,
        // 		},
        // 	},
        // 	yAxis: {
        // 		type: "value",
        // 		name: '水浸值/mV',
        // 		splitLine: {
        // 			show: false,
        // 		},
        // 		axisLabel: {
        // 			//x轴文字的配置
        // 			textStyle: {
        // 				color: "#fff",
        // 			},
        // 		},
        // 		axisLine: {
        // 			show: false,
        // 			lineStyle: {
        // 				color: "rgba(20, 225, 250, 0.2)",
        // 			},
        // 		},
        // 	},
        // 	dataZoom: [
        // 		{
        // 			type: "slider",
        // 		},
        // 		{
        // 			type: "inside",
        // 		},
        // 	],
        // 	series: [
        // 		{
        // 			name: "水浸值",
        // 			type: "line",
        // 			symbol: "none",
        // 			sampling: "lttb",
        // 			data: this.tableData.map(item => { return item.pressure || '0' }).reverse(),
        // 		},
        // 	],
        // };
      }else if(this.sensorType == '10') {
        
      }else if(this.sensorType == '11') {
        option = {
          tooltip: {
          	trigger: 'axis'
          },
        	legend: {
        	  data: ['温度', '湿度']
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
        			name: '湿度(%rh)',
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
        			name: '湿度',
        			type: 'bar',
        			yAxisIndex: 1,
        			data: this.tableData.map(item => { return item.humidity || '0' }).reverse()
        		}
          ],
        };
      }else if(this.sensorType == '12') {
        let fftId = this.tableData.map(item => { return item.fftId || '--' }).reverse();
        let actionA = this.tableData.map(item => { return item.actionA || '0' }).reverse();
        let actionB = this.tableData.map(item => { return item.actionB || '0' }).reverse();
        let actionC = this.tableData.map(item => { return item.actionC || '0' }).reverse();
        let changeArr = arr => {
          let list = [];
          arr.forEach((item, index) => {
            if(index == 0) {
              list.push(item);
            }else{
              list.push(item, item);
            }
          });
        };
        option = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['A相次数', 'B相次数', 'C相次数'],
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
            data: changeArr(fftId),
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
              name: 'A相次数',
              type: 'line',
              yAxisIndex: 0,
              data: changeArr(actionA)
            },
            {
              name: 'B相次数',
              type: 'line',
              yAxisIndex: 0,
              data: changeArr(actionB)
            },
            {
              name: 'C相次数',
              type: 'line',
              yAxisIndex: 0,
              data: changeArr(actionC)
            },
          ],
        };
      }
      this.myChart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
.dataAnalysisPage {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
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
  .page_border {
    border-bottom: 1px solid rgba(20, 225, 250, 0.3);
  }
  >>> .data_form {
    margin: 20px 0;
    .el-form-item__label {
      color: #14e1fa;
    }
    .el-input__inner {
      border-radius: 4px;
      width: 400px;
    }
    .data_form_short {
      .el-input__inner {
        width: 160px;
      }
    }
    .data_form_dater {
      .el-input__inner {
        width:220px;
      }
    }
  }
}
</style>