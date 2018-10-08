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
      //TODO: setup initial state of app here (lang, user login, etc.)
      return new Promise(resolve => {
        this.initialized = true;
        console.log('initialized');
        resolve(true);
      });
    }
  }
</script>

<style scoped lang="scss">
  .main-header {
    height: 10vh;
  }
  .main-container {
    height: 90vh;
  }
</style>