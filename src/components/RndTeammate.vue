<template>
  <div class="control">
    <div class="tags are-large has-addons">
      <span class="tag is-primary movable">
        {{ teammate.name }}
        <button @click="remove" class="delete ml-4"></button>
      </span>
      <button v-if="teammate.locked" @click="toggleLocked(false)" class="button tag is-dark">unlock</button>
      <button v-else @click="toggleLocked(true)" class="button tag is-light">lock</button>

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
      locked,
    });
  }
}
</script>

<style scoped lang="scss">
  .movable {
    cursor: move;
  }
</style>