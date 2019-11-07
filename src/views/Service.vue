<template>
  <div class="service">
    <el-radio-group v-model="lang" style="margin-bottom:20px">
      <el-radio-button label="zh">{{$t('zh')}}</el-radio-button>
      <el-radio-button label="en">{{ $t('en')}}</el-radio-button>
    </el-radio-group>
    <el-form
      ref="serviceForm"
      label-position="right"
      label-width="150px"
      :model="form"
      :rules="rules"
    >
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('title')" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service1title')">
        <el-input v-model="form.service1title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service1description')">
        <el-input v-model="form.service1description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service1picture')">
        <el-upload
          class="avatar-uploader"
          action
          :on-change="handleChange"
          :show-file-list="false"
          :http-request="()=>{handleServiceFile(1)}"
        >
          <img v-if="form.service1picture" :src="$baseUrl +form.service1picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">{{ $t('file_tip')}}</div>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('service2title')">
        <el-input v-model="form.service2title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service2description')">
        <el-input v-model="form.service2description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service2picture')">
        <el-upload
          class="avatar-uploader"
          action
          :on-change="handleChange"
          :show-file-list="false"
          :http-request="()=>{handleServiceFile(2)}"
        >
          <img v-if="form.service2picture" :src="$baseUrl +form.service2picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">{{ $t('file_tip')}}</div>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('service3title')">
        <el-input v-model="form.service3title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service3description')">
        <el-input v-model="form.service3description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service3picture')">
        <el-upload
          class="avatar-uploader"
          action
          :on-change="handleChange"
          :show-file-list="false"
          :http-request="()=>{handleServiceFile(3)}"
        >
          <img v-if="form.service3picture" :src="$baseUrl +form.service3picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">{{ $t('file_tip')}}</div>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('service4title')">
        <el-input v-model="form.service4title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service4description')">
        <el-input v-model="form.service4description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('service4picture')">
        <el-upload
          class="avatar-uploader"
          action
          :on-change="handleChange"
          :show-file-list="false"
          :http-request="()=>{handleServiceFile(4)}"
        >
          <img v-if="form.service4picture" :src="$baseUrl +form.service4picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">{{ $t('file_tip')}}</div>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('pictures')">
        <el-upload
          class="avatar-uploader"
          action
          :http-request="handleFile"
          list-type="picture-card"
          :file-list="pictureList"
          :on-remove="handleFileList"
          :on-change="handleFileList"
        >
          <i slot="default" class="el-icon-plus" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="reset()">{{ $t('reset') }}</el-button>
      <el-button type="primary" @click="save('serviceForm')">{{ $t('confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { fetchService, updateService } from "@/api/service";
import { uploadFile } from "@/utils/tools";
export default {
  data() {
    return {
      lang: "zh",
      form: {},
      file: "",
      rules: {},
      file: "",
      pictureList: [],
      pictures: []
    };
  },
  mounted() {
    this.fetchService();
  },
  methods: {
    handleChange(file, fileList) {
      this.file = file.raw;
    },
    async handleFile() {
      uploadFile(this.file).then(res => {
        this.pictureList.push({ url: res.url, path: res.path });
      });
    },
    async handleServiceFile(item) {
      const res = await uploadFile(this.file);
      this.form["service" + item + "picture"] = res.path;
    },
    handleFileList(file, fileList) {
      this.file = file.raw;
      if (file.uid) {
        this.pictureList = this.pictureList.filter(item => {
          if (item.uid !== file.uid) {
            return item;
          }
        });
      }
    },
    async save(formName) {
      const valid = this.$refs[formName].validate();
      if (valid) {
        this.form.pictures = JSON.stringify(
          this.pictureList.map(item => {
            return item.path;
          })
        );
        const res = await updateService({ ...this.form, lang: this.lang });
        this.$message({
          type: "success",
          message: this.$t("success")
        });
        this.fetchService();
      } else {
        return false;
      }
    },
    async fetchService() {
      const res = await fetchService(this.lang);
      this.form = { ...res };
      this.pictureList = [];
      this.pictureList = JSON.parse(this.form.pictures).map(item => {
        return { url: this.$baseUrl + item, path: item };
      });
    }
  },
  watch: {
    lang(val) {
      this.fetchService();
    }
  }
};
</script>
<style scoped>
.service {
  width: 80%;
}
.createBtn {
  float: right;
}
.avatar {
  width: 100px;
}
.avatar_thumbnail {
  width: 50px;
  height: 50px;
}
</style>