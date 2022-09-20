<template>
  <div class="staffEditPage">
    <el-tabs>
      <el-tab-pane label="编辑员工账号">
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
                v-model="userInfo.companyList"
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
              <el-button @click="onCancel" class="btn-cancel">取消</el-button>
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
  name: "StaffEdit",
  data: function () {
    return {
      infoArray: [],
      companyOptions: [],
      userId: 0,
      companyId: "",
      projectId: [],
      companyList: [
        { label: "管理员", value: 0 },
        { label: "普通用户", value: 1 },
      ],
      siteList: [],
      userInfo: {
        companyIdList: [],
        companyListId: [],
        companyList: [],
        userId: null,
        userLevel: null,
        password: "",
        userName: "",
      },
    };
  },
  activated() {
    this.userId = +this.$route.query.userId || 0;
    this.getuserRightsAll();
  },
  methods: {
    async getuserRightsAll() {
      this.userInfo.companyIdList = [];
      this.userInfo.companyListId = [];
      this.userInfo.companyList = [];
      this.userInfo.userId = null;
      this.userInfo.userLevel = null;
      this.userInfo.password = "";
      this.userInfo.userName = "";
      this.companyOptions = await api.projectList();
      this.getDetail();

      // this.companyOptions.forEach(element => {
      //   this.infoArray[element.companyId] = element.companyName
      // });
    },
    async getDetail() {
      this.userInfo = await api.userInfo({
        userId: this.userId,
      });

      if (this.userInfo.companyList) {
        this.userInfo.companyList = this.userInfo.companyList.map((res) => {
          return res.companyId;
        });
      }
    },

    chooseCompany(item) {
      this.siteList = item.role;
      this.projectId = [];
    },

    async saveUser() {
      if (this.projectId.length > 0) {
        this.userInfo.role = this.projectId;
      }

      let validator = new Validator();

      validator.add(this.userInfo.userName, ["isNonEmpty", "用户名不能为空"]);
      validator.add(this.userInfo.password, ["isNonEmpty", "密码不能为空"]);
      validator.add(this.userInfo.userLevel, ["isNonEmpty", "请选择角色"]);

      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
      } else {
        // this.userInfo.companyList = this.userInfo.companyList.map(res=>{
        //   return { companyId: res, companyName:this.infoArray[res] }
        // })
        this.userInfo.companyIdList = this.userInfo.companyList;
        let dataInfo = {};
        dataInfo["password"] = this.userInfo.password;
        dataInfo["userName"] = this.userInfo.userName;
        dataInfo["userLevel"] = this.userInfo.userLevel;
        dataInfo["userId"] = this.userInfo.userId;
        dataInfo["companyIdList"] = this.userInfo.companyList;
        await api.userUpdate(dataInfo);
        this.$message.success("保存成功");
        this.onCancel();
      }
    },
    // 取消
    onCancel() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.staffEditPage {
  margin: 20px;
  width: 100%;
  position: relative;
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
