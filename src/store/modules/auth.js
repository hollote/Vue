import * as authApi from '../../api/auth';

let refreshTokenTimeout = null;

const state = {
  //TODO: change initialization to method? Problem that route before enter runs before setup initial state in App.vue created
  token: localStorage.getItem('_token') || null,
  userId: localStorage.getItem('_refreshToken') || null,
  refreshToken: localStorage.getItem('_userId') || null,
  expirationDate: localStorage.getItem('_tokenExpirationDate') || null
};

const getters = {
  isAuthenticated(state) {
    return state.token !== null;
  }
};

const mutations = {
  authUser(state, userData) {
    state.token = userData.token;
    state.userId = userData.userId;
    state.refreshToken = userData.refreshToken;
    state.expirationDate = userData.expirationDate;
  },
  clearAuthData(state) {
    state.token = null;
    state.userId = null;
    state.refreshToken = null;
    state.expirationDate = null;
  }
};

const actions = {
  logout({commit}) {
    commit('clearAuthData');
    localStorage.removeItem('_token');
    localStorage.removeItem('_refreshToken');
    localStorage.removeItem('_userId');
    localStorage.removeItem('_tokenExpirationDate');

    clearTimeout(refreshTokenTimeout);
  },
  login({dispatch}, authData) {
    return dispatch('saveUserData', authApi.login(authData));
  },
  register({dispatch}, authData) {
    return dispatch('saveUserData', authApi.register(authData));
  },
  refreshToken({dispatch}) {
    return dispatch('saveUserData', authApi.refreshToken(state.refreshToken));
  },
  saveUserData({commit, dispatch}, promise) {
    return new Promise((resolve, reject) => {
      promise.then(
        res => {
          //TODO: change to strategies (refresh token or firebase auth)
          const token = res.data.idToken || res.data.id_token;
          const refreshToken = res.data.refreshToken || res.data.refresh_token;
          const userId = res.data.localId || res.data.user_id;
          const expiration = res.data.expiresIn || res.data.expires_in;

          const expirationDate = Date.now() + expiration * 1000;

          commit('authUser', {
            token,
            refreshToken,
            userId,
            expirationDate
          });
          dispatch('refreshTokenTimer', expirationDate);
          localStorage.setItem('_token', token);
          localStorage.setItem('_refreshToken', refreshToken);
          localStorage.setItem('_userId', userId);
          localStorage.setItem('_tokenExpirationDate', expirationDate);
          resolve(res);
        }
      ).catch(error => {
        reject(error);
      });
    });
  },
  tryAutoLogin({commit, dispatch}) {
    if (!state.token) {
      return false;
    }
    if (Date.now() >= state.expirationDate) {
      dispatch('refreshToken', state.refreshToken);
      return false;
    }
    return true;
  },
  refreshTokenTimer({dispatch}, expirationTime) {
    refreshTokenTimeout = setTimeout(() => {
      dispatch('refreshToken');
    }, expirationTime * 1000);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}