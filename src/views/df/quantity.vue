<template>
  <div class="sf6-alarm-type">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.name"
            type="text"
            placeholder="传感器别名"
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
      <el-table-column prop="temperature" label="温度(℃)"> </el-table-column>
      <el-table-column prop="deformation" label="形变(με)"> </el-table-column>
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
import * as api from "@/api/df";

export default {
  data() {
    return {
      noneAdmin: this.$store.getters.userinfo.name == "admin",
      searchModel: {
        name: "",
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
    console.log(this.$store.getters.userinfo);
  },
  mounted() {},
  methods: {
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "sf6/alarm/export",
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
      const { list } = await api.deviceStatus({
        projectId: 2,
        lineState: this.$route.query.lineState.toString(),
         deviceName: this.searchModel.name,
        deviceNumber: this.searchModel.deviceNumber,
      });
      this.tableData = list;
      this.total = list.length;
      this.cutList();
      console.log(this.tableData);
      //   const { list } = await api.alarmDate({
      //     projectId: 1,
      //     alarmType: this.$route.query.alarmType,
      //   });
      //   this.tableData = list;
      //   this.total = list
    },
  },
};
</script>
<style lang="scss" scoped>
.sf6-alarm-type {
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