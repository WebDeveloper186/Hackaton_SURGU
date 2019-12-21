import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Fingerprint2 from "fingerprintjs2";

Vue.use(Vuex);

let HASH = "";

export default new Vuex.Store({
  state: {
    auth: {
      done: false,
      username: "" || window.atob(window.localStorage.getItem("u_hash")),
      fingerHash: "" || window.localStorage.getItem("hash"),
      token: "" || window.localStorage.getItem("token")
    },
    orders: [],
    nav: [{
        icon: "dashboard",
        text: "Главная",
        to: "/",
        style: "left_menu"
      },
      {
        icon: "format_list_numbered",
        text: "Список книг",
        to: "/list",
        style: "left_menu"
      },
      {
        icon: "supervisor_account",
        text: "О нашей команде",
        to: "/team",
        style: "left_menu"
      }
    ],
    cart: [{
        name: "Покупка случайного оружия",
        price: 1
      },
      {
        name: "Покупка случайных наркотиков",
        price: 2
      },
      {
        name: "Заказ убийства",
        price: 50
      },
      {
        name: "Покупка случайного оружия(редкое)",
        price: 15
      }
    ],
    books: [],
    fullOrders: [],
    users: [],
    sessions: []
  },
  getters: {
    getBooks(state) {
      return state.books;
    },
    getNavigation(state) {
      return state.nav;
    },
    getCart(state) {
      return state.cart;
    },
    getOrders(state) {
      return state.orders;
    },
    getOrdersById: state => id => {
      return state.orders.find(orders => orders.id === id);
    },
    getAllOrders(state) {
      return state.fullOrders
    },
    getSessions(state) {
      return state.sessions
    },
    getUsers(state) {
      return state.users
    },
    getBooks(state) {
      return state.books
    }
  },
  mutations: {
    setNalog(state, payload) {
      state.nalog = payload;
    },
    setOrderData(state, payload) {
      for (var i = 0; i < payload.length; i++) {
        state.orders.push(payload[i]);
      }
    },
    deleteOrders(state) {
      var a = [];
      state.orders = a;
    },
    setAuthData(state, payload) {
      window.localStorage.setItem("u_hash", window.btoa(payload.username));
      window.localStorage.setItem("hash", payload.hash);
      window.localStorage.setItem("token", payload.token);
      state.auth.username = payload.username;
      state.auth.token = payload.token;
      state.auth.fingerHash = payload.hash;
      state.auth.done = true;
    },
    removeUserData(state) {
      window.localStorage.removeItem("u_hash");
      window.localStorage.removeItem("hash");
      window.localStorage.removeItem("token");
      state.auth.username = null;
      state.auth.token = null;
      state.auth.fingerHash = null;
      state.auth.done = false;
    },
    setAuth(state) {
      state.auth.done = true;
      axios
        .get(
          "http://127.0.0.1:5000/api/orders?username=" +
          this.state.auth.username
        )
        .then(response => {
          const results = response.data;
          for (var i = 0; i < results.rows.length; i++) {
            state.orders.push(results.rows[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    setAllOrders(state, orders) {
      for (var i = 0; i < orders.rows.length; i++) {
        state.fullOrders.push(orders.rows[i])
      }
    },
    setSessions(state, sessions) {
      for (var x = 0; x < sessions.rows.length; x++) {
        state.sessions.push(sessions.rows[x])
      }
    },
    setUsers(state, users) {
      for (var k = 0; k < users.rows.length; k++) {
        state.users.push(users.rows[k])
      }
    },
    setBooks(state, books) {
      for (var i = 0; i < books.rows.length; i++) {
        state.books.push(books.rows[i])
      }
    }
  },
  actions: {
    async getOrderData({
      commit
    }) {
      await axios
        .get(
          "http://127.0.0.1:5000/api/orders?username=" +
          this.state.auth.username
        )
        .then(response => {
          const results = response.data;
          commit("setOrderData", results.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeOrders({
      commit
    }) {
      commit("deleteOrders");
    },
    authUser({
      commit
    }, payload) {
      commit("setAuthData", payload);
    },
    removeAuthData({
      commit
    }) {
      axios
        .get(
          "http://127.0.0.1:5000/api/auth?delete_token=" + this.state.auth.token
        )
        .then(response => {
          commit("removeUserData");
        })
        .catch(error => {
          console.logo(error);
        });
    },
    checkLocalStore({
      commit
    }) {
      getHash();
      let token = window.localStorage.getItem("token");
      let hash = window.localStorage.getItem("hash");
      if (token != null) {
        if (hash == HASH) {
          hash = HASH;
        } else {
          hash = hash;
        }
        axios
          .get(
            "http://127.0.0.1:5000/api/auth?token=" + token + "&hash=" + hash
          )
          .then(response => {
            const results = response.data;
            if (results.auth == true) {
              commit("setAuth");
            }
          })
          .catch(error => {
            commit("removeUserData");
          });
      }
    },
    getAllOrders({
      commit
    }) {
      axios.get("http://127.0.0.1:5000/api/getData?orders").then(response => {
        const results = response.data
        commit("setAllOrders", results)
      }).catch(error => {
        console.log(error)
      })
    },

    getSessions({
      commit
    }) {
      axios.get("http://127.0.0.1:5000/api/getData?sessions").then(response => {
        const results = response.data
        commit("setSessions", results)
      }).catch(error => {
        console.log(error)
      })
    },

    getUsers({
      commit
    }) {
      axios.get("http://127.0.0.1:5000/api/getData?users").then(response => {
        const results = response.data
        commit("setUsers", results)
      }).catch(error => {
        console.log(error)
      })
    },
    getBooks({
      commit
    }) {
      axios.get("http://127.0.0.1:5000/api/getBooks").then(response => {
        const results = response.data
        commit("setBooks", results)
      }).catch(error => {
        console.log(error)
      })
    }
  }
});

function getHash() {
  return new Promise((resolve, reject) => {
    async function getHash() {
      const options = {
        excludes: {
          plugins: true,
          localStorage: true,
          adBlock: true,
          screenResolution: true,
          availableScreenResolution: true
        }
      };

      try {
        const components = await Fingerprint2.getPromise(options);
        const values = components.map(component => component.value);

        return Fingerprint2.x64hash128(values.join(""), 31);
      } catch (e) {
        reject(e);
      }
    }
    requestIdleCallback(async () =>
      resolve(String(await getHash().then(result => (HASH = result)))));
  });
}