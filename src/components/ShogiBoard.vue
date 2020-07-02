<template>
  <v-container></v-container>
</template>

<script>
import { db } from "../plugins/firebase";

export default {
  name: "ShogiBoard",
  data() {
    return {
      document: [],
      startpos: String,
      position: String,
      moves: [],
      board: [[], [], [], [], [], [], [], [], []]
    };
  },
  watch: {
    document: {
      immediate: false,
      handler() {
        this.startpos = this.document["startpos"]
          .replace(/1/g, "-")
          .replace(/2/g, "--")
          .replace(/3/g, "---")
          .replace(/4/g, "----")
          .replace(/5/g, "-----")
          .replace(/6/g, "------")
          .replace(/7/g, "-------")
          .replace(/8/g, "--------")
          .replace(/9/g, "---------")
          .split(/[/\s]/);
        this.startpos.forEach(function(value, index) {
          this[index] = Array.from(value);
        }, this.board);
        console.log(this.board);
        // sfenの値が変化したときの処理を書く（ここで盤面を変化させればよい）
      }
    }
  },
  methods: {},
  firestore() {
    return {
      document: db.collection("KIF").doc("SFEN")
    };
  }
};
</script>