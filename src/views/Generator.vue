<template>
<div>
    <RndTeam
      v-for="(team, index) in teams" 
      :key="index"
      :name="team.name">
      <draggable
        v-model="teams[index].members"
        group="teamMembers"
        @start="drag = true"
        @end="drag = false"
      >
        <RndTeammate
          v-for="(person, teammateIndex) in teams[index].members" 
          :key="teammateIndex" 
          :name="person.name" 
          :locked="person.locked" />
      </draggable>
    </RndTeam>
    <hr />
    <draggable
        v-model="bench.members"
        group="teamMembers"
        @start="drag = true"
        @end="drag = false"
      >
        <RndTeammate 
          v-for="(person, index) in bench.members" 
          :key="index" 
          :name="person.name" 
          :locked="person.locked" />
      </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import RndTeammate from "../components/RndTeammate.vue";
import RndTeam from "../components/RndTeam.vue";


@Component({
  components: {
    draggable,
    RndTeammate,
    RndTeam
  },
})
export default class Generator extends Vue {
  teams: Group[] = [{
    name: 'Team Teapot',
    members: [
      {name: 'Max', locked: false}, 
      {name: 'Hatt', locked: false},
      {name: 'Mössa', locked: false}]
  },
  {
    name: 'Team Trunk',
    members: [
      {name: 'Asdf', locked: false}, 
      {name: 'Gg', locked: false},
      {name: 'Jklö', locked: false}]
  }];

  bench: Group = {
    name: 'aaa',
    members:[{name: 'aaa', locked: false}, {name: 'bbb', locked: false},] 
  };
}

interface Person {
  name: string;
  locked: boolean;
}

interface Group {
  name: string;
  members: Person[];
}

</script>
