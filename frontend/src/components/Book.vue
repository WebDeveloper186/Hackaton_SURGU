<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="4">
          <v-img
            class="mx-auto"
            width="100%"
            height="100%"
            :src="books[$route.params.id - 1].image"
            style="border-radius:15px"
          ></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-card
            class="mx-auto"
            :flat="flat"
            :outlined="outlined"
            :raised="raised"
            :width="width"
            :height="height"
            style="border-radius:15px"
          >
            <v-card-title>
              <v-spacer></v-spacer>Описание книги
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="description">
              <p>
                <b style="text-transform: uppercase">Название:</b>
                {{books[$route.params.id - 1].name}}
              </p>
              <p>
                <b style="text-transform: uppercase">Автор:</b>
                {{books[$route.params.id - 1].author}}
              </p>
              <p>
                <b style="text-transform: uppercase">Владелец:</b>
                {{books[$route.params.id - 1].username}}
              </p>
              <p>
                Жанр:
                <v-chip
                  v-for="genre in genres"
                  :key="genre"
                  color="primary"
                  :outlined="true"
                >{{genre}}</v-chip>
              </p>
              <p>
                <b style="text-transform: uppercase">Аннотация:</b>
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple">Заказать книгу</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      genres: null,
      drawer: false,
      books: this.$store.getters.getBooks,
      width: 550,
      height: 625,
      flat: false,
      outlined: false,
      raised: false
    };
  },
  mounted() {
    this.genres = this.books[this.$route.params.id - 1]._type.split(",");
  }
};
</script>

<style scoped>
.description {
  font-size: 1.25em;
}
.description p {
  color: white;
}
.description p:last-child {
  font-size: 0.9em;
}
</style>