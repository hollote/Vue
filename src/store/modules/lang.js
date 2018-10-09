import { defaultTranslation, translations } from '../../translations/index';

const state = {
  locale: defaultTranslation,
  locales: Object.keys(translations)
  //TODO: change initialization to method?
};

const getters = {
  currentLocale: state => state.locale,
  availableLocales: state => state.locales
};

const mutations = {
  setLocale: (state, locale) => state.locale = locale //TODO: set initial locale?
};

const actions = {
  setLocale: ({commit}, payload) => {
    localStorage.setItem('_lang', payload);
    commit('setLocale', payload);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}