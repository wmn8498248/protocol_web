<template>
  <div class="sensorPage">
    <div class="menu">
      <!-- <el-tag size="small" type="success" >公司列表</el-tag> -->
      <el-radio-group v-model="projectId" size="small" @change="groupChange">
        <el-radio-button
          width="100px"
          v-for="item in companyList"
          :key="item.companyId"
          :label="item.companyId"
          >{{ item.companyName }}</el-radio-button
        >
      </el-radio-group>
    </div>

    <div class="content" v-if="companyList.length > 0">
      <el-tabs v-model="activeName">
        <el-tab-pane label="SF6气体压力传感器" name="4" >
          <qiya :companyId="companyId" :projectId="projectId" ref="qiya"></qiya>
        </el-tab-pane>

        <el-tab-pane label="温控器" name="7">
          <wenkong
            :companyId="companyId"
            :projectId="projectId"
            ref="wenkong"
          ></wenkong>
        </el-tab-pane>

        <el-tab-pane label="无线温度传感器" name="9">
          <wengan
            :companyId="companyId"
            :projectId="projectId"
            ref="wengan"
          ></wengan>
        </el-tab-pane>

        <el-tab-pane label="无线伸缩节传感器" name="11">
          <shengsuo
            :companyId="companyId"
            :projectId="projectId"
            ref="shengsuo"
          ></shengsuo>
        </el-tab-pane>
        <el-tab-pane label="无线形变传感器" name="12" :lazy="true">
          <bianxing
            :companyId="companyId"
            :projectId="projectId"
            ref="bianxing"
          ></bianxing>
        </el-tab-pane>
        <el-tab-pane label="温湿度传感器" name="10">
          <wenshi
            :companyId="companyId"
            :projectId="projectId"
            ref="wenshi"
          ></wenshi>
        </el-tab-pane>
        <el-tab-pane label="水浸传感器" name="5">
          <shuijin
            :companyId="companyId"
            :projectId="projectId"
            ref="shuijin"
          ></shuijin>
        </el-tab-pane>
        
        <el-tab-pane label="温度传感器" name="13">
          <wenduyg
            :companyId="companyId"
            :projectId="projectId"
            ref="wenduyg"
          ></wenduyg>
        </el-tab-pane>
        <el-tab-pane label="电流传感器" name="14">
          <dianliu
            :companyId="companyId"
            :projectId="projectId"
            ref="dianliu"
          ></dianliu>
        </el-tab-pane>

        <el-tab-pane label="避雷器" name="1" disabled>
          <bilei
            :companyId="companyId"
            :projectId="projectId"
            ref="bilei"
          ></bilei>
        </el-tab-pane>
        <el-tab-pane label="倾斜传感器" name="2" disabled>
          <qingxie
            :companyId="companyId"
            :projectId="projectId"
            ref="qingxie"
          ></qingxie>
        </el-tab-pane>
        <el-tab-pane label="温度电流传感器" name="3" disabled>
          <wendu
            :companyId="companyId"
            :projectId="projectId"
            ref="wendu"
          ></wendu>
        </el-tab-pane>

      
        <!-- <el-tab-pane label="水位传感器" name="6" disabled>
          <shuiwei
            :companyId="companyId"
            :projectId="projectId"
            ref="shuiwei"
          ></shuiwei>
        </el-tab-pane> -->

        <el-tab-pane label="断路器计数器" name="8" disabled>
          <jishu
            :companyId="companyId"
            :projectId="projectId"
            ref="jishu"
          ></jishu>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="export">
        <el-form inline label-width="100px">
          <el-form-item>
            <el-button @click="toAdd" class="btn-search">新增传感器</el-button>
          </el-form-item>
        </el-form>
      </div> -->
    </div>
  </div>
</template>
<script>
import * as api from "@/api/manage";
import bilei from "../bilei/bilei";
import qingxie from "../qingxie/qingxie";
import wendu from "../wendu/wendu";
import qiya from "../qiya/qiya";
import shuijin from "../shuijin/shuijin";
import shuiwei from "../shuiwei/shuiwei";
import wenkong from "../wenkong/wenkong";
import jishu from "../jishu/jishu";
import wengan from "../wengan/wengan";
import wenshi from "../wenshi/wenshi";
import shengsuo from "../shengsuo/shengsuo";
import bianxing from "../bianxing/bianxing";

import wenduyg from "../wenduyg/wendu";
import dianliu from "../dianliu/dianliu";

import Cookies from "js-cookie";

