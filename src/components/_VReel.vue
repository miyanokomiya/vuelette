<template>
  <span :class="$style.item">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      :css="false"
    >
      <span v-if="toggled" :class="$style.board" key="0">
        <span v-for="(item, i) in frontItems" :key="i" :class="$style.boardItem"
          ><slot :item="item">{{ item }}</slot></span
        >
      </span>
      <span v-else :class="$style.board" key="1">
        <span v-for="(item, i) in frontItems" :key="i" :class="$style.boardItem"
          ><slot :item="item">{{ item }}</slot></span
        >
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { sleep, LoopPlayer } from "../utils";

type Item = number | string;

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
      timing: "easeIn" as "easeIn" | "linear" | "easeOut" | "slip"
    };
  },
  computed: {
    interval(): number {
      return 600
    },
    frontItems(): Item[] {
      return [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(n => {
        return this.fixed ? (this.target + n) % 10 : n;
      });
    },
    fixed(): boolean {
      return ["easeOut", "slip"].includes(this.timing);
    }
  },
  watch: {
    value() {
      this.value ? this.run() : this.stop();
    }
  },
  created() {
    this.timing = "linear";
    this.player = new LoopPlayer(() => {
      this.loop();
    }, this.interval);
  },
  mounted() {
    if (this.value) this.run();
  },
  methods: {
    beforeEnter(el: HTMLElement) {
      console.log(1)
      el.style.bottom = "0";
    },
    enter(el: HTMLElement, done: () => void) {},
    afterEnter(el: HTMLElement) {},
    beforeLeave(el: HTMLElement) {},
    leave(el: HTMLElement, done: () => void) {},
    afterLeave(el: HTMLElement) {
      console.log(1)
      el.style.top = "0";
    },
    run() {
      if (!this.player) return;
      this.player.run();
    },
    loop() {
      this.toggled = !this.toggled;
    },
    stop() {
      if (!this.player) return;
      this.player.stop().then(() => {
        console.log("after end");
      });
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
  top: 0;
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
.slip {
  transition-property: all;
  transition-duration: 1000ms;
  transition-timing-function: linear;
}
.enter {
  transform: translateY(-5em);
}
.leaveTo {
  transform: translateY(5em);
}
</style>
