<template>
  <v-row>
    <v-col cols="12">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card style="border-radius: 10px; padding: 15px; margin-top: 50%" width="650px">
            <form
              action="http://127.0.0.1:5000/api/upload_image"
              method="POST"
              enctype="multipart/form-data"
            >
              <input class="input" type="file" name="file" />
              <button type="submit">Загрузить</button>
            </form>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card style="border-radius: 10px; padding: 15px;" min-height="500px">
            <v-card-title style="padding-bottom:25px">
              <v-spacer></v-spacer>Предыдущие фотографии
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-carousel hide-delimiter-background cycle>
                <v-carousel-item v-for="item in filenames" :key="item">
                  <v-sheet height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                      <v-img
                        :src="'http://127.0.0.1:5000/api/image/' + item"
                        height="400"
                        width="400"
                      ></v-img>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Images",
  data() {
    return {
      rules: [
        value =>
          !value ||
          value.size < 20000000 ||
          "Размер фотографии должен быть меньше 20 MB!"
      ],
      filenames: null
    };
  },
  created() {
    axios
      .get("http://127.0.0.1:5000/api/upload_image")
      .then(response => {
        this.filenames = response.data.rows;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>