export default {
  name: "Sensor",
  components: {
    dianliu,
    wenduyg,
    bilei,
    qingxie,
    wendu,
    qiya,
    shuijin,
    shuiwei,
    wenkong,
    jishu,
    wengan,
    wenshi,
    shengsuo,
    bianxing,
  },
  data() {
    return {
      timer: null,
      companyListInit: [],
      companyList: [],
      props: {
        label: "name",
        children: "role",
      },
      activeName: Cookies.get("sensorTabA") || "4",
      searchModel: { name: "" },
      baseList: [],
      companyId: 0,
      projectId: null,
      searchKey: "",
    };
  },

  activated() {
    this.getuserRights();
  },
  methods: {
    groupChange(value) {
      console.log(value);
      Cookies.set("sensorTabB", value);
      this.getList();
    },
    async getuserRights() {
      this.companyList = await api.projectList();

      if (this.companyList.length > 0) {
        if (Cookies.get("sensorTabB")) {
          this.projectId = parseInt(Cookies.get("sensorTabB"));
        } else {
          this.projectId = this.companyList[0].companyId;
        }
      }

      this.$nextTick(() => {
        this.getList();
      });
    },
    childNodes(node) {
      let len = node.childNodes.length;
      if (len > 0) {
        node.isCurrent = false;
        node.expanded = true;
        node.childNodes[0].isCurrent = true;
        this.companyId = node.childNodes[0].data.companyId;
        this.projectId = node.childNodes[0].data.projectId;
      } else {
        this.companyId = node.data.companyId;
        this.projectId = node.data.projectId;
      }
      this.$nextTick(() => {
        this.getList();
      });
    },
    handleNodeClick(data) {
      let node = this.$refs.Tree.getNode(data);
      this.childNodes(node);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    getList() {
      console.log(this.activeName, "this.activeName");
      clearInterval(this.timer);
      // this.$store.commit('app/SET_SIZE', 1); 
      let that = this;
      switch (this.activeName) {
        case "1":
          that.$refs.bilei.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.bilei.getData();
          // }, 30000);
          break;
        case "2":
          that.$refs.qingxie.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.qingxie.getData();
          // }, 30000);
          break;
        case "3":
          that.$refs.wendu.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.wendu.getData();
          // }, 30000);
          break;
        case "4":
          that.$refs.qiya.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.qiya.getData();
          // }, 30000);
          break;
        case "5":
          that.$refs.shuijin.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.shuijin.getData();
          // }, 30000);
          break;
        case "6":
          that.$refs.shuiwei.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.shuiwei.getData();
          // }, 30000);
          break;
        case "7":
          that.$refs.wenkong.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.wenkong.getData();
          // }, 30000);
          break;
        case "8":
          that.$refs.jishu.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.jishu.getData();
          // }, 30000);
          break;
        case "9":
          that.$refs.wengan.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.wengan.getData();
          // }, 30000);
          break;
        case "10":
          that.$refs.wenshi.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.wenshi.getData();
          // }, 30000);
          break;
        case "11":
          that.$refs.shengsuo.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.shengsuo.getData();
          // }, 30000);
          break;
        case "12":
          that.$refs.bianxing.getData();
          // that.timer = setInterval(() => {
          //   that.$refs.bianxing.getData();
          // }, 30000);
          break;
        case "13":
          that.$refs.wenduyg.getData();
          break;
        case "14":
          console.log('获取电流')
          that.$refs.dianliu.getData();
          break;
        default:
          break;
      }
    },
    toAdd() {
      clearInterval(this.timer);
      let url = "";
      switch (this.activeName) {
        case "1":
          url = "/manage/bilei_edit";
          break;
        case "2":
          url = "/manage/qingxie_edit";
          break;
        case "3":
          url = "/manage/wendu_edit";
          break;
        case "4":
          url = "/manage/qiya_edit";
          break;
        case "5":
          url = "/manage/shuijin_edit";
          break;
        case "6":
          url = "/manage/shuiwei_edit";
          break;
        case "7":
          url = "/manage/wenkong_edit";
          break;
        case "8":
          url = "/manage/jishu_edit";
          break;
        case "9":
          url = "/manage/wengan_edit";
          break;
        case "10":
          url = "/manage/wenshi_edit";
          break;
        case "11":
          url = "/manage/shengsuo_edit";
          break;
        case "12":
          url = "/manage/bianxing_edit";
          break;

        case "13":
          url = "/manage/bianxing_edit";
          break;  
        default:
          break;
      }
      this.$router.push({
        path: url,
        query: {
          companyId: this.companyId,
          projectId: this.projectId,
          type: "add",
        },
      });
    },
    // 搜索公司站点
    onSearch() {
      if (this.searchKey === "") {
        this.companyList = this.companyListInit;
      } else {
        this.companyList = this.companyListInit.filter((item) => {
          return (
            item.name.indexOf(this.searchKey) != -1 ||
            item.role.some((ele) => {
              return ele.name.indexOf(this.searchKey) != -1;
            })
          );
        });
      }
    },
  },
  watch: {
    activeName: function (newVal) {
      Cookies.set("sensorTabA", newVal);
      if (newVal) {
        // this.$store.commit("app/SET_SIZE", 1);
        this.$nextTick(() => {
          this.getList();
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sensorPage {
  margin: 20px;
  width: 100%;
  position: relative;
  .project-list {
    display: flex;
    margin-top: 10px;
  }
  .menu {
    margin-bottom: 15px;
    text-align: center;
  }
  .project-name {
    display: inline-block;
    color: #14e1fa;
    border: 1px solid #14e1fa;
    line-height: 35px;
    padding: 0 10px;
    border-radius: 5px;
  }
  .content {
    width: 100%;
    >>> .el-tabs__nav-wrap {
      background: #141e46;
    }
    >>> .el-tabs__item {
      padding: 0 10px;
    }
    >>> .el-tabs__nav {
      margin: 0px;
      background: #141e46;
    }
    >>> .el-tabs__nav-wrap::after {
      height: 0px;
    }
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
  .export {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 0;
    // z-index: 99;
  }
  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: top;
    .search-total {
      font-size: 14px;
      color: #ffffff;
      position: relative;
      top: 10px;
      left: 20px;
      .total-num {
        color: #14e1fa;
      }
    }
  }
}
</style>
