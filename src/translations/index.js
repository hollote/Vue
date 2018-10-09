import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

import translationsEn from './en';
import translationsRu from './ru';

export const defaultTranslation = localStorage.getItem('_lang') || navigator.language;
export const translations = {
  'en-US': translationsEn,
  'ru-RU': translationsRu
};

export const i18n = new VueI18n({
  locale: defaultTranslation, //TODO: lazy load of languages and wait for load, set fallback locale
  messages: translations,
  fallbackLocale: 'en-US'
});