<template>
  <section class="box has-background-primary-dark">
    <header class="level">
      <h3 class="title level-left" contenteditable="true" @blur="onNameChange">
        {{ name }}
      </h3>
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

</style>
