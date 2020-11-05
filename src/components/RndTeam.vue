<template>
  <section class="box has-background-primary-dark movable">
    <header class="level">
      <h2 class="title level-left editable"
      contenteditable="true"
      ref="header"
      @blur="onNameChange"
      @keydown.enter.stop.prevent="onNameChange">
        {{ name }}
      </h2>
      <div class="level-right">
      <button class="button" @click="onRemove">Remove team</button>
      </div>
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

  get headerElement(): HTMLElement {
    return this.$refs.header as HTMLElement;
  }

  onNameChange(event: InputEvent): void {
    this.$emit("nameChange", this.headerElement.textContent);
    if (this.headerElement === document.activeElement)
      this.headerElement.blur();
  }

  onRemove() {
    this.$emit("remove");
  }
}
</script>

<style scoped lang="scss">
.editable {
  cursor: text;
}
</style>
