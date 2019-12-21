<template>
  <v-row justify="center" align="center">
    <v-col class="shrink"></v-col>
    <v-card
      class="mx-auto"
      :flat="flat"
      :loading="loading"
      :outlined="outlined"
      :raised="raised"
      :width="width"
      :height="height"
      style="box-shadow: 0 0 10px rgba(0,0,0,0.5);"
    >
      <v-img
        class="white--text"
        height="200px"
        src="https://www.tourprom.ru/site_media/images/upload/2016/8/31/countryimage/meksika.jpg"
      >
        <v-card-title class="align-end fill-height">
          <v-spacer></v-spacer>Добро пожаловать
          <v-spacer></v-spacer>
        </v-card-title>
      </v-img>

      <v-card-text style="text-align: center; padding-top: 30px">
        <p>Добро пожаловать</p>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      flat: false,
      loading: false,
      outlined: false,
      raised: false,
      width: 344,
      height: 300
    };
  }
};
</script>

<style scoped>
</style>