<template>
  <div id="newMessage">
    <div>
      <div class="newMessage-container">
        <div class="News">
          <div class="new-con">
            <div class="new-con-lists">
              <features
                name=""
                :title="
                  $t(
                    `breadcrumb.${this.$route.params.type.replace(
                      /-/g,
                      ' '
                    )}.title`
                  )
                "
                bottompx="40px"
              >
                <template v-slot:one>
                  <newmessage
                    :newsList="newMessageList.newsList"
                    :read="true"
                    @newMessage="newMessage"
                  ></newmessage>
                </template>
              </features>
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
          <message-aside
            :li-list="liList"
            :liChoose="this.$route.params.name"
            :msg-list="msgList"
            @liActive="liActive"
          ></message-aside>
          <message-aside
            class="min800"
            :li-list="liList"
            @liActive="liActive"
          ></message-aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { newMessageList } from "./js/index";
import { getPetArticleList } from "@/libs/utils";
import { petArticleType, getArticle } from "@/api/index";
import Newmessage from "../../components/moudle/newmessage.vue";
import features from "../../components/features/features.vue";
import messageAside from "comps/messageAside/messageAside.vue";
import SvgIcon from "comps/SvgIcon/index.vue";

export default {
  components: {
    SvgIcon,
    features,
    Newmessage,
    messageAside,
  },
  data() {
    return {
      select: "最新动态",
      msg: "",
      newMessageList,
      newsUrl: "news",
      liActiveItem: { label: "" },
      liList: [
        {
          name: "All",
          label: "Pro Bono Services",
          num: 100,
        },
        {
          name: "All",
          label: "Unemployment Benefits",
          num: 100,
        },
        {
          name: "All",
          label: "Retaining a Lawyer",
          num: 100,
        },
        {
          name: "All",
          label: "ACLU",
          num: 100,
        },
        {
          name: "All",
          label: "Types of Lawyers",
          num: 100,
        },
      ],
      msgList: [
        {
          img: "",
          title: "10 Most Popular Dog Breeds in 2024",
        },
        {
          img: "",
          title: "10 Most Popular Dog Breeds in 2024",
        },
      ],
      pageNo: 1,
      pageSize: 12,
      total: 0,
    };
  },
  watch: {
    $route(to, from) {
      this.newsUrl = to.name;
    },
  },
  async mounted() {
    this.newsUrl = this.$route.name;
    this.getArticleFn();
    // this.petArticleTypeFn()
    this.msgList = await getPetArticleList();
  },
  methods: {
    // petArticleTypeFn () {
    //   petArticleType().then(res => {
    //     this.liList = res.data
    //     this.getArticleFn()
    //   })
    // },
    getArticleFn() {
      getArticle({
        label:
          this.$route.params.type === "ALL"
            ? null
            : this.$route.params.type.replace(/-/g, " "),
        type: 2,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then((res) => {
        this.newMessageList.newsList = res.data.lawyerArticleTypeDTOList;
        // this.total = res.data.count
      });
    },
    handleCurrentChange(num) {
      this.pageNo = num;
      this.getArticleFn();
    },
    searchMsg() {
      this.getArticleFn();
    },
    liActive(item) {
      this.liActiveItem = item;

      this.$router.push({
        path: "/post/category/" + item.label.replace(/ /g, "-"),
      });
      // this.getArticleFn()
    },

    newMessage(item) {
      // console.log(item)
      this.$router.push({
        // name: 'newsContent',
        path: `/news/content/${item.uid}`,
        // query: { newsId: item.id }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#newMessage {
  width: 100%;
  background: #ffffff;

  .newMessage-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .min800 {
    display: none;
    margin-bottom: 20px;
  }

  .News {
    width: 100%;
    max-width: 1280px;
    display: flex;
    padding: 40px 0;

    .new-con {
      flex: 1;

      .new-con-lists {
        margin-bottom: 20px;
      }
    }
    .aside[data-v-31936c22] {
      margin-left: 40px;
      margin-right: 0px;
    }
  }

  .title {
    //height: 428px;
    background: url("../../assets/image/newMessage/bg.png") 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 0;
    // font-family: "PingFang SC";
    font-size: 48px;
    font-weight: 400;
    color: #2d3033;
    box-sizing: border-box;

    span {
      font-size: 16px;
      display: inline-block;
    }
  }

  @media screen and (max-width: 1500px) {
    .News {
      padding: 40px 15px;
    }
  }
}
</style>
<style lang="less">
#newMessage {
  @media screen and (max-width: 800px) {
    .News {
      flex-direction: column;
      .aside[data-v-31936c22] {
        margin-left: 0px !important;
        margin-right: 0px !important;
      }
      .min800 {
        display: none;
        margin-top: 0 !important;

        .aside-div {
          margin-bottom: 10px !important;
        }

        .aside-filter {
          h1 {
            font-size: 20px;
            margin-bottom: 10px;
          }

          ul {
            li {
              font-size: 14px;
              line-height: 18px;
            }
          }
        }
      }

      .title {
        font-size: 20px;
        margin-bottom: 20px !important;
      }
    }
  }

  ul {
    grid-gap: 15px !important;
  }

  .el-input-group__append,
  .el-input-group__prepend {
    font-size: 16px;
    color: #ffffff;
    background-color: #3269ff;
  }

  .el-input-group {
    line-height: normal;
    display: inline-table;
    width: 41%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 40px;
  }
}
</style>
