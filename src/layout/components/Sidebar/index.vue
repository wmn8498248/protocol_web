<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText" 
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in authRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },

  computed: {
    ...mapGetters(["authRoutes", "sidebar"]),
    activeMenu() { 
      const route = this.$route;
      const { meta, path } = route;
      // 如果设置了路径，左侧高亮的菜单就是你设置的
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    routers() {
      return this.$router.options.routes;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  }
};
</script>
