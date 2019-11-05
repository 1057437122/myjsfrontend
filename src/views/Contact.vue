<template>
  <div class="contact">
    <el-radio-group v-model="lang" style="margin-bottom:20px">
      <el-radio-button label="zh">{{$t('zh')}}</el-radio-button>
      <el-radio-button label="en">{{ $t('en')}}</el-radio-button>
    </el-radio-group>
    <el-form
      ref="contactForm"
      label-position="right"
      label-width="100px"
      :model="form"
      :rules="rules"
    >
      <el-form-item :label="$t('email')" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('address')" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item :label="$t('phone')" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('contactTitle')" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('contactDesc')" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="reset()">{{ $t('reset') }}</el-button>
      <el-button type="primary" @click="save('contactForm')">{{ $t('confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { fetchContact, updateContact } from "@/api/contact";
export default {
  data() {
    return {
      lang: "zh",
      form: {},
      file: "",
      rules: {}
    };
  },
  mounted() {
    this.fetchContact();
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateContact({ ...this.form, lang: this.lang }).then(res => {
            this.$message({
              type: "success",
              message: this.$t("success")
            });
            this.fetchContact();
          });
        } else {
          return false;
        }
      });
    },
    fetchContact() {
      fetchContact(this.lang).then(res => {
        this.form = { ...res };
      });
    }
  },
  watch: {
    lang(val) {
      this.fetchContact();
    }
  }
};
</script>
<style scoped>
.contact {
  width: 80%;
}
</style>