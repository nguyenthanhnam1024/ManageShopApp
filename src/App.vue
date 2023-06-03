<template>
  <div>
    <Navbar :class="manageActiveNavbar" />
    <router-view :key="restartRouterView" class="router"/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("ProductModule", ["getRestartRouterView"]),
    ...mapGetters("AppVueModule", ["getInactiveNavbar"]),

    restartRouterView() {
      return this.getRestartRouterView;
    },

    manageActiveNavbar() {
      return {
        status: this.getInactiveNavbar,
      };
    },
  },

  components: {
    Navbar,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}
div {
  margin: 10px;
}
.status {
  display: none;
}
.router {
  overflow-y: scroll;
  height: 540.5px;
}
</style>
