<template>
  <section>
    <div class="row">
      <div class="col-12 col-md-7">
        <h6 class="text-red">Total Rewards Distributed:</h6>
        <div class="card">
          <div class="div-scroll">
            <template v-for="(token, i) in tokens">
              <div class="mr-4" :key="i">
                <p>
                  <strong>{{ token.symbol }}</strong>
                  <span>{{ token.balance }}</span>
                  <v-text>{{ token.address }}</v-text>
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="box-right mt-5">
          <h5>Donate gas to expedite rewards!</h5>
          <small>Max: 20,000,000 wei</small> <br />
          <small>~.15 BNB </small> <br />
          <input type="number" v-model="gas" />
          <button
            type="button"
            class="btn btn-outline-danger"
            @click.prevent="donate"
            :disabled="!getUserAccount || isDonating"
          >
            Donate Gas
          </button>
        </div>
      </div>
      <div class="col-12 mt-5 mb-4">
        <h6 class="text-blue">Current Reward:</h6>
        <div class="card border-blue">
          <div class="div-scroll">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th width="100" scope="col">Token</th>
                  <th scope="col">Total</th>
                  <th scope="col">Owed</th>
                  <th width="100" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(token, i) in current">
                  <tr :key="i">
                    <td>{{ token.symbol }}</td>
                    <td>{{ token.claimed }}</td>
                    <td>{{ token.owed }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-claim"
                        @click.prevent="claim(token.symbol)"
                        :disabled="!getUserAccount || isLoading"
                      >
                        Claim
                      </button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>This is a beta version, please notify us of any bugs here:</p>
      <a href = "https://forms.gle/ywNABEYNxzqCydwm8" target="_blank" rel="noopener noreferrer">Bug Reporting</a>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  data() {
    return {
      gas: 0.0,
      isLoading: false,
      isDonating: false,
      tokens: {
        XRP: {
          symbol: "XRP",
          balance: "0",
          address: "0",
        },
        AVAX: {
          symbol: "AVAX",
          balance: "0",
          address: "0",
        },
        BTC: {
          symbol: "BTC",
          balance: "0",
          address: "0",
        },
        CASH: {
          symbol: "CASH",
          balance: "0",
          address: "0",
        },
        ADA: {
          symbol: "ADA",
          balance: "0",
          address: "0",
        },
        ETH: {
          symbol: "ETH",
          balance: "0",
          address: "0",
        },
        MATIC: {
          symbol: "MATIC",
          balance: "0",
          address: "0",
        },
      },
      current: {
        MATIC: {
          symbol: "MATIC",
          balance: "0",
          claimed: "0",
          owed: "0",
        },
      },
    };
  },

  mounted() {
    this.readValue();
    this.timer = setInterval(() => {
      this.readValue();
    }, 10000);
  },
  methods: {
    readValue() {
      if (this.getWeb3) {
        Promise.all([
          this.getTrackerInstance.methods
            .totalDividendsDistributed(this.getXRPAddress)
            .call(),
          this.getTrackerInstance.methods
            .totalDividendsDistributed(this.getAVAXAddress)
            .call(),
          this.getTrackerInstance.methods
            .totalDividendsDistributed(this.getBTCAddress)
            .call(),
          this.getTrackerInstance.methods
            .totalDividendsDistributed(this.getCASHAddress)
            .call(),
          this.getTrackerInstance.methods
            .totalDividendsDistributed(this.getADAAddress)
            .call(),
          this.getTrackerInstance.methods
              .totalDividendsDistributed(this.getETHAddress)
              .call(),
          this.getTrackerInstance.methods
              .totalDividendsDistributed(this.getMATICAddress)
              .call(),
          this.getTrackerInstance.methods
              .accumulativeDividendOf(
                  this.getUserAccount
              )
              .call(),
          this.getTrackerInstance.methods
              .withdrawableDividendOf(
                  this.getUserAccount
              )
              .call(),
        ]).then(
          ([
            XRPBalance,
            AVAXBalance,
            BTCBalance,
            CASHBalance,
            ADABalance,
            ETHBalance,
            MATICBalance,
            MATICDividend,
            MATICOwed,
          ]) => {
            this.tokens.XRP.balance = this.humanized(XRPBalance, 3);
            this.tokens.XRP.address = this.getXRPAddress;
            this.tokens.AVAX.balance = this.humanized(AVAXBalance, 3);
            this.tokens.AVAX.address = this.getAVAXAddress;
            this.tokens.BTC.balance = this.humanized(BTCBalance, 3);
            this.tokens.BTC.address = this.getBTCAddress;
            this.tokens.CASH.balance = this.humanized(CASHBalance, 3);
            this.tokens.CASH.address = this.getCASHAddress;
            this.tokens.ADA.balance = this.humanized(ADABalance, 3);
            this.tokens.ADA.address = this.getADAAddress;
            this.tokens.ETH.balance = this.humanized(ETHBalance, 3);
            this.tokens.ETH.address = this.getETHAddress;
            this.tokens.MATIC.balance = this.humanized(MATICBalance, 3);
            this.tokens.MATIC.address = this.getMATICAddress;
            this.current.MATIC.balance = this.humanized(MATICBalance, 5);
            this.current.MATIC.claimed = this.humanized(MATICDividend, 5);
            this.current.MATIC.owed = this.humanized(MATICOwed, 5);
          }
        );
      }
    },
    humanized(number, fix) {
      return Number(
        this.getWeb3.utils.fromWei(number.toString(), "ether")
      ).toFixed(number == 0 ? 3 : fix);
    },
    donate() {
      //let amount = (this.gas * 1e18).toString();
      let amount = this.getWeb3.utils.toWei(this.gas.toString(), 'wei');
      console.log(amount);
      this.isDonating = true;
      this.getHedgeInstance.methods
        .processDividendTracker(amount)
        .send({
          from: this.getUserAccount,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction hash", hash);
          this.$toasted.show("Transaction submitted to the network");
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
          this.isDonating = false;
          this.$toasted.show("Transaction completed successfully");
        })
        .on("error", (error) => {
          this.isDonating = false;
          console.log("Error receipt: ", error);
        });
    },
    claim() {
      this.isLoading = true;
      this.getHedgeInstance.methods
        .claim()
        .send({
          from: this.getUserAccount,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction hash", hash);
          this.$toasted.show("Transaction submitted to the network");
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
          this.isLoading = false;
          this.$toasted.show("Transaction completed successfully");
          this.$forceUpdate();
        })
        .on("error", (error) => {
          this.isLoading = false;
          console.log("Error receipt: ", error);
        });
    },
  },
  computed: {
    ...mapGetters("wallet", [
      "getWeb3",
      "getUserAccount",
      "getXRPAddress",
      "getAVAXAddress",
      "getBTCAddress",
      "getCASHAddress",
      "getADAAddress",
      "getETHAddress",
      "getMATICAddress",
      "getHedgeInstance",
      "getTrackerInstance",
      "getXRPInstance",
      "getAVAXInstance",
      "getBTCInstance",
      "getCASHInstance",
      "getADAInstance",
      "getETHInstance",
      "getMATICInstance",
    ]),
  },
  watch: {
    getMATICInstance() {
      this.readValue();
    },
  },
};
</script>