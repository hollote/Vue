<template>
  <header id="header">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <router-link tag="a" to="/" class="navbar-brand" active-class="active" exact>
        <img alt="Logo" src="../assets/logo.png">
      </router-link>
      <div class="navbar-nav mr-auto">
        <router-link class="nav-item nav-link" tag="a" to="/about">{{$t('header.about')}}</router-link>
        <router-link v-if="!auth" class="nav-item nav-link" active-class="active" tag="a" to="/signup">{{$t('header.register')}}
        </router-link>
        <router-link v-if="!auth" class="nav-item nav-link" active-class="active" tag="a" to="/signin">{{$t('header.login')}}
        </router-link>
        <router-link class="nav-item nav-link" active-class="active" tag="a" to="/dashboard">{{$t('header.dashboard')}}
        </router-link>
        <button v-if="auth" class="btn btn-primary" @click="onLogout">{{$t('common.logout')}}</button>
      </div>
      <div class="navbar-nav" v-if="locales.length > 1">
        <language-selector></language-selector>
      </div>
    </nav>
  </header>
</template>

<script>
  import LanguageSelector from "./LanguageSelector";

  export default {
    components: {
      LanguageSelector
    },
    methods: {
      onLogout() {
        this.$router.push('/signin');
        this.$store.dispatch('auth/logout');
      }
    },
    computed: {
      auth() {
        return this.$store.getters['auth/isAuthenticated'];
      },
      locales() {
        return this.$store.getters['lang/availableLocales'];
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