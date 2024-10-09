<template>
  <div id="showList">
    <div class="livePlay">
      <div class="content">
        <el-breadcrumb>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          <!--      <el-breadcrumb-item>{{ state }}</el-breadcrumb-item>-->
        </el-breadcrumb>

        <div>
          <!--          Get answers from experienced lawyers-->
          <!--          Have questions about legal issues? Our answers come from attorneys selected to the Super Lawyers list. Each lawyer on the list is among the top 5% in their state and undergoes a rigorous process leading to selection.-->

          <!--          Easily find information-->
          <!--          We’ve brought both your legal questions and answers from premier attorneys together in one place. On this page, you will find multiple search options so you can read about the legal issues that matter to you. Start your research with the legal issue, state, recently answered, or common question options.-->
        </div>
        <div class="livePlay-title">
          <div class="before"></div>
          <div>{{ newsUrl }}</div>
        </div>
        <div class="showList-introduce">
          <div>Get answers from experienced lawyers</div>
          <p>
            Have questions about legal issues? Our answers come from attorneys
            selected to the Super Lawyers list. Each lawyer on the list is among
            the top 5% in their state and undergoes a rigorous process leading
            to selection.
          </p>

          <div>Easily find information</div>
          <p>
            We’ve brought both your legal questions and answers from premier
            attorneys together in one place. On this page, you will find
            multiple search options so you can read about the legal issues that
            matter to you. Start your research with the legal issue, state,
            recently answered, or common question options.
          </p>
        </div>
        <!--<div class="goToLink">
          <router-link to="/answers/legal-issue" tag="span"
            >Answers by legal issue ></router-link
          >
          <router-link to="/answers/state" tag="span">
            Answers by state ></router-link
          >
          <router-link to="" tag="span">
            Recently legal questions and answers ></router-link
          >
        </div>-->
        <div v-for="(item, index) in typeList" :key="index" class="typeList">
          <!--          {{item}}-->
          <div class="typeList-name">
            <router-link :to="item.path" tag="span">
              {{ item.name }} ></router-link
            >
          </div>

          <div
            class="typeList-lists grid-four"
            :class="item.name === 'Answers by state' ? 'typeList1' : ''"
          >
            <div
              v-for="(item1, index1) in item.list"
              :key="index1"
              @click="toType(item.path, item1)"
            >
              {{ item1 }}
            </div>
            <router-link :to="item.path" tag="div" class="typeList-lists-more"
              >view more ></router-link
            >
          </div>
        </div>
        <div class="typeList">
          <div class="typeList-name">Common Answer List</div>
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
    <message-aside
      :newsUrl="newsUrl"
      :msg-list="msgList"
      :isSelectObj="isSelectObj"
      @liActive="liActiveFn"
      @selectChange="selectChangeFn"
    ></message-aside>
  </div>
</template>

<script>
import messageAside from "comps/messageAside/messageAside.vue";
import { getPetArticleList } from "@/libs/utils";

import {
  getLawyerArticleType,
  getLegalIssuesAndStates,
  getLawyerRecommend,
} from "@/api/qa.js";
import QaList from "./qaList.vue";

export default {
  components: {
    QaList,
    messageAside,
  },
  data() {
    return {
      typeValue: "dog",
      num: "--",
      typeList: {
        legalIssues: {
          name: "Answers by legal issue",
          path: "/answers/legal-issue",
          list: [],
        },
        states: {
          name: "Answers by state",
          path: "/answers/state",
          list: [],
        },
      },
      msgList: [
        {
          img: require("../../assets/image/about/bg.png"),
          title: "10 Most Popular Dog Breeds in 2024",
        },
        {
          img: require("../../assets/image/about/bg.png"),
          title: "10 Most Popular Dog Breeds in 2024",
        },
      ],
      selectObj: {},
      isSelectObj: {},
      showList: [],
      answerList: [],
      pageNum: 1,
      pageSize: 12,
      total: "",
      search: "",
      newsUrl: "liveShow",
    };
  },
  watch: {
    $route(to, from) {
      this.newsUrl = to.name;
      // this.newsUrl === 'cat' ? this.getCat() : this.getDog()
      // this.getTypeFn()
    },
  },
  async mounted() {
    // this.typeValue = this.$route.name === 'By legal issue' ? 'legalIssues' : 'states'
    this.newsUrl = this.$route.name;
    this.msgList = await getPetArticleList();
    this.init();
  },
  methods: {
    init() {
      this.getTypeFn("legalIssues");
      this.getTypeFn("states");
      getLawyerRecommend().then((res) => {
        this.answerList = res.data;
      });
    },
    getTypeFn(msg) {
      getLawyerArticleType({ msg }).then((res) => {
        this.typeList[msg].list = res.data[msg].splice(0, 15);
      });
    },

    selectChangeFn(item) {
      this.pageNum = 1;
      this.showList = [];
      this.isSelectObj = item;
      this.getPetList(item);
    },

    liActiveFn(item) {
      console.log(item);
    },
    // 阅读文章
    readFn(item) {
      // console.log(item.uid,1222222222222222222222222222222222222)
      this.$router.push({
        path: `/answers/legal-issue/${item.label}/${item.uid}`,
        //   path: `/answers/legal-issue/${item.label}/${this.$route.params.issue}/${item.uid}`,
      });
    },
    // 跳转类型
    toType(path, type) {
      this.$router.push({ path: path + "/" + type });
    },
  },
};
</script>

