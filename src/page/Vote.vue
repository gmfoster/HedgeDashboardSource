<template>
  <div class="row mt-5">
    <div class="col-12 mt-4 mb-5">
      <h6 class="text-blue mb-3">Proposal:</h6>
      <div class="card border-blue">
        <div class="div-scroll asd">
          <table class="table">
            <thead>
              <tr>
                <th width="100" scope="col">Projects</th>
                <th scope="col">Info</th>
                <th scope="col">Vote</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(proposal, i) in proposals">
                <tr :key="i">
                  <td class="pt-2"> {{ getWeb3.utils.hexToAscii(proposal.name) }}</td>
                  <td class="text-left pb-3 pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    <br />
                    <br />
                    <strong>Total Votes: {{ proposal.voteCount }}</strong>
                  </td>
                  <td  class="pt-2">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-claim"
                      @click="vote(proposal.index)"
                      :disabled="!getUserAccount || isLoading"
                    >
                      Vote
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      proposals: [],
      isLoading: false,
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
          this.getBallotInstance.methods.getAllProposals().call(),
        ]).then(([proposals]) => {
          console.log(proposals)
          this.proposals = proposals;
        });
      }
    },
    vote(index) {
      this.isLoading = true;
      this.getBallotInstance.methods
        .vote(index)
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
      "getBallotAddress",
      "getHedgeInstance",
      "getTrackerInstance",
      "getXRPInstance",
      "getAVAXInstance",
      "getBTCInstance",
      "getCASHInstance",
      "getADAInstance",
      "getBallotInstance",
    ]),
  },
  watch: {
    getADAInstance() {
      this.readValue();
    },
  },
};
</script>
