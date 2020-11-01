<template>
  <main>
    <section>
      <button @click="randomize" class="randomize-btn">Randomize</button>
    </section>

    <section class="teammates">
      <header class="teammate-header">
        <h2 class="teammate-header--header">Unassigned Teammates</h2>
        <input
          class="input-name"
          type="text"
          placeholder="Name"
          v-model="newTeammateName"
          id="name"
          name="name"
          required
          minlength="1"
          size="15"
          @keypress.enter.stop.prevent="onNewTeammate"
        />
        <button @click.stop.prevent="onNewTeammate">Add</button>
      </header>

      <div class="unassigned">
        <draggable
          v-model="bench"
          group="teamMembers"
          @start="drag = true"
          @end="drag = false"
        >
          <RndTeammate
            v-for="(member, index) in bench"
            :key="index"
            v-model="bench[index]"
            @remove="onRemoveTeammateFromBench(index)"
          />
        </draggable>
        <div v-if="!bench.length">No unassigned teammembers</div>
      </div>
    </section>

    <section>
      <header class="teammate-header">
        <h2 class="teammate-header--header">Teams</h2>
        <input
          class="input-name"
          type="text"
          placeholder="Team Name"
          v-model="newTeamName"
          id="name"
          name="name"
          required
          minlength="1"
          size="15"
          @keypress.enter.stop.prevent="onNewTeam"
        />
        <button @click.stop.prevent="onNewTeam">Add</button>
      </header>

      <RndTeam
        v-for="(team, index) in teams"
        :key="index"
        v-model="team.name"
        @remove="onRemoveTeam(index)"
      >
        <draggable
          v-model="team.members"
          group="teamMembers"
          @start="drag = true"
          @end="drag = false"
        >
          <RndTeammate
            v-for="(person, teammateIndex) in team.members"
            :key="teammateIndex"
            v-model="team.members[teammateIndex]"
            @remove="onRemoveTeammateFromTeam(index, teammateIndex)"
          />
        </draggable>
      </RndTeam>

    </section>

  </main>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import draggable from "vuedraggable";
import RndTeammate from "../components/RndTeammate.vue";
import RndTeam from "../components/RndTeam.vue";
import GroupMixin from "../mixins/group-mixin";

@Component({
  components: {
    draggable,
    RndTeammate,
    RndTeam,
  },
})
export default class Generator extends Mixins(GroupMixin) {
  newTeamName = "";
  newTeammateName = "";

  onNewTeammate(): void {
    if (this.newTeammateName) this.addTeammate(this.newTeammateName);
    this.newTeammateName = "";
  }

  onNewTeam(): void {
    if (this.newTeamName) this.addTeam(this.newTeamName);
    this.newTeamName = "";
  }

  onRemoveTeam(index: number): void {
    this.removeTeam(index);
  }

  onRemoveTeammateFromTeam(team: number, teamate: number) {
    this.removeTeammateFromTeam(team, teamate);
  }

  onRemoveTeammateFromBench(index: number) {
    this.removeTeammateFromBench(index);
  }

  @Watch("teams", { deep: true })
  onTeamsChange(): void {
    this.storeTeams();
  }

  @Watch("bench", { deep: true })
  onBenchChange(): void {
    this.storeBench();
  }

  created(): void {
    this.fetchFromLocalStorage();
  }
}
</script>

<style scoped lang="scss">
button {
  background-color: goldenrod;
  border: 0;
  margin: 4px 0;
  height: 2em;
  font-size: 3em;
  border-radius: 2px;
  box-shadow: 1px 1px 2px black;
  cursor: pointer;
}

button:focus {
  border: 0;
  outline: 0;
}

button:active {
  background-color: black;
  color: goldenrod;
  box-shadow: unset;
}

.input-name {
  font-size: 2em;
  outline: 0;
  border: 0;
  background-color: gold;
  margin: 4px;
  padding: 8px;
}

main {
  text-align: left;
}

.teammate-header {
  display: flex;
}

.randomize-btn {
  width: 100%;
}

h2 {
  flex-basis: 100%;
  font-weight: unset;
  font-size: 3em;
  line-height: 2em;
  margin: 0;
  padding: 0;
}

section {
  margin-bottom: 32px;
}
</style>