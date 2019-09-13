<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <siderbar></siderbar>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <router-view />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Siderbar from "@/components/Siderbar";

export default {
  components: { Siderbar },
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    //
  },
  methods: {
    handleOpen() {
      //
    },
    handleClose() {
      //
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
