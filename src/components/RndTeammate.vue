<template>
  <div>
    <div class="teammate"
    contenteditable="true"
    ref="name"
    @blur="onChange">
      {{ teammate.name }}
    </div>
    <input
      type="checkbox"
      v-bind:checked="teammate.locked"
      @change="onChange"
      ref="checkbox"
    />
    <button @click="onRemove">Remove</button>
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
      locked: (this.$refs.checkbox as any).checked,
    });
  }
  onRemove(): void {
    this.$emit("remove");
  }
}
</script>

<style scoped lang="scss">
.teammate {
  text-align: left;
}
</style>
