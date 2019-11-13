<template>
  <div class="about">
    <el-radio-group v-model="lang" style="margin-bottom:20px">
      <el-radio-button label="zh">{{$t('zh')}}</el-radio-button>
      <el-radio-button label="en">{{ $t('en')}}</el-radio-button>
    </el-radio-group>
    <el-form
      ref="aboutsForm"
      label-position="right"
      label-width="100px"
      :model="form"
      :rules="rules"
    >
      <el-form-item :label="$t('title')" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('picture')" prop="picture">
        <el-upload
          class="avatar-uploader"
          action
          :on-change="handleChange"
          :show-file-list="false"
          :http-request="handleFile"
        >
          <img v-if="form.picture" :src="form.picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">{{ $t('about_up_pic_tip')}}</div>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('description')" prop="description">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item :label="$t('subtitle1')" prop="subtitle1">
        <el-input v-model="form.subtitle1"></el-input>
      </el-form-item>
      <el-form-item :label="$t('subtitle2')" prop="subtitle2">
        <el-input v-model="form.subtitle2"></el-input>
      </el-form-item>
      <el-form-item :label="$t('subtitle3')" prop="subtitle3">
        <el-input v-model="form.subtitle3"></el-input>
      </el-form-item>
      <el-form-item :label="$t('midtitle')" prop="midtitle">
        <el-input v-model="form.midtitle"></el-input>
      </el-form-item>
      <el-form-item :label="$t('middescription')" prop="middescription">
        <el-input v-model="form.middescription"></el-input>
      </el-form-item>
      <el-form-item :label="$t('collapse1title')" prop="collapse1title">
        <el-input v-model="form.collapse1title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('collapse1description')" prop="collapse1description">
        <el-input v-model="form.collapse1description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('collapse2title')" prop="collapse2title">
        <el-input v-model="form.collapse2title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('collapse2description')" prop="collapse2description">
        <el-input v-model="form.collapse2description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('collapse3title')" prop="collapse3title">
        <el-input v-model="form.collapse3title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('collapse3description')" prop="collapse3description">
        <el-input v-model="form.collapse3description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="reset()">{{ $t('reset') }}</el-button>
      <el-button type="primary" @click="save('aboutsForm')">{{ $t('confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { fetchAboutus, updateAboutus } from "@/api/aboutus";
import { uploadFile } from "@/utils/tools";
export default {
  data() {
    return {
      lang: "zh",
      form: {},
      file: "",
      rules: {
        title: [
          {
            required: true,
            message: this.$t("title") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        picture: [
          {
            required: true,
            message: this.$t("picture") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: this.$t("description") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        subtitle1: [
          {
            required: true,
            message: this.$t("subtitle1") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        subtitle2: [
          {
            required: true,
            message: this.$t("subtitle2") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        subtitle3: [
          {
            required: true,
            message: this.$t("subtitle3") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        midtitle: [
          {
            required: true,
            message: this.$t("midtitle") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        middescription: [
          {
            required: true,
            message: this.$t("middescription") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        collapse1title: [
          {
            required: true,
            message: this.$t("collapse1title") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        collapse2title: [
          {
            required: true,
            message: this.$t("collapse2title") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        titlcollapse3titlee: [
          {
            required: true,
            message: this.$t("collapse3title") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        collapse1description: [
          {
            required: true,
            message: this.$t("collapse1description") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        collapse2description: [
          {
            required: true,
            message: this.$t("collapse2description") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ],
        collapse3description: [
          {
            required: true,
            message: this.$t("collapse3description") + this.$t("notEmpty"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchAboutus();
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateAboutus({ ...this.form, lang: this.lang }).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: this.$t("success")
            });
            this.fetchAboutus();
          });
        } else {
          return false;
        }
      });
    },
    fetchAboutus() {
      fetchAboutus(this.lang).then(res => {
        this.form = { ...res };
      });
    },
    handleChange(file, fileList) {
      this.file = file.raw;
    },
    handleFile() {
      uploadFile(this.file).then(res => {
        this.form.picture = res.url;
      });
    }
  },
  watch: {
    lang(val) {
      this.fetchAboutus();
    }
  }
};
</script>
<style scoped>
.about {
  width: 80%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload {
  border: dashed 1px;
}
</style>