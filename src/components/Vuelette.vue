<template>
  <div :class="$style.container">
    <VReel v-for="(v, i) in value" :key="i" :value="v" :target="1">
      <template v-slot="{ item }">
        <slot
          ><span :class="$style.red">{{ item }}</span></slot
        >
      </template>
    </VReel>
    <button @click="run">run</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VReel from "./VReel.vue";

export default Vue.extend({
  components: {
    VReel
  },
  data() {
    return {
      value: [false, false, false, false, false, false, false],
      running: false
    };
  },
  methods: {
    run() {
      this.running = !this.running;
      this.toggle(this.running);
    },
    toggle(val: boolean) {
      this.value.forEach((_, i) => {
        setTimeout(() => {
          Vue.set(this.value, i, val);
        }, 200 * i);
      });
    }
  }
});
</script>

<style module>
.container {
  display: inline-flex;
  border: 1px solid red;
}
.red {
  color: red;
}
</style>
