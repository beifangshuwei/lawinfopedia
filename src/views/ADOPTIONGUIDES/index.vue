<template>
  <div id="ADOPTIONGUIDES">
    <!--    1222222-->

    <div class="ADOPTIONGUIDES-description">
      <el-main class="ADOPTIONGUIDES-description">
        <router-view :key="$route.fullpath"></router-view>
      </el-main>
    </div>
    <div>
      <div class="sidebar-intro">
        <h2 class="sidebar-intro-q">
          {{ $t(`pro-Bono.what.title`) }}
          {{ $t(`breadcrumb.${$route.name}.title`) }}?
        </h2>
        <p class="sidebar-intro-a">
          {{ $t(`breadcrumb.${$route.name}.intro`) }}
        </p>
      </div>
      <message-aside :msg-list="msgList"></message-aside>
    </div>
  </div>
</template>

<script>
import { introObj } from "./index";

import features from "../../components/features/features.vue";
import messageAside from "comps/messageAside/messageAside.vue";
import { getPetArticleList } from "@/libs/utils";

export default {
  components: { messageAside },

  data() {
    return {
      msgList: [{}],
      introObj,
    };
  },
  async mounted() {
    // console.log(11212)
    this.msgList = await getPetArticleList();
    this.msgList = this.msgList.splice(0, 3);
  },
};
</script>

<style lang="less" scoped>
#ADOPTIONGUIDES {
  display: flex;
  width: 100%;
  max-width: 1132px;
  padding: 40px 0;

  .ADOPTIONGUIDES-description {
    flex: 1;
    padding: 0;
  }

  .sidebar-intro {
    background-color: #dd9e5f4d;
    padding: 16px 20px;
    border-radius: 16px;
    margin-bottom: 28px;
    width: 100%;
    max-width: 320px;
    text-align: left;
    margin-top: 28px;
    margin-left: 40px;

    .sidebar-intro-q,
    .layout-faq-q {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .sidebar-intro-a,
    .layout-faq-a {
      font-size: 20px;
      color: #999999;
      font-size: 14px;
      line-height: 1.4;
    }
  }
  .aside[data-v-31936c22] {
    margin-left: 40px;
    margin-right: 0px;
  }
}

@media screen and (max-width: 800px) {
  #ADOPTIONGUIDES {
    flex-direction: column;
    padding: 40px 15px;
  }
  .aside[data-v-31936c22] {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .sidebar-intro {
    margin-left: 0px !important;
    max-width: none !important;
  }
}
</style>
<style style="less">
#ADOPTIONGUIDES {
  .el-breadcrumb {
    line-height: 1.4;
  }
}
</style>
