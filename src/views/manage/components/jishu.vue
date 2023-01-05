<template>
  <div class="bileiPage">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="网关Id">
          <el-select v-model="gatewayId" clearable placeholder="请选择">
            <el-option
              v-for="item in gatewayIdList"
              :key="item.id"
              :label="item.netName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

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
            v-model="searchModel.deviceId"
            type="text"
            placeholder="传感器编号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getSearch" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="传感器编号"> </el-table-column>
      <el-table-column prop="name" label="传感器别名"> </el-table-column>

      <el-table-column prop="devType" label="计数器类型">
        <template slot-scope="{ row }">
          <span v-if="row.devType === 1">动作次数计数器</span>
          <span v-if="row.devType === 2">打压次数计数器</span>
        </template>
      </el-table-column>

      <el-table-column prop="actionNum" label="次数"></el-table-column>

      <el-table-column prop="voltLevel" label="电压等级"> </el-table-column>
      <el-table-column prop="deviceClassify" label="设备分类">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{ row }">
          <!-- <el-button class="btn-data" size="mini" @click="toSet(row.id)"
              >远程升级</el-button
            > -->
          <!-- <el-button
            class="btn-data"
            size="mini"
            @click="toSet(row.id)"
            >参数设置</el-button
          > -->
          <el-button class="btn-detail" size="mini" @click="toEdit(row.id)"
            >修改</el-button
          >
          <el-button class="btn-clear" size="mini" @click="toDelete(row.id)"
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
import * as api from "@/api/jishu";
export default {
  props: {
    companyId: Number,
    projectId: Number,
  },
  data() {
    return {
      gatewayIdList: [],
      gatewayId: null,
      searchModel: {
        deviceName: "",
        deviceId: "",
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    };
  },

  created() {
    this.getCompanyList();
  },
  methods: {
    async getCompanyList() {
      let data = {
        companyId: this.projectId,
      };
      this.gatewayIdList = await api.companyList(data);
    },

    async getList() {
      let data = {
        companyId: this.projectId,
        gatewayId: this.gatewayId,
        ...this.searchModel,
        ...this.pages,
      };
      let { records, total } = await api.deviceList(data);
      this.tableData = records;
      this.total = total;
    },
    async toSet(deviceId) {
      this.$router.push({
        path: "/manage/jishu_setting",
        query: {
          deviceId,
        },
      });
    },
    async toEdit(deviceId) {
      this.$router.push({
        path: "/manage/jishu_edit",
        query: {
          deviceId,
          type: "edit",
        },
      });
    },
    async toDelete(id) {
      this.$confirm("确定删除该设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            id,
          };
          await api.deviceDelete(data);
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
