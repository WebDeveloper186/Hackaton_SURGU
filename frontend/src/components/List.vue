<template>
  <v-row>
    <v-col class=".col-4 .col-md4" v-for="book in books" :key="book.name">
      <v-card
        class="mx-auto"
        :flat="flat"
        :outlined="outlined"
        :raised="raised"
        :width="width"
        :height="height"
        style="border-radius: 10px"
      >
        <v-img height="66%" :src="book.img"></v-img>
        <v-card-title>
          <v-spacer></v-spacer>
          {{book.name}}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="crimer_text">{{book.short_desc}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="deep-purple" @click="changePage(book.to)">Подробнее</v-btn>
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
      books: this.$store.getters.getBooks
    };
  },
  methods: {
    changePage(to) {
      this.$router.push(to);
    }
  }
};
</script>