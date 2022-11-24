<template>
  <div class="sf6-alarm-type">
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
            v-model="searchModel.name"
            type="text"
            placeholder="传感器别名"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-select v-model="searchModel.sortBy" placeholder="排序选择">
            <el-option
              v-for="item in optionSortBy"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item>
          <el-button @click="getList" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form> 
    </div>

    <el-table height="500px" :data="tableList" stripe style="width: 100%" @sort-change="changeTableSort">
      <el-table-column prop="deviceId" sortable label="传感器编号"> </el-table-column>
      <el-table-column prop="deviceName" sortable label="传感器别名"> </el-table-column>
      <!-- <el-table-column prop="status" label="在线状态">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="info" v-if="row.lineStatus == 0"> 离线 </el-tag>
            <el-tag type="success" v-else> 在线 </el-tag>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="pressureValue" sortable label="气压值"></el-table-column>
      <el-table-column prop="rated" label="额定值"> </el-table-column>
      <el-table-column prop="electric" label="电量"> </el-table-column>
      <el-table-column prop="temperature" label="温度"> </el-table-column>
      <el-table-column prop="lineStatus" label="在线状态">
        <template slot-scope="{ row }">
          <div>
            <el-tag type="info" v-if="row.lineStatus == 0"> 离线 </el-tag>
            <el-tag type="success" v-else> 在线 </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="collectionTime" sortable label="更新时间" width="150px">
      </el-table-column>
      <el-table-column prop="voltLevel" label="电压等级(v)"> </el-table-column>
      <el-table-column prop="deviceClassify" label="类型分类">
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
import * as api from "@/api/dashboard";

export default {
  data() {
    return {
      optionSortBy: [{
        value: 'deviceId',
        label: '传感器编号'
      }, {
        value: 'deviceName',
        label: '传感器别名'
      }, {
        value: 'collectionTime',
        label: '更新时间'
      }, {
        value: 'pressureValue',
        label: '气压值'
      }],
      noneAdmin: this.$store.getters.userinfo.name == "admin",
      searchModel: {
        name: "",
        deviceId: "",
        startTime: "",
        endTime: "",
        sortBy: '',
        orderBy:''
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
      orderByType: {
        ascending: 'asc',
        descending: 'desc',
      },
      alarmList: [],
    };
  },

  activated() {
    this.$emit("close-after", false);
    this.getList();
    console.log(this.$route.query.params,  'this.$route.query.params')
  },

  methods: {
    async changeTableSort(res){
      this.searchModel.sortBy = res.prop
      this.searchModel.orderBy = this.orderByType[res.order]

      let { records, total, current } = await api.getLitsMix({
        type: this.$route.query.type,
        companyId: this.$route.query.companyId,
        params: this.$route.query.params,
        deviceName: this.searchModel.name,
        deviceId: this.searchModel.deviceId,
        sortBy: this.searchModel.sortBy,
        orderBy: this.searchModel.orderBy,
        pageNum: 1,
        pageSize: this.pages.pageSize,
      });

      this.tableList = records;
      this.total = total;
      this.$nextTick(() => {
        this.$refs.pagination.internalCurrentPage = current;
      });
      
    },
    handleHistory(res) {
      this.$emit("close-after", true);
      let deviceNumber = res.deviceId;
      let rated = res.rated;
      this.$router.push({
        path: `/sf6/qiya_data`,
        query: {
          deviceNumber,
          rated
        },
      });
    },
    // 查看详情
    toDetail(deviceId) {
      this.$router.push({
        path: "/waring/qiya",
        query: {
          deviceId,
        },
      });
    },
    // 修改列表条数
    onPageSizeChange(e) {
      this.pages.pageSize = e;
      this.getList();
      //   this.cutList();
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
      let { records, total, current } = await api.getLitsMix({
        type: this.$route.query.type,
        companyId: this.$route.query.companyId,
        params: this.$route.query.params,
        deviceName: this.searchModel.name,
        deviceId: this.searchModel.deviceId,
        sortBy: this.searchModel.sortBy,
        orderBy: this.searchModel.orderBy,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
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
