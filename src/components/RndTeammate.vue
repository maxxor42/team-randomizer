<template>
  <div :class="['teammate', {'locked': teammate.locked}]">
    <span class="name"
    ref="name"
    @blur="onChange">
      {{ teammate.name }}
    </span>
    <div class="buttons">
    <button
      v-if="teammate.locked"
      @click="toggleLocked(false)">Unlock</button>
        <button
      v-else
      @click="toggleLocked(true)">Lock</button>

    <button @click="remove">Remove</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Teammate } from "../models/teammate";

@Component({
  model: {
    prop: "teammate",
    event: "teammateChange",
  },
})
export default class RndTeammate extends Vue {
  @Prop() private teammate!: Teammate;

  onChange(): void {
    this.$emit("teammateChange", {
      name: (this.$refs.name as HTMLElement).innerHTML,
      locked: this.teammate.locked,
    });
  }
  remove(): void {
    this.$emit("remove");
  }

  toggleLocked(locked: boolean) {
    this.$emit("teammateChange", {
      name: this.teammate.name,
      locked
    });
  }
}
</script>

<style scoped lang="scss">
.teammate {
  background: lightgoldenrodyellow;
  margin: 4px;
  padding: 4px;
  display: inline-block;
  cursor: move;
}

.locked {
  background: lightsalmon ;
}

.name {
  font-size: 2em;
}

button {
  cursor: pointer;
  border: 0;
  background-color: unset;
  display: block;
}

.buttons {
  display: inline-block;
}
</style>
