<template>
  <div id="newsContent">
    <div class="center">
      <!--      <div class="url">-->
      <!--        <span>当前位置：</span>-->
      <!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
      <!--          <el-breadcrumb-item :to="{ path: '/news' }">最新动态</el-breadcrumb-item>-->
      <!--          <el-breadcrumb-item>正文</el-breadcrumb-item>-->
      <!--        </el-breadcrumb>-->
      <!--      </div>-->
      <div class="contentTxt">
        <div class="title">
          {{ newMessage.title }}
        </div>
        <div class="info">
          <span class="auto"> {{ newMessage?.label }}</span>
          <span class="time" v-if="newMessage.publishedOn">
            {{ newMessage.publishedOn }}</span
          >
        </div>
        <!-- <div class="summary" v-if="newMessage.summary">
        摘要
      </div> -->
        <div class="lianjie" v-if="newMessage.overview">
          {{ newMessage.overview }}
        </div>
        <div class="vedio" v-if="newMessage.img">
          <img :src="newMessage.img" alt="" srcset="" />
        </div>
        <div :class="newMessage.smallPic ? 'smallPic' : ''">
          <div class="sconcent" ref="sconcent" v-html="newMessage.text">
            <!--            {{ newMessage.text }}-->
          </div>
        </div>
      </div>
    </div>
    <div>
      <message-aside :msg-list="msgList"></message-aside>
    </div>
  </div>
</template>

<script>
import newmessage from "../../components/moudle/newmessage.vue";
import UseProducts from "../../components/moudle/useProducts.vue";
import { getPetArticleList } from "@/libs/utils.js";
import { produceList } from "@/libs/common.js";
import { petArticle } from "@/api/index";

export default {
  components: {
    newmessage,

    UseProducts,
  },
  name: "newsContent",
  data() {
    return {
      newsId: null,
      newMessage: {},
      msgList: [],

      produceList,
      mouseindex: null,
    };
  },
  async mounted() {
    // console.log(this.$route)
    this.newsId = this.$route.params.id;
    this.getPetArticleFn();
    this.msgList = await getPetArticleList();
  },
  methods: {
    getPetArticleFn() {
      petArticle({ id: this.newsId }).then((res) => {
        // console.log(res)
        this.newMessage = res.data;
      });
    },

    getMeassageContent() {
      // this.newMessage = this.newMessageList[this.newsId]
    },
    mouseover(item, index) {
      fangdou(((this.mouseindex = index), (this.mouseName = item)), 1000);
    },
    mouseout(item, index) {
      fangdou(((this.mouseName = ""), (this.mouseindex = "")), 1000);
    },
  },
};
</script>

<style lang="less" scoped>
#newsContent {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding-top: 40px;
  // width: 100%;

  .center {
    text-align: left;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // min-width: 950px;
    font-size: 16px;
    color: #282938;

    .contentTxt {
      max-width: 900px;
      width: 100%;
    }

    .url {
      display: flex;
      width: 100%;
      font-size: 14px;
      line-height: 1;
      padding: 4px 0 24px 0;
      border-bottom: 1px solid #dddfe1;
    }

    .title {
      line-height: 60px;
      font-size: 44px;
      font-weight: 500;
    }

    .info {
      font-size: 14px;
      //margin-bottom: 40px;

      .auto {
        margin-right: 30px;
      }
    }

    // .summary {
    //   font-weight: bold;
    //   margin-bottom: 20px;
    // }
    .lianjie {
      // font-weight: bold;
      text-align: center;
      color: #5f6464;
      font-size: 20px;
      margin-bottom: 40px;
      font-style: italic;
    }

    .contentTxt {
      line-height: 40px;
      //white-space: pre-line;
      // white-space:pre
      .stitle {
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 32px;
      }

      .sconcent {
        // text-indent: 2em;
        margin-bottom: 32px;
      }

      .spicture {
        display: flex;
        justify-content: center;
      }

      img {
        width: 70%;
        margin-left: 15%;
        // margin-top: -18px;
        // margin-bottom: 32px;
      }

      .smallPic {
        img {
          width: 40%;
          margin-left: 30%;
        }
      }
    }

    .moretitle {
      font-weight: bold;
      margin: 20px 0;
    }

    .moreUrl {
      text-indent: 2em;
      margin-bottom: 30px;
      line-height: 36px;
    }

    .pic {
      width: 80%;
      max-width: 1280px;
      //height: 624px;
      background: #f7f7f7;
      border-radius: 0px 0px 0px 0px;
      margin-bottom: 70px;
    }

    .share {
      font-size: 14px;
      margin-bottom: 37px;
    }

    .professional {
      border-top: 1px solid #dddfe1;
      border-bottom: 1px solid #dddfe1;
      padding-top: 24px;

      .ztitle {
        font-size: 18px;
        font-weight: bold;
        color: #282938;
        margin-left: 6px;
        margin-bottom: 24px;
      }

      .zcontent {
        display: flex;
        justify-content: center;
        margin-bottom: 56px;

        .zpic {
          flex-shrink: 0;
          width: 140px;
          height: 140px;
          border-radius: 50% 50%;
          // background: #ededed;
          margin-right: 60px;
        }

        .ztxt {
          width: 848px;

          .zname {
            font-size: 20px;
            color: #3269ff;
            margin-bottom: 20px;
          }

          .zintroduce {
            font-size: 16px;
            line-height: 36px;
            overflow: hidden;
            text-overflow: ellipsis; /* 超出部分省略号 */
            word-break: break-all; /* break-all(允许在单词内换行。) */
            display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
            -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-line-clamp: 3; /* 显示的行数 */
          }
        }
      }
    }

    .sconcent {
      line-height: 1.5;
      font-size: 18px;

      p:not([class*="c-"]) {
        letter-spacing: -0.014em;
        margin-bottom: 1.3em;
        margin-top: 1.3em;
      }

      .article_content {
        ul {
          list-style: disc !important;

          li {
            list-style-type: disc !important;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  #newsContent {
    flex-direction: column;
    padding: 40px 15px;
    //img{
    //  w
    //}
    .title {
      font-size: 24px !important;
      line-height: 30px !important;
    }
    .lianjie {
      font-size: 16px !important;
      line-height: 24px !important;
      text-align: left !important;
    }
    .center {
      .sconcent {
        line-height: 1.4;
        section {
          h3 {
            font-size: 24px;
            line-height: 30px;
          }
        }
      }
    }
    .article_content {
      p {
        img {
          width: 100% !important;
        }
      }
    }
  }
}
</style>
<style lang="less">
#newsContent {
  h3 {
    font-size: 24px;
    margin: 10px 0;
  }
  h4 {
    font-size: 20px;
    margin: 6px 0;
  }
}
@media screen and (max-width: 1000px) {
  #newsContent {
    .center {
      .sconcent {
        line-height: 1.4;
        section {
          h3 {
            font-size: 20px;
            line-height: 30px;
            margin: 20px 0 16px;
          }
          p {
            font-size: 16px;
          }
          h4 {
            font-size: 16px;
            margin: 10px 0 8px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
</style>
