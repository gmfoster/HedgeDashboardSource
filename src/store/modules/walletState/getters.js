const getters = {
  getWeb3: state => {
    return state.web3;
  },
  getHedgeABI: state => {
    return state.hedgeABI;
  },
  getContractABI: state => {
    return state.contractABI;
  },
  getTrackerABI: state => {
    return state.trackerABI;
  },
  getBallotABI: state => {
    return state.ballotABI;
  },
  getUserAccount: state => {
    return state.userAccount;
  },
  getHedgeAddress: state => {
    return state.hedgeAddress;
  },
  getTrackerAddress: state => {
    return state.trackerAddress;
  },
  getXRPAddress: state => {
    return state.XRPAddress;
  },
  getAVAXAddress: state => {
    return state.AVAXAddress;
  },
  getBTCAddress: state => {
    return state.BTCAddress;
  },
  getCASHAddress: state => {
    return state.CASHAddress;
  },
  getADAAddress: state => {
    return state.ADAAddress;
  },
  getETHAddress: state => {
    return state.ETHAddress;
  },
  getMATICAddress: state => {
    return state.MATICAddress;
  },
  getBallotAddress: state => {
    return state.ballotAddress;
  },
  getXRPInstance: state => {
    return state.XRPInstance;
  },
  getAVAXInstance: state => {
    return state.AVAXInstance;
  },
  getBTCInstance: state => {
    return state.BTCInstance;
  },
  getCASHInstance: state => {
    return state.CASHInstance;
  },
  getADAInstance: state => {
    return state.ADAInstance;
  },
  getETHInstance: state => {
    return state.ETHInstance;
  },
  getMATICInstance: state => {
    return state.MATICInstance;
  },
  getHedgeInstance: state => {
    return state.hedgeInstance;
  },
  getTrackerInstance: state => {
    return state.trackerInstance;
  },
  getBallotInstance: state => {
    return state.ballotInstance;
  },
};

export default getters;
