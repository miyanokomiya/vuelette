<template>
  <div class="demo">
    <h1>Plugin Demo</h1>
    <div class="roulettes">
      <Vuelette
        v-for="i in [0, 1, 2]"
        :key="i"
        :running="running"
        :digit="digit"
        :value="target"
        :delay="300 * (i + 1)"
        :fastStop="fastStop"
        :class="`roulette_${i}`"
        class="roulette"
      >
        <template v-slot="{ item }">
          <span>{{ item }}</span>
        </template>
      </Vuelette>
    </div>
    <div>
      <button @click="toggle">{{ running ? "STOP" : "RUN" }}</button>
    </div>
    <div class="configs">
      <div>
        <label>
          <span>Digit: </span>
          <input type="number" min="1" max="10" v-model="digitStr" />
        </label>
      </div>
      <div>
        <label>
          <span>Target: </span>
          <input
            type="number"
            min="1"
            :max="'9'.repeat(10)"
            v-model="targetStr"
          />
        </label>
      </div>
      <div>
        <label>
          <span>Fast Stop: </span>
          <input type="checkbox" v-model="fastStop" />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vuelette from "../src/components/Vuelette.vue";

export default Vue.extend({
  name: "demo",
  components: {
    Vuelette
  },
  data() {
    return {
      running: false,
      targetStr: "77777",
      digitStr: "5",
      fastStop: false
    };
  },
  computed: {
    digit(): number {
      return parseInt(this.digitStr);
    },
    target(): number {
      return parseInt(this.targetStr);
    }
  },
  methods: {
    toggle() {
      this.running = !this.running;
    }
  }
});
</script>

<style scoped>
.roulettes {
  padding: 1rem 0;
}
.roulette {
  margin-right: 1rem;
  border: 1px solid black;
  border-radius: 8px;
}
.roulette_0 {
  font-size: 2rem;
  color: green;
}
.roulette_1 {
  font-size: 2rem;
  font-weight: 600;
  color: red;
}
.roulette_2 {
  font-size: 3rem;
  color: blue;
}
button {
  font-size: 1.2rem;
  width: 5rem;
}
.configs label {
  display: flex;
  align-items: center;
}
.configs span {
  min-width: 4rem;
}
.configs input[type="number"] {
  width: 6rem;
}
</style>
