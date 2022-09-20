<template>
  <div class="sitePage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="账号管理" name="1">
        <div class="search-container">
          <el-form inline label-width="100px" :model="searchModel">
            <el-form-item>
              <el-input
                type="text"
                placeholder="账号"
                v-model="searchModel.name"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-input
                type="text"
                placeholder="公司名称"
                v-model="searchModel.companyName"
              ></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button @click="getUserList" class="btn-search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="序号" width="180">
            <template slot-scope="scope">
              {{ (pages.pageNum - 1) * pages.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="userName" label="账号"> </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="{ row }">
              <el-button @click="editUser(row.userId)" class="btn-create"
                >编辑</el-button
              >
              <el-button
                @click="deleteUser(row.userId)"
                class="btn-clear"
                size="mini"
                style="height: 36px"
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
      </el-tab-pane>
      <el-tab-pane label="新增账号" name="2">
        <div class="add-container">
          <el-form label-width="140px" :model="userInfo">
            <el-form-item label="账号类别"> 管理员 </el-form-item>
            <el-form-item label="姓名" required>
              <el-input type="text" v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="账号/手机号" required>
              <el-input type="text" v-model="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input type="text" v-model="userInfo.passWord"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所属站点" required>
              <el-tree :data="data" show-checkbox node-key="id"> </el-tree>
            </el-form-item> -->
            <el-form-item>
              <el-button @click="saveUser" class="btn-create">保存</el-button>
              <el-button @click="activeName = '1'" class="btn-cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import * as api from "@/api/manage";
import Validator from "@/utils/validator";
export default {
  name: "Manager",
  data: function () {
    return {
      activeName: "1",
      searchModel: {
        companyName: "",
        name: "",
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
      userInfo: {
        status: 1,
        role: [],
      },
    };
  },
	activated() {
		this.getUserList();
	},

  methods: {
    async getUserList() {
      let data = {
				status: 1, //1是管理员，0是员工
        ...this.pages,
        ...this.searchModel,
      };
      let { page } = await api.userList(data);
      this.tableData = page.records;
      this.total = page.total;
    },
    async editUser(userId) {
			this.$router.push({
				path: `/manage/manager-edit`,
				query: {
					userId
				}
			});
    },
    async saveUser() {
      let validator = new Validator();
      validator.add(this.userInfo.name, ["isNonEmpty", "姓名不能为空"]);
      validator.add(this.userInfo.userName, [
        "isNonEmpty",
        "账号/手机号不能为空",
      ]);
      validator.add(this.userInfo.passWord, ["isNonEmpty", "密码不能为空"]);

      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      }else {
				await api.userSave(this.userInfo);
				this.$message.success("保存成功");
				this.getUserList();
				this.activeName = "1";
			}
    },
		// 修改列表条数
		onPageSizeChange(e) {
			this.pages.pageSize = e;
			this.getUserList();
		},
		// 修改列表页数
		onPageCurrentChange(e) {
			this.pages.pageNum = e;
			this.getUserList();
		},
		// 删除管理员
		deleteUser(userId) {
			this.$confirm('确定删除该账号?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				let data = {
				  userId: userId,
				};
				await api.userDelete(data);
				this.$message.success("删除成功");
				this.getUserList();
			}).catch(() => {
				
			});
		}
  },
};
</script>
<style lang="scss" scoped>
.sitePage {
  margin: 20px;
  width: 100%;
  position: relative;
  .search-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  >>> .add-container {
    .el-form-item__label {
      color: #14e1fa;
    }
    .el-input__inner {
      border-radius: 4px;
      width: 400px;
    }
  }
  >>> .el-tabs__nav-wrap::after {
    background-color: rgba(20, 225, 250, 0.2);
    height: 1px;
  }
  >>> .el-tabs__item {
    height: 56px;
    line-height: 56px;
    color: rgba(20, 225, 250, 0.5);
  }
  >>> .el-tabs__item.is-active {
    color: #14e1fa;
  }
  >>> .el-tabs__nav {
    margin: 0 20px;
  }
  .data-top {
    display: flex;
    font-size: 20px;
    line-height: 14px;
    color: #ffffff;
    padding: 20px;
    align-items: center;
    .data-image {
      margin-right: 20px;
    }
    .status {
      font-size: 14px;
      color: #14e1fa;
      margin-top: 15px;
      .status-icon {
        width: 8px;
        height: 8px;
        background: #14e1fa;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
  .data-detail {
    display: flex;
    padding: 0 20px;
  }
  .data-chart {
    background-image: url(../../assets/images/qingxieBG.png);
    background-size: cover;
    width: 400px;
    height: 400px;
    text-align: center;
    color: #ffffff;
    line-height: 38px;
    margin-right: 20px;
    .chart-img {
      width: 150px;
      height: 150px;
      margin-top: 67px;
    }
  }
  .data-table {
    color: #ffffff;
    font-size: 14px;
    width: calc(100% - 420px);
    .table-item {
      display: flex;
      height: 47px;
      line-height: 47px;
      padding: 0 20px;
      &:nth-child(odd) {
        background: rgba(0, 5, 30, 1);
      }
      &:nth-child(even) {
        background: rgba(0, 5, 30, 0.5);
      }
      .item-name {
        width: 100px;
      }
    }
  }
  .history-content {
    background: #00051e;
    width: 100%;
    min-height: 100%;
    >>> .el-table th.is-leaf {
      height: 40px;
    }
  }
  .history-chart {
    width: 100%;
    background: #10153b;
  }
  .history-total {
    height: 45px;
    line-height: 45px;
    background: #23325a;
    font-size: 14px;
    color: #ffffff;
    padding: 0 20px;
    margin-top: 10px;
    span {
      margin-right: 30px;
    }
    .total-name {
      color: #14e1fa;
    }
  }
}
</style>

