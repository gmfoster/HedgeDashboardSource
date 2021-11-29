const mutations = {
  SET_WEB3: (state, payload) => {
    state.web3 = payload;
  },
  SET_USER_ACCOUNT: (state, payload) => {
    state.userAccount = payload;
  },
  SET_HEDGE_INSTANCE: (state, payload) => {
    state.hedgeInstance = payload;
  },
  SET_TRACKER_INSTANCE: (state, payload) => {
    state.trackerInstance = payload;
  },
  SET_XRP_INSTANCE: (state, payload) => {
    state.XRPInstance = payload;
  },
  SET_AVAX_INSTANCE: (state, payload) => {
    state.AVAXInstance= payload;
  },
  SET_BTC_INSTANCE: (state, payload) => {
    state.BTCInstance = payload;
  },
  SET_CASH_INSTANCE: (state, payload) => {
    state.CASHInstance= payload;
  },
  SET_ADA_INSTANCE: (state, payload) => {
    state.ADAInstance = payload;
  },
  SET_ETH_INSTANCE: (state, payload) => {
    state.ETHInstance = payload;
  },
  SET_MATIC_INSTANCE: (state, payload) => {
    state.MATICInstance = payload;
  },
  SET_BALLOT_INSTANCE: (state, payload) => {
    state.ballotInstance = payload;
  },
};

export default mutations;
