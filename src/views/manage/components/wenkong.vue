<template>
  <div class="bileiPage">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input
            type="text"
            v-model="searchModel.deviceId"
            placeholder="传感器编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            type="text"
            v-model="searchModel.deviceName"
            placeholder="设备名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getSearch" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"  class="demo-table-expand">
            <el-form-item label="变化值参数:">
              <span>{{ props.row.variation }}</span>
            </el-form-item>
            <el-form-item label="加湿器状态:">
              <!-- <span>{{ props.row.humTime===1?'运行': '停止'}}</span> -->
              <el-tag type="success" size="mini" v-if="props.row.humTime == 1">运行</el-tag>
              <el-tag type="danger" size="mini"  v-else>停止</el-tag>
            </el-form-item>
            <el-form-item label="远程启动加湿时间:">
              <span>{{ props.row.humTime }}</span>
            </el-form-item>
            <el-form-item label="加湿器启动湿度:">
              <span>{{ props.row.humLow }}</span>
            </el-form-item>
            <el-form-item label="加湿器停止湿度:">
              <span>{{ props.row.humHigh }}</span>
            </el-form-item>
            <el-form-item label="加热器状态:">
              <el-tag type="success" size="mini" v-if="props.row.tempStatus == 1">运行</el-tag>
              <el-tag type="danger" size="mini"  v-else>停止</el-tag>
            </el-form-item>
            <el-form-item label="远程启动加热时间:">
              <span>{{ props.row.tempTime }}</span>
            </el-form-item>
            <el-form-item label="加热器启动温度:">
              <span>{{ props.row.tempLow }}</span>
            </el-form-item>
            <el-form-item label="加热器停止温度:">
              <span>{{ props.row.tempHigh }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="deviceId" label="传感器编号" width="100"> </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名" width="180"> </el-table-column>

      <!-- <el-table-column prop="tempHigh" label="热湿器详情" width="120"> 
        <template slot-scope="{ row }">
          <el-popover
            placement="top-start"
            title="标题"
            width="300"
            trigger="hover">
            <div>
              <el-tag>标签一</el-tag>
              <el-tag type="success">标签二</el-tag>
              <el-tag type="info">标签三</el-tag>
              <el-tag type="warning">标签四</el-tag>
              <el-tag type="danger">标签五</el-tag>

            </div>
            <el-button size="mini" slot="reference">详情</el-button>
          </el-popover>
        </template>
      </el-table-column> -->
        
      <!-- <el-table-column prop="tempHigh" label="加热器停止温度" width="120"> </el-table-column>
      <el-table-column prop="tempLow" label="加热器启动温度" width="120"> </el-table-column>
      <el-table-column prop="humHigh" label="加湿器停止湿度" width="120"> </el-table-column>
      <el-table-column prop="humLow" label="加湿器启动湿度" width="120"> </el-table-column>

      <el-table-column prop="tempStatus" label="加热器状态" width="100">
        <template slot-scope="{ row }">
          <div v-if="row">
            <el-tag type="success" v-if="row.tempStatus == 1"> 有 </el-tag>
            <el-tag type="info" v-else> 无 </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="tempTime" label="远程启动加热时间" width="140"> </el-table-column>

      <el-table-column prop="humStatus" label="加湿器状态" width="100">
        <template slot-scope="{ row }">
          <div v-if="row">
            <el-tag type="success" v-if="row.humStatus == 1"> 运行 </el-tag>
            <el-tag type="info" v-else> 停止 </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="humTime" label="远程启动加湿时间" width="140"> </el-table-column>
      <el-table-column prop="variation" label="变化值参数" width="120"> </el-table-column> -->

      <el-table-column prop="alarmStatus" label="布防状态">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="info" v-if="row.alarmStatus == 1"> 撤防 </el-tag>
            <el-tag type="success" v-else-if="row.alarmStatus == 0">
              布防
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="voltLevel" label="电压等级"> </el-table-column>
      <el-table-column prop="deviceClassify" label="设备分类"> </el-table-column>
      <el-table-column prop="collectionInterval" label="采集间隔(S)">
      </el-table-column>
      <el-table-column prop="collectionNumber" label="采集个数">
      </el-table-column>
      <el-table-column prop="updateTime" width="150" label="更新时间"> </el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="{ row }">
          <el-button class="btn-data" size="mini" @click="upgrade('tc',row.deviceId)">远程升级</el-button>
          <el-button class="btn-data" size="mini" @click="toSet(row.id)">参数设置</el-button>
          <el-button class="btn-detail" size="mini" @click="toEdit(row.id)"
            >修改</el-button
          >
          <el-button
            class="btn-clear"
            size="mini"
            @click="toDelete(row.deviceId)"
            >删除</el-button
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
import * as api from "@/api/wenkong";
export default {
  props: {
    companyId: Number,
    projectId: Number,
  },
  data() {
    return {
      searchModel: {
        gatewayId: "",
        deviceId: "",
        deviceName: "",
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
    upgrade(deviceType,deviceId){
      this.$router.push({
        path: "/manage/upgrade_setting",
        query: {
          deviceType,
          deviceId
        },
      });
    },
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
          deviceId,
        },
      });
    },
    async toEdit(deviceId) {
      this.$router.push({
        path: "/manage/wenkong_edit",
        query: {
          deviceId,
          projectId: this.projectId,
          type: "edit",
        },
      });
    },
    async toDelete(deviceId) {
      this.$confirm("确定删除该设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            deviceId,
          };
          await api.temperatureControlDelete(data);
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
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
    },
  },
};
</script>

<style lang="scss" scoped>
.bileiPage {
  width: 100%;
  >>> .el-form-item{
    margin-bottom: 0;
  }
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
