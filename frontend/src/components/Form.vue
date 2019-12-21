<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <v-form v-if="nalog == 0" ref="form" class="cart-form" width="400" text>
        <h2 style="text-align:center">Расчёт транспортного налога</h2>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="horse" label="Введите количество л.с" required></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="cost" label="Введите стоимость автомобиля" required></v-text-field>
            </v-col>
            <v-btn
              color="success"
              class="mr-4 submit-button"
              @click="setNalog"
            >Отправить данные на сервер</v-btn>
          </v-row>
        </v-container>
      </v-form>
      <v-card v-else>
        <v-card-title>
          <v-spacer></v-spacer>Расчёт транспортного налога
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text style="text-align:center; font-size: 1.25em">
          Ваш транспортный налог равен
          <span style="color:lightblue">{{nalog}}</span> рублей
        </v-card-text>
        <v-card-actions>
          <v-btn color="indigo" class="mr-4 submit-button" @click="resetNalog()">Пересчитать налог</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Form",
  data() {
    return {
      horse: "",
      cost: "",
      nalog: 0
    };
  },
  methods: {
    async setNalog() {
      await axios
        .post("http://127.0.0.1:5000/api/form_return", {
          horse: this.horse,
          cost: this.cost
        })
        .then(response => {
          const results = response.data;
          this.nalog = results.cost;
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetNalog() {
      this.nalog = 0;
    }
  },
  watch: {
    nalog() {
      if (this.nalog > 0) {
        this.horse = "";
        this.cost = "";
      }
    }
  }
};
</script>

<style scoped>
.submit-button {
  margin-left: 10px;
}
</style>