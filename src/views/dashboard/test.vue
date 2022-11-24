<template>
  <div class="switch-home">
    <div class="switch-home-mid">
      <div class="header"><span>远程、蓝牙远程控制开关传感器主页图</span></div>
      <div class="switch-content">
        <div class="switch-box" v-for="item in 10">
          <div class="box-info">
            <div class="item">
              <svg-icon icon-class="sw-rq" style="font-size: 20px"></svg-icon
              >2022年11月5日 08:50
            </div>
            <div class="item">
              <svg-icon icon-class="sw-wd" style="font-size: 20px"></svg-icon
              >温度： 1000℃
            </div>
            <div class="item">
              <svg-icon icon-class="sw-sd" style="font-size: 20px"></svg-icon
              >湿度： 10%RH
            </div>
            <div class="item">
              <svg-icon icon-class="sw-dl" style="font-size: 20px"></svg-icon
              >电流： 12kA
            </div>
            <div class="box-btn">
              <span class="status">
                <svg-icon
                  icon-class="sw-kg"
                  style="font-size: 35px"
                ></svg-icon> </span
              ><span
                ><svg-icon
                  icon-class="sw-kg"
                  style="font-size: 35px"
                ></svg-icon></span
              ><span
                ><svg-icon icon-class="sw-kg" style="font-size: 35px"></svg-icon
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/onoff";

export default {
  name: "test",
  data() {
    return {
      data() {
        return {
          count: 0,
        };
      },
    };
  },
  created() {},
  methods: {
    getList(){

    },
    load() {
      this.count += 2;
    },
  },
};
</script>
<style lang="scss" scoped>
.switch-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 90px);
  .header {
    text-align: center;
    font-size: 24px;
    span {
      display: inline-block;
      background-image: linear-gradient(#213d6c, #213d6c, #213d6c);
      background-color: #213d6c;
      padding: 20px 40px;
      box-shadow: 0 0 4px #213d6c;
      border-radius: 5px;
    }
  }
  .switch-content {
    padding: 20px;
    display: flex;
    justify-content: space-between; //两边布局
    flex-wrap: wrap; //换行
    .switch-box {
      width: 20%;
      .box-info {
        text-align: center;
        margin: 10px;
        background-color: #213d6c;
        padding: 10px 0;
        border-radius: 5px;
        .item {
          line-height: 30px;
          border-bottom: 1px solid #333333;
          svg {
            margin-right: 5px;
          }
        }
      }
      .box-btn {
        span {
          display: inline-block;
          background-color: #ffffff;
          // border: 1px solid #ffffff;
          border-radius: 50%;
          margin: 5px;
          cursor: pointer;
          padding: 5px;
          color: #ff3300;
        }
        span.status {
          animation: twinkling 1s infinite ease-in-out;
          animation-fill-mode: both;
          color: #00cc00;
        }
        span:hover {
          color: #00cc00;
          background-color: #1a2e53;
        }
        span.status:hover {
          color: #ff3300;
          animation: none;
        }
      }
    }
  }
  @keyframes twinkling {
    0% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.12);
    }
    100% {
      opacity: 0.2;
      transform: scale(1);
    }
  }
}
</style>
