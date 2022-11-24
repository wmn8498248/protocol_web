<template>
  <div class="bileiPage">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input type="text" v-model="searchModel.deviceId" placeholder="设备编号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="text" v-model="searchModel.deviceName" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getSearch" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="deviceId" label="传感器EUI"> </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column prop="alarmHigh" label="温度报警上限(℃)"> </el-table-column>
      <el-table-column prop="alarmLow" label="温度报警下限(℃)"> </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{ row }"> 
          <!-- <el-button class="btn-data" size="mini" @click="toSet(row.id)">参数设置</el-button> -->
          <el-button class="btn-detail" size="mini" @click="toEdit(row.id)">修改</el-button>
          <el-button class="btn-clear" size="mini" @click="toDelete(row.deviceId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination taR mt20x">
      <el-pagination @size-change="onPageSizeChange" @current-change="onPageCurrentChange" :current-page="pages.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="pages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/wenkong";
export default {
  props: {
    companyId: Number,
    projectId: Number,
  },
  data() {
    return {
      searchModel: {
      	gatewayId: '',
      	deviceId: '',
      	deviceName: ''
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    };
  },
  methods: {
    async getList() {
      let data = {
        companyId: this.projectId,
        ...this.searchModel,
        ...this.pages,
      };
      let dataList = await api.temperatureControlList(data);
      this.tableData = dataList.records;
			this.total = dataList.total;
    },
    async toSet(deviceId) {
      this.$router.push({
        path: "/manage/wenkong_setting",
        query: {
          deviceId
        },
      });
    },
    async toEdit(deviceId) {
      this.$router.push({
        path: "/manage/wenkong_edit",
        query: {
          deviceId,
          projectId: this.projectId,
          type: 'edit',
        },
      });
    },
    async toDelete(deviceId) {
			this.$confirm('确定删除该设备?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				let data = {
				  deviceId,
				};
				await api.temperatureControlDelete(data);
				this.$message.success("删除成功");
				this.getList();
			}).catch(() => {
				
			});
    },
		// 修改列表条数
		onPageSizeChange(e) {
		  this.pages.pageNum = 1;
			this.pages.pageSize = e;
			this.getList();
		},
		// 修改列表页数
		onPageCurrentChange(e) {
			this.pages.pageNum = e;
			this.getList();
		},
		// 搜索
		getSearch() {
		  this.pages.pageNum = 1;
		  this.getList();
		}
  },
};
</script>

<style lang="scss" scoped>
.bileiPage {
  width: 100%;
  .search-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
