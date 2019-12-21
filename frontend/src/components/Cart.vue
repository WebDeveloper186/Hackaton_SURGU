<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <v-form ref="form" class="cart-form" width="400" flat>
        <h2 style="text-align: center" class="mx-auto">Форма размещения книги</h2>
        <v-text-field v-model="username" label="Имя пользователя" :disabled="true"></v-text-field>

        <v-text-field v-model="address" label="Название книги"></v-text-field>

        <v-text-field v-model="address" label="Автор книги"></v-text-field>

        <v-text-field v-model="address" label="Жанры"></v-text-field>

        <v-text-field v-model="address" label="Ссылка на обложку книги"></v-text-field>

        <div style="margin-top:10px; margin-bottom:5px">
          <v-btn color="success" class="mr-3" @click="order">Разместить</v-btn>
          <v-btn color="error" style="margin-left:250px" @click="reset">Очистить форму</v-btn>
        </div>
      </v-form>
    </v-col>
    <v-snackbar v-model="snackbar" :color="color" :timeout="5000" top="top">
      {{ message }}
      <v-btn dark text @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      cart: this.$store.getters.getCart,
      select: null,
      shop: [],
      price: 0,
      username: this.$store.state.auth.username,
      address: "",
      snackbar: false,
      message: "",
      color: "error",
      time: "",
      services: ""
    };
  },
  watch: {
    select() {
      if (this.select.length > 0) {
        this.price = 0;
        for (var i = 0; i < this.select.length; i++) {
          this.price += this.cart[this.shop.indexOf(this.select[i])].price;
        }
      } else {
        this.price = 0;
      }
    }
  },
  created() {
    for (let i = 0; i < this.cart.length; i++) {
      this.shop.push(this.cart[i].name);
    }
  },
  methods: {
    order() {
      if (this.address != "" && this.select != null) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();

        for (var i = 0; i < this.select.length; i++) {
          if (i != this.select.length - 1) {
            this.services += this.select[i] + ",";
          } else {
            this.services += this.select[i];
          }
        }

        this.time = dd + "." + mm + "." + yyyy;
        axios
          .post("http://127.0.0.1:5000/api/orders", {
            username: this.username,
            address: this.address,
            time: this.time,
            services: this.services,
            price: this.price
          })
          .then(response => {
            const results = response;
            if (results.status == 201) {
              this.services = "";
              this.color = "success";
              this.show_snackbar("Вы успешно оформили заказ");
              this.$store.dispatch("removeOrders");
              this.$store.dispatch("getOrderData");
              this.reset();
            } else {
              this.show_snackbar("С оформление заказа возникли проблемы");
            }
          })
          .catch(error => {
            this.menu = false;
            this.username = "";
            this.password = "";
            this.show_snackbar("Ошибка на стороне сервера");
          });
      } else {
        this.show_snackbar("Поля должны быть заполнены");
      }
    },
    reset() {
      this.address = "";
      this.select = [];
    },
    show_snackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
    goto_lk() {
      this.$router.push("/user");
    }
  }
};
</script>

<style scoped>
</style>