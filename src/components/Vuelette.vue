<template>
  <div :class="$style.container">
    <template v-if="!resetReels">
      <VReel v-for="(v, i) in reels" :key="i" :value="v" :target="targets[i]">
        <template v-slot="{ item }">
          <slot :item="item">{{ item }}</slot>
        </template>
      </VReel>
    </template>
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
      reels: [...Array(this.digit)].map(() => false),
      resetReels: false,
      timestamp: 0
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
      if (to) {
        this.resetReels = true
        this.$nextTick(() => {
          this.resetReels = false
          this.gradToggle(to);
        })
      } else {
        this.gradToggle(to);
      }
    }
  },
  mounted() {
    if (!this.running) return;
    this.gradToggle(true);
  },
  methods: {
    gradToggle(val: boolean) {
      const timestamp = Date.now()
      this.timestamp = timestamp
      this.reels.forEach(async (v, i) => {
        await sleep(val ? this.easeIn(i) : this.easeOut(i));
        if (timestamp !== this.timestamp) return
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
