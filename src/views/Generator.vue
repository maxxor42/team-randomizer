<template>
  <main class="p-4">
    <section class="container">
      <header class="level">
        <h2 class="title level-left">Teams</h2>
        <div class="level-right">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input
                  class="input"
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
              </p>
              <p class="control">
                <button class="button" @click.stop.prevent="onNewTeam">
                  Add
                </button>
              </p>
            </div>
          </div>
        </div>
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
          class="field is-grouped is-grouped-multiline"
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

    <section  class="container mt-6">
      <button @click="randomize" class="button is-danger is-large is-fullwidth">Randomize</button>
    </section>

    <section class="container mt-6">
            <header class="level">
        <h2 class="title level-left">Unassigned teammates</h2>
        <div class="level-right">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input
                  class="input"
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
              </p>
              <p class="control">
                <button class="button" @click.stop.prevent="onNewTeammate">
                  Add
                </button>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div>
        <draggable
          v-model="bench"
          group="teamMembers"
          class="field is-grouped is-grouped-multiline"
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
        <div v-if="!bench.length" class="notification">
          <p>No unassigned teammembers</p>
        </div>
      </div>
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