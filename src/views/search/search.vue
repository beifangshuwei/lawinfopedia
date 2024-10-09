<template>
  <div id="search">
    <div class="search-box">
      <div
        class="search-list"
        v-for="item in queryList"
        :key="item.oid"
        @click="searchListFn(item)"
      >
        <div class="search-name">{{ item.name }}</div>
        <div class="search-about mle">{{ item.aboutThisOffice }}</div>
        <div class="search-address">{{ item.address }}</div>
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="pager"
        :total="total"
      >
      </el-pagination>
    </div>
    <message-aside :msg-list="msgList"></message-aside>
  </div>
</template>

<script>
import { getQuery } from "@/api/index";
import { getPetArticleList } from "@/libs/utils";

export default {
  data() {
    return {
      queryList: [],
      pageNo: 1,
      pageSize: 20,
      total: 0,
    };
  },
  async mounted() {
    this.msgList = await getPetArticleList();
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });

    getQuery({
      msg: this.$route.query.msg,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
    }).then((res) => {
      this.queryList = res.data.list;
      this.total = res.data.total;
      setTimeout(() => {
        loading.close();
      }, 1500);
      //loading.close();
    });
  },
  methods: {
    handleCurrentChange() {},
    searchListFn(item) {
      console.log(item);
      const type = item.categoryItem.replace(/\s+/g, "-");
      const area = item.area === "" ? "county" : item.area;
      this.$router.push({
        path: "/" + type + "/" + item.state + "/" + area + "/" + item.ly,
      });
    },
  },
};
</script>

<style scoped lang="less">
#search {
  @media screen and (max-width: 800px) {
    flex-direction: column;
    .aside[data-v-31936c22] {
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
  }
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 100%;

  .search-box {
    max-width: 800px;
  }

  .search-list {
    text-align: left;
    padding: 12px 0;
    cursor: pointer;

    .search-name {
      line-height: 26px;
      padding: 2px 0;
      font-size: 20px;
      color: var(--txt_color);
    }

    .search-about {
      font-size: 14px;
      line-height: 16px;
      color: #666666;
      margin: 5px 0;
    }

    .search-address {
      font-size: 15px;

      color: var(--txt_color);
    }

    &:hover {
      //font-weight: 600;
      .search-name {
        text-decoration: underline;
        font-weight: 600;
      }
    }
  }
}
</style>
