<template>
  <header id="header">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <router-link tag="a" to="/" class="navbar-brand" active-class="active" exact>
        <img alt="Logo" src="../assets/logo.png">
      </router-link>
      <div class="navbar-nav mr-auto">
        <router-link class="nav-item nav-link" tag="a" to="/about">About</router-link>
        <router-link v-if="!auth" class="nav-item nav-link" active-class="active" tag="a" to="/signup">Sign Up
        </router-link>
        <router-link v-if="!auth" class="nav-item nav-link" active-class="active" tag="a" to="/signin">Sign In
        </router-link>
      </div>
      <div class="navbar-nav">
        <language-selector></language-selector>
      </div>
    </nav>
  </header>
</template>

<script>
  import LanguageSelector from "@/components/LanguageSelector";

  export default {
    components: {
      LanguageSelector
    },
    computed: {
      auth() {
        return false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .navbar-nav {
    flex-direction: row;
  }

  .nav-item {
    margin-right: .5em;
  }

  .navbar-brand {
    img {
      height: 2em;
    }
  }
</style>