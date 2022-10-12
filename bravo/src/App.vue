<template>
  <div>
    <div v-if="loggedUser?.role === 'admin'">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <h1 class="navbar-brand">Admin Role Dashboard</h1>
        <div class="navbar-nav">
          <a class="nav-item nav-link" :href="alphaUrl + '/user'">User Settings</a>
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
    <div v-if="showRedirectMessage">
      <div class="card mt-4">
        <h4 class="card-header">
          Redirecting due to wrong user role in {{ this.timerCount }} seconds.
        </h4>
      </div>
    </div>
    <div style="display: none">
      <iframe :src="alphaUrl"></iframe>
    </div>
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
      showRedirectMessage: false,
      timerCount: 5,
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
        this.showRedirectMessage = true;
        this.countdown();
        setTimeout(() => {
          window.location.href =
            process.env.VUE_APP_ALPHA_URL + "/role?role=admin";
        }, this.timerCount * 1000);
      }
    },
    countdown() {
      if (this.timerCount > 0) {
        setTimeout(() => {
          this.timerCount--;
          this.countdown();
        }, 1000);
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
