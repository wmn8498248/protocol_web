<template>
  <div :class="{ 'inline-area-picker': inline }">
    <el-select
      class="mb10x"
      v-model="province"
      @change="changeProvince"
      :placeholder="provinceHolder"
      :disabled="disabled"
    >
      <el-option
        v-for="item in provinceList"
        :key="item.id"
        :label="item.name"
        :value="item.id + '-' + item.name"
      ></el-option>
    </el-select>
    <el-select
      class="mb10x"
      v-model="city"
      @change="changeCity"
      :placeholder="cityHolder"
      :disabled="disabled"
    >
      <el-option
        v-for="item in cityList"
        :key="item.id"
        :label="item.name"
        :value="item.id + '-' + item.name"
      ></el-option>
    </el-select>
    <el-select
      class="mb10x"
      v-model="district"
      @change="changeDistrict"
      :placeholder="districtHolder"
      :disabled="disabled"
    >
      <el-option
        v-for="item in districtList"
        :key="item.id"
        :label="item.name"
        :value="item.id + '-' + item.name"
      ></el-option>
    </el-select>
    <br />
  </div>
</template>

<script>
import { province } from "./utils/province";
import { city } from "./utils/city";
import { county } from "./utils/county";
export default {
  name: "AreaPicker",
  props: {
    provinceHolder: {
      type: String,
      default: "选择省",
    },
    cityHolder: {
      type: String,
      default: "选择市",
    },
    districtHolder: {
      type: String,
      default: "选择区",
    },
    area: {
      type: Object,
      default: function () {
        return {};
      },
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      provinceList: province,
      cityList: [],
      districtList: [],
      province: "",
      city: "",
      district: "",
      returnArea: {},
    };
  },
  watch: {
    area: function (newVal) {
      let areaLen = Object.values(newVal);
      if (areaLen.length > 0) {
        if (
          newVal.provinceId &&
          newVal.cityId &&
          newVal.districtId &&
          newVal.province &&
          newVal.city &&
          newVal.district
        ) {
          let provinceId = newVal.provinceId.toString().padEnd(12, "0");
          let cityId = newVal.cityId.toString().padEnd(12, "0");
          let districtId = newVal.districtId.toString().padEnd(12, "0");
          this.province = provinceId + "-" + newVal.province;
          this.city = cityId + "-" + newVal.city;
          this.district = districtId + "-" + newVal.district;
          this.cityList = city[provinceId];
          this.districtList = county[cityId];
        }
      }
    },
  },
  methods: {
    // 修改省
    changeProvince() {
      const key = this.province.split("-")[0];
      this.cityList = city[key];
      this.city = this.district = "";
    },
    // 修改市
    changeCity() {
      const key = this.city.split("-")[0];
      this.districtList = county[key];
      this.district = "";
    },
    // 修改区
    changeDistrict() {
      let area = {
        province: this.province.split("-")[1],
        city: this.city.split("-")[1],
        district: this.district.split("-")[1],
        provinceId: this.province.split("-")[0].slice(0, 6),
        cityId: this.city.split("-")[0].slice(0, 6),
        districtId: this.district.split("-")[0].slice(0, 6),
      };
      this.$emit("chosen", { area });
    },
  },
};
</script>

<style scoped lang="scss">
.inline-area-picker {
  display: flex;
  .el-select {
    margin-right: 10px;
    margin-bottom: 0;
  }
}
</style>