<template>
  <div id="app">
    <NavBar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      showNavbar: true
    };
  },
  watch: {
    $route(to) {
      this.updateNavbarVisibility(to);
    }
  },
  created() {
    this.updateNavbarVisibility(this.$route);
  },
  methods: {
    updateNavbarVisibility(route) {
      this.showNavbar = !route.meta.hideNavbar;
    }
  }
};
</script>

