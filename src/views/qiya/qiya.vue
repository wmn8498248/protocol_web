<template>
  <div class="qingxiePage">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
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
    <el-table :data="tableData" stripe style="width: 100%" align="center">
   
      <el-table-column prop="deviceId" label="传感器编号"> </el-table-column>
      <el-table-column prop="deviceName" label="传感器别名"> </el-table-column>
      <el-table-column prop="temperature" label="温度"> </el-table-column>
      <el-table-column prop="pressureValue" label="气压值"> </el-table-column>
      <el-table-column prop="rated" label="额定值"> </el-table-column>

      <el-table-column prop="currentValue" label="电流值"> </el-table-column>
      <el-table-column prop="frameNum" label="帧计数器"> </el-table-column>

      <el-table-column prop="collectionTime" label="更新时间" width="250"> </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="{ row }">
          <!-- <el-button
            class="btn-map"
            size="mini"
            @click="goToMap(row.longitude, row.latitude, row)"
            >地图</el-button
          > -->
          <el-button
            class="btn-data"
            size="mini"
            @click="goToDetail(row.deviceId, row.companyId, row.projectId)"
            >查看数据</el-button
          >
          <!-- <el-button class="btn-data" size="mini" round @click="dialogClick"
            >参数</el-button
          > -->
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

    <el-dialog title="收货地址" :visible.sync="dialogPressureInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/qiya";
export default {
  name: "Qiya",
  data() {
    return {
      dialogPressureInfo: false,
      pressureInfoData: [],
      tableWidth: 140,
      searchModel: {
        deviceId: "",
        deviceName: "",
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
      companyId: 0,
    };
  },
  props: {
    projectId: Number,
  },
  methods: {
    dialogClick() {
      this.dialogPressureInfo = !this.dialogPressureInfo;
    },
    async getData() {
      let { records, total } = await api.pressureNewList({
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
        path: `/dataHistory/qiya_data`,
        query: {
          deviceNumber,
          companyId,
          projectId,
        },
      });
    },
    // 查看地图
    goToMap(longitude, latitude, res) {
      this.$router.push({
        path: `/dataHistory/qiya_map`,
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
  .qiya_status_title {
  }
  .qiya_status {
    display: flex;
    flex-direction: row;
    align-items: center;

    .qiya_status_icon {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin: 0 10px;
    }
  }
  .qiya_status_0 {
    .qiya_status_icon {
      background: #14e1fa;
    }
    .qiya_status_title {
      color: #14e1fa;
    }
  }
  .qiya_status_1 {
    .qiya_status_icon {
      background: #f2fa14;
    }
    .qiya_status_title {
      color: #f2fa14;
    }
  }
  .qiya_status_2 {
    .qiya_status_icon {
      background: #e62832;
    }
    .qiya_status_title {
      color: #e62832;
    }
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
