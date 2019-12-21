<template>
  <v-row>
    <v-col class=".col-6 .col-md4" v-for="crimer in crimers" :key="crimer.name">
      <v-card
        class="mx-auto"
        :flat="flat"
        :outlined="outlined"
        :raised="raised"
        :width="width"
        :height="height"
        style="border-radius: 10px"
      >
        <v-img height="66%" :src="crimer.img"></v-img>
        <v-card-title>
          <v-spacer></v-spacer>
          {{crimer.name}}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="crimer_text">{{crimer.short_desc}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="deep-purple" @click="changePage(crimer.to)">Подробнее</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      flat: false,
      outlined: false,
      raised: false,
      width: 550,
      height: 600,
      crimers: this.$store.getters.getCrimers
    };
  }
};
</script>