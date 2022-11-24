<template>
    <div class="sf6-alarm-type">
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
              v-model="searchModel.deviceId"
              type="text"
              placeholder="传感器编号"
            ></el-input>
          </el-form-item>
  
          <el-form-item>
            <el-button @click="getList" class="btn-search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
  
      <el-table height="500px" :data="tableList" stripe style="width: 100%">
        <el-table-column prop="id" label="传感器编号"> </el-table-column>
        <el-table-column prop="name" label="传感器别名"> </el-table-column>
        <el-table-column prop="countUp" label="次数"> </el-table-column>
        
        <el-table-column prop="createTime" label="更新时间" width="150px">
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
          ref="pagination"
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
    data() {
      return {
        noneAdmin: this.$store.getters.userinfo.name == "admin",
        searchModel: {
          deviceName: "",
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
      this.$emit("close-after", false);
      this.getList();
    },
  
    methods: {
      handleHistory(res) {
        this.$emit("close-after", true);
        let deviceNumber = res.id;
        this.$router.push({
          path: `/jishu/jishu_data`,
          query: {
            deviceNumber,
          },
        });
      },
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
        this.getList();
      },
      // 修改列表页数
      onPageCurrentChange(e) {
        this.pages.pageNum = e;
        this.$store.commit("app/SET_SIZE", e);
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
        this.pages.pageNum = Number(this.$store.getters.size) || 1;
  
        let { records, total, current } = await api.deviceList({
            companyId: this.$route.query.companyId,
            ...this.searchModel,
            ...this.pages
        });
        this.tableList = records;
        this.total = total;
        this.$nextTick(() => {
          this.$refs.pagination.internalCurrentPage = current;
        });
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
  