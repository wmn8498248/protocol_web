<template>
  <div class="qingxieDetailPage">
    <div class="pageHead">传感器详情</div>
    <ul class="pageDetail">
      <li>
        <div class="li-name">传感器类型</div>
        <div class="li-content">倾斜传感器</div>
      </li>
      <li>
        <div class="li-name">传感器编号</div>
        <div class="li-content">{{}}</div>
      </li>
      <li>
        <div class="li-name">传感器别名</div>
        <div class="li-content">{{}}</div>
      </li>
      <li>
        <div class="li-name">绑定站点</div>
        <div class="li-content">{{}}</div>
      </li>
      <li>
        <div class="li-name">传感器地址</div>
        <div class="li-content">{{}}</div>
      </li>
      <li>
        <div class="li-name">传感器经度(°)</div>
        <div class="li-content">{{}}</div>
      </li>
      <li>
        <div class="li-name">传感器纬度(°)</div>
        <div class="li-content">{{}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Qingxie_detail",
  data: function () {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.qingxieDetailPage {
  background: #10153b;
  margin: 20px;
  width: 100%;
  .pageHead {
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid rgba(20, 225, 250, 0.2);
    color: #14e1fa;
    font-weight: 400;
    padding-left: 7px;
  }
  .pageDetail {
    list-style: none;
    font-size: 14px;
    li {
      line-height: 14px;
      display: flex;
      margin: 23px 0;
      .li-name {
        color: #14e1fa;
        width: 70px;
        margin-right: 20px;
        text-align: right;
      }
      .li-content {
        color: #ffffff;
      }
    }
  }
}
</style>

