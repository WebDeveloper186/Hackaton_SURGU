<template>
  <v-row justify="center" align="center">
    <v-col class="shrink"></v-col>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item color="deep-orange darken-1" fill-dot right>
        <v-card>
          <v-card-title class="deep-orange darken-1 ">
            <h2 class="display-1  white--text font-weight-light">Прокофьев Александр</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="10">Fullstack Developer</v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="purple darken-2" fill-dot left small>
        <v-card>
          <v-card-title class="purple darken-2 justify-end">
            <h2 class="display-1 white--text font-weight-light">Кузьмин Сергей</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="8">Дизайнер</v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="red lighten-1" fill-dot right>
        <v-card>
          <v-card-title class="red lighten-1">
            <h2 class="display-1  white--text font-weight-light">Сазонов Савелий</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="10">Frontend developer Team leader</v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="cyan lighten-1" fill-dot left small>
        <v-card>
          <v-card-title class="cyan lighten-1 justify-end">
            <h2 class="display-1 mr-4 white--text font-weight-light">Чернов Дмитрий</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="10">Дизайнер</v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="green lighten-1" fill-dot right>
        <v-card>
          <v-card-title class="green lighten-1">
            <h2 class="display-1 white--text font-weight-light">Гречко Константин</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col>Backend developer</v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>
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