<!--文章列表-->
<template>
  <div class="qaList">
    <div
      v-for="(item, index) in qaList"
      :key="index"
      class="qa-item"
      @click="readFn(item)"
    >
      <img :src="item.img" alt="" />
      <div>
        <div class="qa-title mle">{{ item.title }}</div>
        <div class="qa-overview mle">{{ item.overview }}</div>
      </div>
    </div>
    <div class="load-more">
      <!--  <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>-->
    </div>
  </div>
</template>

<script>
import { getLegalIssuesAndStates } from "@/api/qa.js";

export default {
  props: ["type"],
  data() {
    return {
      qaList: [1, 2, 2],
      pageNum: 1,
      pageSize: 12,
      total: 0,
    };
  },
  mounted() {
    console.log(21212);
    this.getLegalIssuesAndStatesFn();
  },
  watch: {
    type(newVal, old) {
      this.getLegalIssuesAndStatesFn();
    },
  },
  methods: {
    getLegalIssuesAndStatesFn() {
      getLegalIssuesAndStates({
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        legalIssues:
          this.$route.name === "states" ? this.type : this.$route.params.issue,
        states:
          this.$route.name === "states" ? this.$route.params.issue : this.type,
      }).then((res) => {
        // console.log(res)
        this.qaList = res.data.lawyerArticleTypeDTOList;
        this.total = res.data.count;
      });
    },
    handleCurrentChange(num) {
      this.pageNum = num;
      // this.getPetList(this.isSelectObj)
    },
    readFn(item) {
      console.log(item);
      this.$emit("readFn", item);
    },
  },
};
</script>

<style scoped lang="less">
.qaList {
  .qa-item {
    width: 100%;
    display: flex;
    margin: 30px 0;
    text-align: left;
    cursor: pointer;

    &:hover .qa-title {
      text-decoration: underline 1px var(--txt_color);
    }

    img {
      width: 120px;
      margin-right: 20px;
    }

    .qa-title {
      font-size: 22px;
      color: var(--txt_color);
      margin: 10px 0;
    }

    .qa-overview {
      font-size: 16px;
      color: #666666;
      margin-top: 10px;
    }
  }
}
@media screen and (max-width: 800px) {
  .qaList .qa-item {
    img {
      width: 100px;
    }
    .qa-title {
      font-size: 18px;
    }
    .qa-overview {
      font-size: 14px;
    }
  }
}
</style>
