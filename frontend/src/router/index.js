import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import List from "@/components/List";
import Cart from "@/components/Cart";
import Book from "@/components/Book";
import User from "@/components/User";
import Team from "@/components/Team"
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
      path: "/book/:id",
      name: "Book",
      component: Book,
      beforeEnter: (to, from, next) => {
        if (
          to.params.id >= 1 ||
          to.params.id <= store.getters.getBooks.length
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
      path: "/team",
      name: "Team",
      component: Team
    }
  ]
});