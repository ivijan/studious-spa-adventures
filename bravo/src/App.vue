<template>
  <div v-if="loggedUser.role === 'admin'">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
        <a class="nav-item nav-link" :href="alphaUrl + '/logout'">Logout</a>
      </div>
    </nav>
    <div class="card mt-4">
      <h4 class="card-header">Congrats, you're logged in</h4>
      <div class="card-body">
        <ul>
          <li>User: {{ loggedUser.firstName }} {{ loggedUser.lastName }}</li>
          <li>Role: {{ loggedUser.role }}</li>
        </ul>
      </div>
    </div>
  </div>
  <div style="display: none">
    <iframe :src="alphaUrl"></iframe>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      alphaUrl: process.env.VUE_APP_ALPHA_URL,
      loggedUser: {},
    };
  },
  mounted() {
    //Event Listener for Iframe
    window.addEventListener("message", this.iframeEvent, false);
  },
  methods: {
    iframeEvent(event) {
      //Verify App Domain
      if (event.origin !== process.env.VUE_APP_ALPHA_URL) return;
      this.loggedUser = event.data.user;
      if (this.loggedUser?.role !== "admin") {
        window.location.href =
          process.env.VUE_APP_ALPHA_URL + "/role?role=admin";
      }
    },
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
