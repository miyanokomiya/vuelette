"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var Demo_vue_1 = require("./Demo.vue");
vue_1["default"].config.productionTip = true;
new vue_1["default"]({
    render: function (h) { return h(Demo_vue_1["default"]); }
}).$mount("#app");
