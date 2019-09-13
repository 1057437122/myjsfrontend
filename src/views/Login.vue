<template>
  <div class="loginform">
    <label class="logintitle">{{ $t('login')}}</label>
    <el-form label-position="right" label-width="80px" :model="loginForm" width="300px">
      <el-form-item :label="$t('username')">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('password')">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">{{ $t('login')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "string",
        password: "string111"
      },
      redirect: undefined
    };
  },
  methods: {
    login() {
      console.log(process.env.VUE_APP_BASE_API);
      this.$store.dispatch("login", this.loginForm).then(() => {
        this.$router.push({
          path: this.redirect || "/",
          query: this.otherQuery
        });
      });
    }
  }
};
</script>
<style scoped>
.loginform {
  margin: 0 auto;
  width: 300px;
}
.logintitle {
  font-size: 20px;
  margin: 20px 0 20px;
}
</style>