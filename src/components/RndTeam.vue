<template>
  <section class="team">
    <header>
      <h3 class="title" contenteditable="true" @blur="onNameChange">
        {{ name }}
      </h3>
      <button class="remove-btn" @click="onRemove">Remove</button>
    </header>
    <slot />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  model: {
    prop: "name",
    event: "nameChange",
  },
})
export default class RndTeam extends Vue {
  @Prop() private name!: string;

  onNameChange(event: InputEvent): void {
    // eslint-disable-next-line
    this.$emit("nameChange", (event.target as any).innerHTML);
  }

  onRemove() {
    this.$emit("remove");
  }
}
</script>

<style scoped lang="scss">
.team {
  background-color: coral;
  padding: 8px;
  margin: 8px 0;
}

.title {
  font-size: 1.5em;
}

h3 {
  flex-basis: 100%;
}

header {
  display: flex;
}

.remove-btn {
  background-color: lightslategrey;
  color: yellow;
  cursor: pointer;
  border: 0;
  outline: 0;
}
</style>
