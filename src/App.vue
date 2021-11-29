<template>
  <div id="app">
    <img class="bg" src="@/assets/bg.png" alt="" />
    <div class="container">
      <header>
        <nav class="navbar navbar-expand-lg mx-auto">
          <div class="container-fluid">
            <div class="d-flex">
              <router-link to="/" class="navbar-logo d-flex align-items-center">
                <img class="logo" src="./assets/logo.png" />
                HEDGE-FINANCE
              </router-link>
            </div>
            <button
              v-if="getUserAccount"
              class="btn btn-outline-danger btn-connect"
              @click="disconnect"
            >
              {{ addrTruncation(getUserAccount) }}
            </button>
            <button
              v-else
              class="btn btn-outline-danger btn-connect"
              @click="onConnect"
            >
              Connect
            </button>
          </div>
        </nav>
      </header>
      <div class="d-flex justify-content-center align-items-center mt-5 mb-4">
        <button type="button" class="btn btn-outline-danger mx-5" @click="togo('/')">
          Dashboard
        </button>
        <button type="button" class="btn btn-outline-primary mx-5" :disabled="true" @click="togo('vote')">Vote</button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            this.onConnect();
            console.log(accounts)
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  methods: {
    ...mapActions("wallet", [
      "SET_WEB3",
      "SET_USER_ACCOUNT",
      "SET_XRP_INSTANCE",
      "SET_AVAX_INSTANCE",
      "SET_BTC_INSTANCE",
      "SET_CASH_INSTANCE",
      "SET_ADA_INSTANCE",
      "SET_ETH_INSTANCE",
      "SET_MATIC_INSTANCE",
      "SET_TRACKER_INSTANCE",
      "SET_HEDGE_INSTANCE",
      "SET_BALLOT_INSTANCE"
    ]),
    togo(url){
      this.$router.push(url)
    },
    async onConnect() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      this.onProvider(window.ethereum);
      window.ethereum.on("accountsChanged", (accounts) => {
        this.SET_USER_ACCOUNT(accounts[0]);
        this.onProvider(window.ethereum);
      });
    },
    async onProvider(provider) {
      this.showModal = false;
      try {
        let web3 = new Web3(provider);
        this.SET_WEB3(web3);

        let accounts = await web3.eth.getAccounts();
        if (accounts.length) {
          this.$toasted.show("Wallet Connected!");
        }
        this.SET_USER_ACCOUNT(accounts[0]);

        let hedgeInstance = new this.getWeb3.eth.Contract(
          this.getHedgeABI,
          this.getHedgeAddress
        );
        let trackerInstance = new this.getWeb3.eth.Contract(
          this.getTrackerABI,
          this.getTrackerAddress
        );
        let XRPInstance = new this.getWeb3.eth.Contract(
          this.getContractABI,
          this.getXRPAddress
        );
        let AVAXInstance = new this.getWeb3.eth.Contract(
          this.getContractABI,
          this.getAVAXAddress
        );
        let BTCInstance = new this.getWeb3.eth.Contract(
          this.getContractABI,
          this.getBTCAddress
        );
        let CASHInstance = new this.getWeb3.eth.Contract(
          this.getContractABI,
          this.getCASHAddress
        );
        let ADAInstance = new this.getWeb3.eth.Contract(
          this.getContractABI,
          this.getADAAddress
        );
        let ETHInstance = new this.getWeb3.eth.Contract(
            this.getContractABI,
            this.getETHAddress
        );
        let MATICInstance = new this.getWeb3.eth.Contract(
            this.getContractABI,
            this.getMATICAddress
        );
        let ballotInstance = new this.getWeb3.eth.Contract(
          this.getBallotABI,
          this.getBallotAddress
        );

        this.SET_HEDGE_INSTANCE(hedgeInstance);
        this.SET_TRACKER_INSTANCE(trackerInstance);
        this.SET_XRP_INSTANCE(XRPInstance);
        this.SET_AVAX_INSTANCE(AVAXInstance);
        this.SET_BTC_INSTANCE(BTCInstance);
        this.SET_CASH_INSTANCE(CASHInstance);
        this.SET_ADA_INSTANCE(ADAInstance);
        this.SET_ETH_INSTANCE(ETHInstance);
        this.SET_MATIC_INSTANCE(MATICInstance);
        this.SET_BALLOT_INSTANCE(ballotInstance);
      } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
      }
    },
    addrTruncation(addr) {
      return addr.slice(0, 6) + "…" + addr.slice(addr.length - 4, addr.length);
    },
    disconnect() {
      this.SET_WEB3(null);
      this.SET_USER_ACCOUNT(null);
      this.SET_HEDGE_INSTANCE(null);
      this.SET_TRACKER_INSTANCE(null);
      this.SET_XRP_INSTANCE(null);
      this.SET_AVAX_INSTANCE(null);
      this.SET_BTC_INSTANCE(null);
      this.SET_CASH_INSTANCE(null);
      this.SET_ADA_INSTANCE(null);
      this.SET_ETH_INSTANCE(null);
      this.SET_MATIC_INSTANCE(null);
      this.SET_BALLOT_INSTANCE(null);
    },
  },
  computed: {
    ...mapGetters("wallet", [
      "getWeb3",
      "getUserAccount",
      "getBallotABI",
      "getHedgeABI",
      "getTrackerABI",
      "getContractABI",
      "getHedgeAddress",
      "getTrackerAddress",
      "getXRPAddress",
      "getAVAXAddress",
      "getBTCAddress",
      "getCASHAddress",
      "getADAAddress",
      "getETHAddress",
      "getMATICAddress",
      "getBallotAddress",
    ]),
  },
};
</script>

<style>
@import "./css/styles.css";
</style>
