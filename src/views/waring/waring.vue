<template>
  <div class="qingxieDataPage">
    <el-tabs v-model="activeName">
      <!-- <el-tab-pane label="倾斜监测报警" name="qingxie">
				<qingxie ref="qingxie"></qingxie>
			</el-tab-pane>
      <el-tab-pane label="温度电流报警" name="wendu">
				<wendu ref="wendu"></wendu>
			</el-tab-pane> -->
      <el-tab-pane label="气压监测报警" name="qiya">
        <qiya ref="qiya"></qiya>
      </el-tab-pane>
      <!-- <el-tab-pane label="水浸监测报警" name="shuijin">
				<shuijin ref="shuijin"></shuijin>
			</el-tab-pane>
      <el-tab-pane label="水位监测报警" name="shuiwei">
				<shuiwei ref="shuiwei"></shuiwei>
			</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import qingxie from "./component/qingxie";
import wendu from "./component/wendu";
import qiya from "./component/qiya";
import shuijin from "./component/shuijin";
import shuiwei from "./component/shuiwei";
export default {
  name: "Waring",
  data() {
    return {
      activeName: "qiya",
      timer: null,
    };
  },
  components: {
    qingxie,
    wendu,
    qiya,
    shuijin,
    shuiwei,
  },
  watch: {
    activeName(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.getList();
        });
      }
    },
  },
  activated() {
    // this.getList();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      clearTimeout(this.timer);
      await this.$refs[this.activeName].getList();
      this.timer = setTimeout(() => {
        this.getList();
      }, 30000);
    },
  },
};
</script>
<style lang="scss" scoped>
.qingxieDataPage {
  // background: #10153b;
  margin: 20px;
  width: 100%;
}
</style>

