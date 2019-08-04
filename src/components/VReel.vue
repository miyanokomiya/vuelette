<template>
  <span :class="$style.item">
    <transition
      :enter-active-class="$style[timing]"
      :enter-class="$style.enter"
      :leave-active-class="$style[timing]"
      :leave-to-class="$style.leaveTo"
    >
      <span v-if="!toggled" :class="$style.board" key="front">
        <span v-for="(item, i) in items" :key="i" :class="$style.boardItem"
          ><slot :item="item">{{ item }}</slot></span
        >
      </span>
      <span v-else :class="$style.board" key="bach">
        <span v-for="(item, i) in items" :key="i" :class="$style.boardItem"
          ><slot :item="item">{{ item }}</slot></span
        >
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { sleep, LoopPlayer } from "../utils";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    target: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      player: null as LoopPlayer | null,
      toggled: false,
      timing: "easeIn" as "easeIn" | "linear" | "easeOut"
    };
  },
  computed: {
    items(): number[] {
      return [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(n => {
        return (this.target + n) % 10;
      });
    },
    gradInterval(): number {
      return 1000;
    },
    linearInterval(): number {
      return this.gradInterval * 0.3;
    }
  },
  watch: {
    value() {
      this.value ? this.run() : this.stop();
    }
  },
  created() {
    this.initPlayer();
  },
  mounted() {
    if (this.value) this.run();
  },
  beforeDestroy() {
    this.disposePlayer();
  },
  methods: {
    initPlayer() {
      this.disposePlayer();
      this.player = new LoopPlayer(() => {
        this.step();
      }, this.linearInterval);
    },
    disposePlayer() {
      if (!this.player) return;
      this.player.dispose();
    },
    async run() {
      if (!this.player) return;

      this.timing = "easeIn";
      this.step();
      await sleep(this.gradInterval);
      if (!this.value) return;
      this.timing = "linear";
      this.player.run();
    },
    step() {
      this.toggled = !this.toggled;
    },
    async stop() {
      if (!this.player) return;

      await this.player.stop();
      await sleep(this.linearInterval);
      this.timing = "easeOut";
      this.step();
    }
  }
});
</script>

<style module>
.item {
  position: relative;
  min-width: 0.8em;
  height: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.board {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
  bottom: 0;
}
.boardItem {
  line-height: 1em;
}

.easeIn {
  transition-property: all;
  transition-duration: 1000ms;
  transition-timing-function: cubic-bezier(1, 0, 1, 1);
}
.easeOut {
  transition-property: all;
  transition-duration: 1000ms;
  transition-timing-function: cubic-bezier(0, 0, 0, 1);
}
.linear {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: linear;
}
.enter {
  transform: translateY(-10em);
}
.leaveTo {
  transform: translateY(10em);
}
</style>
