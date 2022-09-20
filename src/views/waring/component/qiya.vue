<template>
  <div class="alarm_component">
    <div class="search-container">
      <div class="search-total">
        共<span class="total-num">{{ count }}</span
        >个传感器,<span class="total-num">{{ total }}</span
        >条报警信息
      </div>
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
          <el-button
            @click="clearAll"
            class="btn-clear"
            size="mini"
            style="height: 36px"
            >清除所有报警信息</el-button
          >
          <el-button @click="tableExport" class="btn-search" :loading="onload"
            >导出表格</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="deviceNumber" label="传感器编号">
      </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column label="压力值(MPa)">
        <template slot-scope="{ row }">
          <span style="color: #f2fa14">{{ row.pressure }}</span>
        </template>
      </el-table-column>
      <el-table-column label="站点">
        <template slot-scope="{ row }">
          {{ row.companyName + row.projectName }}
        </template>
      </el-table-column>
      <el-table-column prop="alarmyTime" label="报警时间"> </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{ row }">
          <el-button
            class="btn-detail"
            size="mini"
            @click="toDetail(row.deviceNumber)"
            >查看详情</el-button
          >
          <el-button
            class="btn-clear"
            size="mini"
            @click="toClear(row.deviceNumber)"
            >清除告警</el-button
          >
        </template>
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
import * as api from "@/api/qiya";
import { exportExcel } from "@/utils/exportExcel";
export default {
  data() {
    return {
      searchModel: {
        name: "",
        deviceNumber: "",
        startTime: "",
        endTime: "",
		
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      count: 0,
      tableData: [],
      onload: false,
    };
  },
  methods: {
    async getList() {
     
      let { alarmList, count } = await api.pressureAlarmList({
        ...this.searchModel,
        ...this.pages,
      });
      this.tableData = alarmList.records;
      this.total = alarmList.total;
      this.count = count;
    },
    
    clearAll() {
      this.$confirm("确定清除所有报警信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await api.pressureAlarmEliminate({
            status: 1,
          });
          this.$message.success("操作成功");
          this.getList();
        })
        .catch(() => {});
    },
    // 导出表格
    tableExport() {
      api.pressureAlarmExcel({});
    },
    async tableExport() {
      this.onload = true;
      await exportExcel({
        url: "pressureAlarm/exportExcel",
        params: {
          ...this.searchModel,
          deviceName: this.deviceNumber,
        },
      });
      this.onload = false;
    },
    // 清除告警
    toClear(deviceNumber) {
      this.$confirm("确定清除这条报警信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await api.pressureAlarmEliminate({
            status: 2,
            deviceNumber,
          });
          this.$message.success("操作成功");
          this.getList();
        })
        .catch(() => {});
    },
    // 查看详情 
    toDetail( deviceNumber) {
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
  },
};
</script>

<style lang="scss" scoped>
.alarm_component {
  width: 100%;
  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: top;
    .search-total {
      font-size: 14px;
      color: #ffffff;
      position: relative;
      top: 10px;
      left: 20px;
      .total-num {
        color: #14e1fa;
      }
    }
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
}
</style>
