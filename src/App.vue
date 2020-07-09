<template>
  <!-- <v-app> -->
  <!-- <v-main> -->
  <ShogiBoard />
  <!-- </v-main> -->
  <!-- </v-app> -->
</template>

<script>
import ShogiBoard from "@/components/ShogiBoard";
import Vue from "vue";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";
Vue.use(VuejsDialog);

export default {
  name: "App",

  components: {
    ShogiBoard
  },

  data: () => ({
    //
  })
};
</script>

<style>
body {
  touch-action: manipulation;
}
</style>
