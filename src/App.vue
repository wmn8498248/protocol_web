<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
.pagination {
  display: flex;
  justify-content: center;
}

.search-container .el-input__inner {
  border-radius: 100px;
  height: 36px !important;
}
.el-table {
  background-color: #0a1132;
}
.el-table,
.el-table thead {
  color: #14e1fa;
}
.el-table tr {
  background-color: #0a1132;
}
.el-table td {
  border-bottom: 0px solid #dfe6ec;
}
.el-table__row--striped td {
  background: #10153b !important;
}

.el-table th.is-leaf {
  height: 85px;
  background: #10153b !important;
  border-bottom: 0px solid #dfe6ec;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #0a1132;
}
.el-table::before {
  content: "";
  position: absolute;
  background-color: #00051e;
  z-index: 1;
}
.el-input__inner {
  background: #00051e;
  color: #fff;
  border: 1px solid #14e1fa;
}
.el-form-item__content {
  color: #ffffff;
}
.el-pagination button:disabled {
  color: #c0c4cc;
  background-color: #00051e;
}

.el-pagination .btn-prev,.el-pagination .btn-next {
  color: #fff;
  background-color: #00051e;
}

.el-pager li {
  padding: 0 4px;
  background: #00051e;
}
.el-pagination__total {
  color: #fff;
}
.el-pagination__jump {
  color: #fff;
}
.el-tabs__nav-wrap::after {
  background-color: rgba(20, 225, 250, 0.2);
  height: 1px;
}
.el-tabs__item {
  height: 44px;
  line-height: 44px;
  color: rgba(20, 225, 250, 0.5);
}
.el-tabs__item.is-active {
  color: #14e1fa;
}
.el-tabs__nav {
  margin: 0 20px;
}
.el-tree {
  background: inherit;
  color: #fff;
}
.el-tree .is-current {
  color: #14e1fa;
}
.el-tree-node__content:hover {
  background-color: inherit;
}
.el-tree-node:focus > .el-tree-node__content {
  background-color: inherit;
}
.el-checkbox__inner {
  border: 1px solid #14e1fa;
  background-color: inherit;
}
.el-tree-node__expand-icon {
  color: #14e1fa;
}
</style>