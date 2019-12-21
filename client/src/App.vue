<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>

    <v-content>
      <ul>
        <li v-if="!isAuthenticated">
          <a href="#" @click="login">Login</a>
        </li>
        <li v-if="isAuthenticated">
          <a href="#" @click="logout">Log out</a>
        </li>
      </ul>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isAuthenticated: false
    };
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  }
};
</script>
