<template>
  <div style="padding: 0 15px" @click="toggleClick">
    <svg
      t="1611646190441"
      :class="{ 'is-active': isActive }"
      class="hamburger icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6883"
      width="64"
      height="64"
    >
      <path
        d="M395.636364 477.090909h512a34.909091 34.909091 0 1 1 0 69.818182H395.636364a34.909091 34.909091 0 1 1 0-69.818182zM128 162.909091a34.909091 34.909091 0 1 1 0-69.818182h791.272727a34.909091 34.909091 0 1 1 0 69.818182h-791.272727z m791.272727 698.181818a34.909091 34.909091 0 1 1 0 69.818182h-791.272727a34.909091 34.909091 0 1 1 0-69.818182h791.272727zM294.562909 357.073455v309.829818L93.090909 512l201.472-154.926545z"
        fill="#ffffff"
        p-id="6884"
      ></path>
    </svg>
    <!-- <svg
      :class="{ 'is-active': isActive }"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg> -->
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    },
  },
};
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  color: #fff;
  transform: rotate(180deg);
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
