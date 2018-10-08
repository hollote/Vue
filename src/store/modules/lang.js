import { defaultTranslation, translations } from '../../translations/index';

const state = {
  locale: defaultTranslation,
  locales: Object.keys(translations)
};

const getters = {
  currentLocale: state => state.locale,
  availableLocales: state => state.locales
};

const mutations = {
  setLocale: (state, locale) => state.locale = locale //TODO: set initial locale?
};

const actions = {
  setLocale: ({commit}, payload) => commit('setLocale', payload)
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}