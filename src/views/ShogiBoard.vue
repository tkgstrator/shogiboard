<template>
  <v-container>
    <h1>ShogiBoard</h1>
    <h2>{{sfen}}</h2>
  </v-container>
</template>

<script>
import { db } from "../plugins/firebase";

export default {
  name: "ShogiBoard",
  data() {
    return {
      sfen: []
    };
  },
  methods: {},
  firestore() {
    return {
      sfen: db.collection("KIF").doc("SFEN")
    };
  }
};
</script>