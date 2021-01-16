<template>
  <header class="level">
    <component :is="tag" class="title level-left">{{ header }}</component>
    <div class="level-right">
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input
              class="input"
              type="text"
              :placeholder="placeholder"
              v-model="newName"
              name="name"
              required
              minlength="1"
              size="15"
              @keypress.enter.stop.prevent="addNew"
            />
          </p>
          <p class="control">
            <button class="button" @click.stop.prevent="addNew">
              {{ submitButton }}
            </button>
          </p>
        </div>
      </div>
      <div class="level-item">
        <div class="control">
          <button class="button" @click.stop.prevent="clear">
            {{ clearButton }}
          </button>
        </div>
      </div>
      <div class="level-item">
        <slot />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  model: {
    prop: "name",
    event: "nameChange",
  },
})
export default class RndHeader extends Vue {
  @Prop() private header!: string;
  @Prop() private tag!: "h1" | "h2";
  @Prop() private submitButton!: string;
  @Prop() private placeholder!: string;
  @Prop() private clearButton!: string;

  private newName = "";

  addNew(): void {
    if (!this.newName.length) return;

    this.$emit("addNew", this.newName);
    this.newName = "";
  }

  clear(): void {
    this.$emit("clear");
  }
}
</script>
