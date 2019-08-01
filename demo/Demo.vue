<template>
  <div class="demo">
    <h1>Plugin Demo</h1>
    <Vuelette />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vuelette from "../src/components/Vuelette.vue"

export default Vue.extend({
  name: "demo",
  components: {
    Vuelette
  }
});
</script>

<style>
html {
  font-size: 40px;
}
</style>
