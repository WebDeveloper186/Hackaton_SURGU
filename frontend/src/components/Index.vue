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
        src="https://psv4.userapi.com/c856224/u171284348/docs/d9/86bc640c6470/logo.png?extra=NgfjlOOSghj7PS2XFocwGgatICoxMK5v-pHIVFoBGdvuqpxpEhPzH5kDl6EQzIZLETWZ30-BsmgN_ahmj-MdqRPnKuWfO-s_y9dzXIr1lfDmD1LlBp4iZZG7onCgw4eP79TFStS3LY9wpV6rBYCphA&dl=1"
      >
      </v-img>

      <v-card-text style="text-align: center; padding-top: 30px">
        <p>Добро пожаловать на сайт по обмену книг между гражданами "BookSharing"!</p>
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