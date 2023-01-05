<template>
  <div class="sitePage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Cron表达式" name="1">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="序号" width="180">
            <template slot-scope="scope">
              {{ (pages.pageNum - 1) * pages.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="姓名"> </el-table-column>
          <el-table-column prop="companyList" label="所属公司">
            <template slot-scope="scope">
              <el-tag
                type="success"
                v-for="(item, index) in scope.row.companyList"
                :key="index"
                style="padding-right: 3px"
                >{{ item.companyName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="userLevel" label="角色">
            <template slot-scope="{ row }">
              <span v-if="row.userLevel == 0">管理员</span>
              <span v-if="row.userLevel == 1">普通用户</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="{ row }">
              <el-button @click="editUser(row.userId)" class="btn-create"
                >修改</el-button
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
      </el-tab-pane>
      <el-tab-pane label="新增Cron" name="2">
        <div class="add-container">
          <el-form label-width="140px" :model="userInfo">
            <el-form-item label="用户名" required>
              <el-input type="text" v-model="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input type="text" v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="所属公司" required>
              <el-select
                v-model="userInfo.companyIdList"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择公司"
              >
                <el-option
                  v-for="item in companyOptions"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属角色" required>
              <el-select placeholder="用户角色" v-model="userInfo.userLevel">
                <el-option
                  v-for="item in companyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button @click="saveUser" class="btn-create">保存</el-button>
              <el-button @click="activeName = '1'" class="btn-cancel"
                >取消</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import * as api from "@/api/onoff";
import Validator from "@/utils/validator";
export default {
  name: "Staff",
  data: function () {
    return {
      companyOptions: [],
      activeName: "1",
      value1: "",
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
      companyId: "",
      projectId: [],
      companyList: [
        { label: "管理员", value: 0 },
        { label: "普通用户", value: 1 },
      ],
      siteList: [],
      userInfo: {
        companyIdList: [],
        userName: "",
        password: "",
        userLevel: 1,
      },
    };
  },
  activated() {
    this.getUserList();
  },
  methods: {
    handleClick() {
      if (this.activeName == 1) {
        this.getUserList();
      } else if (this.activeName == 2) {
        this.getSiteList();
      }
    },
    async getSiteList() {
      this.companyOptions = await api.projectList();
    },
    changePassword() {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          await api.userUpdate(this.userInfo);

          await this.$message.success("保存成功");
        })
        .catch(() => {});
    },
    chooseCompany(item) {
      this.siteList = item.role;
    },
    async getUserList() {
      let data = {
        ...this.pages,
        ...this.searchModel,
        status: 0, //1是管理员，0是员工
      };
      let dataList = await api.cronList(data);
      this.tableData = dataList;
    },
    async editUser(userId) {
      this.$router.push({
        path: `/manage/staff-edit`,
        query: {
          userId,
        },
      });
    },
    async saveUser() {
      // this.userInfo.companyId = this.companyId.companyId;
      if (this.projectId.length > 0) {
        this.userInfo.role = this.projectId;
      }
      let validator = new Validator();
      validator.add(this.userInfo.userName, ["isNonEmpty", "用户名不能为空"]);

      validator.add(this.userInfo.password, ["isNonEmpty", "密码不能为空"]);
      validator.add(this.userInfo.userLevel, ["isNonEmpty", "请选择角色"]);

      // validator.add(this.siteInfo.address, ["isNonEmpty", "详细地址不能为空"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        await api.userSave(this.userInfo);
        this.$message.success("保存成功");
        this.getUserList();
        this.userInfo.userName = "";
        this.userInfo.password = "";
        this.userInfo.companyIdList = [];
        this.userInfo.userLevel = 1;
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
    // 删除员工
    deleteUser(userId) {
      this.$confirm("确定删除该账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            userId: userId,
          };
          await api.cronDelete(data);
          this.$message.success("删除成功");
          this.getUserList();
        })
        .catch(() => {});
    },
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
  >>> .el-tag.el-tag--info {
    background-color: #04314a;
    border-color: #04314a;
    color: #fff;
  }
  >>> .el-tag.el-tag--info .el-tag__close:hover,
  >>> .el-tag.el-tag--info .el-tag__close {
    color: #00051e;
    background-color: #14e1fa;
  }
}
</style>
