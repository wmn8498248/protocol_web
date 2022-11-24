<template>
  <div class="qingxiePage">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item label="">
          <el-input
            class="w180x"
            v-model="searchModel.name"
            type="text"
            placeholder="传感器别名"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select placeholder="传感器状态" @change="">
            <el-option> 11</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker type="datetime" placeholder="选择起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker type="datetime" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="传感器别名" width="180">
      </el-table-column>
      <!-- <el-table-column prop="name" label="状态" width="100"> </el-table-column> -->
      <el-table-column prop="name" label="水位值m" width="100">
      </el-table-column>
      <el-table-column prop="" label="信号强度(dBm)"> </el-table-column>
      <el-table-column prop="" label="电量(%)"> </el-table-column>
      <el-table-column prop="" label="当前温度(℃)"> </el-table-column>
      <el-table-column prop="" label="传感器地址"> </el-table-column>
      <el-table-column prop="" label="更新时间"> </el-table-column>
      <el-table-column label="操作" width="250">
        <router-link :to="'/ningxia/yingchuan/wendu_map'">
          <el-button class="btn-map" size="mini">地图</el-button>
        </router-link>
        <!-- <router-link :to="'/ningxia/yingchuan/wendu_detail'">
          <el-button class="btn-detail" size="mini">详情</el-button>
        </router-link> -->
        <router-link :to="'/ningxia/yingchuan/shuiwei_data/'">
          <el-button class="btn-data" size="mini">查看数据</el-button>
        </router-link>
      </el-table-column>
    </el-table>
    <div class="pagination taR mt20x">
      <el-pagination
        @size-change=""
        @current-change=""
        :current-page="pages.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchModel: { name: "" },
      baseList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    };
  },
  created() {},
  mounted() {},
  methods: {},
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
