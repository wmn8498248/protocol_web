<template>
  <div class="themepage">
    <sensor-map :markerData="markerData" :icon="require('@/assets/images/shen-suo.png')"></sensor-map>
  </div>
</template>

<script>
import sensorMap from '@/components/sensorMap/index.vue'
export default {
	name: 'Shengsuo_map',
  components: {
    sensorMap
  },
  data() {
    return {
      markerData: [],
    };
  },
  activated() {
		let longitude = +this.$route.query.longitude || 0;
		let latitude = +this.$route.query.latitude || 0;
		this.markerData = [
			{ wz: { lng: longitude, lat: latitude }, content: "" },
		]
	},
  methods: {
		
  },
};
</script>

<style scoped lang="scss">
.themepage {
  flex: 1;
  display: flex;
  
}
</style>
