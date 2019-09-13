<template>
  <div class="work">
    <el-radio-group v-model="lang" style="margin-bottom:20px;width:100%">
      <el-radio-button label="zh">{{$t('zh')}}</el-radio-button>
      <el-radio-button label="en">{{ $t('en')}}</el-radio-button>
    </el-radio-group>
    <el-button @click="handleCreate" class="createBtn">{{ $t('create')}}</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="title" :label="$t('title')"></el-table-column>
      <el-table-column prop="subtitle" :label="$t('subtitle')"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <img :src="baseUrl +  scope.row.cover" class="avatar_thumbnail" />
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row.id)" type="text" size="small">{{ $t('detail') }}</el-button>
          <el-button type="text" @click="handleEdit(scope.row)" size="small">{{ $t('edit') }}</el-button>
          <el-button type="text" @click="handleRemove(scope.row.id)" size="small">{{ $t('remove') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item prop="title" :label="$t('title')">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item prop="subtitle" :label="$t('subtitle')">
          <el-input v-model="form.subtitle" />
        </el-form-item>
        <el-form-item prop="picture">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange"
            :show-file-list="false"
            :http-request="handleFile"
          >
            <img v-if="form.cover" :src="baseUrl +form.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">{{ $t('file_tip')}}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="save('form')">{{ $t('confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchWorkCount,
  fetchWorks,
  createWork,
  updateWork,
  deleteWork
} from "@/api/work";
import { uploadFile } from "@/utils/tools";
export default {
  data() {
    return {
      lang: "zh",
      limit: 10,
      skip: 0,
      list: [],
      total: 0,
      file: "",
      baseUrl: process.env.VUE_APP_BASE_API,
      isUpdate: false,
      form: { title: "", subtitle: "", cover: "" },
      emptyForm: { title: "", subtitle: "" },
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: this.$t("title") + this.$t("NotEmpty") }
        ],
        subtitle: [
          { required: true, message: this.$t("subtitle") + this.$t("NotEmpty") }
        ]
      }
    };
  },
  mounted() {
    this.fetchList();
  },
  computed: {
    filter() {
      return {
        where: { lang: this.lang },
        limit: this.limit,
        skip: this.skip
      };
    }
  },
  methods: {
    // upload
    handleChange(file, fileList) {
      this.file = file.raw;
    },
    handleFile() {
      uploadFile(this.file).then(res => {
        this.form.cover = res.path;
      });
    },
    fetchList() {
      fetchWorkCount({ where: this.filter.where }).then(res => {
        this.total = res.count;
      });
      fetchWorks({ filter: this.filter }).then(res => {
        this.list = res;
      });
    },
    handleCreate() {
      this.isUpdate = false;
      this.form = { ...this.emptyForm };
      this.dialogVisible = true;
    },
    save(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.isUpdate) {
            createWork({ ...this.form, lang: this.lang }).then(res => {
              this.dialogVisible = false;
              this.fetchList();
            });
          } else {
            updateWork(this.form.id, {
              title: this.form.title,
              subtitle: this.form.subtitle,
              cover: this.form.cover,
              lang: this.lang
            }).then(res => {
              this.dialogVisible = false;
              this.fetchList();
            });
          }
        } else {
          console.log("not valid");
          return false;
        }
      });
    },
    handleDetail(workId) {
      this.$router.push("works/" + workId + "/files");
    },
    handleEdit(work) {
      this.form = { ...work };
      this.isUpdate = true;
      this.dialogVisible = true;
    },
    handleRemove(workId) {
      this.$confirm(this.$t("confirm_to_delete"), this.$t("tips"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      })
        .then(() => {
          deleteWork(workId).then(res => {
            this.fetchList();
            this.$message({
              type: "success",
              message: this.$t("delete_success")
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("delete_cancel")
          });
        });
    }
  },
  watch: {
    lang(val) {
      this.fetchList();
    }
  }
};
</script>
<style scoped>
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