<template>
  <div id="newsContent">
    <div class="center">
      <div class="contentTxt">
        <!--        <div class="title">-->
        <!--          {{ newMessage?.title }}-->
        <!--        </div>-->
        <!--     -->
        <!--        &lt;!&ndash; <div class="summary" v-if="newMessage.summary">-->
        <!--        摘要-->
        <!--      </div> &ndash;&gt;-->
        <!--        <div-->
        <!--          class="lianjie"-->
        <!--        >-->
        <!--          {{ newMessage?.overview }}-->
        <!--        </div>-->
        <!--        <div-->
        <!--          class="vedio"-->
        <!--        >-->
        <!--          <img :src="newMessage?.img" alt="" srcset="">-->
        <!--        </div>-->
        <div class="simg"><img :src="newMessage.img" alt="" /></div>
        <div class="sconcent" v-html="newMessage?.text" />
        <!--            {{ newMessage.text }}-->
      </div>
      <div class="typeList">
        <div class="typeList-name">Other Lawyer On {{ Iisue }}</div>
        <div class="qaList">
          <div
            v-for="(item, index) in answerList"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIdPetArticle, getSameType } from "@/api/qa.js";

export default {
  name: "newsContent",
  data() {
    return {
      newsId: null,
      newMessage: {},
      msgList: [],
      petList: [
        {},
        {
          image: "",
          type: "功能上线",
          date: "2022-06-28",
          title: "集中式光伏发电功率预测图层正式上线",
          introduce:
            "弘象科技正式推出面向集中式光伏的全国高时空分辨让商业掌控天气，基于气象大数据平台和精准气象预报技术，为能源、应急、特种行业等降低天气因素带来的风险、提高运营管理效率，提供精细化、可定制的气象服务产品。",
          model: ["太阳能", "天气与环境"],
          url: "/news/content",
        },
      ],
      mouseindex: null,
      answerList: [],
      Iisue: "",
    };
  },
  async mounted() {
    this.newsId = this.$route.params.id;
    this.getPetArticleFn();
  },
  methods: {
    readFn(item) {
      this.$router.push({
        path: `/answers/legal-issue/${item.label}/${item.uid}`,
      });
    },
    getPetArticleFn() {
      this.Iisue = this.$route.params.issue;
      getIdPetArticle({ id: this.$route.params.id, type: "lawyer" }).then(
        (res) => {
          // console.log(res)
          this.newMessage = res.data;
        }
      );
      getSameType({ label: this.$route.params.issue }).then((res) => {
        // console.log(this.$route.params);
        console.log(res);
        this.answerList = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
#newsContent {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding-top: 20px;
  width: 100%;

  .center {
    text-align: left;
    width: 100%;
    max-width: 1300px;
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
      margin-bottom: 40px;

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

      .simg {
        // width: 100%;
        // height: 100%;
        > img {
          // width: 100%;
          //  height: 100%;
        }
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
  .typeList {
    margin: 20px 0;

    width: 100%;
    .typeList-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      cursor: pointer;
    }

    .typeList-lists {
      font-size: 18px;
      color: var(--txt_color);
      cursor: pointer;

      div {
        &:hover {
          text-decoration: underline solid var(--txt_color);
        }
      }

      .typeList-lists-more {
        font-weight: bold;
        font-size: 22px;
      }
    }

    .qaList {
      .qa-item {
        width: 48%;
        float: left;
        display: flex;
        margin: 30px 0;
        text-align: left;
        cursor: pointer;

        &:hover .qa-title {
          text-decoration: underline 1px var(--txt_color);
        }

        img {
          width: 115px;
          height: 145px;
          border-radius: 8px;
          margin-right: 20px;
        }

        .qa-title {
          font-size: 22px;
          color: var(--txt_color);
        }

        .qa-overview {
          font-size: 16px;
          color: #666666;
          margin-top: 10px;
        }
      }
      .qa-item:nth-of-type(even) {
        margin-left: 2%;
      }
    }
  }
}
</style>
<style lang="less">
@media screen and (max-width: 1000px) {
  .typeList .qaList .qa-item {
    width: 100% !important;
    float: none !important;
  }
  .typeList .qaList .qa-item:nth-of-type(even) {
    margin-left: 0% !important;
  }
  #newsContent {
    flex-direction: column-reverse;
    //padding: 40px 15px;
    //img{
    //  w
    //}
    h1 {
      font-size: 20px;
      line-height: 24px;
      margin: 15px 0;
    }
    h2 {
      font-size: 18px;
      margin: 10px 0;
    }
    p {
      font-size: 16px;
      line-height: 20px;
    }
    .el-breadcrumb {
      font-size: 16px;
      //line-height: 1.4;
    }
    .center {
      .contentTxt {
        .title {
          font-size: 24px;
          line-height: 30px;
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
.typeList .qaList .qa-item img[data-v-4514bbe6] {
  width: 140px;
}
.goToLink {
  span {
    display: block;
    margin-bottom: 5px;
  }
}

.typeList1 {
  grid-template-columns: 1fr 1fr !important;
}

//.grid-four{
//  grid-template-columns: 1fr 1fr !important;
//}
</style>
