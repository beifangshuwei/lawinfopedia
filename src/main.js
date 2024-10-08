import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";

import VueScript2 from "vue-script2";
import Ads from "vue-google-adsense";

import VueI18n from "vue-i18n";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import i18n from "./languages/index";

// 组件注册
import commonComponent from "./components/index.js";

// 初始化css
import "./assets/css/base.css";
import "./assets/css/common.css";
import "./assets/css/common.less";
import "./assets/icon/index";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDlu6RhpVUknJhTPyj0rvImxF29ew25kSg", // 此处填入谷歌地图申请的key
    libraries: "places",
  },
});
Vue.use(VueScript2);
Vue.use(Ads.Adsense);
Vue.use(ElementUI, { locale });

for (const key in commonComponent) {
  Vue.component(key, commonComponent[key]);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
