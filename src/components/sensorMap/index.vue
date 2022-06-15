<template>
  <baidu-map
    class="bm-view"
    :ak="ak"
    :center="{ lng: 116.404, lat: 39.915 }"
    :zoom="7"
    @ready="handler"
  >
    <div v-for="(item, index) in markerData" :key="index">
      <bm-marker
        :position="item.wz"
        :icon="{
          url: icon,
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
</template>

<script>
import { BaiduMap, BmMarker, BmLabel } from "vue-baidu-map-v3";
import { mapStyle } from "@/assets/custom_map_config.js";
export default {
	name: 'sensorMap',
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
			// ak: process.env.NODE_ENV == 'development' ? 'tQI6fGZuKQFPqlQBQ9GM31IWlMv6trbG' : 'DePmwUoUHReZe5WzESmDkjsKMvRWhReX'
			ak: process.env.NODE_ENV == 'development' ? 'gf9IhaD610BuNFpRlj99x26bbBMIAMZ3' : 'gf9IhaD610BuNFpRlj99x26bbBMIAMZ3'
    };
  },
  created(){
  },
	props: {
		markerData: {
			type: Array,
			default: () => {
				return [];
			}
		},
		icon: {
			type: String,
			default: ''
		}
	},
  methods: {
    handler({ BMap, map }) {
      this.map = map;
      map.enableScrollWheelZoom();
      //使用3.0js版本set值
      map.setMapStyleV2(mapStyle);
    },
  },
}
</script>

<style scoped lang="scss">
	.bm-view {
	  width: 100%;
	  height: 100%;
	  .bmlabel {
	    background: none !important;
	  }
	}
</style>