  <template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in nav" :key="item.text">
          <v-btn text @click="changePage(item.to)" :class="item.style">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="font-size: 12px">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
        <v-list-item v-if="$store.state.auth.done == true">
          <v-btn text @click="changePage('/cart')" class="left_menu">
            <v-list-item-action>
              <v-icon>shopping_cart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="font-size: 12px">Заказать услугу</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="deep-purple accent-4" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">BookSharing</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-row align="center" style="max-width: 650px"></v-row>
      <div v-if="this.$store.state.auth.done == false">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn color="white" text v-on="on">
              <v-icon>exit_to_app</v-icon>Войти на сайт
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>Форма входа
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field v-model="username" label="Имя пользователя"></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :type="show ? 'text' : 'password'"
                  label="Пароль"
                  @click:append="show = !show"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="menu = false">Отмена</v-btn>
              <v-btn color="primary" text @click="auth">Войти</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-menu v-model="reg_menu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn color="white" text v-on="on">
              <v-icon>queue</v-icon>Зарегистрироваться
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>Форма регистрации
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field v-model="reg_username" label="Имя пользователя"></v-text-field>
                <v-text-field
                  v-model="reg_password"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :type="show ? 'text' : 'password'"
                  label="Пароль"
                  @click:append="show = !show"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="reg_menu = false">Отмена</v-btn>
              <v-btn color="primary" text @click="register">Зарегистрироваться</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-menu v-model="user_menu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn color="white" text v-on="on">
              <v-icon>account_circle</v-icon>
              {{$store.state.auth.username}}
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <v-list>
                <v-list-item class="menu_user">
                  <v-list-item-avatar>
                    <img
                      src="http://metronom.news/thumbs/post/31/da/31daf10731500af30d9dd9c1ff3709b6_big570x460.jpg"
                      alt="user"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{$store.state.auth.username}}</v-list-item-title>
                    <v-list-item-subtitle>Пользователь</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="goto_lk">
                <v-icon>class</v-icon>Перейти в ЛК
              </v-btn>
              <v-btn text @click="logout">
                <v-icon>keyboard_backspace</v-icon>Выйти
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-content>
      <v-snackbar v-model="snackbar" :color="color" :timeout="5000" top="top">
        {{ message }}
        <v-btn dark text @click="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer>
      <div class="flex-grow-1"></div>
      <div>Developed by xX_flex_Xx &copy; {{ new Date().getFullYear() }}</div>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import Fingerprint2 from "fingerprintjs2";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      nav: this.$store.getters.getNavigation,
      flat: false,
      menu: false,
      reg_menu: false,
      username: "",
      password: "",
      reg_username: "",
      reg_password: "",
      show: false,
      snackbar: false,
      message: "",
      color: "error",
      user_menu: false,
      fingerHash: ""
    };
  },
  methods: {
    changePage(page) {
      this.$router.push(page);
    },
    auth() {
      if (this.username == "" || this.password == "") {
        this.menu = false;
        this.username = "";
        this.password = "";
        this.show_snackbar("Имя пользователя или пароль пустые");
      } else {
        axios
          .put("http://127.0.0.1:5000/api/auth", {
            username: this.username,
            password: this.password,
            user_data: this.fingerHash
          })
          .then(response => {
            const results = response.data;
            if (results.auth == true) {
              let payload = {
                username: this.username,
                token: results.token,
                hash: this.fingerHash
              };
              this.$store.dispatch("authUser", payload);
              this.menu = false;
              this.username = "";
              this.password = "";
              this.$store.dispatch("getOrderData");
            } else {
              this.menu = false;
              this.username = "";
              this.password = "";
              this.show_snackbar("Пароль не соответсвует");
            }
          })
          .catch(error => {
            this.menu = false;
            this.username = "";
            this.password = "";
            this.show_snackbar("Мы вас не знаем");
          });
      }
    },
    register() {
      if (this.reg_username == "" || this.reg_password == "") {
        this.reg_menu = false;
        this.reg_username = "";
        this.reg_password = "";
        this.show_snackbar("Имя пользователя или пароль пустые");
      } else {
        axios
          .post("http://127.0.0.1:5000/api/auth", {
            username: this.reg_username,
            password: this.reg_password
          })
          .then(response => {
            const results = response;
            if (results.status == 201) {
              this.reg_menu = false;
              this.username = this.reg_username;
              this.reg_username = "";
              this.reg_password = "";
              this.menu = true;
            } else {
              this.reg_menu = false;
              this.reg_username = "";
              this.reg_password = "";
              this.show_snackbar("Регистрация завершилась ошибкой");
            }
          })
          .catch(error => {
            this.menu = false;
            this.username = "";
            this.password = "";
            this.show_snackbar("Ошибка на стороне сервера");
          });
      }
    },
    logout() {
      this.$store.dispatch("removeAuthData");
      this.$router.push("/");
      this.$store.dispatch("removeOrders");
    },
    goto_lk() {
      this.$router.push("/user");
      this.user_menu = false;
    },
    show_snackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
    _getFingerprint() {
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
          resolve(
            String(await getHash().then(result => (this.fingerHash = result)))
          )
        );
      });
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
    if (this.$route.path != "/") {
      this.drawer = false;
    }

    this._getFingerprint();
    this.$store.dispatch("checkLocalStore");
    this.$store.dispatch("getBooks");
  }
};
</script>

<style>
.crimer_text {
  text-align: center;
  padding-top: 25px !important;
}
.left_menu {
  margin-left: -15px !important;
}
.left_menu_list {
  margin-left: 2px !important;
}
.cart-form {
  background-color: rgba(156, 152, 152, 0.199);
  padding: 15px;
  border-radius: 10px;
}
.right-icon {
  padding-right: 5px;
}
.menu_user {
  width: 300px;
  background-color: rgba(170, 165, 165, 0.274);
  border-radius: 25px !important;
}
.v-menu__content {
  border-radius: 25px !important;
}
</style>