<template>
  <div id="showList">
    <div class="livePlay">
      <div class="content">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: `/answers` }"
            >Legal Q & A</el-breadcrumb-item
          >
          <el-breadcrumb-item :to="{ path: `/answers/${isTypeObj.type}` }">
            {{ isTypeObj.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="$route.params.issue"
            :to="{ path: `/answers/${isTypeObj.type}/${$route.params.issue}` }"
          >
            {{ $route.params.issue }}
          </el-breadcrumb-item>

          <!--          <el-breadcrumb-item v-if="$route.params.id">{{ $route.params.id }}</el-breadcrumb-item>-->
        </el-breadcrumb>
        <div v-if="!$route.params.issue">
          <div class="livePlay-title">
            <div class="before"></div>
            <div>{{ isTypeObj.name }}</div>
          </div>
          <div class="chooseList grid-three">
            <router-link
              v-for="(item, index) in typeList"
              :to="{ path: `${$route.fullPath}/${item}` }"
              :key="index"
              class="sle"
              tag="div"
              >{{ item }}
            </router-link>
          </div>
        </div>
        <div v-else-if="$route.params.issue && !$route.params.id">
          <div class="livePlay-title">
            <div class="before"></div>
            <div>{{ $route.params.issue }}</div>
          </div>
          <div class="chooseList grid-four">
            <div
              v-for="(item, index) in type2List"
              :key="index"
              class="sle"
              :class="type2Choose === item ? 'isChoose' : ''"
              @click="type2ChooseFn(item)"
            >
              {{ item }}
            </div>
          </div>
          <qa-list
            :type="type2Choose"
            :showPage="true"
            @readFn="readFn"
          ></qa-list>
        </div>
        <div v-else>
          <answerContent></answerContent>
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
import { getPetArticleList } from "@/libs/utils";

import messageAside from "comps/messageAside/messageAside.vue";

import { getType, queryPet } from "@/api/index";
import {
  getLawyerArticleType,
  getLegalIssuesAndStates,
  getLawyerState,
} from "@/api/qa.js";
import QaList from "./qaList.vue";
import answerContent from "./answerContent.vue";

export default {
  components: {
    QaList,
    answerContent,
    messageAside,
  },
  data() {
    return {
      num: "",
      // 每个菜单对应的内容
      typeObj: {
        legalIssues: {
          name: "By legal issue",
          route: "/answers/legal-issue",
          type: "legal-issue",
          getType: "states",
        },
        states: {
          name: "By State",
          route: "/answers/state",
          type: "state",
          getType: "legalIssues",
        },
      },
      isTypeObj: {}, // 当前选中的菜单

      typeSelect: "",
      typeList: null,
      type2List: null,
      type2Choose: "",
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
      pageNum: 1,
      pageSize: 12,
      total: 0,
      search: "",
      newsUrl: "liveShow",
    };
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  async mounted() {
    this.msgList = await getPetArticleList();
    this.init();
  },
  methods: {
    init() {
      this.newsUrl = this.$route.name;
      this.isTypeObj = this.typeObj[this.newsUrl];
      this.$route.params.issue ? this.getLawyerStateFn() : this.getTypeFn();
    },
    getTypeFn() {
      // console.log(this.newsUrl)
      getLawyerArticleType({ msg: this.newsUrl }).then((res) => {
        this.typeList = res.data[this.newsUrl];
      });
    },
    getLawyerStateFn() {
      getLawyerState({
        msg: this.$route.params.issue,
        type: this.isTypeObj.getType,
      }).then((res) => {
        this.type2List = res.data.msg;
        this.type2Choose = this.type2List[0];
      });
    },
    getLegalIssuesAndStatesFn() {
      const obj = {};
      obj[this.newsUrl] = "";
      getLegalIssuesAndStates({
        pageNo: 1,
        pageSize: 12,
        ...obj,
      }).then((res) => {});
    },
    selectChangeFn(item) {
      this.pageNum = 1;
      this.showList = [];
      this.isSelectObj = item;
      this.getPetList(item);
    },
    // 获取宠物列表
    getPetList(item) {
      queryPet({
        ...item,
        type: this.newsUrl,
        page: this.pageNum,
        pageSize: 12,
      }).then((res) => {
        this.num = res.data.count;
        this.showList = res.data.petList;
      });
    },
    liActiveFn(item) {
      console.log(item);
    },
    // 切换州或者法律选择
    type2ChooseFn(item) {
      this.type2Choose = item;
    },
    activeLive(index) {
      this.activeLiveIndex = index;
      this.activeLiveFn = this.activities[index];
      this.itemTransform = -751 * index;
      // this.activeLiveFn.status = this.statusList[this.activities[index].status]
    },
    // 阅读文章
    readFn(item) {
      console.log(
        `/answers/${this.isTypeObj.type}/${this.$route.params.issue}/${item.uid}`
      );
      this.$router.push({
        path: `/answers/${this.isTypeObj.type}/${
          this.$route.params.issue
        }/${encodeURI(item.uid)}`,
      });
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

  .livePlay {
    flex: 1;

    .content {
      width: 100%;
    }
  }

  .chooseList {
    text-align: left;
    //grid-gap: 15px;
    //grid-template-columns: 1fr 1fr 1fr;
    //background: var(--button_color);
    grid-gap: 10px;
    div {
      display: inline-block;
      //padding: 10px;
      font-size: 16px;
      color: var(--txt_color);
      text-decoration: underline solid var(--txt_color);
      cursor: pointer;

      &:hover {
        text-decoration: none solid var(--txt_color);
      }
    }

    .isChoose {
      font-weight: 600;
    }
  }

  .livePlay-title {
    display: flex;
    //height: 26px;
    align-items: center;
    text-align: left;
    //padding-left: 15px;
    margin: 30px 0;

    div {
      display: inline-block;
      line-height: 1.2;
      font-size: 26px;
      font-weight: bold;
      color: #000000;
    }

    .before {
      width: 6px;
      height: 26px;
      background: var(--txt_color);
      margin-right: 10px;
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
    flex-direction: column;
    .livePlay-title {
      margin: 20px 0;
    }
    .center .title {
      font-size: 24px;
    }

    .grid-three {
      grid-gap: 6px;
      grid-template-columns: 1fr 1fr;
    }
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
.el-breadcrumb {
  font-size: 16px !important;
  line-height: 1.4;
}
</style>
