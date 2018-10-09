<template>
  <div id="app" v-if="initialized">
    <app-header></app-header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import LanguageSelector from "./components/LanguageSelector";
  import Header from "./components/Header";

  export default {
    components: {
      LanguageSelector,
      AppHeader: Header
    },
    data() {
      return {
        initialized: false
      }
    },
    created() {
      return new Promise(resolve => {
        this.$store.dispatch('auth/tryAutoLogin').then(() => {
          this.initialized = true;
          console.log('initialized');
          resolve(true);
        });
      });
    }
  }
  //TODO: fix on navigate explicit on login page when logged in (have to me redirect)
</script>

<style scoped lang="scss">
  .main-header {
    height: 10vh;
  }

  .main-container {
    height: 90vh;
  }
</style>