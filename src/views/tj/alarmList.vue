<template>
  <div class="sf6-alarm-list">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.deviceName"
            type="text"
            placeholder="主设备别名"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.deviceNumber"
            type="text"
            placeholder="传感器编号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" class="btn-search">查询</el-button>
          <el-button @click="tableExport" class="btn-search" :loading="onload"
            >导出表格</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table height="500px" :data="tableList" stripe style="width: 100%">
      <el-table-column prop="deviceNumber" label="传感器编号">
      </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column prop="datavalue" label="长度(mm)"> </el-table-column>
      <el-table-column prop="temdev" label="温度(℃)"> </el-table-column>
      <el-table-column prop="voltage" label="电压(V)"> </el-table-column>
      <el-table-column prop="status" label="在线状态">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="info" v-if="row.status == 1"> 离线 </el-tag>
            <el-tag type="success" v-else> 在线 </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="150px">
      </el-table-column>
      <el-table-column prop="voltLevel" label="主设备电压等级">
      </el-table-column>
      <el-table-column prop="deviceClassify" label="设备类型分类">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleHistory(scope.row)"
            >查看数据</el-button
          >
        </template>
      </el-table-column>
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
</template>
<script>
import * as api from "@/api/tj";
import { exportExcelAlarm } from "@/utils/exportExcel";

export default {
  data() {
    return {
      isAllStatus: this.$route.query.isAll == "正常" ? 0 : 1,
      searchModel: {
        deviceName: "",
        deviceNumber: "",
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
  created() {
    this.getList();
  },
  mounted() {},
  // destroyed(){
  //   console.log(2)
  // },
  // beforeDestroy(){
  //   console.log(3)
  // },
  methods: {
    handleHistory(res) {
      let deviceNumber = res.deviceNumber;
      let companyId = 1;
      let projectId = 2;
      this.$router.push({
        path: `/tj/shengsuo_data_tj`,
        query: {
          deviceNumber,
          companyId,
          projectId,
        },
      });
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "tj/alarm/export",
        params: {
          projectId: 2,
        },
      });
      this.onload = false;
    },
    clearAll() {},
    // 查看详情
    toDetail(deviceNumber) {
      this.$router.push({
        path: "/waring/qiya",
        query: {
          deviceNumber,
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
      const { list } = await api.alarmDate({
        projectId: 2,
        deviceName: this.searchModel.deviceName,
        deviceNumber: this.searchModel.deviceNumber,
        startTime: this.searchModel.startTime,
        endTime: this.searchModel.endTime,
        isAll: this.$route.query.isAll == "正常" ? 1 : 0,
        // alarmType: this。,
      });
      this.tableData = list;
      this.total = list.length;
      this.cutList();
      //   this.total = list
    },
  },
};
</script>
<style lang="scss" scoped>
.sf6-alarm-list {
  >>> .el-table th {
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