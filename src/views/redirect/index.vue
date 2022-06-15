<!-- 用于框架 刷新时使用的 -->
<script>
export default {
  created() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: '/' + path, query });
  },
  render: function (h) {
    return h(); // avoid warning message
  }
};
</script>
