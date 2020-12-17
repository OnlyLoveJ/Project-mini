import Vue from "vue";
import Router from "vue-router";

// import workBar from '../views/workBar/index'

Vue.use(Router);
const routes = [
  {
    path: "/",
    redirect: "/workBar",
  },
  {
    path: "/workBar",
    component: require("../views/workBar/index").default,
  },
  {
    path: "/addOrder",
    component: require("../views/workBar/order/index").default,
  },
  {
    path: "/Goods",
    component: require("../views/Goods/index").default,
  },
  {
    path: "/Order",
    component: require("../views/OrderChange/index").default,
  },
];
export default new Router({
  // mode: 'hash',
  mode: "history",
  routes,
});
