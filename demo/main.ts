import Vue from "vue";
import App from "./Demo.vue";

Vue.config.productionTip = true;

new Vue({
  render: h => h(App)
}).$mount("#app");
