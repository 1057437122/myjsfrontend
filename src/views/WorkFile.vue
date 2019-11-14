<template>
  <div>
    <el-button @click="handleCreate" class="createBtn">{{ $t('add')}}</el-button>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="description" :label="$t('description')"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <img :src="$baseUrl +  scope.row.path" class="avatar_thumbnail" />
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
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
      <el-input
        :placeholder="$t('search_by_description')"
        v-model="fileDescription"
        @keyup.native.enter="handFilterFile"
      ></el-input>
      <el-table :data="fileList" style="width: 100%">
        <el-table-column prop="size" :label="$t('size')"></el-table-column>
        <el-table-column prop="description" :label="$t('description')"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <img :src="$baseUrl +  scope.row.path" class="avatar_thumbnail" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text" @click="handleAddFile(scope.row.id)" size="small">{{ $t('add') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="filePage"
        :page-size.sync="limit"
        hide-on-single-page
        :total="fileTotal"
        @current-change="handleFileCurrentChange"
      />
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchWorkFiles,
  fetchWorkFilesCount,
  createWorkFile,
  deleteWorkFile,
  fetchUnappendFile
} from "@/api/work";
import { fetchFiles, fetchFileCount } from "@/api/file";
export default {
  data() {
    return {
      workId: this.$route.params.id,
      list: [],
      total: 0,
      limit: 10,
      currentPage: 0,
      filePage: 0,
      skip: 0,
      fileList: [],
      fileTotal: 0,
      dialogVisible: false,
      fileDescription: ""
    };
  },
  computed: {
    filter() {
      return {
        limit: this.limit,
        skip: this.skip
      };
    },
    fileFilter() {
      return {
        where: { description: { like: "%" + this.fileDescription + "%" } },
        limit: this.limit,
        skip: this.skip
      };
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    handleCurrentChange() {
      this.skip = (this.currentPage - 1) * this.limit;
      this.fetchList();
    },
    handleFileCurrentChange() {
      this.skip = (this.filePage - 1) * this.limit;
      this.fetchFiles();
    },
    fetchList() {
      fetchWorkFiles(this.workId, { filter: this.filter }).then(res => {
        this.total = res.total;
        this.list = res.data.map(item => {
          const pathArr = item.path.split(".");
          item.path = pathArr[0] + "-mid." + pathArr[1];
          return item;
        });
      });
    },
    handFilterFile() {
      this.fetchFiles();
    },
    fetchFiles() {
      fetchUnappendFile(this.workId, { filter: this.fileFilter }).then(res => {
        this.fileList = res.data.map(item => {
          const pathArr = item.path.split(".");
          item.path = pathArr[0] + "-mid." + pathArr[1];
          return item;
        });
        this.fileTotal = res.total;
      });
    },
    handleCreate() {
      this.dialogVisible = true;
      this.fileDescription = "";
      this.fetchFiles();
    },
    handleAddFile(id) {
      createWorkFile({ workId: this.workId, fileId: id }).then(res => {
        this.$message({
          type: "success",
          message: this.$t("success")
        });
        this.fetchList();
        this.fetchFiles();
      });
    },
    handleRemove(id) {
      deleteWorkFile(this.workId, id).then(res => {
        this.fetchList();
        this.$message({
          type: "success",
          message: this.$t("success")
        });
      });
    }
  }
};
</script>
<style scoped>
.avatar_thumbnail {
  width: 50px;
  height: 50px;
}
</style>