<template>
  <div class="aside">
    <div class="aside-tool aside-div">
      <!--      <h1>Find a Furry Friend</h1>-->
      <div class="aside-tool-list">
        <div class="aside-tool-con tall">
          <router-link to="/Pro-Bono-Offices">
            <div class="aside-tool-item">
              <span class="tool-text"> {{ $t("menu.menu0.title") }}</span>
            </div>
          </router-link>
        </div>
        <div class="aside-tool-con">
          <router-link to="/post/category/ALL">
            <div class="aside-tool-item">
              <span class="tool-text"> {{ $t("menu.menu1.title") }} </span>
            </div>
          </router-link>
        </div>
        <div class="aside-tool-con">
          <router-link to="/answers">
            <div class="aside-tool-item">
              <span class="tool-text"> {{ $t("menu.menu2.title") }} </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="aside-filter aside-div" v-if="liList">
      <h1>{{ $t("aside.filter") }}</h1>
      <ul class="filter-box-options" style="display: block">
        <li
          @click="liActive({ label: 'ALL' })"
          :class="
            $route.params.type.replace(/-/g, ' ') === 'ALL' ? 'active' : ''
          "
        >
          <span>All</span>
        </li>
        <li
          v-for="(item, index) in liList"
          :key="index"
          @click="liActive(item)"
          :class="
            $route.params.type.replace(/-/g, ' ') === item.label ? 'active' : ''
          "
        >
          <span
            >{{ $t(`breadcrumb.${item.label}.title`) }} {{ item?.count }}</span
          >
          <!--                <a href="?category_filter=all-about-foster-care&amp;term=">{{ item.name }}({{ item.num }})</a>-->
          <span></span>
        </li>
      </ul>
    </div>
    <div class="aside-select aside-div" v-if="selectObj">
      <h1>{{ $t("aside.filter") }}</h1>
      <div v-for="(item, key) in selectObj" :key="key" class="selectObj-list">
        <h3>
          {{ key }}
        </h3>
        <el-select
          v-model="checked[key]"
          multiple
          collapse-tags
          placeholder="choose"
          @change="selectChange"
        >
          <el-option
            v-for="(item1, index1) in item"
            :key="index1"
            :label="item1"
            :value="item1"
            @mouseenter.native.stop="selectClick(key)"
          >
          </el-option>
        </el-select>
        <!--        <el-checkbox-group v-model="checked[key]" @change="handleCheckedChange">-->
        <!--          <el-checkbox v-for="(item1,index1) in item" :label="item1.name" :key="index1">{{item1.name}}</el-checkbox>-->
        <!--        </el-checkbox-group>-->
      </div>
    </div>

    <div class="aside-msg aside-div" v-if="msgList">
      <h1>{{ $t("aside.msg") }}</h1>
      <div
        class="aside-msg-con"
        v-for="(item, index) in msgList"
        :key="index"
        @click="msgClick(item)"
      >
        <div class="aside-msg-item">
          <img :src="item.img" alt="" />
          <div class="aside-msg-itemLabel">
            <span>{{ item.label[0] }}</span>
            <!--            <span v-for="(item1,index1) in item.label" :key="index1"> {{ item1 }}</span>-->
          </div>
          <div class="aside-msg-itemTitle">{{ item.title }}</div>

          <div class="aside-msg-itemTxt">
            <span>{{ item.overview }}</span>
            <!--            <span v-for="(item1,index1) in item.label" :key="index1"> {{ item1 }}</span>-->
          </div>
        </div>
      </div>
    </div>
    <div class="aside-msg aside-div" v-if="petList">
      <h1>{{ $t("aside.msg") }}</h1>
      <div
        class="aside-msg-con"
        v-for="(item, index) in petList"
        :key="index"
        @click="petClick(item)"
      >
        <div class="aside-msg-item">
          <img :src="item.img" alt="" />
          <div class="aside-msg-itemTitle">
            <svg-icon :icon-class="item.gender"></svg-icon>
            {{ item.name }}
          </div>
          <div class="aside-msg-itemLabel">
            <span>{{ item.age }}</span> <span>{{ item.size }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="aside-msg aside-div">
      <h1>Pro Bono & Offices</h1>
      <div v-for="(item, index) in prolist" :key="index" class="pro-item">
        <router-link :to="item.path" tag="span"> {{ item.name }} </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "newsUrl",
    "liList",
    "liChoose",
    "selectObj",
    "isSelectObj",
    "msgList",
    "petList",
  ],
  data() {
    return {
      prolist: [
        {
          title: "Pro Bono Offices",
          path: "/Pro-Bono-Offices",
          name: "Pro Bono Offices",
        },
        {
          title: "Unemployment Offices",
          path: "/Unemployment-Offices",
          name: "Unemployment Offices",
        },
        {
          title: "Employment Departments",
          path: "/Employment-Departments",
          name: "Employment Departments",
        },
        {
          title: "Victim Assistance Centers",
          path: "/Victim-Assistance-Centers",
          name: "Victim Assistance Centers",
        },
        {
          title: "Courts",
          path: "/Courts",
          name: "Courts",
        },
        {
          title: "Bar Associations",
          path: "/Bar-Associations",
          name: "Bar Associations",
        },
        {
          title: "District Attorney Offices",
          path: "/District-Attorney-Offices",
          name: "District Attorney Offices",
        },
        {
          title: "Departments of Justice",
          path: "/Departments-of-Justice",
          name: "Departments of Justice",
        },
        {
          title: "Attorney Generals",
          path: "/Attorney-Generals",
          name: "Attorney Generals",
        },
      ],
      liActiveItem: null,
      checked: {
        Type: [],
        Age: [],
      },
      selectComObj: {},
      selectType: null,
    };
  },
  mounted() {
    // if (this.liChoose) this.liActiveItem = this.liChoose
  },
  watch: {
    // $route (to, from) {
    //   if (this.liChoose) this.liActiveItem = this.liChoose
    // }
  },
  methods: {
    liActive(item) {
      this.liActiveItem = item;
      this.$emit("liActive", item);
    },
    selectChange(item) {
      this.selectComObj[this.selectType] = item;

      this.$router.push({
        path: `/${this.$route.name}`,
        query: { obj: JSON.stringify(this.selectComObj) },
      });
    },
    selectClick(key) {
      this.selectType = key;
    },
    handleCheckedChange() {},
    msgClick(item) {
      this.$router.push({
        path: "/news/content/" + item.uid,
      });
    },
    petClick(item) {
      this.$router.push({
        path: "/about",
        query: { oid: item.oid },
      });
    },
  },
};
</script>
<style scoped lang="less">
.aside {
  margin-left: 40px;
  text-align: left;
  max-width: 320px;

  a {
    text-decoration: none;
    color: #000;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .aside-div {
    margin-bottom: 40px;
  }

  //max-width: 280px;
  .aside-tool {
    font-size: 18px;

    .iconStyle {
      width: 30px;
      height: 30px;
      vertical-align: -8px;
    }

    .aside-tool-list {
      width: 100%;

      .aside-tool-con {
        border: 1px solid var(--button_color);
        background-color: var(--button_color);
        padding: 15px 10px;
        margin-bottom: 6px;
        cursor: pointer;

        a {
          color: #ffffff !important;
          font-weight: bold;
        }

        //border-radius: 20px;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .aside-filter {
    text-align: left;

    ul li:not(.interstate) {
      border-radius: 2px;
      display: block;
      padding: 8px 10px;
      text-decoration: none;
      font-size: 16px;
      line-height: 22px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        color: var(--txt_color);
      }

      &.active {
        color: var(--txt_color);
      }
    }
  }

  .aside-select {
    .selectObj-list {
      h3 {
        margin: 10px 0;
      }
    }
  }

  .aside-msg {
    .aside-msg-item {
      cursor: pointer;
      padding: 9px 10px;
      //border: 1px solid rgba(0, 127, 255, 0.1);
      box-shadow: 0 0 2px 1px rgba(186, 183, 183, 0.2);
      margin-bottom: 5px;
      overflow-wrap: anywhere;

      img {
        width: 100%;
        height: 160px;
        margin-bottom: 5px;
        object-fit: cover;
      }

      .aside-msg-itemTitle {
        font-size: 16px;
        line-height: 18px;
        margin: 5px 0;
        overflow-wrap: anywhere;
      }

      .aside-msg-itemTxt {
        color: #999999;
        font-size: 14px;
      }

      .aside-msg-itemLabel {
        color: var(--theme_color);
        font-size: 14px;

        span {
          margin-right: 10px;
        }
      }

      &:hover {
        color: var(--txt_color);
        box-shadow: 0 0 2px 1px var(--txt_color);
      }
    }
  }
  .pro-item {
    margin-bottom: 10px;
    cursor: pointer;
  }
}

@media screen and (max-width: 800px) {
  .tall {
    text-align: center;
    width: 98% !important;
  }
  .aside {
    max-width: 100%;
    margin-right: 0;
    margin-left: 0;
    margin-top: 28px;

    .aside-div {
      margin-bottom: 28px;
    }

    //max-width: 60px;
    .aside-msg {
      //display: none;
    }

    .aside-tool {
      .aside-tool-list {
        .aside-tool-con {
          display: inline-block;
          width: 48%;
          margin-right: 2%;
          font-size: 14px;
        }
      }
    }

    .aside-select {
      .selectObj-list {
        display: inline-block;
        width: 48%;
        margin-right: 2%;
      }
    }

    .aside-filter {
      font-size: 14px;

      .filter-box-options {
        li {
          padding: 5px 5px !important;
          display: inline-block !important;
          width: 44%;
        }
      }
    }
  }
}
</style>
