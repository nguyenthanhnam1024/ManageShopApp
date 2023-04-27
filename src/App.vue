<template>
  <div>
    <Navbar />
    <router-view :key="restartRouterView" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters("ProductModule", ["getRestartRouterView"]),
    restartRouterView() {
      return this.getRestartRouterView;
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
</style>
