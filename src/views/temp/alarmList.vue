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
          <!-- <el-button @click="tableExport" class="btn-search" :loading="onload"
            >导出表格</el-button
          > -->
          <el-button type="info" size="mini" @click="handleRead()" :disabled="dataListSelections.length <= 0">批量已读</el-button>
          <el-button type="danger" size="mini" @click="handleDelete()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table height="500px" :data="tableList" stripe style="width: 100%" @selection-change="selectionChangeHandle">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column prop="deviceId" label="传感器编号">
      </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column prop="alarmValue" label="报警值(℃)"> </el-table-column>
      <el-table-column prop="status" label="状态" width="100px">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="info" v-if="row.status == 0"> 未读 </el-tag>
            <el-tag type="success" v-else> 已读 </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="更新时间" width="250px">
      </el-table-column>

      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleHistory(scope.row)"
            >查看数据</el-button
          >
          <el-button type="info" size="mini" v-if="scope.row.status === 0" @click="handleRead(scope.row.id)"
            >设置已读</el-button
          >
          <el-button type="danger" round size="mini" @click="handleDelete(scope.row.id)"
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
import * as api from "@/api/temp";
import { exportExcelAlarm } from "@/utils/exportExcel";

export default {
  data() {
    return {
      dataListSelections: [],
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
  activated() {
    this.$emit("close-after", false);
    this.getList();
  },
   
  methods: {
    handleDelete(id){
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await api.alarmDelete({
          idArr: ids + '',
        });
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getList()
          }
        })
        // this.$message.error(data.msg)
 
      }).catch(() => {})
    },
    handleRead(id){
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await api.alarmRead({
          idArr: ids + '',
        });
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getList()
          }
        })
        // this.$message.error(data.msg)
 
      }).catch(() => {})
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    handleHistory(res) {
      this.$emit("close-after", true);

      let deviceNumber = res.deviceId;
      this.$router.push({
        path: `/temp/temp_data`,
        query: {
          deviceNumber
        },
      });
    },
    // 导出表格
    async tableExport() {
      this.onload = true;
      await exportExcelAlarm({
        url: "tc/index/list/export",
        params: {
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
      const { records,total } = await api.alarmDate({
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        // alarmType: this.$route.query.alarmType,
        companyId: this.$route.query.companyId,
        deviceName: this.searchModel.deviceName,
        deviceId: this.searchModel.deviceNumber,
      });
      this.tableList = records;
      this.total = total;
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