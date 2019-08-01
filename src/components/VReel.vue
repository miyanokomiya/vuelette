<template>
  <span :class="$style.item">
    <transition
      :enter-active-class="$style[timing]"
      :enter-class="$style.enter"
      :leave-active-class="$style[timing]"
      :leave-to-class="$style.leaveTo"
    >
      <span v-if="!toggled" :class="$style.board" key="front">
        <span
          v-for="(item, i) in frontItems"
          :key="i"
          :class="$style.boardItem"
          >{{ item }}</span
        >
      </span>
      <span v-else :class="$style.board" key="bach">
        <span
          v-for="(item, i) in backItems"
          :key="i"
          :class="$style.boardItem"
          >{{ item }}</span
        >
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
import Vue from "vue";

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
      toggled: false,
      timing: "easeIn" as "easeIn" | "linear" | "easeOut" | "slip"
    };
  },
  computed: {
    interval(): number {
      return this.timing === "linear" ? 300 : 1000;
    },
    frontItems(): Item[] {
      return [4, 3, 2, 1, 0].map(n => {
        return this.fixed ? (this.target + n) % 10 : n;
      });
    },
    backItems(): Item[] {
      const rad = Math.floor(Math.random() * 10)
      return [9, 8, 7, 6, 5].map(n => {
        return this.fixed ? (this.target + n + rad) % 10 : n;
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
  mounted() {
    if (this.value) this.run();
  },
  methods: {
    run() {
      this.timing = "easeIn";
      this.loop();
    },
    async loop() {
      if (this.timing === "easeOut") {
        if (this.toggled) {
          this.timing = "linear";
          this.toggled = !this.toggled;
          await this.sleep();
          this.slip();
        } else {
          this.slip();
        }
        return;
      }

      if (!this.value) return;

      this.toggled = !this.toggled;
      this.sleep().then(() => {
        if (this.timing !== "easeOut") {
          this.timing = "linear";
        }
        this.loop();
      });
    },
    async slip() {
      if (Math.random() < 0.2) {
        this.timing = "easeOut";
        this.toggled = !this.toggled;
        await this.sleep();
        this.timing = "slip";
        this.toggled = !this.toggled;
        await this.sleep();
        this.toggled = !this.toggled;
        await this.sleep();
        this.timing = "easeOut";
        this.toggled = !this.toggled;
      } else {
        this.timing = "linear";
        this.toggled = !this.toggled;
        await this.sleep();
        this.timing = "easeOut";
        this.toggled = !this.toggled;
      }
    },
    stop() {
      this.timing = "easeOut";
    },
    async sleep() {
      return new Promise((resolve, _) => {
        setTimeout(() => {
          resolve();
        }, this.interval);
      });
    }
  }
});
</script>

<style module>
.item {
  position: relative;
  width: 0.8em;
  height: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid blue;
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
