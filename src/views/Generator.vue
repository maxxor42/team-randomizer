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
        @remove="removeTeam(index)">
        <draggable
          v-model="team.members"
          group="teamMembers"
          @start="drag = true"
          @end="drag = false">
        >
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
        @remove="removeTeammateFromBench(index)"
      />
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import RndTeammate from "../components/RndTeammate.vue";
import RndTeam from "../components/RndTeam.vue";
import { Teammate } from "../models/teammate";
import { Group } from "../models/group";

@Component({
  components: {
    draggable,
    RndTeammate,
    RndTeam,
  },
})
export default class Generator extends Vue {
  newTeamName = "";
  newTeammateName = "";

  teams: Group[] = [
    {
      name: "Team Teapot",
      members: [
        { name: "Max", locked: false },
        { name: "Hatt", locked: false },
        { name: "Mössa", locked: false },
      ],
    },
    {
      name: "Team Trunk",
      members: [
        { name: "Asdf", locked: false },
        { name: "Gg", locked: false },
        { name: "Jklö", locked: false },
      ],
    },
  ];

  bench: Teammate[] = [
    { name: "aaa", locked: false },
    { name: "bbb", locked: false },
  ];

  onNewTeammate(): void {
    if (this.newTeammateName)
      this.bench.push({
        name: this.newTeammateName,
        locked: false,
      });
    this.newTeammateName = "";
  }

  onNewTeam(): void {
    if (this.newTeamName)
      this.teams.push({
        name: this.newTeamName,
        members: [],
      });
    this.newTeamName = "";
  }

  removeTeam(index: number) {
    this.bench = this.bench.concat(this.teams[index].members);
    this.teams.splice(index, 1);
  }

  removeTeammateFromTeam(teamIndex: number, teammateIndex: number) {
    this.teams[teamIndex].members.splice(teammateIndex, 1);
  }

  removeTeammateFromBench(index: number) {
    this.bench.splice(index, 1);
  }

  randomize(): void {
    let teammatesToRandomize: Teammate[] = [];

    let teammatesTotal = 0;

    if (!this.teams) return;

    this.teams.forEach((team: Group) => {
      teammatesToRandomize = teammatesToRandomize.concat(
        team.members.filter((teammate: Teammate) => !teammate.locked)
      );

      team.members = team.members.filter(
        (teammate: Teammate) => teammate.locked
      );

      teammatesTotal += team.members.length;
    });

    teammatesToRandomize = teammatesToRandomize.concat(
      this.bench.filter((teammate: Teammate) => !teammate.locked)
    );

    this.bench = this.bench.filter((teammate: Teammate) => teammate.locked);

    teammatesTotal += teammatesToRandomize.length;

    const membersPerTeam = Math.floor(teammatesTotal / this.teams.length);

    let remainder = teammatesTotal % this.teams.length;

    const randomizedTeammates = teammatesToRandomize
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    this.teams.forEach((team: Group) => {
      let nrMembersNeaded = membersPerTeam - team.members.length;

      if (remainder) {
        nrMembersNeaded++;
        remainder--;
      }

      team.members = team.members.concat(
        randomizedTeammates.splice(0, nrMembersNeaded)
      );
    });

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