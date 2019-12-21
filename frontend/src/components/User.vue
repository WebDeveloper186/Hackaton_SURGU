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
          <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat color="indigo">
                <v-toolbar-title>Мои заявки</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="$router.push('/cart')"
                >Разместить книгу</v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="success()">check_circle</v-icon>
              <v-icon small @click="deleteItem(item)">delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
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
      user_data: this.$store.state.auth,
      dialog: false,
      headers: [
        {
          text: "ID книги",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Автор", value: "calories" },
        { text: "Название", value: "fat" },
        { text: "Статус", value: "carbs" },
        { text: "Действия", value: "action", sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    success() {
      this.desserts[0].carbs = "Одобрена";
    },
    initialize() {
      this.desserts = [
        {
          name: 12,
          calories: "Дмитрий Глуховский",
          fat: "Метро 2033",
          carbs: "Свободна"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
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