<template>
  <div>
    <el-button @click="handleCreate" class="createBtn">{{ $t('add')}}</el-button>
    <div class="block" v-for="file in list" :key="file.fileId">
      <span class="title">{{ file.description}}</span>
      <el-avatar shape="square" :size="100" fit="fit" :src="file.path"></el-avatar>
    </div>
  </div>
</template>
<script>
import { fetchWorkFiles, fetchWorkFilesCount } from "@/api/work";
export default {
  data() {
    return {
      workId: this.$route.params.id,
      list: [],
      total: 0,
      limit: 20,
      skip: 0
    };
  },
  computed: {
    filter() {
      return {
        where: { workId: this.workId },
        limit: this.limit,
        skip: this.skip
      };
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      fetchWorkFilesCount({ where: this.filter.where }).then(res => {
        this.total = res.count;
      });
      fetchWorkFiles({ filter: this.filter }).then(res => {
        this.list = res;
      });
    },
    handleCreate() {
      //
    }
  }
};
</script>