<style lang="less" scoped>
#showList {
  width: 100%;
  //background-color: #eff3fa;
  max-width: 1280px;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  text-align: left;
  .aside[data-v-31936c22] {
    margin-left: 40px;
    margin-right: 0px;
  }
  .liveTitle {
    position: relative;
    width: 100%;

    .livePic {
      background-repeat: no-repeat;
      height: 500px;
      width: 100%;
      //background-image: url("../../assets/image/live/liveTitle.png");
      background-size: 100% 100%;
    }

    .liveInfo {
      display: flex;
      justify-content: center;
      width: 100%;
      top: 453px;
      //position: absolute;
      .live-middle {
        padding: 0 15px;
      }

      .live-middleBox {
        display: flex;
        justify-content: space-between;

        padding: 15px;
        background-color: #fff;
        text-align: left;
        box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
    }
  }

  .goToLink {
    font-size: 20px;
    margin-bottom: 20px;

    span {
      margin-right: 50px;
      color: var(--txt_color);
      cursor: pointer;

      &:hover {
        text-decoration: underline solid var(--txt_color);
      }
    }
  }

  .typeList {
    margin: 30px 0;

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

  .livePlay {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;

    .content {
      width: 100%;
    }
  }

  .livePlay-title {
    display: flex;
    height: 26px;
    align-items: center;
    text-align: left;
    margin: 30px 0;

    div {
      display: inline-block;
      height: 26px;
      line-height: 1.2;
      font-size: 22px;
      font-weight: bold;
      color: #000000;
    }

    .before {
      width: 6px;
      background: var(--txt_color);
      margin-right: 10px;
    }
  }

  .showList-introduce {
    div {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      line-height: 24px;
      color: #666666;
      margin-bottom: 20px;
    }
  }

  .livePlay-lists {
    .livePlay-list {
      width: 100%;
      box-sizing: border-box;

      .livePlayList-content {
        background: #ffffff;
        border-radius: 20px;
        box-sizing: border-box;
        box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.08);
        cursor: pointer;

        &:hover {
          box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.4);
        }

        //padding: 10px 20px;
        .livePlayList-img {
          height: 210px;
          //width: 100%;
          //background: ;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            border-radius: 20px 20px 0 0;
            object-fit: cover;
          }
        }

        .livePlayList-txt {
          padding: 20px;
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;

          .livePlayList-title {
            font-weight: bold;
            color: #0b1531;
            font-size: 20px;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow: ellipsis; /* 超出部分省略号 */
            word-break: break-all; /* break-all(允许在单词内换行。) */
            display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
            -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-line-clamp: 1; /* 显示的行数 */
            cursor: pointer;
          }

          span {
            font-size: 18px;
            line-height: 29px;
            color: #666666;
          }

          .livePlayList-span {
            display: flex;
            justify-content: center;
            align-items: center;

            div {
              cursor: pointer;
              background: #3269ff;
              border-radius: 10px;
              //border: 1px solid #3269ff;
              color: #fff;
              font-size: 14px;
              line-height: 26px;
              width: 70px;
              text-align: center;

              &:nth-child(1) {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }

  .load-more {
    width: 100%;
    margin-top: 10px;

    div {
      //width: 124px;
      //background: #3269ff;
      text-align: right;
      padding: 15px;
      font-size: 20px;
    }
  }
}

#showList {
  @media screen and (max-width: 1500px) {
    padding: 40px 15px;
  }
  @media screen and (max-width: 800px) {
    .aside[data-v-31936c22] {
      margin-left: 0px !important;
      margin-right: 0px;
    }
    .typeList .qaList .qa-item {
      width: 100%;
      float: none;
    }
    .typeList .qaList .qa-item:nth-of-type(even) {
      margin-left: 0%;
    }
    flex-direction: column;
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
  }
}
</style>
<style lang="less">
.el-timeline-item__node {
  position: absolute;
  background: #ffffff;

  border: 2px solid #3269ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-timeline-item__tail {
  position: absolute;
  left: 4px;
  height: 100%;
  border-left: 2px dashed #3269ff;
}
</style>
