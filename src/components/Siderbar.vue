<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
    <router-link to="/dashboard">
      <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span slot="title">{{ $t('dashboard') }}</span>
      </el-menu-item>
    </router-link>
    <router-link to="/aboutus">
      <el-menu-item>
        <i class="el-icon-s-check"></i>
        <span slot="title">{{ $t('aboutus') }}</span>
      </el-menu-item>
    </router-link>
    <router-link to="/files">
      <el-menu-item>
        <i class="el-icon-picture"></i>
        <span slot="title">{{ $t('file')}}</span>
      </el-menu-item>
    </router-link>
    <router-link to="/works">
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t('artwork')}}</span>
      </el-menu-item>
    </router-link>
    <router-link to="/contact">
      <el-menu-item>
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t('contact') }}</span>
      </el-menu-item>
    </router-link>
    <el-menu-item>
      <i class="el-icon-message"></i>
      <span slot="title">{{ $t('message') }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "Siderbar",
  data() {
    return {
      isCollapse: false
    };
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>