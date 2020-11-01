<template>
  <section class="team">
    <h2 class="title" 
        contenteditable="true" 
        @blur="onNameChange">
      {{ name }}
    </h2>
    <button @click="onRemove">Remove</button>
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
    this.$emit('remove');
  }
}
</script>

<style scoped lang="scss">
.team {
  border: 1px dotted grey;
  padding: 16px;
}

.title {
  font-size: 1.5em;
}
</style>
