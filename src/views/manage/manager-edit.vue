<template>
  <div class="managerEditPage">
    <el-tabs>
      <el-tab-pane label="编辑管理员账号">
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
						  <el-input type="password" v-model="userInfo.passWord" placeholder="******" show-password></el-input>
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
  name: "ManagerEdit",
  data: function () {
    return {
			userId: 0,
      userInfo: {
        status: 0,
        role: [],
      },
    };
  },
  mounted() {
		this.userId = +this.$route.query.userId || 0;
		this.getDetail();
  },
  methods: {
		async getDetail() {
			let { user } = await api.userInfo({
				userId: this.userId
			});
			this.userInfo = user;
		},
    async saveUser() {
			let validator = new Validator();
			validator.add(this.userInfo.name, ["isNonEmpty", "姓名不能为空"]);
			validator.add(this.userInfo.userName, [
			  "isNonEmpty",
			  "账号/手机号不能为空",
			]);
			// validator.add(this.userInfo.passWord, ["isNonEmpty", "密码不能为空"]);
			if(this.userInfo.passWord === '') {
				delete this.userInfo.passWord;
			}
			let msg = validator.start();
      
			if (msg) {
			  this.$message.warning(msg);
			}else {
				await api.userUpdate(this.userInfo);
				await this.$message.success("保存成功");
				this.onCancel();
			}
    },
		// 取消
		onCancel() {
			this.$router.go(-1);
		}
  },
};
</script>
<style lang="scss" scoped>
.managerEditPage {
  margin: 20px;
  width: 100%;
  position: relative;
  >>> .add-container {
    .el-form-item__label {
      color: #14e1fa;
    }
    .el-input {
      width: 400px;
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