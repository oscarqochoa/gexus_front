<template>
  <div id="app">
    <b-container>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Test App</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Inicio</b-nav-item>
            <b-nav-item :to="{ name: 'authors' }">Autores</b-nav-item>
            <b-nav-item :to="{ name: 'books' }">Libros</b-nav-item>
          </b-navbar-nav>
        </b-collapse>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="user">
          <b-nav-item-dropdown right>
            <template #button-content> {{ user.name }}</template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </b-container>

    <router-view />
  </div>
</template>

<script>
import { bus } from "./main";
export default {
  name: "App",
  components: {},
  data() {
    return {
      user: null,
    };
  },
  methods: {
    getAuthenticatedData() {
      const user = localStorage.getItem("userData");

      if (user) {
        this.user = JSON.parse(user);
      }
    },
  },
  created() {
    this.getAuthenticatedData();

    bus.$on("onLogin", async (data) => {
      this.getAuthenticatedData();
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
