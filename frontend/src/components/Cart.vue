<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <v-form ref="form" class="cart-form" width="400" flat>
        <h2 style="text-align: center" class="mx-auto">Форма размещения книги</h2>
        <v-text-field v-model="username" label="Имя пользователя" :disabled="true"></v-text-field>

        <v-text-field v-model="name" label="Название книги"></v-text-field>

        <v-text-field v-model="author" label="Автор книги"></v-text-field>

        <v-text-field v-model="type" label="Жанры"></v-text-field>

        <v-text-field v-model="image" label="Ссылка на обложку книги"></v-text-field>

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
      name: "",
      snackbar: false,
      message: "",
      color: "error",
      time: "",
      image: "",
      author: "",
      type: ""
    };
  },
  methods: {
    order() {
      axios
        .post("http://127.0.0.1:5000/api/getBooks", {
          username: this.username,
          author: this.author,
          name: this.name,
          flag: 0,
          _type: this.type,
          image: this.image
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