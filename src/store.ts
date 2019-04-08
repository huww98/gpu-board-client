import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gpuData: {},
  },
  mutations: {
    'gpuData.update'(state, {address, data}) {
      Vue.set(state.gpuData, address, data);
    },
  },
  actions: {

  },
});
