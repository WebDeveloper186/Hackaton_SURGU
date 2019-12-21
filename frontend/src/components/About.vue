<template>
  <v-row>
    <v-col class=".col-6 .col-md-4">
      <div class="text-center">
        <v-card flat max-width="500" class="mx-auto mt-10 pt-0">
          <v-img
            width="100%"
            height="450px"
            src="http://img-fotki.yandex.ru/get/9094/11206178.5f5/0_f2cab_96e0dc69_orig"
            style="padding-top: 0 !important"
          >
            <v-card-title align-end fill-height>О нас</v-card-title>
          </v-img>

          <v-divider></v-divider>
          <v-card-text>Наша компания занимается продажей оружия и наркотиков по всему миру, так же мы занимаемся заказными убийствами</v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  }
};
</script>