<template>
  <v-row>
    <v-col class=".col-4 .col-md4" v-for="book in books" :key="book.id">
      <v-card
        class="mx-auto"
        :flat="flat"
        :outlined="outlined"
        :raised="raised"
        :width="width"
        :height="height"
        style="border-radius: 10px"
      >
        <v-img height="100%" :src="book.image" @click="changePage(book.id)" style="cursor:pointer"></v-img>
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
      height: 625,
      books: this.$store.getters.getBooks
    };
  },
  methods: {
    changePage(to) {
      var link = "/book/" + to;
      this.$router.push(link);
    }
  }
};
</script>