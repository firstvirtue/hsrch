import Vue from 'vue';
import Vuex from 'vuex';
import storage from '~/assets/js/module/storage.js';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      signed: state => {
        return state.user;
      }
    },
    mutations: {
      LOGIN (state, user) {
        state.user = user;
        storage.set('loggedInfo', user);
      },
      LOGOUT (state) {
        state.user = null;
        storage.remove('loggedInfo');
      }
    },
    actions: {
      LOGIN ({commit}, {email, password}) {
        return this.$axios.$post('/api/auth/login/local', {email, password})
          .then((data) => commit('LOGIN', data));
      },
      LOGOUT ({commit}) {
        commit('LOGOUT');
      }
    }
  });
}

export default store;
