<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers_orders"
        :items="orders"
        :page.sync="page_order"
        :items-per-page="itemsPerPage_orders"
        hide-default-footer
        @page-count="pageCount_orders = $event"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="green darken-3" height="50px">
            <v-toolbar-title>Таблица заказов</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <div v-if="$store.state.auth.done == true">
              <v-btn color="info" dark class="mb-2 mt-2" @click="$router.push('/cart')">Новый заказ</v-btn>
              <v-btn
                color="info"
                dark
                class="mb-2 mt-2 ml-4"
                @click="$router.push('/user')"
              >Редактирование</v-btn>
            </div>
          </v-toolbar>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page_order" color="success" :length="pageCount_orders"></v-pagination>
      </div>
      <v-data-table
        :headers="headers_sessions"
        :items="sessions"
        :page.sync="page_sessions"
        :items-per-page="itemsPerPage_sessions"
        hide-default-footer
        @page-count="pageCount_sessions = $event"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="green darken-3" height="50px">
            <v-toolbar-title>Таблица сессий</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page_sessions" color="success" :length="pageCount_sessions"></v-pagination>
      </div>
      <v-data-table
        :headers="headers_users"
        :items="users"
        :page.sync="page_users"
        :items-per-page="itemsPerPage_users"
        hide-default-footer
        @page-count="pageCount_users = $event"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="green darken-3" height="50px">
            <v-toolbar-title>Таблица пользователей</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page_users" color="success" :length="pageCount_users"></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Tables",
  data() {
    return {
      dialog: false,
      page_order: 1,
      pageCount_orders: 0,
      itemsPerPage_orders: 10,
      page_sessions: 1,
      pageCount_sessions: 0,
      itemsPerPage_sessions: 10,
      page_users: 1,
      pageCount_users: 0,
      itemsPerPage_users: 10,
      services: "",
      headers_orders: [
        {
          text: "Имя пользователя",
          value: "username",
          sortable: false
        },
        {
          text: "ID заказа",
          value: "id"
        },
        { text: "Адресс", value: "address", sortable: false },
        { text: "Дата заказа", value: "time", sortable: false },
        { text: "Услуги", value: "services", sortable: false },
        { text: "Стоимость", value: "price", sortable: false }
      ],
      headers_sessions: [
        {
          text: "ID пользователя",
          value: "u_id",
          sortable: false
        },
        {
          text: "ID сессии",
          value: "id"
        },
        { text: "IP", value: "ip", sortable: false },
        { text: "Отпечаток браузера", value: "fingerprint", sortable: false },
        { text: "Token", value: "token", sortable: false }
      ],
      headers_users: [
        {
          text: "ID пользователя",
          value: "id"
        },
        {
          text: "Имя пользователя",
          value: "username",
          sortable: false
        },
        { text: "Пароль", value: "password", sortable: false }
      ],
      orders: this.$store.getters.getAllOrders,
      sessions: this.$store.getters.getSessions,
      users: this.$store.getters.getUsers
    };
  },
  created() {
    this.$store.dispatch("getAllOrders");
    this.$store.dispatch("getSessions");
    this.$store.dispatch("getUsers");
  }
};
</script>