<template>
  <div class="work">
    <el-radio-group v-model="lang" style="margin-bottom:20px">
      <el-radio-button label="zh">{{$t('zh')}}</el-radio-button>
      <el-radio-button label="en">{{ $t('en')}}</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
import { fetchWorks } from "@/api/work";
export default {
  data() {
    return {
      lang: "zh",
      limit: 10,
      index: 1
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
        index: this.index
      };
    }
  },
  methods: {
    fetchList() {
      fetchWorks({ filter: this.filter }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>