# 立信管理平台 2.0 后台

> 它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

目前版本为 `v4.0+` 基于 `vue-cli` 进行构建

## Build Setup

```bash


# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm config set registry https://registry.npm.taobao.org

```

浏览器访问 [http://localhost:9527](http://localhost:9527)

## 发布

```bash
#运行
npm run serve

# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
