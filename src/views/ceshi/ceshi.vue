<template>
  <div id="app">
    <v-chart class="my-chart" :options="line" />
  </div>
</template>
<script>
// import "echarts/lib/chart/bar";
import * as echarts from "echarts/lib/echarts";
export default {
  name: "App",
  data: function () {
    return {
      line: {
        tooltip: {},
        legend: {
          data: ["销量", "销量2"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "销量2",
            type: "line",
            data: [5, 33, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
};
</script>
<style>
.my-chart {
  width: 800px;
  height: 500px;
}
</style>

