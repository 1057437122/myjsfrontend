<template>
  <div class="file">
    <el-button @click="handleCreate" class="createBtn">{{ $t('create')}}</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="size" :label="$t('size')"></el-table-column>
      <el-table-column prop="description" :label="$t('description')"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <img :src="$baseUrl +  filterPicture( scope.row.path,'mid')" class="avatar_thumbnail" />
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)" size="small">{{ $t('edit') }}</el-button>
          <el-button type="text" @click="handleRemove(scope.row.id)" size="small">{{ $t('remove') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="limit"
      hide-on-single-page
      :total="total"
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item prop="size" :label="$t('size')">
          <el-input v-model="form.size" />
        </el-form-item>
        <el-form-item prop="description" :label="$t('description')">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item prop="picture">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange"
            :show-file-list="false"
            :http-request="handleFile"
          >
            <img v-if="form.path" :src="$baseUrl +form.path" class="avatar" />
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
  fetchFileCount,
  fetchFiles,
  createFile,
  updateFile,
  deleteFile
} from "@/api/file";
import { uploadFile, filterPicture } from "@/utils/tools";
export default {
  data() {
    return {
      limit: 20,
      skip: 0,
      list: [],
      currentPage: 0,
      total: 0,
      isUpdate: false,
      form: {},
      emptyForm: { size: "", description: "", path: "" },
      dialogVisible: false,
      rules: {},
      file: ""
    };
  },
  mounted() {
    this.fetchList();
  },
  computed: {
    filter() {
      return {
        where: {},
        limit: this.limit,
        skip: this.skip,
        order: "createTime DESC"
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
        this.form.path = res.path;
      });
    },
    handleCurrentChange() {
      this.skip = (this.currentPage - 1) * this.limit;
      this.fetchList();
    },
    fetchList() {
      fetchFileCount({ where: this.filter.where }).then(res => {
        this.total = res.count;
      });
      fetchFiles({ filter: this.filter }).then(res => {
        this.list = res;
      });
    },
    filterPicture(filePath, fileType) {
      return filterPicture(filePath, fileType);
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
            createFile({ ...this.form }).then(res => {
              this.dialogVisible = false;
              this.fetchList();
            });
          } else {
            updateFile(this.form.id, { ...this.form }).then(res => {
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
    handleDetail(fileId) {
      this.$router.push("files/" + fileId + "/details");
    },
    handleEdit(file) {
      this.form = { ...file };
      this.isUpdate = true;
      this.dialogVisible = true;
    },
    handleRemove(fileId) {
      this.$confirm(this.$t("confirm_to_delete"), this.$t("tips"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      })
        .then(() => {
          deleteFile(fileId).then(res => {
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