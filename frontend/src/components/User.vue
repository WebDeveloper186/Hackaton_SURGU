<template>
  <v-row>
    <v-col cols="12">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card class="mx-auto">
            <v-img
              src="http://metronom.news/thumbs/post/31/da/31daf10731500af30d9dd9c1ff3709b6_big570x460.jpg"
              height="400px"
            ></v-img>
            <div>
              <p
                class="text-center"
                style="margin-top: 15px;"
              >Имя пользователя: {{user_data.username}}</p>
              <v-divider></v-divider>
              <p
                class="text-center"
                style="margin-top: 15px; padding-bottom: 15px;"
              >Роль пользователя: пользователь</p>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <v-data-table
            :headers="headers"
            :items="items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="green darken-3" height="50px">
                <v-toolbar-title>Работа с заказами</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="success"
                      dark
                      class="mb-2 mt-2"
                      @click="$router.push('/cart')"
                    >Новый заказ</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Редактировать заказ</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              :disabled="true"
                              v-model="editedItem.id"
                              label="ID заказа"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.address" label="Адресс"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              :disabled="true"
                              v-model="editedItem.time"
                              label="Дата заказа"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <v-select
                              max-width="300"
                              v-model="select"
                              :items="shop"
                              chips
                              multiple
                              label="Выбор услуги"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              :disabled="true"
                              v-model="editedItem.price"
                              label="Стоимость"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon color="green" small class="mr-2" @click="editItem(item)">edit</v-icon>
              <v-icon color="red" small @click="deleteItem(item.id)">delete</v-icon>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" color="success" :length="pageCount"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "User",
  data() {
    return {
      cart: this.$store.getters.getCart,
      user_data: this.$store.state.auth,
      shop: [],
      select: [],
      time: "",
      dialog: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      services: "",
      headers: [
        {
          text: "ID заказа",
          value: "id"
        },
        { text: "Адресс", value: "address", sortable: false },
        { text: "Дата заказа", value: "time", sortable: false },
        { text: "Услуги", value: "services", sortable: false },
        { text: "Стоимость", value: "price", sortable: false },
        { text: "Действия", value: "action", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        address: "",
        services: "",
        price: ""
      },
      items: this.$store.getters.getOrders
    };
  },
  watch: {
    select() {
      if (this.select.length > 0) {
        this.editedItem.price = 0;
        for (var i = 0; i < this.select.length; i++) {
          this.editedItem.price += this.cart[
            this.shop.indexOf(this.select[i])
          ].price;
        }
      } else {
        this.editedItem.price = 0;
      }
    },
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    for (let i = 0; i < this.cart.length; i++) {
      this.shop.push(this.cart[i].name);
    }
  },
  methods: {
    reset() {
      this.select = [];
      this.services = "";
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.select = this.editedItem.services.split(",");
    },

    deleteItem(id) {
      axios
        .delete("http://127.0.0.1:5000/api/orders", {
          data: {
            id: id
          }
        })
        .then(response => {
          if (response.status == 204) {
            this.$store.dispatch("removeOrders");
            this.$store.dispatch("getOrderData");
            this.items = this.$store.getters.getOrders;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    save() {
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
        .put("http://127.0.0.1:5000/api/orders", {
          id: this.editedItem.id,
          username: this.user_data.username,
          address: this.editedItem.address,
          time: this.time,
          services: this.services,
          price: this.editedItem.price
        })
        .then(response => {
          this.$store.dispatch("removeOrders");
          this.$store.dispatch("getOrderData");
          this.items = this.$store.getters.getOrders;
          this.reset();
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 0;
  border-radius: 25px;
}
</style>