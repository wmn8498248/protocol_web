<template>
  <div class="profile">
    <!-- <img class="profile-img" src="../../../assets/images/pp_bg.png" alt="" /> -->
    <div class="profile-closed" @click="goBack">关闭</div>
    <!-- <div class="profile-con">
      <p class="title">公司简介</p>
      <p>
        上海XXXXXXXXXXXXXX平台物联网科技有限公司办公室地址位于中国国际经济、金融、贸易、航运中心，魔都上海，上海
        上海市浦东新区金海路2588号1幢A区3层，于2018年09月05日在浦东新区市场监督管理局注册成立，在公司发展壮大的3年里，我们始终为客户提供好的产品和技术支持、健全的售后服务，我公司主要经营从事物联网科技、智能科技、信息科技、网络科技、电力科技领域内的技术开发、技术咨询、技术服务、技术转让，电力设备、智能设备、自动化设备、电子设备及产品、通讯设备、仪器仪表的销售，计算机系统集成，电力建设工程施工，电力设备的安装及维修，从事货物及技术的进出口业务。【依法须经批准的项目，经相关部门批准后方可开展经营活动】，我们有好的产品和专业的销售和技术团队，我公司属于上海信息传输、计算机服务和软件业黄页行业，如果您对我公司的产品服务
      </p>
    </div> -->
  </div>
  <!-- <el-carousel :interval="4000" type="card" height="100vh">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel> -->
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$emit("selectCom");
      // this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  font-size: 14px;
  line-height: 40px;
  background-repeat: no-repeat;
  margin: auto;
  position: relative;
  padding-bottom: 100px;
  width: 100%;
  height: 100%;
  .profile-img {
    display: block;
    margin: auto;
    height: 100%;
    width: auto;
  }
  .profile-closed {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: brown;
    color: #fff;
    padding: 0 20px;
    cursor: pointer;
  }
  .profile-closed:hover {
    background-color: #150e29cc;
  }
  .profile-con {
    // width: 70%;
    width: 1200px;
    margin: auto;
    background-color: #ffffff;
    color: #333;
    padding: 20px 40px;
    text-indent: 2em;
    p.title {
      font-size: 24px;
      text-align: center;
    }
  }
}
@media screen and (max-width: 1366px) {
  .profile {
    // padding-top: 150px;
    .profile-con {
      width: 800px;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>