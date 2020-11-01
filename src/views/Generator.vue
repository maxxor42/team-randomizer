<template>
  <div>
    <button @click="randomize">Randomize</button>
    <form>
      <label for="teamName">Add team</label>
      <input
        type="text"
        v-model="newTeamName"
        id="teamName"
        name="teamName"
        required
        minlength="1"
        size="10"
        @keypress.enter.stop.prevent="onNewTeam"
      />
      <button @click.stop.prevent="onNewTeam">Add</button>
    </form>
    <div class="teams">
      <RndTeam 
        v-for="(team, index) in teams" 
        :key="index" 
        v-model="team.name"
        @remove="onRemoveTeam(index)">
        <draggable
          v-model="team.members"
          group="teamMembers"
          @start="drag = true"
          @end="drag = false">
          <RndTeammate
            v-for="(person, teammateIndex) in team.members"
            :key="teammateIndex"
            v-model="team.members[teammateIndex]"
          />
        </draggable>
      </RndTeam>
    </div>
    <hr />
    <form>
      <label for="name">Add teammate</label>
      <input
        type="text"
        v-model="newTeammateName"
        id="name"
        name="name"
        required
        minlength="1"
        size="10"
        @keypress.enter.stop.prevent="onNewTeammate"
      />
      <button @click.stop.prevent="onNewTeammate">Add</button>
    </form>
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
  </div>
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
    if (this.newTeammateName)
      this.addTeammate(this.newTeammateName);
    this.newTeammateName = "";
  }

  onNewTeam(): void {
    if (this.newTeamName)
      this.addTeam(this.newTeamName);
    this.newTeamName = "";
  }

  onRemoveTeam(index: number): void {
    this.removeTeam(index);
  }

  onRemoveTeammateFromBench(index: number) {
    this.removeTeammateFromBench(index);
  }

  @Watch('teams', { deep: true })
  onTeamsChange(): void {
    this.storeTeams();
  }

  @Watch('bench', { deep: true })
  onBenchChange(): void {
    this.storeBench();
  }
  
  created(): void {
    this.fetchFromLocalStorage();
  }
}
</script>

<style scoped lang="scss">
.teams {
  display: flex;
  align-items: top;
  justify-content: space-around;
}
</style>