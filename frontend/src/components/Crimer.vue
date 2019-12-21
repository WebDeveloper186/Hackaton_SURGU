<template>
  <v-row>
    <v-col>
      <v-card
        class="mx-auto"
        :flat="flat"
        :outlined="outlined"
        :raised="raised"
        :width="width"
        :height="height"
      >
        <v-img class="mx-auto" width="100%" height="70%" :src="crimers[$route.params.id - 1].img"></v-img>
        <v-card-title>
          <v-spacer></v-spacer>
          {{crimers[$route.params.id - 1].name}}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="crimer_text">{{crimers[$route.params.id - 1].desc}}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Crimer",
  data() {
    return {
      drawer: false,
      crimers: this.$store.getters.getCrimers,
      width: 550,
      height: 625,
      flat: false,
      outlined: false,
      raised: false
    };
  }
};
</script>

<style scoped>
</style>