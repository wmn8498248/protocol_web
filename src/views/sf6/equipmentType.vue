<template>
  <div class="sf6-equipment-type">
   <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.deviceId"
            type="text"
            placeholder="传感器编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.name"
            type="text"
            placeholder="传感器别名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>



    <el-table height="500px" :data="tableList" stripe style="width: 100%">
      <el-table-column prop="deviceId" label="传感器编号">
      </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column prop="pressureValue" label="气压值"> </el-table-column>
      <el-table-column prop="rated" label="额定值"> </el-table-column>

      <el-table-column prop="electric" label="电量"> </el-table-column>
      <el-table-column prop="temperature" label="温度"> </el-table-column>
      <el-table-column prop="status" label="在线状态">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="info" v-if="row.status == 1"> 离线 </el-tag>
            <el-tag type="success" v-else> 在线 </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="collectionTime" label="更新时间" width="150px">
      </el-table-column>
      <el-table-column prop="voltLevel" label="主设备电压等级">
      </el-table-column>
      <el-table-column prop="deviceClassify" label="设备类型分类">
      </el-table-column>

      <!-- <el-table-column prop="address" label="传感器位置" width="100px">
      </el-table-column>
      <el-table-column prop="companyId" label="公司id"> </el-table-column>
      <el-table-column prop="currentValue" label="电流值"> </el-table-column>
      <el-table-column prop="frameNum" label="frameNum"  width="100px"> </el-table-column>
      <el-table-column prop="latitude" label="纬度"> </el-table-column>
      <el-table-column prop="longitude" label="经度"> </el-table-column>
      <el-table-column prop="modState" label="模块状态" width="100px">
      </el-table-column>
      <el-table-column prop="num1" label="最小量程" width="100px">
      </el-table-column>
      <el-table-column prop="num2" label="低压值" width="100px">
      </el-table-column>
      <el-table-column prop="num3" label="高压值" width="100px">
      </el-table-column>
      <el-table-column prop="num4" label="最大量程" width="100px">
      </el-table-column>
      <el-table-column prop="originData" label="原始数据json" width="100px">
      </el-table-column>
      
      <el-table-column prop="projectId" label="项目id" width="100px">
      </el-table-column> -->
    </el-table>
    <div class="pagination taR mt20x">
      <el-pagination
        @size-change="onPageSizeChange"
        @current-change="onPageCurrentChange"
        :current-page="pages.pageNum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/dashboard";

export default {
  data() {
    return {
      noneAdmin: this.$store.getters.userinfo.name == "admin",

      searchModel: {
        name: "",
        deviceId: "",
        startTime: "",
        endTime: "",
      },
      onload: false,
      tableData: [],
      tableList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      count: 0,
      alarmList: [],
    };
  },
  activated() {
    this.getList();
  },
 
  methods: {
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "sf6/alarm/export",
        params: {
          projectId: 1,
        },
      });
      this.onload = false;
    },
    clearAll() {},
    // 查看详情
    toDetail(deviceId) {
      this.$router.push({
        path: "/waring/qiya",
        query: {
          deviceId,
        },
      });
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
      this.tableList = this.tableData.slice(
        (this.pages.pageNum - 1) * this.pages.pageSize,
        this.pages.pageNum * this.pages.pageSize
      );
    },
    async getList() {
      this.tableData = await api.deviceClassify({
        companyId: this.$route.query.companyId,
        deviceClassify: this.$route.query.deviceClassify,
        deviceName: this.searchModel.name,
        deviceId: this.searchModel.deviceId,
      });
      
      this.total = this.tableData .length;
      this.cutList();
    },
  },
};
</script>
<style lang="scss" scoped>
.sf6-equipment-type {
   >>> .el-table th{
    background-color: #10153b;
  }
  >>> .el-table__body-wrapper {
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #2887f0; //14e1fa 2887f0
      border-radius: 20px;
    }
  }
}
</style>