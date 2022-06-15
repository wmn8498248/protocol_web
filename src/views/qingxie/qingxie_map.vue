<template>
  <div class="themepage">
    <baidu-map
      class="bm-view"
      ak="tQI6fGZuKQFPqlQBQ9GM31IWlMv6trbG"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="7"
      @ready="handler"
    >
      <div v-for="(item, index) in markerData" :key="index">
        <bm-marker
          :position="item.wz"
          :icon="{
            url: require('@/assets/images/ico_qingxie.png'),
            size: { width: 64, height: 64 },
          }"
        >
          <bm-label
            :content="item.content"
            :labelStyle="bmlabel"
            :offset="{ width: 22 - (item.content.length - 1) * 6, height: 20 }"
          ></bm-label>
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>

<script>
import { BaiduMap, BmMarker, BmLabel } from "vue-baidu-map-v3";
import { mapStyle } from "@/assets/custom_map_config.js";
export default {
  components: {
    BaiduMap,
    BmMarker,
    BmLabel,
  },
  data() {
    return {
      bmlabel: {
        color: "white",
        fontSize: "24px",
        background: "none",
        border: "0",
        zIndex: "999",
      },
      markerData: [
        { wz: { lng: 112.638886, lat: 27.052889 }, content: "5" },
        { wz: { lng: 112.648886, lat: 27.052889 }, content: "10" },
        { wz: { lng: 112.678886, lat: 27.052889 }, content: "10" },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      let that = this;
      that.map = map;
      map.enableScrollWheelZoom();
      //使用3.0js版本set值
      map.setMapStyleV2(mapStyle);
    },
  },
};
</script>

<style scoped lang="scss">
.themepage {
  flex: 1;
  display: flex;
  .bm-view {
    width: 100%;
    height: 100%;
    .bmlabel {
      background: none !important;
    }
  }
}
</style>
