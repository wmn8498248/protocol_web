<template>
  <div class="sf6-alarm-list">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.deviceName"
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
      <!-- <el-table-column prop="deviceId" label="传感器编号"> </el-table-column> -->
      <el-table-column prop="deviceName" label="主设备名称"> </el-table-column>
      <el-table-column prop="deviceId" label="传感器编号"> </el-table-column>
      <el-table-column
        prop="pressureValue"
        :label="isAllStatus ? '报警值' : '气压'"
      >
      </el-table-column>
      <el-table-column prop="rated" label="额定值"> </el-table-column>
      <!-- <el-table-column prop="updateTime" label="传感器编号"> </el-table-column> -->
      <el-table-column prop="voltLevel" label="电压等级"> </el-table-column>
      <el-table-column v-if="isAllStatus" prop="alarmType" label="报警类型">
        <template slot-scope="{ row }">
          <div>
            {{ typeListName[row.alarmType] ? typeListName[row.alarmType] : "无" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isAllStatus"
        prop="collectionTime"
        label="报警时间"
      >
        <template slot-scope="{ row }">
          <div>
            {{ row.collectionTime ? row.collectionTime : "无" }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        v-if="isAllStatus"
        prop="lastHandleMsg"
        label="上次报警类型"
      >
        <template slot-scope="{ row }">
          <div>
            {{ row.lastHandleMsg ? row.lastHandleMsg : "无" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isAllStatus"
        prop="lastCreateTime"
        label="上次报警时间"
      >
        <template slot-scope="{ row }">
          <div>
            {{ row.lastCreateTime ? row.lastCreateTime : "无" }}
          </div>
        </template>
      </el-table-column> -->

      <el-table-column v-if="!isAllStatus" prop="collectionTime" label="更新时间">
        <template slot-scope="{ row }">
          <div>
            {{ row.collectionTime ? row.collectionTime : "无" }}
          </div>
        </template>
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
import { exportExcelAlarm } from "@/utils/exportExcel";

export default {
  data() {
    return {
      typeListName: {
        0: "正常",
        1: "连续下降",
        2: "突变",
        3: "高压",
        4: "低压",
        5: "高温",
        6: "低温",
        7: "湿度过高",
        8: "湿度过低",
      },
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
  activated() {
    this.$emit("close-after", false);
    this.getList();
  },
  computed: {
    isAllStatus() {
      return this.$route.query.alarmType == 0 ? false : true;
    },
  },
  methods: {
    handleHistory(res) {
      this.$emit("close-after", true);
      let deviceNumber = res.deviceId;
      this.$router.push({
        path: `/sf6/qiya_data`,
        query: {
          deviceNumber,
        },
      });
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "/sf6/index/list/export",
        params: {
          alarmType: this.$route.query.alarmType,
          dayNum: this.$route.query.times,
          companyId: this.$route.query.companyId,
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
      this.getList();
    },
    // 修改列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.getList();
    },
    // 分割数组
    cutList() {
      this.tableList = this.tableData.slice(
        (this.pages.pageNum - 1) * this.pages.pageSize,
        this.pages.pageNum * this.pages.pageSize
      );
    },
    async getList() {
      const { alarmType, page } = await api.alarmDate({
        dayNum: this.$route.query.times,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        alarmType: this.$route.query.alarmType,
        companyId: this.$route.query.companyId,
        deviceName: this.searchModel.deviceName,
        deviceId: this.searchModel.deviceNumber,
        // startTime: this.searchModel.startTime,
        // endTime: this.searchModel.endTime,
      });
      this.tableList = page.records;
      this.total = page.total;
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
