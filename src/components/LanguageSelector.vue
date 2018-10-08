<template>
  <div class="input-group">
    <select class="custom-select" @change="changeLang">
      <option
          v-for="locale in locales"
          :selected="locale === currentLocale"
          :key="locale"
          :value="locale"
      >{{$t('languages')[locale]}}
      </option>
    </select>
    <div class="input-group-append">
      <label class="input-group-text">
        <font-awesome-icon icon="flag"/>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      locales() {
        return this.$store.getters['lang/availableLocales'];
      },
      currentLocale() {
        return this.$store.getters['lang/currentLocale'];
      }
    },
    methods: {
      changeLang(event) {
        const locale = event.target.value; //TODO move to vuex (lang -> action)
        this.$i18n.locale = locale;
        this.$store.dispatch('lang/setLocale', locale);
      }
    }
  }
</script>

<style scoped>

</style>