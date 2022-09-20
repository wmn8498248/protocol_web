<template>
  <div class="sf6-fisrt">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.deviceNumber"
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
        <el-form-item label="">
          <el-date-picker
            type="datetime"
            placeholder="选择起始时间"
            v-model="searchModel.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            type="datetime"
            placeholder="选择结束时间"
            v-model="searchModel.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" class="btn-search">查询</el-button>
        
          <el-button @click="tableExport" class="btn-search" :loading="onload"
            >导出表格</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="alarmType" label="报警类型" width="80px"> </el-table-column>
      <el-table-column prop="createTime" label="报警时间"  width="180px"> </el-table-column>
      <!-- <el-table-column prop="deviceId" label="传感器编号"> </el-table-column> -->
      <el-table-column prop="deviceName" label="主设备名称"  width="200px"> </el-table-column>
      <el-table-column prop="deviceNumber" label="传感器编号" width="200px">
      </el-table-column>
      <el-table-column prop="handleMsg" label="上次处理结果"> </el-table-column>
      <el-table-column prop="lastCreateTime" label="上次报警时间">
      </el-table-column>
      <el-table-column prop="lastHandleMsg" label="上次处理结果">
      </el-table-column>
      <el-table-column prop="pressure" label="报警值"> </el-table-column>
      <el-table-column prop="rated" label="额定值"> </el-table-column>
      <el-table-column prop="status" label="处理结果"> </el-table-column>
      <!-- <el-table-column prop="updateTime" label="传感器编号"> </el-table-column> -->
      <el-table-column prop="voltLevel" label="电压等级"> </el-table-column>
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
      searchModel: {
        name: "",
        deviceNumber: "",
        startTime: "",
        endTime: "",
      },
      onload:false,
      tableData: [],
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
    clearAll(){},
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
      this.getList();
    },
    // 修改列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.getList();
    },
    async getList() {
      const { list } = await api.alarmDate({
        projectId: 1,
        alarmType: "低压",
      });
      this.tableData = list;
    },
  },
};
</script>
<style lang="scss" scoped>
.sf6-first {
}
</style>