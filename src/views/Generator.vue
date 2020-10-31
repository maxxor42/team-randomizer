<template>
  <div>
    <h1>Team Randomizer Machine</h1>
    <p>(ctrl+t for new team, ctrl+r to run, arrows to select members / teams, press any key to add new member and enter when finnished)</p>
    <div v-for="(team, index) in teams" :key="index">
      <h2>Team {{ index }}</h2>
      <draggable
        v-model="teams[index]"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="name in team" :key="name">{{ name }}</div>
      </draggable>
    </div>
    <hr />
    <draggable
        v-model="bench"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="name in bench" :key="name">{{ name }}</div>
      </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";

@Component({
  components: {
    draggable,
  },
})
export default class Generator extends Vue {
  teams: string[][] = [["aaa", "bbb", "ccc"], ["ddd"]];
  bench: string[] = ['rr', 'ss'];
  drag = false;
}
</script>
