<template>
  <main class="p-4">
    <section class="container">
      <RndHeader
        header="Team randomizer"
        tag="h1"
        submitButton="Add team"
        clearButton="Clear teams"
        placeholder="Team name"
        @addNew="onNewTeam"
        @clear="onRemoveAllTeams"
      >
        <div class="field ml-3">
          <button
            @click="randomize"
            class="button is-danger is-large is-fullwidth"
          >
            Randomize
          </button>
        </div>
      </RndHeader>

      <draggable v-model="teams" group="teams">
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
          >
            <RndTeammate
              v-for="(person, teammateIndex) in team.members"
              :key="teammateIndex"
              v-model="team.members[teammateIndex]"
              @remove="onRemoveTeammateFromTeam(index, teammateIndex)"
            />
          </draggable>
        </RndTeam>
      </draggable>
      <div v-if="!teams.length" class="notification">
        <p>No teams</p>
      </div>
    </section>

    <section class="container mt-6">
      <RndHeader
        header="Unassigned teammates"
        tag="h2"
        submitButton="Add teammate"
        clearButton="Unassign all"
        placeholder="Name"
        @addNew="onNewTeammate"
        @clear="onUnassignAllTeammates"
      />
      <draggable
        v-model="bench"
        group="teamMembers"
        class="field is-grouped is-grouped-multiline"
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
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import draggable from "vuedraggable";
import RndTeammate from "../components/RndTeammate.vue";
import RndTeam from "../components/RndTeam.vue";
import RndHeader from "../components/RndHeader.vue";
import GroupMixin from "../mixins/group-mixin";

@Component({
  components: {
    draggable,
    RndTeammate,
    RndTeam,
    RndHeader,
  },
})
export default class Generator extends Mixins(GroupMixin) {
  onNewTeammate(name: string): void {
    this.addTeammate(name);
  }

  onNewTeam(teamName: string): void {
    this.addTeam(teamName);
  }

  onRemoveTeam(index: number): void {
    this.removeTeam(index);
  }

  onRemoveAllTeams(): void {
    this.removeAllTeams();
  }

  onRemoveTeammateFromTeam(team: number, teamate: number) {
    this.removeTeammateFromTeam(team, teamate);
  }

  onRemoveTeammateFromBench(index: number) {
    this.removeTeammateFromBench(index);
  }

  onUnassignAllTeammates() {
    this.unassignAllTeammates();
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