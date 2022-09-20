<template>
  <div class="bileiPage">
    <div class="search-container">
      <el-form inline :model="searchModel" label-width="100px">
        <el-form-item>
          <el-button @click="goToSet" class="btn-search">设置</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-input
            type="text"
            placeholder="板子编号"
            v-model="searchModel.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getSearch" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="boardId" label="板子编号"> </el-table-column>
			<el-table-column prop="name" label="传感器别名"> </el-table-column>
      <el-table-column prop="threePhase" label="三相"> </el-table-column>
      <el-table-column prop="areas" label="位置"> </el-table-column>
      <el-table-column prop="threePhase2" label="三相"> </el-table-column>
      <el-table-column prop="areas2" label="位置"> </el-table-column>
			<el-table-column prop="threePhase3" label="三相"> </el-table-column>
			<el-table-column prop="areas3" label="位置"> </el-table-column>
      <el-table-column prop="address" label="传感器地址"> </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{ row }">
          <el-button
            class="btn-detail"
            size="mini"
            @click="toEdit(row.deviceId)"
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
import * as api from "@/api/bilei";
export default {
  props: {
    companyId: Number,
    projectId: Number,
  },
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
  methods: {
    async getList() {
      let data = {
        companyId: this.companyId,
        projectId: this.projectId,
        ...this.searchModel,
        ...this.pages,
      };
      let { blqList } = await api.blqList(data);
      this.tableData = blqList.records;
			this.total = blqList.total;
    },
    async toEdit(deviceId) {
      this.$router.push({
        path: "/manage/bilei_edit",
        query: {
          deviceId,
          type: 'edit',
        },
      });
    },
    toDelete(deviceId) {
			this.$confirm('确定删除该设备?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				let data = {
				  deviceId,
				};
				await api.blqDelete(data);
				this.$message.success("删除成功");
				this.getList();
			}).catch(() => {
				
			});
    },
		// 去设置
		goToSet() {
			this.$router.push({
			  path: "/manage/bilei_set",
			});
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
		}
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
