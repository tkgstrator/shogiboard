<template>
  <v-app>
    <v-main>
      <ShogiBoard />
    </v-main>
  </v-app>
</template>

<script>
import ShogiBoard from "@/components/ShogiBoard";

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
