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
        <el-form-item>
          <el-button @click="getData" class="btn-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="deviceName" label="设备别名">
      </el-table-column>
      <!-- <el-table-column label="状态">
				<template slot-scope="{ row }">
				  <div :class="['qiya_status', `qiya_status_${row.status || 0}`]">
						<div class="qiya_status_icon"></div>
						<div class="qiya_status_title">{{row.statusName || '--'}}</div>
					</div>
				</template>
			</el-table-column> -->
      <el-table-column label="动作次数">
				<template slot-scope="{ row }">
				  A: {{row.anum || '--'}}, B: {{row.bnum || '--'}}, C: {{row.cnum || '--'}}, 
				</template>
      </el-table-column>
      <el-table-column prop="devType" label="设备类型"> </el-table-column>
      <el-table-column prop="address" label="传感器地址"> </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{ row }">
      		<el-button class="btn-map" size="mini" @click="goToMap(row.longitude, row.latitude)">地图</el-button>
          <el-button class="btn-data" size="mini" @click="goToDetail(row.deviceNumber, row.companyId, row.projectId)">查看数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination taR mt20x">
      <el-pagination
        @size-change="onPageSizeChange"
        @current-change="onPageCurrentChange"
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
import * as api from "@/api/jishu";
export default {
	name: 'Jishu',
  data() {
    return {
      searchModel: { name: "" },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
			companyId: 0,
			projectId: 0
    };
  },
  mounted() {
  	this.projectId = this.$route.meta.standId || 0;
  	this.companyId = this.$route.meta.companyId || 0;
  	this.getData();
  },
  beforeDestroy() {
  	clearTimeout(this.timer);
  },
  methods: {
		async getData() {
			clearTimeout(this.timer);
			let { pageInfo, total } = await api.countingNewList({
				companyId: this.companyId,
				projectId: this.projectId,
				...this.searchModel,
				...this.pages
			});
			this.total = total;
			this.tableData = pageInfo;
			this.timer = setTimeout(() => {
				this.getData();
			}, 30000);
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
			  path: `${this.$route.path}_data`,
			  query: {
			    deviceNumber, companyId, projectId
			  },
			});
		},
		// 查看地图
		goToMap(longitude, latitude) {
			this.$router.push({
			  path: `${this.$route.path}_map`,
			  query: {
			    longitude, latitude
			  },
			});
		}
	},
};
</script>

<style lang="scss" scoped>
.qingxiePage {
  width: 100%;
  padding: 20px;
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
  .el-table,
  >>> .el-table thead {
    color: #14e1fa;
  }
  >>> .el-table tr {
    background-color: #0a1132;
  }
  >>> .el-table td {
    border-bottom: 0px solid #dfe6ec;
  }
  >>> .el-table__row--striped td {
    background: #10153b !important;
  }

  >>> .el-table th.is-leaf {
    height: 85px;
    background: #10153b !important;
    border-bottom: 0px solid #dfe6ec;
  }
  >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #0a1132;
  }
  >>> .el-table::before {
    content: "";
    position: absolute;
    background-color: #00051e;
    z-index: 1;
  }
  >>> .el-input__inner {
    background: #00051e;
    color: #fff;
  }
  >>> .el-pagination button:disabled {
    color: #c0c4cc;
    background-color: #00051e;
  }
  >>> .el-pager li {
    padding: 0 4px;
    background: #00051e;
  }
  >>> .el-input__inner {
    border: 1px solid #14e1fa;
  }
  >>> .el-pagination__total {
    color: #fff;
  }
  >>> .el-pagination__jump {
    color: #fff;
  }
}
</style>
