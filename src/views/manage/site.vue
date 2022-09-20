<template>
  <div class="sitePage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网关管理" name="1">
        <div class="search-container">
          <el-form inline label-width="100px" :model="searchModel">
            <el-form-item>
              <el-button @click="gatewayCreate" class="btn-search"
                >新增网关</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="序号" width="50">
            <template slot-scope="scope">
              {{ (pages.pageNum - 1) * pages.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="netId" label="网关Id"> </el-table-column>
          <el-table-column prop="netName" label="网关名称"> </el-table-column>
         
          <el-table-column prop="companyId" label="所属公司">
            <template slot-scope="scope">
              <el-tag type="success">{{
                companyMap[scope.row.companyId]
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="{ row }">
              <el-button @click="editSite(row.id)" class="btn-search"
                >修改</el-button
              >
              <el-button
                @click="deleteSite(row.id)"
                class="btn-clear"
                size="mini"
                style="height: 36px"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="pagination taR mt20x">
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
        </div> -->
      </el-tab-pane>
      <el-tab-pane label="公司管理" name="2">
        <div class="search-container">
          <el-form inline label-width="100px" :model="companySearch">
            <el-form-item>
              <el-button @click="addCompany" class="btn-search"
                >新增公司</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="companyList" stripe style="width: 100%">
          <el-table-column prop="date" label="序号">
            <template slot-scope="scope">
              {{
                (companyPages.pageNum - 1) * companyPages.pageSize +
                scope.$index +
                1
              }}
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="公司"> </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="{ row }">
              <el-button @click="editCompany(row.companyId)" class="btn-search"
                >修改</el-button
              >
              <el-button
                @click="deleteCompany(row.companyId)"
                class="btn-clear"
                size="mini"
                style="height: 36px"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="pagination taR mt20x">
          <el-pagination
            @size-change="onCompanySizeChange"
            @current-change="onCompanyCurrentChange"
            :current-page="companyPages.pageNum"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="companyPages.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="companyTotal"
          >
          </el-pagination>
        </div> -->
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      class="site-add"
      title=""
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div class="add-container">
        <el-form label-width="100px" :model="siteInfo">
          <el-form-item label="网关名称" required>
            <el-input
              type="text"
              placeholder=""
              v-model="siteInfo.netName"
            ></el-input>
          </el-form-item>
          <el-form-item label="网关Id" required>
            <el-input
              type="text"
              placeholder=""
              v-model="siteInfo.netId"
            ></el-input>
          </el-form-item>

          <el-form-item label="所属公司" required>
            <el-select
              v-model="siteInfo.companyId"
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

          <el-form-item>
            <el-button @click="saveSite()" class="btn-create">保存</el-button>
            <el-button @click="dialogVisible = false" class="btn-cancel"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      class="site-add"
      title=""
      :visible.sync="dialogVisible2"
      width="580px"
    >
      <div class="add-container">
        <el-form label-width="100px" :model="companyInfo">
          <el-form-item label="公司名称" required>
            <el-input
              type="text"
              placeholder=""
              v-model="companyInfo.companyName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="saveCompany()" class="btn-create"
              >保存</el-button
            >
            <el-button @click="dialogVisible2 = false" class="btn-cancel"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import areaPicker from "@/components/areaPicker/AreaPicker";
import * as api from "@/api/manage";
import Validator from "@/utils/validator";
export default {
  name: "Qingxie_detail",
  components: {
    areaPicker,
  },
  data: function () {
    return {
      companyMap: {},
      companyOptions: [],
      activeName: "1",
      value1: "",
      searchModel: {
        name: "",
        companyId: "",
      },
      companySearch: {
        name: "",
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      companyPages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      companyTotal: 0,
      companyList: [],
      companyListTotel: [],
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      siteInfo: {
        companyId: "",
        netId: "",
        netName: "",
      },
      companyInfo: {
        companyName: "",
      },
      editSiteFlag: false,
      editCompanyFlag: false,
    };
  },
  activated() {
    // 公司管理
    this.getCompanyListTotel();

    // 网关管理
    // this.getSiteList();

    // this.getSiteList();
    // this.getCompanyList();
  },
  methods: {
    async getuserRightsAll() {
      let data = {
        pageNum: 1,
        pageSize: 99999,
      };
      this.tableData = await api.companyList(data);
    },

    async gatewayCreate() {
      this.editSiteFlag = false;
      this.dialogVisible = true;
      this.siteInfo.netId = "";
      this.siteInfo.companyId = "";
      this.siteInfo.netName = "";
    },
    handleClick() {
      if (this.activeName == 1) {
        // 网关列表
        this.getCompanyListTotel();
      } else if (this.activeName == 2) {
        this.getSiteList();
      }
    },
    async getCompanyListTotel() {
      this.companyOptions = await api.projectList();
      if (this.companyOptions.length > 0) {
        this.companyOptions.forEach((element) => {
          this.companyMap[element.companyId] = element.companyName;
        });
      }
      this.getuserRightsAll();
    },
    // 获取公司列表
    async getCompanyList() {
      let data = {
        ...this.companyPages,
        ...this.companySearch,
      };

      let { companyList } = await api.companyList(data);

      this.companyList = companyList.records;

      this.companyTotal = companyList.total;
    },
    async getSiteList() {
      let data = {
        ...this.pages,
        ...this.searchModel,
      };
      this.companyList = await api.projectList(data);
      // this.total = companyList.total;
    },
    async editSite(id) {
      this.editSiteFlag = true;
      this.dialogVisible = true;

       this.siteInfo.companyId = "";
      this.siteInfo.netId = "";
      this.siteInfo.netName = "";

      await this.getuserRightsAll();
      let data = {
        id: id,
      };
      this.siteInfo = await api.projectInfo(data);
    },
    async editCompany(companyId) {
      this.editCompanyFlag = true;
      this.dialogVisible2 = true;
      // this.siteInfo.con
      this.companyInfo.companyName = ""

      let data = {
        companyId,
      };
      this.companyInfo = await api.companyInfo(data);
    },
    chooseArea(data) {
      this.siteInfo["provinceCode"] = data.area.provinceId;
      this.siteInfo["cityCode"] = data.area.cityId;
      this.siteInfo["areaCode"] = data.area.districtId;
      this.siteInfo["provinceName"] = data.area.province;
      this.siteInfo["cityName"] = data.area.city;
      this.siteInfo["areaName"] = data.area.district;
    },
    async saveSite() {
      let validator = new Validator();

      validator.add(this.siteInfo.netId, ["isNonEmpty", "网关id"]);
      validator.add(this.siteInfo.netName, ["isNonEmpty", "网关名称"]);
      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
        return;
      }

      if (this.editSiteFlag) {
        await api.projectUpdate(this.siteInfo);
      } else {
        await api.projectSave(this.siteInfo);
      }
      this.$message.success("保存成功");
      this.dialogVisible = false;
      this.getCompanyListTotel();
    },
    async saveCompany() {
      let validator = new Validator();
      validator.add(this.companyInfo.companyName, [
        "isNonEmpty",
        "公司名称不能为空",
      ]);

      let msg = validator.start();
      if (msg) {
        this.$message.warning(msg);
        return;
      }
      let data = {
        companyId: this.companyInfo.companyId,
        companyName: this.companyInfo.companyName,
      };

      if (this.editCompanyFlag) {
        await api.companyUpdate(data);
      } else {
        await api.companySave(data);
      }
      this.$message.success("保存成功");
      this.dialogVisible2 = false;
      this.getSiteList();
      // this.getCompanyList();
    },
    deleteSite(id) {
      this.$confirm("确定删除该网关?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            id,
          };
          await api.projectDelete(data);
          this.$message.success("删除成功");
          this.getCompanyListTotel();
        })
        .catch(() => {});
    },
    deleteCompany(companyId) {
      this.$confirm("确定删除该公司?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = {
            companyId,
          };
          await api.companyDelete(data);
          this.$message.success("删除成功");

          this.getSiteList();
        })
        .catch(() => {});
    },
    // 站点列表条数
    onPageSizeChange(e) {
      this.pages.pageSize = e;
      this.getCompanyListTotel();
    },
    // 站点列表页数
    onPageCurrentChange(e) {
      this.pages.pageNum = e;
      this.getCompanyListTotel();
    },
    // 公司列表条数
    onCompanySizeChange(e) {
      this.companyPages.pageSize = e;
      this.getCompanyList();
    },
    // 公司列表页数
    onCompanyCurrentChange(e) {
      this.companyPages.pageNum = e;
      this.getCompanyList();
    },
    // 新增公司
    addCompany() {
      this.editCompanyFlag = false;
      this.companyInfo = {
        companyName: "",
      };
      this.dialogVisible2 = true;
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
  >>> .el-dialog {
    background: #141e46;
  }
  .areaInput {
    >>> .el-select {
      width: 200px;
    }
    >>> .el-input {
      width: 200px;
    }
    >>> .el-input__inner {
      width: 200px;
    }
  }
}
</style>
