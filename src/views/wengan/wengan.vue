<template>
  <div class="qingxiePage">
    <div class="search-container">
      <el-form inline label-width="100px">
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
            v-model="searchModel.deviceName"
            type="text"
            placeholder="传感器别名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="deviceId" label="传感器编号"> </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column prop="temdev" label="温度（°C）"> </el-table-column>
      <el-table-column prop="createTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{ row }">
          <!-- <el-button class="btn-map" size="mini" @click="goToMap(row.longitude, row.latitude)">地图</el-button> -->
          <el-button
            class="btn-data"
            size="mini"
            @click="goToDetail(row.deviceId, row.companyId, row.projectId)"
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
import * as api from "@/api/wirelessTemperature";
export default {
  name: "Wengan",
  data() {
    return {
      searchModel: { deviceId: "", deviceName: "" },
      companyId: 0,
      timer: null,
      name: "",
      baseList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    };
  },
  props: {
    projectId: Number,
  },

  methods: {
    async getData() {
      let { records, total } = await api.wirelessTemperatureNewList({
        companyId: this.projectId,
        ...this.searchModel,
        ...this.pages,
      });
      this.total = total;
      this.tableData = records;
    },
    // 修改列表条数
    onPageSizeChange(e) {
      this.pages.pageSize = e;
      this.getData();
    },
    // 修改列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.getData();
    },
    // 查看数据
    goToDetail(deviceNumber, companyId, projectId) {
      this.$router.push({
        path: `/dataHistory/wengan_data`,
        query: {
          deviceNumber,
          companyId,
          projectId,
        },
      });
    },
    // 查看地图
    goToMap(longitude, latitude) {
      this.$router.push({
        path: `${this.$route.path}_map`,
        query: {
          longitude,
          latitude,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.qingxiePage {
  width: 100%;
  padding: 20px;
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
