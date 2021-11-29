const actions = {
  SET_WEB3({ commit }, payload) {
    commit("SET_WEB3", payload);
  },
  SET_USER_ACCOUNT({ commit }, payload) {
    commit("SET_USER_ACCOUNT", payload);
  },
  SET_HEDGE_INSTANCE({ commit }, payload) {
    commit("SET_HEDGE_INSTANCE", payload);
  },
  SET_TRACKER_INSTANCE({ commit }, payload) {
    commit("SET_TRACKER_INSTANCE", payload);
  },
  SET_XRP_INSTANCE({ commit }, payload) {
    commit("SET_XRP_INSTANCE", payload);
  },
  SET_AVAX_INSTANCE({ commit }, payload) {
    commit("SET_AVAX_INSTANCE", payload);
  }, 
  SET_BTC_INSTANCE({ commit }, payload) {
    commit("SET_BTC_INSTANCE", payload);
  }, 
  SET_CASH_INSTANCE({ commit }, payload) {
    commit("SET_CASH_INSTANCE", payload);
  }, 
  SET_ADA_INSTANCE({ commit }, payload) {
    commit("SET_ADA_INSTANCE", payload);
  },
  SET_ETH_INSTANCE({ commit }, payload) {
    commit("SET_ETH_INSTANCE", payload);
  },
  SET_MATIC_INSTANCE({ commit }, payload) {
    commit("SET_MATIC_INSTANCE", payload);
  },
  SET_BALLOT_INSTANCE({ commit }, payload) {
    commit("SET_BALLOT_INSTANCE", payload);
  },
};

export default actions;
