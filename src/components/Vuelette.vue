<template>
  <div :class="$style.container">
    <VReel v-for="(v, i) in reels" :key="i" :value="v" :target="targets[i]">
      <template v-slot="{ item }">
        <slot :item="item">{{ item }}</slot>
      </template>
    </VReel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VReel from "./VReel.vue";
import { sleep } from "../utils";

export default Vue.extend({
  components: {
    VReel
  },
  props: {
    running: { type: Boolean, required: true },
    digit: { type: Number, default: 4 },
    delay: { type: Number, default: 500 },
    value: { type: Number, default: 7777 }
  },
  data() {
    return {
      reels: [...Array(this.digit)].map(() => false)
    };
  },
  computed: {
    targets(): number[] {
      const valueStr = `${this.value}`.padStart(this.digit, "0");
      return Array.from(valueStr).map(s => parseInt(s));
    }
  },
  watch: {
    running(to) {
      this.gradToggle(to);
    }
  },
  mounted() {
    if (!this.running) return;
    this.gradToggle(true);
  },
  methods: {
    gradToggle(val: boolean) {
      this.reels.forEach(async (v, i) => {
        await sleep(val ? this.easeIn(i) : this.easeOut(i));
        Vue.set(this.reels, i, val);
      });
    },
    easeIn(index: number) {
      return this.delay * index * (1 - index / 2 / (this.digit - 1));
    },
    easeOut(index: number) {
      return this.delay * (index + 1) - this.easeIn(index);
    }
  }
});
</script>

<style module>
.container {
  display: inline-flex;
}
</style>
