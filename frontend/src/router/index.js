import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import About from "@/components/About";
import List from "@/components/List";
import Cart from "@/components/Cart";
import Form from "@/components/Form";
import Crimer from "@/components/Crimer";
import User from "@/components/User";
import Tables from "@/components/Tables";
import Photos from "@/components/Photos";
import store from "@/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/list",
      name: "List",
      component: List
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
      beforeRouteEnter(to, from, next) {
        if (store.state.auth.done == true) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: "/form",
      name: "Form",
      component: Form
    },
    {
      path: "/crimer/:id",
      name: "Crimer",
      component: Crimer,
      beforeEnter: (to, from, next) => {
        if (
          to.params.id >= 1 ||
          to.params.id <= store.getters.getCrimers.length
        ) {
          next();
        } else {
          next("/");
        }
      }
    },
    {
      path: "/user",
      name: "User",
      component: User,
      beforeRouteEnter(to, from, next) {
        if (store.state.auth.done == true) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: "/tables",
      name: "Tables",
      component: Tables
    },
    {
      path: "/images",
      name: "Photos",
      component: Photos
    }
  ]
});